/**
 * Script para publicar galerías de fotos en Facebook
 * Ideal para mostrar trabajos realizados (antes/después)
 */

import { publishPhoto, publishPhotoFromUrl } from './facebook-api.js';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * Publica múltiples fotos de una carpeta
 * @param {string} folderPath - Ruta de la carpeta con imágenes
 * @param {string} baseCaption - Texto base para todas las fotos
 * @param {number} delayMs - Delay entre publicaciones (ms)
 */
export async function publishPhotoGallery(folderPath, baseCaption = '', delayMs = 5000) {
  console.log(`\n📸 Publicando galería desde: ${folderPath}\n`);

  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const files = readdirSync(folderPath)
    .filter(file => {
      const ext = file.toLowerCase().substring(file.lastIndexOf('.'));
      return validExtensions.includes(ext);
    })
    .map(file => join(folderPath, file));

  if (files.length === 0) {
    console.log('❌ No se encontraron imágenes en la carpeta');
    return [];
  }

  console.log(`✅ Encontradas ${files.length} imágenes\n`);

  const results = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = file.split(/[\\/]/).pop();
    const caption = `${baseCaption}\n\n#SantoBarbero #Barbería #CDMX 💈✂️`;

    try {
      console.log(`📤 [${i + 1}/${files.length}] Publicando: ${fileName}`);
      const result = await publishPhoto(file, caption);
      
      console.log(`✅ Publicado con ID: ${result.id}`);
      results.push({ success: true, file: fileName, id: result.id });

      // Delay entre publicaciones para no saturar la API
      if (i < files.length - 1) {
        console.log(`⏳ Esperando ${delayMs / 1000}s antes de la siguiente...\n`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    } catch (error) {
      console.error(`❌ Error con ${fileName}: ${error.message}\n`);
      results.push({ success: false, file: fileName, error: error.message });
    }
  }

  console.log('\n📊 Resumen:');
  console.log(`✅ Exitosas: ${results.filter(r => r.success).length}`);
  console.log(`❌ Fallidas: ${results.filter(r => !r.success).length}`);

  return results;
}

/**
 * Publica fotos desde URLs (de tu web, por ejemplo)
 * @param {Array<{url: string, caption: string}>} photos - Array de fotos
 * @param {number} delayMs - Delay entre publicaciones
 */
export async function publishPhotosFromUrls(photos, delayMs = 5000) {
  console.log(`\n📸 Publicando ${photos.length} fotos desde URLs\n`);

  const results = [];

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];

    try {
      console.log(`📤 [${i + 1}/${photos.length}] Publicando desde: ${photo.url}`);
      const result = await publishPhotoFromUrl(photo.url, photo.caption);
      
      console.log(`✅ Publicado con ID: ${result.id}`);
      results.push({ success: true, url: photo.url, id: result.id });

      if (i < photos.length - 1) {
        console.log(`⏳ Esperando ${delayMs / 1000}s...\n`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    } catch (error) {
      console.error(`❌ Error: ${error.message}\n`);
      results.push({ success: false, url: photo.url, error: error.message });
    }
  }

  console.log('\n📊 Resumen:');
  console.log(`✅ Exitosas: ${results.filter(r => r.success).length}`);
  console.log(`❌ Fallidas: ${results.filter(r => !r.success).length}`);

  return results;
}

/**
 * Ejemplo: Publica las fotos de la galería de tu web
 */
export async function publishWebGalleryPhotos() {
  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200',
      caption: '💈 Corte clásico con estilo moderno\n\nNuestros barberos expertos transforman tu look con precisión y arte.\n\n📅 Reserva tu cita\n📍 Roma Norte, CDMX\n\n#SantoBarbero #Barbería #MensGrooming #CDMX #BarberLife',
    },
    {
      url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200',
      caption: '✂️ El arte del corte perfecto\n\nCada detalle cuenta. Cada corte es una obra maestra.\n\n🔥 ¡Reserva ahora!\n\n#Barbershop #HairStyle #MensHair #BarberShopConnect',
    },
    {
      url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200',
      caption: '🪒 Afeitado tradicional de lujo\n\nExperimenta el ritual del afeitado con navaja. Tradición y precisión en cada pasada.\n\n#TraditionalShave #BarberCulture #GentlemenStyle',
    },
  ];

  return publishPhotosFromUrls(photos);
}

// Si se ejecuta directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
📸 Uso: node publish-gallery.js <comando> [opciones]

Comandos:
  folder <ruta> [caption]  - Publica fotos de una carpeta local
  web                      - Publica las fotos de la galería web
  
Ejemplos:
  node publish-gallery.js folder ./fotos-trabajos "Nuevos cortes de la semana"
  node publish-gallery.js web
    `);
    process.exit(0);
  }

  const command = args[0];

  if (command === 'folder') {
    const folderPath = args[1];
    const caption = args[2] || 'Santo Barbero - Trabajo del día';
    
    publishPhotoGallery(folderPath, caption)
      .then(() => console.log('\n✅ Proceso completado'))
      .catch(err => console.error('\n❌ Error:', err));
  } else if (command === 'web') {
    publishWebGalleryPhotos()
      .then(() => console.log('\n✅ Proceso completado'))
      .catch(err => console.error('\n❌ Error:', err));
  } else {
    console.error('❌ Comando no reconocido');
    process.exit(1);
  }
}

export default {
  publishPhotoGallery,
  publishPhotosFromUrls,
  publishWebGalleryPhotos,
};
