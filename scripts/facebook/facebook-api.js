/**
 * Cliente de Facebook Graph API
 * Funciones para publicar contenido en tu página de Facebook
 */

import fetch from 'node-fetch';
import FormData from 'form-data';
import { createReadStream, existsSync } from 'fs';
import { config, buildApiUrl, validateConfig } from './config.js';

/**
 * Publica un post de texto en Facebook
 * @param {string} message - Texto del post
 * @param {object} options - Opciones adicionales (link, published)
 * @returns {Promise<object>} Respuesta de Facebook
 */
export async function publishTextPost(message, options = {}) {
  if (!validateConfig()) {
    throw new Error('Configuración inválida');
  }

  const url = buildApiUrl(`${config.facebook.pageId}/feed`);
  
  const body = {
    message,
    access_token: config.facebook.pageAccessToken,
    ...options,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Facebook API Error: ${data.error.message}`);
    }

    return data;
  } catch (error) {
    console.error('❌ Error al publicar:', error.message);
    throw error;
  }
}

/**
 * Publica una foto con descripción en Facebook
 * @param {string} imagePath - Ruta local de la imagen
 * @param {string} caption - Descripción de la foto
 * @param {boolean} published - Si debe publicarse inmediatamente
 * @returns {Promise<object>} Respuesta de Facebook
 */
export async function publishPhoto(imagePath, caption = '', published = true) {
  if (!validateConfig()) {
    throw new Error('Configuración inválida');
  }

  if (!existsSync(imagePath)) {
    throw new Error(`❌ No se encontró la imagen: ${imagePath}`);
  }

  const url = buildApiUrl(`${config.facebook.pageId}/photos`);
  
  const formData = new FormData();
  formData.append('source', createReadStream(imagePath));
  formData.append('caption', caption);
  formData.append('published', published);
  formData.append('access_token', config.facebook.pageAccessToken);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Facebook API Error: ${data.error.message}`);
    }

    return data;
  } catch (error) {
    console.error('❌ Error al publicar foto:', error.message);
    throw error;
  }
}

/**
 * Publica una foto desde URL
 * @param {string} imageUrl - URL pública de la imagen
 * @param {string} caption - Descripción
 * @returns {Promise<object>} Respuesta de Facebook
 */
export async function publishPhotoFromUrl(imageUrl, caption = '') {
  if (!validateConfig()) {
    throw new Error('Configuración inválida');
  }

  const url = buildApiUrl(`${config.facebook.pageId}/photos`);
  
  const body = {
    url: imageUrl,
    caption,
    access_token: config.facebook.pageAccessToken,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Facebook API Error: ${data.error.message}`);
    }

    return data;
  } catch (error) {
    console.error('❌ Error al publicar foto desde URL:', error.message);
    throw error;
  }
}

/**
 * Publica un post con link (preview card)
 * @param {string} link - URL a compartir
 * @param {string} message - Texto del post
 * @returns {Promise<object>} Respuesta de Facebook
 */
export async function publishLink(link, message = '') {
  return publishTextPost(message, { link });
}

/**
 * Programa un post para publicarse más tarde
 * @param {string} message - Texto del post
 * @param {Date} scheduledTime - Fecha y hora de publicación
 * @returns {Promise<object>} Respuesta de Facebook
 */
export async function schedulePost(message, scheduledTime) {
  const scheduledTimestamp = Math.floor(scheduledTime.getTime() / 1000);
  
  // No puede ser en el pasado ni más de 75 días en el futuro
  const now = Math.floor(Date.now() / 1000);
  const maxFuture = now + (75 * 24 * 60 * 60);
  
  if (scheduledTimestamp <= now) {
    throw new Error('❌ La fecha programada debe ser en el futuro');
  }
  
  if (scheduledTimestamp > maxFuture) {
    throw new Error('❌ No se puede programar más de 75 días en el futuro');
  }

  return publishTextPost(message, {
    published: false,
    scheduled_publish_time: scheduledTimestamp,
  });
}

/**
 * Obtiene información de la página
 * @returns {Promise<object>} Info de la página
 */
export async function getPageInfo() {
  if (!validateConfig()) {
    throw new Error('Configuración inválida');
  }

  const url = buildApiUrl(`${config.facebook.pageId}?fields=name,fan_count,category&access_token=${config.facebook.pageAccessToken}`);
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Facebook API Error: ${data.error.message}`);
    }

    return data;
  } catch (error) {
    console.error('❌ Error al obtener info de página:', error.message);
    throw error;
  }
}

/**
 * Obtiene posts recientes de la página
 * @param {number} limit - Número de posts a obtener
 * @returns {Promise<array>} Lista de posts
 */
export async function getRecentPosts(limit = 10) {
  if (!validateConfig()) {
    throw new Error('Configuración inválida');
  }

  const url = buildApiUrl(`${config.facebook.pageId}/posts?limit=${limit}&access_token=${config.facebook.pageAccessToken}`);
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Facebook API Error: ${data.error.message}`);
    }

    return data.data || [];
  } catch (error) {
    console.error('❌ Error al obtener posts:', error.message);
    throw error;
  }
}

export default {
  publishTextPost,
  publishPhoto,
  publishPhotoFromUrl,
  publishLink,
  schedulePost,
  getPageInfo,
  getRecentPosts,
};
