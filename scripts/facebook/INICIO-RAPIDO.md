# 🚀 GUÍA RÁPIDA DE INICIO

## 📦 Paso 1: Instalar dependencias

```powershell
cd scripts\facebook
npm install
```

## 🔑 Paso 2: Configurar credenciales

```powershell
# Copiar archivo de ejemplo
Copy-Item .env.example .env

# Editar con tus credenciales
notepad .env
```

**Necesitas:**
- `FACEBOOK_PAGE_ACCESS_TOKEN` - [Obtener aquí](https://developers.facebook.com/tools/explorer/)
- `FACEBOOK_PAGE_ID` - ID de tu página
- `GEMINI_API_KEY` - [Obtener aquí](https://makersuite.google.com/app/apikey)

## ✅ Paso 3: Probar conexión

```powershell
npm run test
```

Si todo está bien, verás:
```
✅ Conexión exitosa!
📄 Información de tu página:
Nombre: Santo Barbero
...
```

## 🎯 Paso 4: Publicar tu primer post

### Opción A: Post simple
```powershell
node facebook-api.js "¡Hola desde Santo Barbero! 💈"
```

### Opción B: Post con IA
```powershell
node ai-content-generator.js publish "promoción de cortes"
```

### Opción C: Publicar foto
```powershell
node publish-gallery.js web
```

## 📅 Paso 5: Crear plan semanal automático

```powershell
node scheduler.js weekly
```

Esto creará **6-7 posts programados** para la semana con contenido generado por IA.

## ⏰ Paso 6: Automatizar publicaciones

### En Windows (Programador de tareas):

1. Abre **Programador de tareas**
2. Crear tarea básica → "Facebook Scheduler"
3. Ejecutar: `node.exe`
4. Argumentos: `C:\ruta\scripts\facebook\scheduler.js process`
5. Repetir: Cada 1 hora

---

## 📚 Comandos más usados

```powershell
# Generar contenido con IA
node ai-content-generator.js generate "tips de barba"

# Publicar inmediatamente
node ai-content-generator.js publish "nuevo corte disponible"

# Ver posts programados
node scheduler.js list

# Crear plan semanal
node scheduler.js weekly

# Publicar galería de fotos
node publish-gallery.js folder "C:\fotos"
```

---

## ❓ Problemas comunes

**Error: Invalid token**
→ Regenera tu token en [Graph API Explorer](https://developers.facebook.com/tools/explorer/)

**Error: Cannot find module**
→ Ejecuta `npm install` en la carpeta `scripts/facebook`

**Posts no se publican automáticamente**
→ Crea una tarea programada que ejecute `scheduler.js process` cada hora

---

## 📖 Documentación completa

Lee `README.md` para instrucciones detalladas.

---

¡Listo para automatizar tu Facebook! 🎉
