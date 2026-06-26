# ProFicha — Expedientes Profesionales

Generador de expedientes y fichas clínicas para profesionales independientes.  
Desarrollado por la **Dirección de Tecnologías, Sistemas y Desarrollo de Grupo Gevizz S.A.S.**

---

## 🏗 Estructura del proyecto

```
proficha/
├── src/
│   ├── ProFicha.jsx        ← App principal (motor central Fase 1)
│   ├── driveSync.js        ← Motor de sincronización con Google Drive
│   └── main.jsx            ← Entry point React
├── public/
│   └── favicon.svg
├── .github/
│   └── workflows/
│       └── deploy.yml      ← CI/CD → GitHub Pages automático
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Fases de desarrollo

| Fase | Estado | Descripción |
|------|--------|-------------|
| Fase 1 | ✅ Completa | Motor central: 32 sectores, dashboard, PDF bancario, Drive, accesibilidad, ayuda |
| Fase 2 | ⏳ En desarrollo | 32 formularios hiper-detallados por sector con consentimientos y campos especializados |
| Fase 3 | 🔮 Pendiente | Google Drive API real, base de datos nube, multi-dispositivo empresarial |

---

## 📲 Cómo convertir a APK

1. El Action de GitHub compila y despliega automáticamente en cada push
2. Ir a **[pwbuilder.com](https://www.pwabuilder.com)**
3. Pegar la URL: `https://valtara-executive.github.io/proficha/`
4. PWABuilder detecta el manifest PWA y genera el `.apk` listo para instalar

---

## ☁️ Google Drive — Organización de carpetas

```
ProFicha — Expedientes/
├── Medicina General/
│   ├── Alfredo Guzmán Luna Pérez/
│   │   ├── expediente_Alfredo_Guzman_2025-01-15_09h30m.json
│   │   └── expediente_Alfredo_Guzman_2025-01-22_14h00m.json
│   └── María López Sánchez/
│       └── expediente_Maria_Lopez_2025-01-16_11h00m.json
├── Masoterapia/
│   └── ...
└── config_2025-01-15_08h00m.json
```

---

## 📞 Soporte oficial

- **WhatsApp:** +52 33 48 57 2070  
- **Correo:** angel.guerrero@valtaraexecutive.com  
- **Horario:** Lunes a viernes, 9:00 – 18:00 h (hora del centro de México)

---

*ProFicha v1.0 · Fase 1 · Grupo Gevizz S.A.S.*
