# 🪒 Santo Barbero - Barbería Premium

![Santo Barbero](./logo.png)

## 📱 Progressive Web App (PWA) para Barbería

Una aplicación web moderna y profesional diseñada específicamente para barberías, con capacidad de instalarse como app móvil.

## ✨ Características Principales

### 🎨 Diseño Premium
- **Interfaz moderna y elegante** con colores dorado/marrón que reflejan lujo y tradición
- **Imágenes profesionales** reales de barbería de alta calidad
- **Animaciones suaves** y transiciones profesionales
- **100% Responsive** - perfecta en móvil, tablet y desktop

### 📅 Sistema de Reservas Inteligente
- Formulario completo de reservas con validación
- Selección de fecha y hora
- Elección de servicio y barbero preferido
- Confirmación visual inmediata
- Preparado para integrar con WhatsApp o SMS

### 🔧 Funcionalidades

1. **Hero Section** - Landing impactante con imagen de fondo profesional
2. **Servicios** - 3 paquetes principales + servicios adicionales con iconos
3. **Galería** - Imágenes profesionales con modal de ampliación
4. **Equipo** - Perfiles de barberos con experiencia y especialidades
5. **Contacto** - Mapa integrado + botón de llamada + formulario de reserva
6. **Chatbot con IA** - Asistente inteligente para consultas
7. **Búsqueda de alrededores** - Integración con Google Maps Grounding

### 📲 Progressive Web App (PWA)
- **Instalable** como app en iOS y Android
- **Funciona offline** con Service Worker
- **Icono en pantalla de inicio**
- **Notificaciones push** (preparado para implementar)
- **Rendimiento optimizado**

## 🚀 Instalación y Uso

### Requisitos
- Node.js 16+
- npm o yarn

### Pasos para ejecutar

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variable de entorno
# Crear archivo .env.local con:
API_KEY=tu_api_key_de_google_genai

# 3. Ejecutar en modo desarrollo
npm run dev

# 4. Compilar para producción
npm run build

# 5. Previsualizar producción
npm run preview
```

## 📋 Personalización

### 1. Información del Negocio
Edita `components/Contact.tsx`:
```typescript
// Dirección
<p>Tu dirección real</p>

// Teléfono
<a href="tel:+52XXXXXXXXXX">Tu teléfono</a>

// Horario
Lunes - Viernes: XX:XX - XX:XX
```

### 2. Precios de Servicios
Edita `components/Services.tsx`:
```typescript
const packages = [
  {
    name: 'Ritual Esencial',
    price: '$XXX MXN',
    // ...
  }
]
```

### 3. Barberos del Equipo
Edita `components/Team.tsx`:
```typescript
const barbers = [
  {
    name: 'Nombre Real',
    specialty: 'Especialidad',
    img: 'URL_de_imagen',
    experience: 'X+ años'
  }
]
```

### 4. Logo y Colores
- Reemplaza `public/logo.png` con tu logo (512x512px recomendado)
- Colores principales en `index.html`:
  - Dorado: `#c5a47e`
  - Fondo oscuro: `#2a211c`
  - Fondo más oscuro: `#1f1a17`

## 🎯 Próximos Pasos para Producción

### Fase 1: Configuración Básica ✅
- [x] Diseño responsive
- [x] Imágenes profesionales
- [x] Formulario de reservas
- [x] PWA configurado

### Fase 2: Funcionalidades Avanzadas (Sugeridas)
- [ ] **Backend de reservas** - Firebase o servicio similar
- [ ] **Notificaciones** - Confirmar citas por WhatsApp/SMS
- [ ] **Base de datos** - Historial de clientes
- [ ] **Panel de administración** - Para gestionar citas
- [ ] **Pagos en línea** - Stripe o MercadoPago
- [ ] **Sistema de fidelidad** - Puntos y promociones
- [ ] **Recordatorios automáticos** - 24h antes de la cita

### Fase 3: Escalabilidad
- [ ] **Multi-sucursal** - Gestionar varias ubicaciones
- [ ] **Inventario** - Control de productos
- [ ] **Reportes** - Analytics y métricas
- [ ] **App nativa** - React Native para iOS/Android

## 🔐 Seguridad

- Variables de entorno para API keys
- Validación de formularios
- HTTPS obligatorio para PWA
- Sanitización de inputs

## 📱 Cómo Instalar Como App

### En Android:
1. Abre el sitio en Chrome
2. Toca el menú (⋮)
3. Selecciona "Agregar a pantalla de inicio"
4. ¡Listo! Icono en tu pantalla

### En iOS:
1. Abre el sitio en Safari
2. Toca el botón "Compartir" (□↑)
3. Selecciona "Agregar a pantalla de inicio"
4. ¡Listo! Icono en tu pantalla

---

## 📲 GENERAR APK PARA ANDROID (30 minutos)

### Paso 1: Subir la app a internet (5 min)

**Opción A - Vercel (Recomendado, GRATIS):**
1. Ve a [vercel.com](https://vercel.com) y crea cuenta con tu email
2. Instala Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Ejecuta en la carpeta del proyecto:
   ```bash
   vercel --prod
   ```
4. Copia la URL que te da (ejemplo: `santo-barbero.vercel.app`)

**Opción B - Netlify (Alternativa GRATIS):**
1. Ve a [netlify.com](https://netlify.com) y crea cuenta
2. Arrastra la carpeta `dist/` al dashboard
3. Copia la URL que te da

### Paso 2: Generar el APK con PWABuilder (10 min)

1. **Ve a:** [pwabuilder.com](https://www.pwabuilder.com/)
2. **Pega tu URL** (la de Vercel o Netlify)
3. **Click en "Start"** - esperará unos segundos
4. **Verás tu puntuación PWA** (debería ser 90+)
5. **Click en "Package for stores"**
6. **Selecciona "Android"**
7. **Click en "Generate"** (el APK básico es GRATIS)
8. **Descarga el archivo ZIP**
9. Dentro del ZIP encontrarás el `.apk`

### Paso 3: Instalar el APK en el celular (5 min)

1. **Pasa el archivo .apk** al celular (WhatsApp, Google Drive, USB)
2. **Abre el archivo .apk** en el celular
3. **Si pide permisos:** Ve a Configuración → Seguridad → "Instalar apps desconocidas" → Activa para tu navegador
4. **Toca "Instalar"**
5. **¡Listo!** La app aparece en tu pantalla de inicio

### ⚠️ IMPORTANTE
- El APK funciona SIN internet solo para lo básico (ver servicios, horarios)
- El chatbot y reservas NECESITAN internet
- Para actualizar la app: repite el proceso y reinstala

### 🎯 Comandos rápidos para tu socio:
```bash
# Actualizar la app en internet
npm run build
vercel --prod

# Después regenerar APK en pwabuilder.com
```

## 🛠️ Tecnologías Utilizadas

- **React 19** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool super rápido
- **Tailwind CSS** - Estilos utility-first
- **Google Gemini AI** - Chatbot inteligente
- **Google Maps** - Ubicación e información local
- **PWA** - Progressive Web App

## 💡 Soporte y Mantenimiento

Para hacer funcional el sistema de reservas necesitarás:

1. **WhatsApp Business API** o **Twilio** para enviar confirmaciones
2. **Firebase** o backend propio para guardar reservas
3. **Google Calendar API** para sincronizar citas
4. **Stripe/MercadoPago** si quieres pagos anticipados

## 📞 Próximos Pasos Recomendados

### Para Integrar Sistema de Reservas Real:

1. **WhatsApp Business**
   - Integra con la API de WhatsApp
   - Envía confirmaciones automáticas
   - Recordatorios 24h antes

2. **Firebase (Recomendado para empezar)**
   ```bash
   npm install firebase
   ```
   - Firestore para base de datos
   - Authentication para login
   - Cloud Functions para lógica backend

3. **Panel de Administración**
   - Vista de calendario con todas las citas
   - Gestión de clientes
   - Historial de servicios
   - Reportes de ventas

## 📄 Licencia

Proyecto desarrollado para Santo Barbero. Todos los derechos reservados.

---

**Hecho con ❤️ para revolucionar la experiencia de barbería en México** 🇲🇽✂️
