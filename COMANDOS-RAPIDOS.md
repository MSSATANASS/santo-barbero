# 📱 Comandos Rápidos - Santo Barbero

## Para tu socio: copia y pega estos comandos en la terminal

---

## 🚀 ABRIR LA APP

### Ver en computadora
```
npm run dev
```
Abre: http://localhost:3000

### Ver en celular (misma red WiFi)
```
npm run mobile
```
Te da una IP como `192.168.1.XX:3000` - ábrela en el celular

### Abrir panel de administrador
```
npm run admin
```
O agrega `?admin=1` a cualquier URL de la app

---

## 📱 PUBLICAR EN FACEBOOK

### Publicar un post ahora (con IA)
```
npm run publicar
```

### Programar toda la semana
```
npm run semana
```

### Subir fotos del día
```
npm run fotos
```

### Ver estadísticas
```
npm run stats
```

---

## 🔧 MANTENIMIENTO

### Instalar dependencias (primera vez o después de actualizar)
```
npm install
```

### Compilar para producción
```
npm run build
```

### Probar conexión de Facebook
```
npm run fb:test
```

---

## 📲 GENERAR APK ANDROID

### 1. Compilar la app
```
npm run build
```

### 2. Subir a internet (Vercel)
```
npm install -g vercel
vercel --prod
```

### 3. Generar APK
1. Ve a https://pwabuilder.com
2. Pega la URL de Vercel
3. Click "Android" → "Generate"
4. Descarga e instala el APK

---

## 🆘 PROBLEMAS COMUNES

### "npm no reconocido"
Descarga Node.js: https://nodejs.org

### "Error de dependencias"
```
rm -rf node_modules
npm install
```

### "Puerto ocupado"
```
npm run dev -- --port 3001
```

---

## 📞 ACCESO ADMIN

**PIN por defecto:** `1234`

Para cambiar el PIN, edita `components/AdminDashboard.tsx`:
```typescript
const ADMIN_PIN = '1234'; // Cambia esto
```

---

## 💡 TIPS

- El panel admin se abre tocando 5 veces el ícono ⚙️ en la navegación inferior
- Los sellos de clientes se guardan por número de teléfono
- Las citas se guardan automáticamente cuando alguien reserva
- WhatsApp se abre automáticamente para confirmar citas

---

**¿Algo no funciona? Contacta al desarrollador** 📞
