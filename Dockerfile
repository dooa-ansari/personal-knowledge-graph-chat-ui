# ==========================================
# Stage 1: Build the Microfrontend
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Accept build argument for backend API URL
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build remoteEntry.js, mf-manifest.json, and assets
RUN yarn build

# ==========================================
# Stage 2: Serve with Lightweight Nginx
# ==========================================
FROM nginx:alpine

# Copy built artifacts from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx alpine image automatically processes templates in /etc/nginx/templates/*.template
# and substitutes environment variables (like ${PORT} from Railway) into /etc/nginx/conf.d/
RUN mkdir -p /etc/nginx/templates && printf 'server {\n\
    listen ${PORT};\n\
    server_name _;\n\
    \n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html;\n\
        try_files $uri $uri/ /index.html;\n\
        \n\
        # CORS headers so Next.js host can load the microfrontend assets\n\
        add_header Access-Control-Allow-Origin * always;\n\
        add_header Access-Control-Allow-Methods "GET, OPTIONS" always;\n\
        add_header Access-Control-Allow-Headers * always;\n\
    }\n\
}\n' > /etc/nginx/templates/default.conf.template

# Fallback port if not provided by environment
ENV PORT=80

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
