ProFicha — Expedientes ProfesionalesGenerador de expedientes y fichas clínicas para profesionales independientes.Desarrollado por la Dirección de Tecnologías, Sistemas y Desarrollo de Grupo Gevizz S.A.S.🏗 Arquitectura Definitiva (Local-First Nativa)El proyecto ha evolucionado de una PWA tradicional a una Aplicación Nativa Híbrida (Android). Utiliza Capacitor para acceder al hardware del dispositivo y SQLite como base de datos principal, garantizando un funcionamiento 100% offline, rápido y seguro.proficha/
├── src/
│   ├── core/
│   │   ├── adapters/     ← Conexión física nativa (SQLite y Filesystem)
│   │   ├── repositories/ ← Operaciones y consultas a la base de datos
│   │   └── services/     ← Lógica de negocio (Validaciones y UUIDs)
│   ├── forms/            ← Módulos de especialidades clínicas (Lazy Loaded)
│   ├── proFicha.jsx      ← UI Principal (Dashboard)
│   └── main.jsx          ← Entry point de React
├── capacitor.config.ts   ← Configuración del motor nativo Android
├── vite.config.js        ← Empaquetador web optimizado
└── package.json
🚀 Fases de Desarrollo (Metodología Estricta)FaseEstadoDescripciónFase 1✅ CompletaPreparación del proyecto. Integración de Capacitor, reestructuración y Lazy Loading en Formularios.Fase 2⏳ En desarrolloCapa de Almacenamiento Local. Motor SQLite construido. Pendiente: Conectar la Base de Datos a la Interfaz Gráfica.Fase 3🔮 PendienteAutenticación Nativa. Inicio de sesión único con Google Sign-In (OAuth 2.0).Fase 4🔮 PendienteGoogle Drive. Respaldos automáticos, restauración y sincronización incremental.Fase 5🔮 PendienteUI/UX Nativa. Splash screen, indicadores de estado offline, animaciones y fluidez Android.Fase 6🔮 PendienteProducción. Configuración de GitHub Actions para generar APK y AAB automáticamente.⚙️ Proceso de Compilación Android⚠️ Nota Importante: El uso de PWABuilder ha sido descontinuado.Actualmente el proyecto está en construcción estructural. Durante la Fase 6, se configurará un flujo de trabajo (Workflow) automatizado en GitHub Actions. A partir de ese momento, cada vez que se apruebe una versión en la rama principal, los servidores de GitHub compilarán la aplicación y generarán los archivos .apk (Debug/Release) y .aab listos para ser descargados y distribuidos.☁️ Google Drive — Nueva Organización (Fase 4)La sincronización en la nube será estrictamente para respaldos. Toda la información existirá primero en el dispositivo físico (SQLite).Carpeta Drive: /ProFicha/
├── expedientes/
├── consentimientos/
├── firmas_imagenes/
├── plantillas/
└── sync_manifest.json
📞 Soporte oficialWhatsApp: +52 33 48 57 2070Correo: angel.guerrero@valtaraexecutive.comHorario: Lunes a viernes, 9:00 – 18:00 h (hora del centro de México)ProFicha v2.0-alpha · Arquitectura Local-First · Grupo Gevizz S.A.S.
