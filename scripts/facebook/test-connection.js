/**
 * Script de prueba para verificar la conexión con Facebook
 */

import { getPageInfo, getRecentPosts } from './facebook-api.js';
import { validateConfig } from './config.js';

async function testConnection() {
  console.log('🔍 Verificando configuración...\n');

  if (!validateConfig()) {
    console.error('\n❌ Configuración inválida. Revisa tu archivo .env\n');
    process.exit(1);
  }

  console.log('✅ Configuración válida\n');
  console.log('📡 Conectando con Facebook...\n');

  try {
    // Obtener información de la página
    const pageInfo = await getPageInfo();
    
    console.log('✅ Conexión exitosa!\n');
    console.log('📄 Información de tu página:');
    console.log('─'.repeat(50));
    console.log(`Nombre: ${pageInfo.name}`);
    console.log(`ID: ${pageInfo.id}`);
    console.log(`Categoría: ${pageInfo.category || 'N/A'}`);
    console.log(`Seguidores: ${pageInfo.fan_count || 'N/A'}`);
    console.log('─'.repeat(50));

    // Obtener posts recientes
    console.log('\n📝 Posts recientes:');
    const posts = await getRecentPosts(5);
    
    if (posts.length === 0) {
      console.log('No hay posts recientes');
    } else {
      posts.forEach((post, i) => {
        console.log(`\n${i + 1}. ID: ${post.id}`);
        if (post.message) {
          const preview = post.message.substring(0, 60);
          console.log(`   ${preview}${post.message.length > 60 ? '...' : ''}`);
        }
      });
    }

    console.log('\n\n✅ TODO FUNCIONA CORRECTAMENTE! 🎉');
    console.log('\n💡 Siguiente paso: Ejecuta uno de estos comandos:');
    console.log('   node ai-content-generator.js generate "tu tema"');
    console.log('   node scheduler.js weekly');
    console.log('   node publish-gallery.js web\n');

  } catch (error) {
    console.error('\n❌ Error de conexión:', error.message);
    console.error('\n💡 Posibles causas:');
    console.error('   - Token de acceso inválido o expirado');
    console.error('   - Page ID incorrecto');
    console.error('   - Faltan permisos en el token');
    console.error('\n📖 Consulta el README.md para más ayuda\n');
    process.exit(1);
  }
}

testConnection();
