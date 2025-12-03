/**
 * Configuración para Facebook Graph API
 * Carga las credenciales desde variables de entorno
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config as dotenvConfig } from 'dotenv';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar .env desde el directorio de scripts
const envPath = join(__dirname, '.env');
if (existsSync(envPath)) {
  dotenvConfig({ path: envPath });
}

export const config = {
  facebook: {
    pageAccessToken: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
    pageId: process.env.FACEBOOK_PAGE_ID,
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
  },
  apiVersion: 'v18.0', // Versión de Graph API
  baseUrl: 'https://graph.facebook.com',
};

/**
 * Valida que las credenciales necesarias estén configuradas
 */
export function validateConfig(requireGemini = false) {
  const errors = [];

  if (!config.facebook.pageAccessToken) {
    errors.push('❌ FACEBOOK_PAGE_ACCESS_TOKEN no configurado');
  }

  if (!config.facebook.pageId) {
    errors.push('❌ FACEBOOK_PAGE_ID no configurado');
  }

  if (requireGemini && !config.gemini.apiKey) {
    errors.push('❌ GEMINI_API_KEY no configurado');
  }

  if (errors.length > 0) {
    console.error('\n⚠️  Errores de configuración:\n');
    errors.forEach(err => console.error(err));
    console.error('\n💡 Copia .env.example a .env y configura tus credenciales\n');
    return false;
  }

  return true;
}

/**
 * Construye la URL de la API de Facebook
 */
export function buildApiUrl(endpoint) {
  return `${config.baseUrl}/${config.apiVersion}/${endpoint}`;
}

export default config;
