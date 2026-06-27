# ProFicha — Expedientes Profesionales

> Generador de expedientes y fichas clínicas para profesionales independientes.  
> Desarrollado por la **Dirección de Tecnologías, Sistemas y Desarrollo de Grupo Gevizz S.A.S.**

---

## 📋 Índice

- [Descripción General](#-descripción-general)
- [Arquitectura](#-arquitectura-definitiva-2026)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Fases de Desarrollo](#-fases-de-desarrollo)
- [Stack Tecnológico](#-stack-tecnológico-detallado)
- [Autenticación y Seguridad](#-autenticación-y-seguridad)
- [Base de Datos y Almacenamiento](#-base-de-datos-y-almacenamiento)
- [Formularios y Sectores](#-formularios-y-sectores-disponibles)
- [Motor de PDF](#-motor-de-pdf)
- [CI/CD y Build Pipeline](#-cicd-y-build-pipeline)
- [Instalación y Desarrollo Local](#-instalación-y-desarrollo-local)
- [Variables y Configuración](#-variables-y-configuración-clave)
- [Decisiones de Diseño](#-decisiones-de-diseño-arquitectónico)
- [Soporte Oficial](#-soporte-oficial)

---

## 📌 Descripción General

**ProFicha** es una PWA/APK Android de expedientes clínicos y profesionales construida con filosofía **Local-First**: toda la información se almacena en SQLite nativo en el dispositivo del profesional, sin servidores intermedios ni suscripciones de nube obligatorias.

El profesional puede trabajar completamente sin conexión a internet. La sincronización con Google Drive es opcional y manual — el usuario decide cuándo respaldar.

**Público objetivo:** Profesionales independientes del sector salud, bienestar, estética y deporte en América Latina — masoterapeutas, médicos, psicólogos, nutriólogos, odontólogos, fisioterapeutas, y 26 sectores más.

---

## 🏗 Arquitectura Definitiva (2026)

| Capa | Tecnología | Rol |
|:---|:---|:---|
| **UI / Componentes** | React 18 + JSX | Renderizado de vistas y formularios |
| **Bundler** | Vite 5 | Build ultra-rápido, base `./` para APK |
| **Motor Nativo** | Capacitor 6 | Bridge JS ↔ Android (SQLite, FileSystem, Auth) |
| **Almacenamiento** | SQLite Nativo (`@capacitor-community/sqlite`) | Fuente de verdad local |
| **Autenticación** | Google Sign-In Nativo (`@codetrix-studio/capacitor-google-auth`) | OAuth 2.0 sin WebView externo |
| **Respaldo** | Google Drive API v3 | Backup incremental en carpeta dedicada |
| **Build / CI** | GitHub Actions | APK firmado automático en cada push |
| **PWA** | `vite-plugin-pwa` | Service Worker + instalación en navegador |

---

## 📁 Estructura del Proyecto

```
proficha/
├── .github/
│   └── workflows/
│       └── main.yml            ← CI/CD: compila APK en cada push a main
│
├── src/
│   ├── forms/
│   │   ├── index.js            ← Barrel: exporta todos los formularios
│   │   ├── form_masoterapia.js
│   │   ├── form_medico.js
│   │   └── form_*.js           ← 32 formularios dinámicos por sector
│   │
│   ├── core/
│   │   ├── adapters/
│   │   │   ├── sqliteAdapter.js    ← Abstracción sobre @capacitor-community/sqlite
│   │   │   └── fileAdapter.js      ← Lectura/escritura de archivos nativos
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js      ← Lógica de Google Sign-In
│   │   │   └── driveService.js     ← Upload/download Google Drive API v3
│   │   │
│   │   └── repositories/
│   │       ├── patientRepository.js
│   │       └── recordRepository.js
│   │
│   ├── hooks/
│   │   ├── useAuth.js          ← Estado reactivo de sesión Google
│   │   └── useDriveSync.js     ← Lógica de sincronización
│   │
│   ├── FormEngine.jsx          ← Renderizador dinámico de formularios JSON
│   └── RecordWizard.jsx        ← Flujo de creación de expediente paso a paso
│
├── proFicha.jsx                ← Componente raíz (~1600 líneas): CSS, vistas, lógica
├── main.jsx                    ← Entry point React
├── index.html                  ← HTML base (favicon → logotipo.png)
├── vite.config.js              ← base: './' (crítico para APK)
├── capacitor.config.ts         ← App ID, servidor, plugins nativos
├── package.json
├── logotipo.png                ← Ícono oficial de la app (favicon + splash)
└── logotipo.mp4                ← Video animado 8s loop (pantalla de login)
```

---

## 🚀 Fases de Desarrollo

| Fase | Estado | Descripción |
|:---|:---|:---|
| **Fase 1** | ✅ Completa | Motor central web, 32 sectores, dashboard, PDFs bancarios |
| **Fase 2** | ✅ Completa | Migración a Capacitor, motor SQLite offline-first |
| **Fase 3** | ✅ Completa | Integración OAuth 2.0 y Google Sign-In nativo |
| **Fase 4** | ✅ Completa | Sincronización incremental con Google Drive |
| **Fase 5** | ✅ Completa | Optimización UX: login animado, scroll nativo, avatar Google |
| **Fase 6** | 🔄 En progreso | CI/CD nativo: APK firmado automático en GitHub Actions |
| **Fase 7** | ⏳ Pendiente | Firma digital biométrica en expedientes |
| **Fase 8** | ⏳ Pendiente | Módulo de agenda y citas |

---

## 🛠 Stack Tecnológico Detallado

### Frontend
- **React 18** — Componentes funcionales con hooks
- **JSX sin TypeScript en componentes UI** — Para agilidad y compatibilidad directa con Vite
- **TypeScript 5.4** — Solo en configuración de Capacitor (`capacitor.config.ts`)
- **CSS-in-JS inline** — Todo el CSS vive dentro de `proFicha.jsx` en una constante `css` dinámica que reacciona al tema/paleta activa. Esto garantiza que el APK no necesite archivos CSS externos.

### Build
- **Vite 5** con `base: './'` — Indispensable para que los assets funcionen en el WebView de Android
- **vite-plugin-pwa 0.19** — Genera Service Worker y manifiesto PWA automáticamente

### Nativo (Capacitor)
- `@capacitor/core` — Bridge principal JS ↔ Android
- `@capacitor/preferences` — Almacenamiento clave-valor nativo (equivalente a localStorage pero persistente y nativo)
- `@capacitor-community/sqlite` — SQLite nativo en Android
- `@codetrix-studio/capacitor-google-auth` — Google Sign-In nativo (no redirige al navegador)

---

## 🔐 Autenticación y Seguridad

### Flujo de Login

```
App abre
   │
   ├─ useAuth() verifica sesión guardada en Preferences
   │
   ├─ NO hay sesión → Pantalla de Login
   │     ├─ Video logotipo.mp4 en loop (fondo)
   │     ├─ logotipo.png (ícono central)
   │     └─ Botón "Continuar con Google"
   │           └─ GoogleAuth.signIn() → OAuth 2.0 nativo
   │
   └─ SÍ hay sesión → App principal directamente
```

### Google Client ID configurado

```
1099016850057-v232nk1h4nvnhtu01cf0j5kfan3t0884.apps.googleusercontent.com
```

Este Client ID está registrado en Google Cloud Console para el App ID de Capacitor. Si se cambia el `applicationId` en `capacitor.config.ts`, se debe actualizar también en la consola de Google.

### Datos del usuario disponibles post-login

| Campo | Fuente | Uso en la app |
|:---|:---|:---|
| `user.name` | Google Profile | Saludo en dashboard |
| `user.email` | Google Account | Identificación de sesión |
| `user.imageUrl` | Google Profile | Avatar en topbar |
| `user.authentication.accessToken` | OAuth 2.0 | Llamadas a Drive API |

### Seguridad local

- Los expedientes **nunca salen del dispositivo** salvo que el usuario pulse "Respaldar en Drive" explícitamente
- No hay backend propio de ProFicha — no existe servidor que pueda ser comprometido
- El acceso a Drive está limitado al scope `drive.file` (solo archivos creados por la app)

---

## 🗄 Base de Datos y Almacenamiento

### Arquitectura Local-First

```
Dispositivo Android
│
├── SQLite (vía @capacitor-community/sqlite)
│   ├── tabla: patients       → nombre, datos de contacto, sector
│   ├── tabla: records        → id, patientId, sectorId, fecha, JSON de campos
│   └── tabla: files          → id, recordId, type (firma/foto), uri local
│
├── Capacitor Filesystem
│   ├── /ProFicha/firmas/     → Imágenes PNG de firmas digitales
│   └── /ProFicha/fotos/      → Fotografías adjuntas a expedientes
│
└── Capacitor Preferences
    ├── lang                  → Idioma activo (es/en)
    ├── palette               → Tema visual activo
    ├── profile               → Datos del perfil profesional
    ├── mySectors             → Sectores activados por el usuario
    └── driveConnected        → Estado de conexión Drive
```

### Google Drive (Respaldo)

- Carpeta creada automáticamente: `ProFicha — Expedientes`
- Cada backup genera un archivo nuevo con timestamp: `proficha-backup-2026-06-27T21-40-00.json`
- Los backups anteriores **nunca se sobreescriben** — se acumulan como historial
- Scope OAuth utilizado: `https://www.googleapis.com/auth/drive.file`

---

## 📝 Formularios y Sectores Disponibles

ProFicha incluye **32 formularios clínicos hiperespecializados**, organizados por categoría:

### 🏥 Salud Clínica
| Sector | Archivo | Campos destacados |
|:---|:---|:---|
| Médico General | `form_medico.js` | Historia clínica completa, antecedentes, signos vitales |
| Psicología | `form_psicologia.js` | Motivo consulta, test aplicados, evolución sesión |
| Nutrición | `form_nutricion.js` | Antropometría, VET, plan alimentario |
| Fisioterapia | `form_fisioterapia.js` | Evaluación postural, ROM, plan de tratamiento |
| Odontología | `form_odontologia.js` | Odontograma, periodontograma |
| Enfermería | `form_enfermeria.js` | Notas de enfermería SOAP |
| Optometría | `form_optometria.js` | Agudeza visual, refracción |
| Podología | `form_podologia.js` | Exploración biomecánica del pie |
| Pediatría | `form_pediatria.js` | Curvas de crecimiento, hitos del desarrollo |

### 🌿 Terapias y Bienestar
Masoterapia, Acupuntura, Quiropráctica, Reiki/Energética, Coaching de Vida, Terapia de Pareja, Soladora/Limpia

### 💅 Estética y Belleza
Manicura/Pedicura, Cosmetología, Depilación, Medicina Estética, Maquillaje Permanente

### 🎨 Arte Corporal
Tatuaje, Piercing, Microblading/Cejas, Micropigmentación

### 🏋️ Deporte y Movimiento
Entrenamiento Personal, Yoga/Pilates, Artes Marciales

### 🐾 Otros Profesionales
Veterinaria, Psicopedagogía, Logopedia, Doula/Partera

### Arquitectura de un formulario

Cada `form_*.js` exporta un objeto con esta estructura:

```javascript
export const form_masoterapia = {
  id: "masoterapia",
  version: "2.0",
  sections: [
    {
      title: "Datos del Paciente",
      fields: [
        { id: "nombre", type: "text", label: "Nombre completo", required: true },
        { id: "fecha_nac", type: "date", label: "Fecha de nacimiento" },
        { id: "motivo", type: "textarea", label: "Motivo de consulta" },
        // ...
      ]
    }
  ]
};
```

El `FormEngine.jsx` recibe este objeto y genera la UI completa dinámicamente.

---

## 📄 Motor de PDF

ProFicha genera PDFs **en el dispositivo, sin conexión**, con:

- Encabezado con logo y datos del profesional
- Datos del paciente y fecha
- Todos los campos del formulario completados
- Espacio para firma
- Código de folio único
- Fondo personalizable (color sólido configurable por el usuario)

El PDF se genera usando la API de `canvas` del navegador dentro del WebView de Capacitor y se guarda en el Filesystem nativo para compartir por WhatsApp u otras apps.

---

## ⚙️ CI/CD y Build Pipeline

El repo usa **GitHub Actions** para compilar el APK sin necesidad de tener Android Studio instalado localmente.

### Archivo: `.github/workflows/main.yml`

El workflow ejecuta en cada push a `main`:

```
1. checkout del repo
2. setup Node.js
3. npm install
4. npm run build  →  genera /dist con Vite
5. npx cap sync   →  sincroniza /dist al proyecto Android
6. ./gradlew assembleRelease  →  compila APK
7. Upload APK como artifact descargable
```

### Requisitos para que el build funcione

- `vite.config.js` debe tener `base: './'` (no `/`)
- `capacitor.config.ts` debe apuntar `webDir: 'dist'`
- `index.html` debe cargar `main.jsx` con ruta relativa `./main.jsx`
- Todos los assets estáticos (`logotipo.png`, `logotipo.mp4`) deben estar en la raíz del repo (no en `/public/`) para que Vite los incluya en `/dist`

---

## 💻 Instalación y Desarrollo Local

> ⚠️ Para desarrollo web/PWA no se necesita Android Studio.  
> Para compilar el APK se necesita Java 17+ y Android SDK, o usar el CI de GitHub Actions.

### Web / PWA

```bash
# Clonar el repo
git clone https://github.com/valtara-executive/proficha.git
cd proficha

# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build
```

### APK (vía CI — recomendado)

```bash
# Simplemente hacer push a main
git add .
git commit -m "feat: descripción del cambio"
git push origin main

# GitHub Actions compila el APK automáticamente
# Descargarlo desde: Actions → último workflow → Artifacts
```

### APK (local, si se tiene el entorno Android)

```bash
npm run build
npx cap sync
npx cap open android
# O directamente:
cd android && ./gradlew assembleRelease
```

---

## 🔧 Variables y Configuración Clave

### `capacitor.config.ts`

```typescript
const config: CapacitorConfig = {
  appId: 'com.gevizz.proficha',
  appName: 'ProFicha',
  webDir: 'dist',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email', 'https://www.googleapis.com/auth/drive.file'],
      serverClientId: '1099016850057-v232nk1h4nvnhtu01cf0j5kfan3t0884.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};
```

### `vite.config.js`

```javascript
export default defineConfig({
  base: './',   // ← CRÍTICO: sin esto el APK no carga assets
  plugins: [react(), VitePWA({ ... })],
})
```

### Assets de marca en raíz del repo

| Archivo | Uso |
|:---|:---|
| `logotipo.png` | Favicon, apple-touch-icon, ícono en pantalla de login |
| `logotipo.mp4` | Video de fondo en pantalla de login (loop 8s, formato vertical) |

---

## 🧠 Decisiones de Diseño Arquitectónico

### ¿Por qué todo en `proFicha.jsx`?

El componente principal es intencionalmente monolítico (~1600 líneas). Esto permite:
- **Cero fragmentación** — Un solo archivo para revisar, un solo archivo para editar con IA
- **CSS dinámico reactivo** — El CSS vive dentro del componente y reacciona al tema activo sin necesidad de CSS Modules ni Tailwind
- **Portabilidad total** — El archivo funciona en cualquier entorno React sin configuración adicional

### ¿Por qué Local-First?

Los profesionales independientes en México y Latinoamérica frecuentemente trabajan en zonas con conectividad intermitente. La app debe funcionar perfectamente sin internet. El backup en Drive es un complemento, no un requisito.

### ¿Por qué no usar un backend propio?

- Elimina costos de servidor
- Elimina superficie de ataque (no hay DB en la nube que hackear)
- Cumplimiento simplificado de privacidad (los datos del paciente nunca salen del dispositivo del profesional)
- Escalabilidad infinita: 1 usuario o 100,000 usuarios tienen el mismo costo de infraestructura para Gevizz

### ¿Por qué Capacitor sobre React Native?

- La app ya existía como PWA en React — Capacitor permite reutilizar el 100% del código web
- El WebView de Android renderiza la app idénticamente al navegador
- Acceso a APIs nativas (SQLite, FileSystem, Auth) vía plugins oficiales bien mantenidos

---

## 📞 Soporte Oficial

| Canal | Detalle |
|:---|:---|
| **WhatsApp** | [+52 33 48 57 2070](https://wa.me/5213348572070) |
| **Correo** | angel.guerrero@valtaraexecutive.com |
| **Web** | [valtaraexecutive.com](https://valtaraexecutive.com) |
| **Horario** | Lunes a viernes, 9:00 – 18:00 h (hora del centro de México) |

---

## 📜 Licencia y Propiedad Intelectual

ProFicha es software propietario de **Grupo Gevizz S.A.S.**  
Todos los derechos reservados © 2026.  
No se autoriza la reproducción, distribución ni modificación sin autorización expresa por escrito.

---

*ProFicha v2.0 (Edición Nativa) · Grupo Gevizz S.A.S. · Dirección de Tecnologías, Sistemas y Desarrollo · 2026*
