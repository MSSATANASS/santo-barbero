/**
 * Dashboard simple para ver estadísticas de tu página
 */

import { getPageInfo, getRecentPosts } from './facebook-api.js';
import { validateConfig } from './config.js';
import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SCHEDULE_FILE = join(__dirname, 'schedule.json');

async function showDashboard() {
  console.clear();
  console.log('═'.repeat(60));
  console.log('📊 SANTO BARBERO - FACEBOOK DASHBOARD');
  console.log('═'.repeat(60));
  console.log('');

  if (!validateConfig()) {
    console.error('❌ Configuración inválida\n');
    return;
  }

  try {
    // Info de la página
    console.log('📄 INFORMACIÓN DE LA PÁGINA');
    console.log('─'.repeat(60));
    
    const pageInfo = await getPageInfo();
    console.log(`Nombre: ${pageInfo.name}`);
    console.log(`Seguidores: ${pageInfo.fan_count || 'N/A'}`);
    console.log(`Categoría: ${pageInfo.category || 'N/A'}`);
    console.log('');

    // Posts recientes
    console.log('📝 ÚLTIMOS 5 POSTS');
    console.log('─'.repeat(60));
    
    const posts = await getRecentPosts(5);
    
    if (posts.length === 0) {
      console.log('No hay posts recientes');
    } else {
      posts.forEach((post, i) => {
        const date = post.created_time ? new Date(post.created_time).toLocaleDateString('es-MX') : 'N/A';
        console.log(`\n${i + 1}. [${date}]`);
        if (post.message) {
          const preview = post.message.substring(0, 80).replace(/\n/g, ' ');
          console.log(`   ${preview}${post.message.length > 80 ? '...' : ''}`);
        }
        console.log(`   ID: ${post.id}`);
      });
    }
    console.log('');

    // Posts programados
    console.log('📅 POSTS PROGRAMADOS');
    console.log('─'.repeat(60));
    
    if (existsSync(SCHEDULE_FILE)) {
      const schedule = JSON.parse(readFileSync(SCHEDULE_FILE, 'utf-8'));
      const pending = schedule.posts.filter(p => p.status === 'pending');
      const published = schedule.posts.filter(p => p.status === 'published');
      
      console.log(`Pendientes: ${pending.length}`);
      console.log(`Publicados: ${published.length}`);
      
      if (pending.length > 0) {
        console.log('\nPróximos 3 posts:');
        pending.slice(0, 3).forEach((post, i) => {
          const date = new Date(post.scheduledTime).toLocaleString('es-MX');
          const preview = post.message.substring(0, 60).replace(/\n/g, ' ');
          console.log(`\n${i + 1}. ${date}`);
          console.log(`   ${preview}...`);
        });
      }
    } else {
      console.log('No hay posts programados');
    }
    console.log('');

    // Estadísticas
    console.log('📈 ESTADÍSTICAS ESTA SEMANA');
    console.log('─'.repeat(60));
    
    if (existsSync(SCHEDULE_FILE)) {
      const schedule = JSON.parse(readFileSync(SCHEDULE_FILE, 'utf-8'));
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      
      const publishedThisWeek = schedule.posts.filter(p => 
        p.status === 'published' && 
        new Date(p.publishedAt) >= oneWeekAgo
      );
      
      console.log(`Posts publicados: ${publishedThisWeek.length}`);
      console.log(`Posts con IA: ${publishedThisWeek.filter(p => p.type === 'ai-generated').length}`);
      console.log(`Posts manuales: ${publishedThisWeek.filter(p => p.type === 'manual').length}`);
    } else {
      console.log('Sin datos de estadísticas locales');
    }
    console.log('');

    // Consejos
    console.log('💡 ACCIONES RÁPIDAS');
    console.log('─'.repeat(60));
    console.log('1. Crear plan semanal:  node scheduler.js weekly');
    console.log('2. Post con IA:         node ai-content-generator.js publish "tema"');
    console.log('3. Publicar fotos:      node publish-gallery.js web');
    console.log('4. Ver programados:     node scheduler.js list');
    console.log('');
    console.log('═'.repeat(60));

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

showDashboard();
