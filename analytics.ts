// Lightweight analytics bootstrap for GA4 and Plausible
// Configure via .env.local:
// - VITE_GA_ID=G-XXXXXXXXXX
// - VITE_PLAUSIBLE_DOMAIN=tu-dominio.com

type GTag = (command: 'js' | 'config' | 'event', target: string | Date, params?: Record<string, any>) => void;
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: GTag;
    plausible?: (event: string, opts?: { props?: Record<string, any> }) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;
const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;

function loadScript(src: string, attrs: Record<string, string> = {}) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  document.head.appendChild(s);
}

function initGA() {
  if (!GA_ID) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // @ts-ignore
    window.dataLayer.push(arguments);
  } as GTag;
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
}

function initPlausible() {
  if (!PLAUSIBLE_DOMAIN) return;
  loadScript('https://plausible.io/js/script.js', { defer: 'true', 'data-domain': PLAUSIBLE_DOMAIN });
  window.plausible = window.plausible || ((e) => {});
}

function track(event: string, props?: Record<string, any>) {
  if (GA_ID && window.gtag) {
    window.gtag('event', event, props || {});
  }
  if (PLAUSIBLE_DOMAIN && window.plausible) {
    window.plausible(event, props ? { props } : undefined);
  }
}

function bindClickTracking() {
  document.querySelectorAll<HTMLElement>('[data-analytics]')
    .forEach((el) => {
      el.addEventListener('click', () => {
        const name = el.getAttribute('data-analytics') || 'click_unknown';
        track(name);
      });
    });
}

// Bootstrap on first paint
if (typeof window !== 'undefined') {
  initGA();
  initPlausible();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindClickTracking);
  } else {
    bindClickTracking();
  }
}

export { track };

