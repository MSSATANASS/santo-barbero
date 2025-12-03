# 📁 Estructura del Sistema de Automatización

```
scripts/facebook/
│
├── 📄 README.md                    → Documentación completa y detallada
├── 📄 INICIO-RAPIDO.md             → Guía de inicio para principiantes
├── 📄 PLANTILLAS-POSTS.md          → +30 plantillas listas para usar
├── 📄 EJEMPLOS-COMANDOS.txt        → Comandos de ejemplo copy-paste
│
├── ⚙️  setup.ps1                    → Script automático de configuración
├── 🔧 package.json                 → Dependencias del proyecto
├── 🔐 .env.example                 → Plantilla de configuración
├── 🚫 .gitignore                   → Archivos a ignorar en Git
│
├── 🔑 config.js                    → Configuración y credenciales
├── 🌐 facebook-api.js              → Cliente de Facebook Graph API
│
├── 🤖 ai-content-generator.js      → Generación con Gemini AI
│   ├── Categorías: promocion, tips, inspiracion, humor, motivacion
│   ├── Estilos: profesional, casual, divertido
│   └── Comandos: generate, publish, random, ideas
│
├── 📸 publish-gallery.js           → Publicación masiva de fotos
│   ├── Desde carpeta local
│   ├── Desde URLs
│   └── Galería web automática
│
├── 📅 scheduler.js                 → Programador de posts
│   ├── Añadir posts al calendario
│   ├── Procesar posts pendientes
│   ├── Plan semanal automático
│   └── Horarios óptimos sugeridos
│
├── 📊 dashboard.js                 → Panel de estadísticas
│   ├── Info de página
│   ├── Posts recientes
│   ├── Posts programados
│   └── Estadísticas semanales
│
└── ✅ test-connection.js           → Verificar conexión con Facebook

```

## 🎯 Flujo de Trabajo Típico

```
1. CONFIGURACIÓN INICIAL (solo una vez)
   └─> setup.ps1
       └─> Instala dependencias
       └─> Crea .env
       └─> Verifica conexión

2. USO DIARIO
   └─> dashboard.js → Ver estadísticas
   └─> ai-content-generator.js → Crear post
   └─> scheduler.js → Programar publicación

3. AUTOMATIZACIÓN SEMANAL
   └─> scheduler.js weekly → Plan semanal completo
   └─> Task Scheduler → Publica automáticamente
```

## 🚀 Comandos Más Usados

```powershell
# Setup inicial
npm run fb:setup

# Verificar conexión
npm run fb:test

# Generar post con IA
node ai-content-generator.js publish "tema del post" profesional

# Plan semanal automático
node scheduler.js weekly

# Publicar fotos
node publish-gallery.js web

# Ver estadísticas
node dashboard.js

# Procesar posts programados
node scheduler.js process
```

## 📦 Dependencias

```json
{
  "node-fetch": "^3.3.2",      // Peticiones HTTP
  "form-data": "^4.0.0",       // Upload de archivos
  "@google/genai": "^1.29.0",  // Google Gemini AI
  "dotenv": "^16.3.1"          // Variables de entorno
}
```

## 🔐 Variables de Entorno Requeridas

```env
FACEBOOK_PAGE_ACCESS_TOKEN   → Token de Facebook Graph API
FACEBOOK_PAGE_ID             → ID de tu página
FACEBOOK_APP_ID              → (Opcional) Para tokens largos
FACEBOOK_APP_SECRET          → (Opcional) Para tokens largos
GEMINI_API_KEY               → Para generación con IA
```

## 📊 Archivos Generados en Uso

```
schedule.json    → Calendario de posts programados (auto-generado)
.env             → Tus credenciales (nunca commitear!)
node_modules/    → Dependencias instaladas
```

## 🎨 Capacidades del Sistema

### 📝 Publicación
- ✅ Posts de texto
- ✅ Posts con fotos
- ✅ Posts con enlaces (link preview)
- ✅ Múltiples fotos (galería)
- ✅ Publicación desde carpeta local
- ✅ Publicación desde URLs

### 🤖 IA (Gemini)
- ✅ Generación de contenido creativo
- ✅ Múltiples estilos y tonos
- ✅ Plantillas por categorías
- ✅ Posts aleatorios
- ✅ Ideas semanales

### ⏰ Programación
- ✅ Programar posts individuales
- ✅ Plan semanal automático
- ✅ Horarios óptimos sugeridos
- ✅ Procesamiento automático
- ✅ Historial de publicaciones

### 📈 Analytics
- ✅ Info de página (seguidores, categoría)
- ✅ Posts recientes
- ✅ Posts programados pendientes
- ✅ Estadísticas semanales
- ✅ Dashboard visual

## 🎯 Casos de Uso

### Para Dueño/Manager
```powershell
# Lunes: Crea plan para la semana
node scheduler.js weekly

# Revisa dashboard diario
node dashboard.js

# Sistema publica automáticamente
# (configurado con Task Scheduler)
```

### Para Barbero
```powershell
# Publica foto de trabajo del día
node publish-gallery.js folder "./fotos-hoy" "Trabajo del día 💈"

# Post rápido de promoción
node ai-content-generator.js publish "promo del día"
```

### Para Marketing
```powershell
# Genera ideas de contenido
node ai-content-generator.js ideas

# Programa campaña semanal
node scheduler.js add "Post 1" 2024-12-18 10:00
node scheduler.js add "Post 2" 2024-12-19 14:00
# ...
```

## 🔄 Mantenimiento

### Tareas Automáticas
1. **Procesador de posts** (cada hora)
   ```powershell
   node scheduler.js process
   ```

2. **Backup de calendario** (diario)
   ```powershell
   Copy-Item schedule.json schedule.backup.json
   ```

3. **Renovar token** (cada 60 días)
   - Genera nuevo token en Graph API Explorer
   - Actualiza .env

### Troubleshooting Rápido

| Error | Solución |
|-------|----------|
| Invalid OAuth token | Regenera token en Facebook Developers |
| Module not found | `npm install` en carpeta facebook/ |
| GEMINI_API_KEY not configured | Añade key en .env |
| Posts no se publican auto | Configura Task Scheduler |

## 📚 Recursos Útiles

- [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- [Google AI Studio](https://makersuite.google.com/app/apikey)
- [Facebook Developers](https://developers.facebook.com/)
- [Node.js](https://nodejs.org/)

---

**🎉 Sistema completo y listo para usar!**

Comienza con: `.\setup.ps1`
