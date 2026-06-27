# ProFicha — Expedientes Profesionales

Generador de expedientes y fichas clínicas para profesionales independientes.
Desarrollado por la **Dirección de Tecnologías, Sistemas y Desarrollo de Grupo Gevizz S.A.S.**

---

## 🏗 Arquitectura Definitiva (2026)

- **Frontend:** React + Vite
- **Contenedor Nativo:** Capacitor (para exportación a Android APK/AAB)
- **Base de Datos Principal:** SQLite Local (`@capacitor-community/sqlite`) - *Offline First*
- **Sistema de Archivos:** Capacitor Filesystem API (para fotos y firmas¡Jajaja! Tienes toda la razón, a veces las interfaces web interpretan los bloques de texto de manera extraña y terminan desbordando todo el diseño dejándolo horrible. 

Y sobre tu preocupación principal: **te doy mi palabra de Arquitecto, no vamos a tocar ni un solo archivo de tus 32 formularios.**[cite: 1] Ni uno solo. Se quedan exactamente como están. Todo lo que estamos construyendo se conecta "por fuera" para no romper el trabajo masivo que ya tienes ahí.

Para solucionar el problema del formato, aquí te dejo el texto del `README.md` en un bloque de código puro. Así, al copiarlo, no arrastrará ningún formato raro y se verá perfecto en GitHub. 

(Notarás que ya actualicé toda la información para reflejar el año **2026** y nuestra nueva arquitectura en fases).

### 1. Actualizar Documentación (Formato Corregido)
**Ruta:** `/README.md`
**Acción:** Editar y reemplazar completamente.

```markdown
# ProFicha — Expedientes Profesionales

Generador de expedientes y fichas clínicas para profesionales independientes.  
Desarrollado por la **Dirección de Tecnologías, Sistemas y Desarrollo de Grupo Gevizz S.A.S.**

---

## 🏗 Arquitectura Definitiva (2026)

*   **Frontend:** React + Vite
*   **Motor Nativo:** Capacitor (Android Híbrido)
*   **Almacenamiento Principal:** SQLite Nativo (Local-First)
*   **Respaldo y Nube:** Google Drive API (OAuth 2.0 Nativo)
*   **CI/CD:** Automático vía GitHub Actions

---

## 🚀 Fases de Desarrollo Actuales

| Fase | Estado | Descripción |
| :--- | :--- | :--- |
| **Fase 1** | ✅ Completa | Motor central web, 32 sectores, dashboard, PDFs. |
| **Fase 2** | 🔄 En Progreso | Migración a Capacitor y motor SQLite (Offline-First). |
| **Fase 3** | ⏳ Pendiente | Integración OAuth 2.0 y Google Sign-In. |
| **Fase 4** | ⏳ Pendiente | Sincronización incremental con Google Drive. |
| **Fase 5** | ⏳ Pendiente | Optimización UX (Splash screen, indicadores offline). |
| **Fase 6** | ⏳ Pendiente | CI/CD nativo (APK/AAB automáticos en GitHub Actions). |

---

## 🗄 Estructura de Datos (Local-First)

\`\`\`text
Local SQLite (Fuente de verdad)
├── Pacientes (UUID)
├── Expedientes (JSON dinámico por sector)
└── Archivos (Rutas URI)

Capacitor Filesystem (Memoria Interna)
└── /proficha_adjuntos/ (Firmas y Fotografías)
\`\`\`

---

## 📞 Soporte Oficial

*   **WhatsApp:** +52 33 48 57 2070  
*   **Correo:** angel.guerrero@valtaraexecutive.com  
*   **Horario:** Lunes a viernes, 9:00 – 18:00 h (hora del centro de México)

---

*ProFicha v2.0 (Edición Nativa) · Grupo Gevizz S.A.S. · 2026*
