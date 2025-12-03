<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🪒 Santo Barbero - Barbería Premium

Sistema completo para barbería con web app PWA + automatización de redes sociales.

View your app in AI Studio: https://ai.studio/apps/drive/10ktyFnxEun4sHXsStqHlgonAN-L1QLuS

## 🚀 Nuevas Funcionalidades

### 📱 Automatización de Facebook
Sistema completo de publicación automática en Facebook con IA:
- ✅ Publicación automática de posts, fotos y enlaces
- ✅ Generación de contenido con Google Gemini AI
- ✅ Programación de posts en horarios específicos
- ✅ Plan semanal automático de contenido
- ✅ Dashboard de estadísticas

**[📖 Ver documentación completa →](scripts/facebook/README.md)**

#### Inicio rápido:
```powershell
# 1. Instalar dependencias
npm run fb:setup

# 2. Configurar credenciales (copia .env.example a .env)
cd scripts/facebook
notepad .env

# 3. Probar conexión
npm run fb:test

# 4. Crear plan semanal automático
npm run fb:schedule weekly
```

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy with Dockploy

1. Build the Docker image locally (optional sanity check):
   `docker build -t santo-barbero .`
2. Run it:
   `docker run -p 4173:80 -e VITE_GA_ID=G-XXXX -e VITE_PLAUSIBLE_DOMAIN=tu-dominio.com santo-barbero`
3. In Dockploy o Traefik, define `TRAEFIK_HOST` (tu dominio) si enrutarás con reverse proxy.
4. En Dockploy, selecciona "Deploy Dockerfile", apunta a `/Dockerfile`, y pasa tus variables (`GEMINI_API_KEY`, `VITE_GA_ID`, `VITE_PLAUSIBLE_DOMAIN`, `TRAEFIK_HOST`).

## Despliegue web estándar

1. Copia `.env.local.example` (o crea el archivo) y define tus secretos:
   ```bash
   echo "GEMINI_API_KEY=tu_api_key" > .env.local
   echo "VITE_GA_ID=G-XXXX" >> .env.local
   echo "VITE_PLAUSIBLE_DOMAIN=tu-dominio.com" >> .env.local
   ```
2. Genera los artefactos de producción:
   ```bash
   npm run build
   ```
3. Valida el resultado antes de subirlo:
   ```bash
   npm run preview
   ```
4. Sube el contenido de `dist/` a tu hosting estático favorito (Netlify, Vercel, S3 + CloudFront, Cloudflare Pages). Cualquier servidor HTTP que sirva archivos estáticos funcionará.
5. Si necesitas un servidor propio, ejecuta el contenedor publicado en `Dockerfile` o usa `docker-compose up --build` para tener Nginx + la app empaquetada.

## App móvil (iOS + Android)

La web es 100 % responsive, así que puedes reutilizarla dentro de un contenedor nativo usando [Capacitor](https://capacitorjs.com/).

### Dependencias iniciales

```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npx cap init "Santo Barbero" com.santobarbero.app --web-dir=dist
```

### Flujo de build y sincronización

1. Compila la web: `npm run build`.
2. Copia los artefactos al contenedor nativo: `npx cap sync`.
3. Añade plataformas si aún no existen: `npx cap add ios`, `npx cap add android`.
4. Abre cada proyecto:
   - iOS: `npx cap open ios` y ejecuta desde Xcode (configura tu team ID y provisioning profile).
   - Android: `npx cap open android` y construye el `.aab` desde Android Studio.
5. Repite `npm run build && npx cap copy` cuando hagas cambios en la UI web.

### Checklist para publicar

- Actualiza `public/manifest.json` e íconos/splash en `public/` para que coincidan con la marca en iOS/Android.
- En iOS, ajusta `Info.plist` (permisos de cámara/micrófono si el chatbot los necesita).
- En Android, revisa `android/app/src/main/AndroidManifest.xml` y agrega los `queries` o permisos necesarios.
- Firma los binarios (Xcode `Archive` + `Distribute App`, Android Studio `Generate Signed Bundle`) y súbelos a App Store Connect y Google Play Console.
