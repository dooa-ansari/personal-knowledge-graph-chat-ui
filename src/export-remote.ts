import { createApp, type App as VueApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import en from './locales/en.json'
import cssText from './assets/main.css?inline'

export interface MountOptions {
  [key: string]: unknown
}

/**
 * Universal mounting bridge for React / Next.js / Angular / Vanilla hosts.
 * Encapsulates the entire Vue Chat UI inside a Shadow DOM boundary so that
 * Tailwind preflight resets and utility classes NEVER leak into or ruin the host app.
 */
export function mount(container: HTMLElement, _options?: MountOptions): () => void {
  // 1. Attach or reuse Shadow Root for 100% style isolation
  const shadow = container.shadowRoot || container.attachShadow({ mode: 'open' })

  // 2. Clear previous nodes if remounted (e.g. React StrictMode or hot-reload)
  shadow.innerHTML = ''

  // 3. Inject Tailwind styles strictly inside the Shadow Root
  const styleEl = document.createElement('style')
  styleEl.textContent = cssText
  shadow.appendChild(styleEl)

  // 4. Create an inner mount target inside the shadow DOM
  const mountTarget = document.createElement('div')
  mountTarget.style.width = '100%'
  mountTarget.style.height = '100%'
  shadow.appendChild(mountTarget)

  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en },
  })

  const app: VueApp = createApp(App)
  app.use(createPinia())
  app.use(i18n)

  app.mount(mountTarget)

  return () => {
    app.unmount()
    shadow.innerHTML = ''
  }
}

export { App }
export default mount
