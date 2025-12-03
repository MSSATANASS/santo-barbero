/**
 * Planificador y scheduler de posts para Facebook
 * Programa publicaciones automáticas en horarios específicos
 */

import { schedulePost, publishTextPost } from './facebook-api.js';
import { generatePost } from './ai-content-generator.js';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SCHEDULE_FILE = join(__dirname, 'schedule.json');

/**
 * Carga el calendario de posts programados
 */
function loadSchedule() {
  if (existsSync(SCHEDULE_FILE)) {
    return JSON.parse(readFileSync(SCHEDULE_FILE, 'utf-8'));
  }
  return { posts: [] };
}

/**
 * Guarda el calendario
 */
function saveSchedule(schedule) {
  writeFileSync(SCHEDULE_FILE, JSON.stringify(schedule, null, 2));
}

/**
 * Añade un post al calendario
 * @param {Date} scheduledTime - Cuándo publicar
 * @param {string} message - Mensaje del post
 * @param {string} type - Tipo: 'manual' o 'ai-generated'
 * @param {object} metadata - Info adicional
 */
export function addToSchedule(scheduledTime, message, type = 'manual', metadata = {}) {
  const schedule = loadSchedule();
  
  const post = {
    id: Date.now().toString(),
    scheduledTime: scheduledTime.toISOString(),
    message,
    type,
    metadata,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  schedule.posts.push(post);
  saveSchedule(schedule);

  console.log(`✅ Post añadido al calendario para: ${scheduledTime.toLocaleString('es-MX')}`);
  return post;
}

/**
 * Lista posts programados
 */
export function listScheduledPosts() {
  const schedule = loadSchedule();
  const pending = schedule.posts.filter(p => p.status === 'pending');

  if (pending.length === 0) {
    console.log('📅 No hay posts programados');
    return [];
  }

  console.log(`\n📅 Posts programados (${pending.length}):\n`);
  
  pending.forEach((post, i) => {
    const date = new Date(post.scheduledTime);
    console.log(`${i + 1}. [${post.id}]`);
    console.log(`   📆 ${date.toLocaleString('es-MX')}`);
    console.log(`   📝 ${post.message.substring(0, 60)}...`);
    console.log(`   🏷️  ${post.type}`);
    console.log('');
  });

  return pending;
}

/**
 * Elimina un post programado
 */
export function cancelScheduledPost(postId) {
  const schedule = loadSchedule();
  const index = schedule.posts.findIndex(p => p.id === postId);

  if (index === -1) {
    console.log('❌ Post no encontrado');
    return false;
  }

  schedule.posts.splice(index, 1);
  saveSchedule(schedule);
  console.log(`✅ Post ${postId} cancelado`);
  return true;
}

/**
 * Procesa y publica posts pendientes
 * (Debe ejecutarse periódicamente, ej: cada hora)
 */
export async function processScheduledPosts() {
  const schedule = loadSchedule();
  const now = new Date();
  const pending = schedule.posts.filter(p => p.status === 'pending');

  console.log(`\n🔄 Verificando posts programados... (${pending.length} pendientes)`);

  for (const post of pending) {
    const scheduledTime = new Date(post.scheduledTime);

    // Si ya es hora de publicar (con 5 min de margen)
    if (scheduledTime <= new Date(now.getTime() + 5 * 60 * 1000)) {
      console.log(`\n📤 Publicando post programado: ${post.id}`);
      
      try {
        const result = await publishTextPost(post.message);
        
        // Marcar como publicado
        post.status = 'published';
        post.publishedAt = new Date().toISOString();
        post.facebookId = result.id;
        
        saveSchedule(schedule);
        
        console.log(`✅ Post publicado: ${result.id}`);
      } catch (error) {
        console.error(`❌ Error al publicar: ${error.message}`);
        
        // Marcar como error
        post.status = 'error';
        post.error = error.message;
        post.errorAt = new Date().toISOString();
        
        saveSchedule(schedule);
      }
    }
  }

  const stillPending = schedule.posts.filter(p => p.status === 'pending').length;
  console.log(`\n✅ Proceso completado. Posts pendientes: ${stillPending}`);
}

/**
 * Crea un plan semanal automático
 * @param {Date} startDate - Fecha de inicio
 * @param {Array} times - Horarios de publicación ['10:00', '18:00']
 */
export async function createWeeklyPlan(startDate = new Date(), times = ['10:00', '18:00']) {
  console.log('\n📅 Creando plan semanal de publicaciones...\n');

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const posts = [];

  // Temas variados para cada día
  const weeklyThemes = [
    { topic: 'inicio de semana - motivación', style: 'profesional' },
    { topic: 'tips de cuidado de barba', style: 'casual' },
    { topic: 'promoción especial de medio semana', style: 'profesional' },
    { topic: 'transformación del día', style: 'inspiracional' },
    { topic: 'preparándote para el fin de semana', style: 'casual' },
    { topic: 'looks para el sábado', style: 'profesional' },
  ];

  for (let day = 0; day < days.length; day++) {
    const theme = weeklyThemes[day];
    
    // Generar contenido con IA
    console.log(`🤖 Generando contenido para ${days[day]}...`);
    const content = await generatePost(theme.topic, theme.style);

    // Calcular fecha y hora
    const postDate = new Date(startDate);
    postDate.setDate(postDate.getDate() + day);
    
    const [hours, minutes] = times[0].split(':');
    postDate.setHours(parseInt(hours), parseInt(minutes), 0);

    // Añadir al calendario
    const post = addToSchedule(postDate, content, 'ai-generated', theme);
    posts.push(post);

    console.log(`✅ ${days[day]} - ${postDate.toLocaleString('es-MX')}\n`);
  }

  console.log(`\n🎉 Plan semanal creado: ${posts.length} posts programados`);
  return posts;
}

/**
 * Horarios óptimos sugeridos para posts de barbería
 */
export const optimalTimes = {
  weekdays: [
    { hour: 8, minute: 0, reason: 'Personas revisando redes antes del trabajo' },
    { hour: 13, minute: 0, reason: 'Hora del almuerzo' },
    { hour: 18, minute: 0, reason: 'Salida del trabajo' },
  ],
  weekends: [
    { hour: 10, minute: 0, reason: 'Mañana relajada del fin de semana' },
    { hour: 14, minute: 0, reason: 'Tarde de sábado/domingo' },
  ],
};

// Si se ejecuta directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
📅 Planificador de posts para Facebook

Uso: node scheduler.js <comando> [opciones]

Comandos:
  add <mensaje> <fecha> <hora>  - Añade un post al calendario
  list                          - Lista posts programados
  cancel <id>                   - Cancela un post programado
  process                       - Procesa y publica posts pendientes
  weekly                        - Crea plan semanal automático
  
Formato de fecha: YYYY-MM-DD (ej: 2024-03-15)
Formato de hora: HH:MM (ej: 10:30)

Ejemplos:
  node scheduler.js add "Nuevo corte disponible! 💈" 2024-03-15 10:00
  node scheduler.js list
  node scheduler.js cancel 1234567890
  node scheduler.js process
  node scheduler.js weekly

💡 Tip: Ejecuta 'process' cada hora con un cron job para publicar automáticamente
    `);
    process.exit(0);
  }

  const command = args[0];

  if (command === 'add') {
    const message = args[1];
    const dateStr = args[2];
    const timeStr = args[3];

    if (!message || !dateStr || !timeStr) {
      console.error('❌ Faltan argumentos: mensaje, fecha y hora requeridos');
      process.exit(1);
    }

    const [year, month, day] = dateStr.split('-').map(Number);
    const [hour, minute] = timeStr.split(':').map(Number);
    
    const scheduledTime = new Date(year, month - 1, day, hour, minute);
    
    addToSchedule(scheduledTime, message);

  } else if (command === 'list') {
    listScheduledPosts();

  } else if (command === 'cancel') {
    const postId = args[1];
    if (!postId) {
      console.error('❌ Falta el ID del post');
      process.exit(1);
    }
    cancelScheduledPost(postId);

  } else if (command === 'process') {
    processScheduledPosts()
      .then(() => console.log('\n✅ Proceso completado'))
      .catch(err => console.error('\n❌ Error:', err));

  } else if (command === 'weekly') {
    const startDate = args[1] ? new Date(args[1]) : new Date();
    createWeeklyPlan(startDate)
      .then(() => console.log('\n✅ Plan semanal creado'))
      .catch(err => console.error('\n❌ Error:', err));

  } else {
    console.error('❌ Comando no reconocido');
    process.exit(1);
  }
}

export default {
  addToSchedule,
  listScheduledPosts,
  cancelScheduledPost,
  processScheduledPosts,
  createWeeklyPlan,
  optimalTimes,
};
