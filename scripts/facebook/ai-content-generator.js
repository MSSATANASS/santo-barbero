/**
 * Generador de contenido para posts usando Google Gemini AI
 * Crea posts automáticos creativos y profesionales para tu barbería
 */

import { GoogleGenerativeAI } from '@google/genai';
import { config, validateConfig } from './config.js';
import { publishTextPost, publishPhotoFromUrl } from './facebook-api.js';

let genAI = null;

/**
 * Inicializa el cliente de Gemini
 */
function initializeGemini() {
  if (!genAI && config.gemini.apiKey) {
    genAI = new GoogleGenerativeAI(config.gemini.apiKey);
  }
  return genAI;
}

/**
 * Genera un post creativo usando Gemini AI
 * @param {string} topic - Tema del post (ej: "promoción de corte", "tips de barba")
 * @param {string} style - Estilo del post ("casual", "profesional", "divertido")
 * @returns {Promise<string>} Texto del post generado
 */
export async function generatePost(topic, style = 'profesional') {
  if (!validateConfig(true)) {
    throw new Error('Configuración de Gemini requerida');
  }

  const ai = initializeGemini();
  const model = ai.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
Eres un experto en marketing para barberías premium en Ciudad de México.

Genera un post atractivo para Facebook de "Santo Barbero", una barbería premium.

Tema: ${topic}
Estilo: ${style}
Longitud: 100-150 palabras

Requisitos:
- Incluye emojis relevantes (💈✂️🪒🔥💪)
- Usa hashtags apropiados (#SantoBarbero #Barbería #CDMX)
- Tono: ${style}, auténtico y cercano
- Call to action claro (reservar cita, visitar, etc.)
- Menciona ubicación: Roma Norte, CDMX
- NO uses comillas ni formato especial

Solo devuelve el texto del post, sin explicaciones adicionales.
  `.trim();

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text.trim();
  } catch (error) {
    console.error('❌ Error al generar contenido:', error.message);
    throw error;
  }
}

/**
 * Genera y publica un post automáticamente
 * @param {string} topic - Tema del post
 * @param {string} style - Estilo
 * @param {boolean} publish - Si debe publicarse inmediatamente
 */
export async function generateAndPublish(topic, style = 'profesional', publish = true) {
  console.log(`\n🤖 Generando post sobre: "${topic}"...\n`);

  const postText = await generatePost(topic, style);
  
  console.log('📝 Post generado:\n');
  console.log('─'.repeat(50));
  console.log(postText);
  console.log('─'.repeat(50));

  if (publish) {
    console.log('\n📤 Publicando en Facebook...');
    const result = await publishTextPost(postText);
    console.log(`✅ Publicado con ID: ${result.id}`);
    return { text: postText, result };
  }

  return { text: postText };
}

/**
 * Genera ideas de posts para la semana
 * @returns {Promise<Array>} Lista de ideas
 */
export async function generateWeeklyIdeas() {
  if (!validateConfig(true)) {
    throw new Error('Configuración de Gemini requerida');
  }

  const ai = initializeGemini();
  const model = ai.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
Como experto en marketing para barberías, genera 7 ideas de posts para Facebook (uno por día de la semana) para "Santo Barbero", una barbería premium en CDMX.

Formato para cada idea:
Día X: [Tema] - [Breve descripción]

Incluye variedad: promociones, tips, cultura barbera, datos curiosos, motivación, testimonios, etc.

Solo lista las 7 ideas, sin explicaciones adicionales.
  `.trim();

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    console.log('\n💡 Ideas de posts para la semana:\n');
    console.log(text);
    
    return text;
  } catch (error) {
    console.error('❌ Error al generar ideas:', error.message);
    throw error;
  }
}

/**
 * Plantillas predefinidas de posts
 */
export const templates = {
  promocion: {
    topics: [
      'promoción especial de medio semana',
      'descuento para nuevos clientes',
      'paquete de corte + barba con descuento',
      'promoción de cumpleaños del mes',
    ],
    style: 'profesional',
  },
  tips: {
    topics: [
      'cómo cuidar tu barba en casa',
      'productos esenciales para el cabello masculino',
      'diferencia entre tipos de corte fade',
      'historia de la barbería tradicional',
    ],
    style: 'casual',
  },
  inspiracion: {
    topics: [
      'tendencias de cortes para esta temporada',
      'looks clásicos que nunca pasan de moda',
      'transformación del día - antes y después',
      'el arte del barbero profesional',
    ],
    style: 'profesional',
  },
  humor: {
    topics: [
      'memes de barbería que todos entendemos',
      'frases típicas en la barbería',
      'la relación entre el barbero y su cliente',
    ],
    style: 'divertido',
  },
  motivacion: {
    topics: [
      'empieza la semana con buen look',
      'tu imagen es tu carta de presentación',
      'confianza que se ve y se siente',
    ],
    style: 'profesional',
  },
};

/**
 * Genera un post aleatorio de una categoría
 * @param {string} category - Categoría del template
 */
export async function generateRandomPost(category = null) {
  const categories = category ? [category] : Object.keys(templates);
  const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
  const template = templates[selectedCategory];
  const topic = template.topics[Math.floor(Math.random() * template.topics.length)];

  console.log(`\n🎲 Generando post aleatorio: [${selectedCategory}] ${topic}\n`);

  return generateAndPublish(topic, template.style, false);
}

// Si se ejecuta directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🤖 Generador de contenido con IA

Uso: node ai-content-generator.js <comando> [opciones]

Comandos:
  generate <tema> [estilo]     - Genera un post sobre un tema
  publish <tema> [estilo]      - Genera y publica un post
  random [categoría]           - Genera post aleatorio
  ideas                        - Genera ideas para la semana
  
Estilos disponibles: profesional, casual, divertido

Categorías: promocion, tips, inspiracion, humor, motivacion

Ejemplos:
  node ai-content-generator.js generate "promoción de cortes" profesional
  node ai-content-generator.js publish "tips de cuidado de barba" casual
  node ai-content-generator.js random promocion
  node ai-content-generator.js ideas
    `);
    process.exit(0);
  }

  const command = args[0];

  if (command === 'generate') {
    const topic = args[1] || 'barbería profesional';
    const style = args[2] || 'profesional';
    
    generateAndPublish(topic, style, false)
      .then(({ text }) => console.log('\n✅ Generado exitosamente'))
      .catch(err => console.error('\n❌ Error:', err));

  } else if (command === 'publish') {
    const topic = args[1] || 'barbería profesional';
    const style = args[2] || 'profesional';
    
    generateAndPublish(topic, style, true)
      .then(() => console.log('\n✅ Publicado exitosamente'))
      .catch(err => console.error('\n❌ Error:', err));

  } else if (command === 'random') {
    const category = args[1];
    
    generateRandomPost(category)
      .then(({ text }) => console.log('\n✅ Generado exitosamente\n\n💡 Para publicar, usa: publish'))
      .catch(err => console.error('\n❌ Error:', err));

  } else if (command === 'ideas') {
    generateWeeklyIdeas()
      .then(() => console.log('\n✅ Ideas generadas'))
      .catch(err => console.error('\n❌ Error:', err));

  } else {
    console.error('❌ Comando no reconocido');
    process.exit(1);
  }
}

export default {
  generatePost,
  generateAndPublish,
  generateWeeklyIdeas,
  generateRandomPost,
  templates,
};
