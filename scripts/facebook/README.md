# 🚀 Automatización de Facebook para Santo Barbero

Sistema completo de **publicación automática** para tu página de Facebook usando Graph API y Google Gemini AI.

## 📋 Tabla de Contenido

- [Características](#-características)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Configuración de Facebook](#-configuración-de-facebook)
- [Uso](#-uso)
- [Scripts Disponibles](#-scripts-disponibles)
- [Automatización con Cron](#-automatización-con-cron)
- [Ejemplos Prácticos](#-ejemplos-prácticos)
- [Solución de Problemas](#-solución-de-problemas)

---

## ✨ Características

✅ **Publicación automática** de texto, fotos y enlaces  
✅ **Generación de contenido con IA** (Google Gemini)  
✅ **Programación de posts** para publicar en horarios específicos  
✅ **Publicación masiva** de galerías de fotos  
✅ **Plan semanal automático** de contenido variado  
✅ **Plantillas predefinidas** por categorías

---

## 📦 Requisitos

- **Node.js** 18+ ([Descargar](https://nodejs.org/))
- Una **Página de Facebook** (no perfil personal)
- Cuenta de **Facebook Developer** (gratis)
- **Google Gemini API Key** (opcional, para generación con IA)

---

## 🔧 Instalación

### 1. Instalar dependencias

```powershell
cd scripts/facebook
npm install node-fetch form-data @google/genai dotenv
```

### 2. Configurar credenciales

```powershell
# Copia el archivo de ejemplo
Copy-Item .env.example .env

# Edita .env con tus credenciales
notepad .env
```

---

## 🔑 Configuración de Facebook

### Paso 1: Crear una App de Facebook

1. Ve a [Facebook Developers](https://developers.facebook.com/apps/)
2. Clic en **"Crear app"**
3. Selecciona **"Empresa"** como tipo de app
4. Completa los datos básicos

### Paso 2: Obtener Page Access Token

1. Ve a [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. En el menú superior, selecciona tu app
3. Clic en **"Obtener token" → "Obtener token de página"**
4. Selecciona tu página de Facebook
5. Marca los permisos:
   - `pages_manage_posts`
   - `pages_read_engagement`
   - `pages_show_list`
6. Clic en **"Generar token de acceso"**
7. Copia el token (empieza con `EAA...`)

### Paso 3: Obtener Page ID

**Opción A - Desde la configuración de la página:**
1. Ve a tu página de Facebook
2. Configuración → Acerca de
3. Copia el **ID de página**

**Opción B - Desde Graph API Explorer:**
1. En Graph API Explorer, escribe: `me?fields=id,name`
2. Clic en **"Enviar"**
3. Verás tu Page ID en la respuesta

### Paso 4: (Opcional) Token de larga duración

Los tokens expiran en 1 hora. Para obtener uno de 60 días:

```powershell
# Reemplaza los valores
$APP_ID = "tu_app_id"
$APP_SECRET = "tu_app_secret"
$SHORT_TOKEN = "tu_token_corto"

# Ejecuta
curl "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=$APP_ID&client_secret=$APP_SECRET&fb_exchange_token=$SHORT_TOKEN"
```

Copia el nuevo `access_token` de la respuesta.

### Paso 5: Configurar `.env`

Edita `scripts/facebook/.env`:

```env
FACEBOOK_PAGE_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxx
FACEBOOK_PAGE_ID=123456789012345
FACEBOOK_APP_ID=987654321
FACEBOOK_APP_SECRET=abcdef1234567890
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXX
```

---

## 🎯 Uso

### Publicar un post simple

```powershell
node facebook-api.js "¡Nuevo corte disponible! 💈✂️ Reserva tu cita"
```

### Generar contenido con IA

```powershell
# Solo generar (sin publicar)
node ai-content-generator.js generate "promoción de cortes"

# Generar y publicar
node ai-content-generator.js publish "tips de cuidado de barba" casual

# Post aleatorio
node ai-content-generator.js random promocion

# Ideas para la semana
node ai-content-generator.js ideas
```

### Publicar fotos

```powershell
# Foto desde carpeta local
node publish-gallery.js folder "./fotos-trabajos" "Trabajo del día 💈"

# Fotos de la galería web
node publish-gallery.js web
```

### Programar posts

```powershell
# Añadir al calendario
node scheduler.js add "Post programado" 2024-12-25 10:00

# Ver posts programados
node scheduler.js list

# Crear plan semanal automático
node scheduler.js weekly

# Procesar posts pendientes (ejecutar cada hora)
node scheduler.js process
```

---

## 📜 Scripts Disponibles

### 1. `config.js`
Configuración central de credenciales y validación.

### 2. `facebook-api.js`
API wrapper para Facebook Graph API.

**Funciones principales:**
- `publishTextPost(message)` - Publica texto
- `publishPhoto(imagePath, caption)` - Publica foto local
- `publishPhotoFromUrl(url, caption)` - Publica foto desde URL
- `publishLink(url, message)` - Comparte enlace
- `schedulePost(message, date)` - Programa post
- `getPageInfo()` - Info de la página
- `getRecentPosts(limit)` - Posts recientes

### 3. `publish-gallery.js`
Publicación masiva de fotos.

```powershell
# Desde carpeta
node publish-gallery.js folder "C:\fotos" "Descripción"

# Desde URLs
node publish-gallery.js web
```

### 4. `ai-content-generator.js`
Generación de contenido con Gemini AI.

**Categorías disponibles:**
- `promocion` - Ofertas y descuentos
- `tips` - Consejos y educación
- `inspiracion` - Tendencias y transformaciones
- `humor` - Memes y contenido ligero
- `motivacion` - Frases inspiradoras

**Estilos:**
- `profesional` - Tono serio y elegante
- `casual` - Amigable y cercano
- `divertido` - Humor y emojis

### 5. `scheduler.js`
Planificador y calendario de posts.

**Horarios óptimos:**
- Lunes-Viernes: 8:00, 13:00, 18:00
- Fines de semana: 10:00, 14:00

---

## ⏰ Automatización con Cron

### Windows (Task Scheduler)

1. Abre **Programador de tareas**
2. Clic derecho → **Crear tarea básica**
3. Nombre: "Facebook Auto Post"
4. Desencadenador: **Diariamente** a las 9:00
5. Acción: **Iniciar un programa**
6. Programa: `C:\Program Files\nodejs\node.exe`
7. Argumentos: `C:\ruta\a\scripts\facebook\scheduler.js process`

### Ejemplo con PowerShell (ejecutar cada hora)

```powershell
# Crear script
@"
cd "C:\Users\sr_hy\OneDrive\Escritorio\santo-barbero\scripts\facebook"
node scheduler.js process
"@ | Out-File -FilePath "$env:USERPROFILE\facebook-cron.ps1"

# Programar tarea
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-File $env:USERPROFILE\facebook-cron.ps1"
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Hours 1)
Register-ScheduledTask -Action $action -Trigger $trigger -TaskName "FacebookScheduler" -Description "Procesa posts programados"
```

---

## 💡 Ejemplos Prácticos

### Caso 1: Plan de contenido semanal

```powershell
# Lunes: Genera plan semanal con IA
node scheduler.js weekly

# Resultado: 6-7 posts programados automáticamente
# - Lunes 8:00: Motivación inicio de semana
# - Martes 18:00: Tips de cuidado
# - Miércoles 13:00: Promoción especial
# - ...
```

### Caso 2: Publicar galería de trabajos del día

```powershell
# 1. Guarda fotos en carpeta
mkdir trabajos-hoy

# 2. Publica todas
node publish-gallery.js folder "./trabajos-hoy" "Transformaciones de hoy 💈✨ #SantoBarbero"
```

### Caso 3: Post con promoción

```powershell
# Generar post de promoción
node ai-content-generator.js publish "promoción 2x1 en cortes esta semana" profesional

# Resultado automático:
# "🔥 ¡PROMOCIÓN ESPECIAL! 🔥
# 
# Esta semana en Santo Barbero...
# [contenido generado por IA]
# 
# 📅 Reserva: [enlace]
# 📍 Roma Norte, CDMX
# 
# #SantoBarbero #Barbería #CDMX 💈"
```

### Caso 4: Recordatorio de cita

```powershell
# Programar recordatorio para mañana a las 9am
$fecha = (Get-Date).AddDays(1).ToString("yyyy-MM-dd")
node scheduler.js add "🔔 Recuerda! Aún hay espacios disponibles para hoy. Reserva tu corte 💈✂️" $fecha "09:00"
```

---

## 🐛 Solución de Problemas

### Error: "Invalid OAuth access token"

**Causa:** Token expirado o inválido  
**Solución:** Genera un nuevo token en Graph API Explorer

### Error: "(#200) Permissions error"

**Causa:** Faltan permisos en el token  
**Solución:** Regenera el token con los permisos:
- `pages_manage_posts`
- `pages_read_engagement`

### Error: "Cannot find module 'node-fetch'"

**Causa:** Dependencias no instaladas  
**Solución:**
```powershell
cd scripts/facebook
npm install node-fetch form-data @google/genai dotenv
```

### Error: "GEMINI_API_KEY not configured"

**Causa:** No configuraste Gemini (solo para generación con IA)  
**Solución:** 
1. Obtén API key en [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Añádela al archivo `.env`

### Posts no se publican automáticamente

**Causa:** No estás ejecutando el scheduler  
**Solución:** Crea tarea programada que ejecute:
```powershell
node scheduler.js process
```
Cada hora o cada 30 minutos.

---

## 🎨 Personalización

### Modificar plantillas de contenido

Edita `ai-content-generator.js`:

```javascript
export const templates = {
  miCategoria: {
    topics: [
      'tema 1',
      'tema 2',
    ],
    style: 'casual',
  },
};
```

### Cambiar hashtags predeterminados

En `publish-gallery.js`, línea ~31:

```javascript
const caption = `${baseCaption}\n\n#TusHashtags #Personalizados`;
```

---

## 🚀 Próximos Pasos

1. **Configura tus credenciales** en `.env`
2. **Prueba con un post simple** para validar la conexión
3. **Genera contenido con IA** para ver la calidad
4. **Crea tu plan semanal** con `scheduler.js weekly`
5. **Automatiza** con Task Scheduler

---

## 📞 Soporte

Si tienes problemas:

1. Verifica que `.env` tenga todos los valores
2. Confirma que tu token tenga los permisos correctos
3. Revisa que la Page ID sea correcta
4. Prueba en Graph API Explorer manualmente

---

## 📄 Licencia

Proyecto desarrollado para Santo Barbero. Uso exclusivo interno.

---

**¡Listo para automatizar tu marketing en Facebook! 🚀💈**
