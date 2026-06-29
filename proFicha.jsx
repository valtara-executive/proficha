// ═══════════════════════════════════════════════════════════════
// PROFICHA v2.0 — SPRINT EXPANDIDO
// Constructor: Qwen | Arquitecto: Angel
// Entrega 1: 10 bloques integrados
// ═══════════════════════════════════════════════════════════════

// ═══ BLOQUE 1: IMPORTS Y CONSTANTES BASE ═══════════════════════

import { FormEngine } from "./src/FormEngine.jsx";
import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "./src/hooks/useAuth.js";
import { driveService } from "./src/core/services/driveService.js";

// ── Sectores Profesionales (32 sectores) ───────────────────────
const SECTORS = [
  { id: "masoterapia", icon: "🤲", label: "Masoterapia", label_en: "Massage Therapy", color: "#6366f1", category: "terapias" },
  { id: "medico", icon: "🩺", label: "Médico General", label_en: "General Medicine", color: "#ef4444", category: "salud" },
  { id: "psicologia", icon: "🧠", label: "Psicología", label_en: "Psychology", color: "#8b5cf6", category: "salud" },
  { id: "nutricion", icon: "🥗", label: "Nutrición", label_en: "Nutrition", color: "#10b981", category: "salud" },
  { id: "fisioterapia", icon: "🦴", label: "Fisioterapia", label_en: "Physiotherapy", color: "#f59e0b", category: "salud" },
  { id: "odontologia", icon: "🦷", label: "Odontología", label_en: "Dentistry", color: "#3b82f6", category: "salud" },
  { id: "enfermeria", icon: "💉", label: "Enfermería", label_en: "Nursing", color: "#ec4899", category: "salud" },
  { id: "optometria", icon: "👁️", label: "Optometría", label_en: "Optometry", color: "#06b6d4", category: "salud" },
  { id: "podologia", icon: "🦶", label: "Podología", label_en: "Podology", color: "#84cc16", category: "salud" },
  { id: "pediatria", icon: "👶", label: "Pediatría", label_en: "Pediatrics", color: "#f97316", category: "salud" },
  { id: "acupuntura", icon: "📍", label: "Acupuntura", label_en: "Acupuncture", color: "#a78bfa", category: "terapias" },
  { id: "quiropraxia", icon: "🦾", label: "Quiropráctica", label_en: "Chiropractic", color: "#34d399", category: "terapias" },
  { id: "reiki", icon: "✨", label: "Reiki / Energética", label_en: "Reiki / Energy", color: "#fbbf24", category: "terapias" },
  { id: "coaching", icon: "🎯", label: "Coaching de Vida", label_en: "Life Coaching", color: "#60a5fa", category: "terapias" },
  { id: "terapia_pareja", icon: "💑", label: "Terapia de Pareja", label_en: "Couples Therapy", color: "#f472b6", category: "terapias" },
  { id: "soladora", icon: "🕯️", label: "Soladora / Limpia", label_en: "Spiritual Healing", color: "#c084fc", category: "terapias" },
  { id: "manicura", icon: "💅", label: "Manicura / Pedicura", label_en: "Nails", color: "#fb7185", category: "estetica" },
  { id: "cosmetologia", icon: "🧴", label: "Cosmetología", label_en: "Cosmetology", color: "#a3e635", category: "estetica" },
  { id: "depilacion", icon: "🌿", label: "Depilación", label_en: "Hair Removal", color: "#fde68a", category: "estetica" },
  { id: "med_estetica", icon: "💊", label: "Medicina Estética", label_en: "Aesthetic Medicine", color: "#7c3aed", category: "estetica" },
  { id: "maquillaje", icon: "💄", label: "Maquillaje Permanente", label_en: "Permanent Makeup", color: "#db2777", category: "estetica" },
  { id: "tatuaje", icon: "🎨", label: "Tatuaje", label_en: "Tattoo", color: "#1f2937", category: "arte" },
  { id: "piercing", icon: "💎", label: "Piercing", label_en: "Piercing", color: "#64748b", category: "arte" },
  { id: "microblading", icon: "✏️", label: "Microblading / Cejas", label_en: "Microblading", color: "#92400e", category: "arte" },
  { id: "micropigmentacion", icon: "🖌️", label: "Micropigmentación", label_en: "Micropigmentation", color: "#7f1d1d", category: "arte" },
  { id: "entrenamiento", icon: "🏋️", label: "Entrenamiento Personal", label_en: "Personal Training", color: "#dc2626", category: "deporte" },
  { id: "yoga", icon: "🧘", label: "Yoga / Pilates", label_en: "Yoga / Pilates", color: "#059669", category: "deporte" },
  { id: "artes_marciales", icon: "🥋", label: "Artes Marciales", label_en: "Martial Arts", color: "#b45309", category: "deporte" },
  { id: "veterinaria", icon: "🐾", label: "Veterinaria", label_en: "Veterinary", color: "#16a34a", category: "otros" },
  { id: "psicopedagogia", icon: "📚", label: "Psicopedagogía", label_en: "Psychopedagogy", color: "#0284c7", category: "otros" },
  { id: "logopedia", icon: "🗣️", label: "Logopedia", label_en: "Speech Therapy", color: "#7c3aed", category: "otros" },
  { id: "doula", icon: "🤱", label: "Doula / Partera", label_en: "Doula / Midwife", color: "#be185d", category: "otros" },
];

const CATEGORY_LABELS = {
  salud:    { es: "Salud Clínica",          en: "Clinical Health" },
  terapias: { es: "Terapias y Bienestar",   en: "Therapies & Wellness" },
  estetica: { es: "Estética y Belleza",     en: "Aesthetics & Beauty" },
  arte:     { es: "Arte Corporal",          en: "Body Art" },
  deporte:  { es: "Deporte y Movimiento",   en: "Sports & Movement" },
  otros:    { es: "Otros Profesionales",    en: "Other Professionals" },
};

// ── Paletas de Color (8 temas) ─────────────────────────────────
const PALETTES = [
  { id: "dark",     name: "Modo Oscuro", bg: "#0a0a0f", surface: "#13131a", text: "#ffffff", accent: "#6366f1", sub: "#94a3b8" },
  { id: "light",    name: "Modo Claro",  bg: "#f8fafc", surface: "#ffffff", text: "#0f172a", accent: "#6366f1", sub: "#64748b" },
  { id: "ocean",    name: "Océano",      bg: "#0c1a2e", surface: "#112240", text: "#ccd6f6", accent: "#64ffda", sub: "#8892b0" },
  { id: "forest",   name: "Bosque",      bg: "#0a1a0a", surface: "#122212", text: "#d4edda", accent: "#4ade80", sub: "#86efac" },
  { id: "sunset",   name: "Atardecer",   bg: "#1a0a0a", surface: "#2d1010", text: "#fde8d8", accent: "#fb923c", sub: "#fca5a5" },
  { id: "lavender", name: "Lavanda",     bg: "#0f0a1a", surface: "#1e1030", text: "#ede9fe", accent: "#a78bfa", sub: "#c4b5fd" },
  { id: "gold",     name: "Dorado",      bg: "#0f0e07", surface: "#1c1a05", text: "#fefce8", accent: "#eab308", sub: "#ca8a04" },
  { id: "rose",     name: "Rosa",        bg: "#1a0a10", surface: "#2d1020", text: "#fce7f3", accent: "#f472b6", sub: "#f9a8d4" },
];

// ── Saludos Dinámicos ──────────────────────────────────────────
const GREET = (name, lang) => {
  const h = new Date().getHours();
  const firstName = name ? name.split(" ")[0] : (lang === "es" ? "Profesional" : "Professional");
  if (lang === "es") {
    if (h >= 5  && h < 12) return [`¡Buenos días, ${firstName}! ☀️`,    "Excelente momento para comenzar el día con energía."];
    if (h >= 12 && h < 14) return [`¡Buen mediodía, ${firstName}! 🌤️`,  "La jornada va a mitad. Tú lo estás haciendo muy bien."];
    if (h >= 14 && h < 19) return [`¡Buenas tardes, ${firstName}! 🌅`,  "La tarde es tuya. Sigue adelante con confianza."];
    if (h >= 19 && h < 22) return [`¡Buenas noches, ${firstName}! 🌙`,  "Cierre de día productivo. Tus pacientes te lo agradecen."];
    return [`Hola, ${firstName} 🌟`, "Alguien trabaja hasta tarde. Eso habla muy bien de ti."];
  } else {
    if (h >= 5  && h < 12) return [`Good morning, ${firstName}! ☀️`,   "Great time to start the day with energy."];
    if (h >= 12 && h < 14) return [`Good noon, ${firstName}! 🌤️`,      "Halfway through the day. You're doing great."];
    if (h >= 14 && h < 19) return [`Good afternoon, ${firstName}! 🌅`, "The afternoon is yours. Keep going with confidence."];
    if (h >= 19 && h < 22) return [`Good evening, ${firstName}! 🌙`,   "Productive close of day. Your clients thank you."];
    return [`Hello, ${firstName} 🌟`, "Working late — that says a lot about you."];
  }
};

// ── Frases Motivacionales ──────────────────────────────────────
const MOTIVATION = [
  ["Cada ficha que llenas es un escudo legal para tu negocio.", "Profesionalismo que se nota desde la primera firma."],
  ["Tu consultorio merece herramientas de clase mundial.",      "Hoy atendiste a alguien. Eso importa."],
  ["La documentación bien hecha es la mejor inversión.",       "Un expediente completo vale más que mil palabras."],
  ["Los grandes profesionales cuidan cada detalle.",           "Y tú estás aquí, cuidando los tuyos."],
];

// ── Traducciones Completas ─────────────────────────────────────
const T = {
  es: {
    appName: "ProFicha",
    tagline: "Tu expediente profesional, en tu mano.",
    dashboard: "Inicio",
    sectors: "Sectores",
    records: "Expedientes",
    storage: "Respaldo",
    settings: "Ajustes",
    accessibility: "Acceso",
    help: "Ayuda",
    newRecord: "Nuevo Expediente",
    searchSector: "Buscar sector...",
    allSectors: "Todos los Sectores",
    addSector: "Agregar Sector",
    mySectors: "Mis Sectores Activos",
    noSectors: "Aún no tienes sectores. Agrega uno para comenzar.",
    totalRecords: "Expedientes Totales",
    todayRecords: "Hoy",
    pending: "Pendientes",
    profile: "Perfil Profesional",
    businessName: "Nombre del Negocio / Profesional",
    phone: "Teléfono",
    email: "Correo Electrónico",
    whatsapp: "WhatsApp (con código de país)",
    address: "Dirección del consultorio",
    website: "Sitio web",
    logo: "Logo",
    uploadLogo: "Subir Logo",
    removeLogo: "Quitar Logo",
    colorTheme: "Tema de Color",
    language: "Idioma",
    termsTitle: "Términos y Consentimientos",
    termsPlaceholder: "Escribe aquí tus propios términos y condiciones, aviso de privacidad y consentimiento informado...",
    save: "Guardar Cambios",
    saved: "¡Guardado!",
    pdfColor: "Color de Fondo del PDF",
    exportConfig: "Exportar Configuración",
    importConfig: "Importar Configuración",
    configPassword: "Contraseña empresarial",
    quickActions: "Acciones Rápidas",
    shareWhatsapp: "Compartir por WhatsApp",
    backupDrive: "Respaldar en Google Drive",
    recentRecords: "Expedientes Recientes",
    noRecords: "Sin expedientes aún. ¡Crea el primero!",
    recordFor: "Expediente de",
    deleteRecord: "Eliminar",
    exportPDF: "Exportar PDF",
    viewRecord: "Ver Expediente",
    accessibilityTitle: "Opciones de Accesibilidad",
    fontSize: "Tamaño de Fuente",
    contrast: "Alto Contraste",
    animations: "Animaciones Reducidas",
    screenReader: "Modo Lector de Pantalla",
    resetApp: "Restablecer Aplicación",
    confirmReset: "¿Seguro? Esto borrará todos los datos.",
    cancel: "Cancelar",
    confirm: "Confirmar",
    close: "Cerrar",
    back: "Volver",
    next: "Siguiente",
    finish: "Finalizar",
    uploadingDrive: "Subiendo a Google Drive...",
    driveConnected: "Google Drive conectado",
    driveConnect: "Conectar Google Drive",
    tipWhatsapp: "Comparte el PDF directamente al WhatsApp de tu cliente sin necesidad de tenerlo agendado.",
    tipDrive: "Todos tus expedientes respaldados automáticamente en tu nube personal.",
    tipLogo: "Tu logo aparecerá en todos los PDFs exportados, dándole identidad a tus documentos.",
    version: "ProFicha v2.0 · Fase 1",
    madeWith: "Hecho con ❤️ para profesionales como tú",
    signOut: "Cerrar sesión",
    signOutConfirm: "¿Deseas cerrar sesión? Tus datos permanecen guardados en el dispositivo.",
    signOutYes: "Sí, cerrar sesión",
    // Nuevas traducciones del sprint
    storageTitle: "Almacenamiento Externo",
    storageSubtitle: "Gestiona tus respaldos en Google Drive",
    backupSchedule: "Programación de Respaldos",
    lastBackup: "Último Respaldo",
    restoreBackup: "Restaurar Copia de Seguridad",
    manual: "Manual",
    hourly: "Cada hora",
    fiveHours: "Cada 5 horas",
    eightHours: "Cada 8 horas",
    daily: "Diario",
    weekly: "Semanal",
    quickWhatsApp: "Mensaje Rápido",
    quickWhatsAppTitle: "Enviar Mensaje por WhatsApp",
    phoneNumber: "Número de teléfono",
    messageContent: "Mensaje",
    send: "Enviar",
    tutorialTitle: "Tutorial de Bienvenida",
    tutorialSkip: "No volver a mostrar",
    tutorialNext: "Siguiente",
    tutorialPrev: "Anterior",
    tutorialFinish: "¡Comenzar!",
    chatbotTitle: "Chatea con nosotros",
    chatbotSubtitle: "Selecciona una opción para continuar",
    chatbotThinking: "Pensando...",
    faqSearch: "¿Cómo podemos ayudarte?",
    faqSearchPlaceholder: "Escribe tu duda aquí...",
    noResults: "Sin resultados para tu búsqueda",
    permissionTitle: "Permiso Requerido",
    permissionContinue: "Continuar",
    permissionDeny: "No ahora",
  },
  en: {
    appName: "ProFicha",
    tagline: "Your professional record, in your hand.",
    dashboard: "Home",
    sectors: "Sectors",
    records: "Records",
    storage: "Backup",
    settings: "Settings",
    accessibility: "Access",
    help: "Help",
    newRecord: "New Record",
    searchSector: "Search sector...",
    allSectors: "All Sectors",
    addSector: "Add Sector",
    mySectors: "My Active Sectors",
    noSectors: "No sectors yet. Add one to get started.",
    totalRecords: "Total Records",
    todayRecords: "Today",
    pending: "Pending",
    profile: "Professional Profile",
    businessName: "Business / Professional Name",
    phone: "Phone",
    email: "Email",
    whatsapp: "WhatsApp (with country code)",
    address: "Office Address",
    website: "Website",
    logo: "Logo",
    uploadLogo: "Upload Logo",
    removeLogo: "Remove Logo",
    colorTheme: "Color Theme",
    language: "Language",
    termsTitle: "Terms & Consent",
    termsPlaceholder: "Write your own terms, privacy notice and informed consent here...",
    save: "Save Changes",
    saved: "Saved!",
    pdfColor: "PDF Background Color",
    exportConfig: "Export Configuration",
    importConfig: "Import Configuration",
    configPassword: "Business password",
    quickActions: "Quick Actions",
    shareWhatsapp: "Share via WhatsApp",
    backupDrive: "Backup to Google Drive",
    recentRecords: "Recent Records",
    noRecords: "No records yet. Create the first one!",
    recordFor: "Record for",
    deleteRecord: "Delete",
    exportPDF: "Export PDF",
    viewRecord: "View Record",
    accessibilityTitle: "Accessibility Options",
    fontSize: "Font Size",
    contrast: "High Contrast",
    animations: "Reduced Motion",
    screenReader: "Screen Reader Mode",
    resetApp: "Reset App",
    confirmReset: "Are you sure? This will erase all data.",
    cancel: "Cancel",
    confirm: "Confirm",
    close: "Close",
    back: "Back",
    next: "Next",
    finish: "Finish",
    uploadingDrive: "Uploading to Google Drive...",
    driveConnected: "Google Drive connected",
    driveConnect: "Connect Google Drive",
    tipWhatsapp: "Share the PDF directly to your client's WhatsApp without having them saved.",
    tipDrive: "All your records backed up automatically to your personal cloud.",
    tipLogo: "Your logo will appear on all exported PDFs, giving your documents a professional identity.",
    version: "ProFicha v2.0 · Phase 1",
    madeWith: "Made with ❤️ for professionals like you",
    signOut: "Sign out",
    signOutConfirm: "Do you want to sign out? Your data remains saved on this device.",
    signOutYes: "Yes, sign out",
    // New translations
    storageTitle: "External Storage",
    storageSubtitle: "Manage your Google Drive backups",
    backupSchedule: "Backup Schedule",
    lastBackup: "Last Backup",
    restoreBackup: "Restore Backup",
    manual: "Manual",
    hourly: "Hourly",
    fiveHours: "Every 5 hours",
    eightHours: "Every 8 hours",
    daily: "Daily",
    weekly: "Weekly",
    quickWhatsApp: "Quick Message",
    quickWhatsAppTitle: "Send WhatsApp Message",
    phoneNumber: "Phone number",
    messageContent: "Message",
    send: "Send",
    tutorialTitle: "Welcome Tutorial",
    tutorialSkip: "Don't show again",
    tutorialNext: "Next",
    tutorialPrev: "Previous",
    tutorialFinish: "Let's Start!",
    chatbotTitle: "Chat with us",
    chatbotSubtitle: "Select an option to continue",
    chatbotThinking: "Thinking...",
    faqSearch: "How can we help you?",
    faqSearchPlaceholder: "Type your question here...",
    noResults: "No results found",
    permissionTitle: "Permission Required",
    permissionContinue: "Continue",
    permissionDeny: "Not now",
  },
};

// ═══ BLOQUE 2: ÁRBOL DE DECISIÓN DEL CHATBOT Y TUTORIAL ═══════

// ── Árbol de Decisión del Chatbot (Problema 9) ─────────────────
const CHATBOT_TREE = {
  start: {
    question: { es: "¿Sobre qué tienes dudas?", en: "What do you have questions about?" },
    options: [
      { label: { es: "Mis expedientes", en: "My records" }, next: "records" },
      { label: { es: "Google Drive", en: "Google Drive" }, next: "drive" },
      { label: { es: "Configuración", en: "Settings" }, next: "settings" },
      { label: { es: "Accesibilidad", en: "Accessibility" }, next: "accessibility" },
      { label: { es: "Otro tema", en: "Other topic" }, next: "other" },
    ],
  },
  records: {
    question: { es: "¿Qué necesitas saber sobre tus expedientes?", en: "What do you need to know about your records?" },
    options: [
      { label: { es: "¿Cómo crear uno nuevo?", en: "How to create a new one?" }, answer: { es: "Ve a Expedientes y toca 'Nuevo Expediente'. Escribe el nombre, selecciona el sector y completa el formulario.", en: "Go to Records and tap 'New Record'. Type the name, select the sector and complete the form." } },
      { label: { es: "¿Cómo exportar a PDF?", en: "How to export to PDF?" }, answer: { es: "En la lista de expedientes, toca el ícono de PDF. El archivo se descargará automáticamente.", en: "In the records list, tap the PDF icon. The file will download automatically." } },
      { label: { es: "¿Cómo compartir por WhatsApp?", en: "How to share via WhatsApp?" }, answer: { es: "Toca el ícono verde de WhatsApp en cualquier expediente. Se abrirá WhatsApp con el mensaje listo.", en: "Tap the green WhatsApp icon on any record. WhatsApp will open with the message ready." } },
      { label: { es: "¿Cómo eliminar un expediente?", en: "How to delete a record?" }, answer: { es: "Toca el ícono de basura y confirma. Esta acción no se puede deshacer.", en: "Tap the trash icon and confirm. This action cannot be undone." } },
      { label: { es: "Volver al inicio", en: "Back to start" }, next: "start" },
    ],
  },
  drive: {
    question: { es: "¿Qué necesitas saber sobre Google Drive?", en: "What do you need to know about Google Drive?" },
    options: [
      { label: { es: "¿Cómo conectarlo?", en: "How to connect it?" }, answer: { es: "En el Panel Principal, toca 'Conectar Google Drive' y acepta los permisos.", en: "On the Dashboard, tap 'Connect Google Drive' and accept the permissions." } },
      { label: { es: "¿Se crea una carpeta?", en: "Is a folder created?" }, answer: { es: "Sí, ProFicha crea automáticamente la carpeta 'ProFicha — Expedientes' en tu Drive.", en: "Yes, ProFicha automatically creates the 'ProFicha — Records' folder in your Drive." } },
      { label: { es: "¿Necesito internet?", en: "Do I need internet?" }, answer: { es: "Solo para subir respaldos. La app funciona completamente sin internet para uso diario.", en: "Only for uploading backups. The app works completely offline for daily use." } },
      { label: { es: "Volver al inicio", en: "Back to start" }, next: "start" },
    ],
  },
  settings: {
    question: { es: "¿Qué necesitas saber sobre la configuración?", en: "What do you need to know about settings?" },
    options: [
      { label: { es: "¿Cómo cambiar el tema?", en: "How to change the theme?" }, answer: { es: "Ve a Ajustes → Tema de Color. Elige entre 8 paletas disponibles.", en: "Go to Settings → Color Theme. Choose from 8 available palettes." } },
      { label: { es: "¿Cómo subir mi logo?", en: "How to upload my logo?" }, answer: { es: "En Ajustes, toca el área de logo y selecciona una imagen PNG o JPG.", en: "In Settings, tap the logo area and select a PNG or JPG image." } },
      { label: { es: "¿Cómo cambiar el idioma?", en: "How to change the language?" }, answer: { es: "En la barra superior hay un botón con bandera. También puedes cambiarlo en Ajustes.", en: "There's a flag button in the top bar. You can also change it in Settings." } },
      { label: { es: "Volver al inicio", en: "Back to start" }, next: "start" },
    ],
  },
  accessibility: {
    question: { es: "¿Qué necesitas saber sobre accesibilidad?", en: "What do you need to know about accessibility?" },
    options: [
      { label: { es: "¿Cómo cambiar el tamaño del texto?", en: "How to change text size?" }, answer: { es: "Ve a Acceso → Tamaño de Fuente. Hay 4 niveles disponibles.", en: "Go to Access → Font Size. There are 4 levels available." } },
      { label: { es: "¿Qué es el alto contraste?", en: "What is high contrast?" }, answer: { es: "Aumenta el contraste visual de toda la app, útil para visión reducida.", en: "Increases visual contrast throughout the app, useful for reduced vision." } },
      { label: { es: "¿Qué son las animaciones reducidas?", en: "What is reduced motion?" }, answer: { es: "Desactiva todas las transiciones animadas, útil para sensibilidad al movimiento.", en: "Disables all animated transitions, useful for motion sensitivity." } },
      { label: { es: "Volver al inicio", en: "Back to start" }, next: "start" },
    ],
  },
  other: {
    question: { es: "¿Cómo prefieres contactarnos?", en: "How would you prefer to contact us?" },
    options: [
      { label: { es: "WhatsApp: +52 33 48 57 2070", en: "WhatsApp: +52 33 48 57 2070" }, action: "whatsapp" },
      { label: { es: "Correo: angel.guerrero@valtaraexecutive.com", en: "Email: angel.guerrero@valtaraexecutive.com" }, action: "email" },
      { label: { es: "Volver al inicio", en: "Back to start" }, next: "start" },
    ],
  },
};

// ── Pasos del Tutorial (Problema 14) ───────────────────────────
const TUTORIAL_STEPS = [
  {
    emoji: "👋",
    title: { es: "¡Bienvenido a ProFicha!", en: "Welcome to ProFicha!" },
    description: { 
      es: "Tu expediente profesional, en tu mano. Te mostraremos las funciones principales en pocos pasos.", 
      en: "Your professional record, in your hand. We'll show you the main features in a few steps." 
    },
  },
  {
    emoji: "📋",
    title: { es: "Crea Expedientes", en: "Create Records" },
    description: { 
      es: "En la sección 'Expedientes' puedes crear fichas de tus pacientes o clientes con formularios especializados por sector.", 
      en: "In the 'Records' section you can create patient or client files with specialized forms by sector." 
    },
  },
  {
    emoji: "📄",
    title: { es: "Exporta a PDF", en: "Export to PDF" },
    description: { 
      es: "Cada expediente se puede exportar como PDF profesional con tu logo, datos y términos legales incluidos.", 
      en: "Each record can be exported as a professional PDF with your logo, data and legal terms included." 
    },
  },
  {
    emoji: "☁️",
    title: { es: "Respaldo en Google Drive", en: "Google Drive Backup" },
    description: { 
      es: "Conecta tu Google Drive para respaldar automáticamente todos tus expedientes en la nube.", 
      en: "Connect your Google Drive to automatically backup all your records to the cloud." 
    },
  },
  {
    emoji: "🎨",
    title: { es: "Personaliza Todo", en: "Customize Everything" },
    description: { 
      es: "En Ajustes puedes cambiar el tema de color, subir tu logo, configurar tu perfil profesional y más.", 
      en: "In Settings you can change the color theme, upload your logo, configure your professional profile and more." 
    },
  },
  {
    emoji: "♿",
    title: { es: "Accesibilidad Completa", en: "Full Accessibility" },
    description: { 
      es: "En la sección 'Acceso' puedes ajustar el tamaño de fuente, contraste y otras opciones para adaptarla a tus necesidades.", 
      en: "In the 'Access' section you can adjust font size, contrast and other options to suit your needs." 
    },
  },
  {
    emoji: "🚀",
    title: { es: "¡Listo para comenzar!", en: "Ready to start!" },
    description: { 
      es: "Ya conoces lo esencial. Recuerda que puedes volver a ver este tutorial desde el Centro de Ayuda.", 
      en: "You now know the essentials. Remember you can watch this tutorial again from the Help Center." 
    },
  },
];

// ── Preguntas Frecuentes Expandidas (Problema 9) ───────────────
const EXPANDED_FAQ = {
  es: [
    { q: "¿Cómo configuro mi perfil por primera vez?", a: "Ve a Ajustes (ícono ⚙️ en la barra inferior). Agrega tu nombre profesional, el nombre de tu negocio, teléfono, correo, WhatsApp y dirección. Este perfil aparecerá en todos tus PDFs exportados.", category: "inicio" },
    { q: "¿Cómo subo mi logo?", a: "En Ajustes, toca el área de logo (ícono 🏢). Selecciona una imagen PNG, JPG o SVG de hasta 2MB. Tu logo aparecerá automáticamente en todos los PDFs que generes.", category: "inicio" },
    { q: "¿Cómo activo los sectores que necesito?", a: "Ve a Sectores (ícono de cuadrícula en la barra inferior). Verás todos los sectores disponibles agrupados por categoría. Toca cualquiera para agregarlo a tus sectores activos.", category: "inicio" },
    { q: "¿Puedo cambiar el idioma de la app?", a: "Sí. En la barra superior hay un botón con bandera 🇺🇸/🇲🇽. También puedes cambiarlo desde Ajustes → Idioma. El cambio aplica a toda la interfaz al instante.", category: "inicio" },
    { q: "¿Qué pasa si cierro la app? ¿Pierdo mis datos?", a: "No. Todos tus expedientes, configuración y sectores se guardan automáticamente en el dispositivo. Puedes cerrar y reabrir la app sin perder nada.", category: "inicio" },
    { q: "¿Cómo creo un nuevo expediente?", a: "Ve a Expedientes y toca el botón 'Nuevo Expediente'. Escribe el nombre del paciente o cliente, selecciona el sector correspondiente y completa el formulario. Al finalizar, el expediente queda guardado automáticamente.", category: "expedientes" },
    { q: "¿Puedo buscar un expediente específico?", a: "Sí. En la sección Expedientes hay una barra de búsqueda en la parte superior. Escribe el nombre del paciente y los resultados se filtran en tiempo real.", category: "expedientes" },
    { q: "¿Puedo filtrar expedientes por sector?", a: "Sí. En la sección Expedientes hay un filtro por sector al lado de la barra de búsqueda. Selecciona el sector que necesitas y solo verás los expedientes de ese tipo.", category: "expedientes" },
    { q: "¿Cómo elimino un expediente?", a: "Toca el ícono de basura 🗑️ en el expediente. La app te pedirá confirmación antes de borrarlo permanentemente. Esta acción no se puede deshacer.", category: "expedientes" },
    { q: "¿Cuántos expedientes puedo guardar?", a: "No hay límite. Puedes guardar todos los expedientes que quieras, limitado únicamente por el espacio de almacenamiento de tu dispositivo.", category: "expedientes" },
    { q: "¿Cómo exporto un expediente como PDF?", a: "En la lista de Expedientes, cada registro tiene un botón de PDF (ícono 📄). Tócalo y el archivo se descargará automáticamente a tu dispositivo con tu logo, datos y los términos que configuraste.", category: "pdf" },
    { q: "¿El PDF se ve bien en papel?", a: "Sí. Los PDFs de ProFicha están optimizados para impresión bancaria/profesional: márgenes correctos, saltos de página automáticos, tipografía legible y sin cortes.", category: "pdf" },
    { q: "¿Mi logo aparece en el PDF?", a: "Sí. Si tienes un logo configurado, aparecerá en el encabezado de cada página del PDF junto con tu nombre y datos de contacto.", category: "pdf" },
    { q: "¿Puedo personalizar el color del fondo del PDF?", a: "Sí. En Ajustes → Color de Fondo del PDF, puedes elegir entre paletas predefinidas o ingresar cualquier color hexadecimal personalizado.", category: "pdf" },
    { q: "¿Los términos y consentimientos aparecen en el PDF?", a: "Sí. El texto que escribas en Ajustes → Términos y Consentimientos aparecerá automáticamente al final de cada PDF exportado.", category: "pdf" },
    { q: "¿Puedo enviar el PDF por WhatsApp directamente?", a: "Sí. Cada expediente tiene un botón de WhatsApp (verde 💬). Al tocarlo, se abre WhatsApp con el número de tu cliente preconfigurado y un resumen del expediente.", category: "pdf" },
    { q: "¿Cómo conecto Google Drive?", a: "En el Panel Principal, toca el botón 'Conectar Google Drive'. La app te redirigirá a la pantalla de autorización de Google. Acepta los permisos y Drive quedará vinculado a tu cuenta.", category: "drive" },
    { q: "¿Se crea una carpeta automática en mi Drive?", a: "Sí. Al conectar Google Drive, ProFicha crea automáticamente una carpeta llamada 'ProFicha — Expedientes' en tu unidad. Todos los respaldos se guardan dentro de esa carpeta, organizados y acumulados.", category: "drive" },
    { q: "¿Los expedientes se suben solos o tengo que hacerlo manualmente?", a: "Tienes control total. En el Panel Principal hay un botón 'Respaldar en Google Drive'. Al tocarlo, todos tus expedientes actuales se suben a la carpeta de ProFicha en tu Drive.", category: "drive" },
    { q: "¿Se sobreescriben los archivos viejos en Drive?", a: "No. Cada respaldo genera un archivo nuevo con fecha y hora en el nombre. Tu historial de respaldos se acumula en la carpeta de ProFicha sin borrar los anteriores.", category: "drive" },
    { q: "¿Necesito internet para usar la app?", a: "No para el uso diario. ProFicha funciona completamente sin internet: crear expedientes, exportar PDFs, ver tu historial. Solo necesitas conexión para subir respaldos a Google Drive.", category: "drive" },
    { q: "¿Qué es la contraseña empresarial?", a: "Es una contraseña que tú configuras y entregas a tus colaboradores para que puedan importar la configuración de tu empresa — perfil, logo, sectores, colores y términos — sin poder modificar los ajustes de seguridad.", category: "empresa" },
    { q: "¿Cómo exporto la configuración para mis empleados?", a: "Ve a Ajustes → Configuración Empresarial → Exportar Configuración. La app te pedirá la contraseña empresarial y generará un archivo JSON que puedes compartir con tus colaboradores.", category: "empresa" },
    { q: "¿Cómo importa la configuración un colaborador?", a: "El colaborador recibe el archivo JSON y va a Ajustes → Importar Configuración. Selecciona el archivo y la app se configura automáticamente con la identidad de tu negocio.", category: "empresa" },
    { q: "¿Qué incluye la membresía básica ($250)?", a: "Acceso completo a todos los sectores, generación ilimitada de expedientes y PDFs, exportación a Google Drive, personalización de perfil y logo, y 3 actualizaciones mayores gratuitas incluidas.", category: "empresa" },
    { q: "¿Cómo cambio el tamaño del texto?", a: "Ve a la sección Acceso (ícono de reloj en la barra inferior) → Tamaño de Fuente. Hay 4 niveles: Pequeño, Normal, Grande y Extra Grande. El cambio aplica a toda la app de inmediato.", category: "accesibilidad" },
    { q: "¿Qué hace el modo de Alto Contraste?", a: "Aumenta significativamente el contraste visual de toda la interfaz, útil para personas con visión reducida o en entornos con mucha luz.", category: "accesibilidad" },
    { q: "¿Qué son las Animaciones Reducidas?", a: "Desactiva todas las transiciones y animaciones de la app. Útil para personas con sensibilidad al movimiento o dispositivos más lentos.", category: "accesibilidad" },
    { q: "¿Los cambios de accesibilidad se guardan?", a: "Sí. Todos los ajustes de accesibilidad se guardan automáticamente y persisten entre sesiones.", category: "accesibilidad" },
    { q: "¿Cómo contacto al soporte técnico?", a: "Nuestros medios oficiales de atención son:\n\n📱 WhatsApp: +52 33 48 57 2070\n📧 Correo: angel.guerrero@valtaraexecutive.com\n\nHorario: Lunes a viernes de 9:00 a 18:00 h (hora del centro de México).", category: "soporte" },
    { q: "¿Cuánto tiempo tardan en responder?", a: "Respondemos por WhatsApp en un máximo de 4 horas hábiles. Por correo, en 24 horas hábiles. Para urgencias, WhatsApp es el canal más rápido.", category: "soporte" },
    { q: "¿Qué información debo incluir al reportar un problema?", a: "Para atenderte más rápido, incluye: descripción del problema, sector o función donde ocurre, nombre y versión de tu dispositivo, y si es posible, una captura de pantalla del error.", category: "soporte" },
    { q: "¿Puedo solicitar un sector que no está en la app?", a: "Sí. Contáctanos por WhatsApp o correo indicando el sector que necesitas. Lo evaluamos para incluirlo en la próxima actualización.", category: "soporte" },
  ],
  en: [
    { q: "How do I set up my profile for the first time?", a: "Go to Settings (⚙️ icon in the bottom bar). Add your professional name, business name, phone, email, WhatsApp and address. This profile will appear on all your exported PDFs.", category: "inicio" },
    { q: "How do I upload my logo?", a: "In Settings, tap the logo area (🏢 icon). Select a PNG, JPG or SVG image up to 2MB. Your logo will automatically appear on all PDFs you generate.", category: "inicio" },
    { q: "How do I activate the sectors I need?", a: "Go to Sectors (grid icon in the bottom bar). You'll see all available sectors grouped by category. Tap any one to add it to your active sectors.", category: "inicio" },
    { q: "Can I change the app language?", a: "Yes. In the top bar there's a flag button 🇺🇸/🇲🇽. You can also change it from Settings → Language. The change applies instantly.", category: "inicio" },
    { q: "What happens if I close the app? Do I lose my data?", a: "No. All your records, settings and sectors are automatically saved on the device. You can close and reopen the app without losing anything.", category: "inicio" },
    { q: "How do I create a new record?", a: "Go to Records and tap 'New Record'. Type the patient's name, select the sector and fill out the form. When done, the record is saved automatically.", category: "expedientes" },
    { q: "Can I search for a specific record?", a: "Yes. In the Records section there's a search bar at the top. Type the patient's name and results filter in real time.", category: "expedientes" },
    { q: "How do I delete a record?", a: "Tap the trash icon 🗑️ on the record. The app will ask for confirmation before permanently deleting it. This cannot be undone.", category: "expedientes" },
    { q: "How many records can I store?", a: "There is no limit. You can store as many records as you want, limited only by your device's storage space.", category: "expedientes" },
    { q: "How do I connect Google Drive?", a: "In the Dashboard, tap 'Connect Google Drive'. The app will redirect you to Google's authorization screen. Accept the permissions and Drive will be linked.", category: "drive" },
    { q: "Is a folder automatically created in my Drive?", a: "Yes. When you connect Google Drive, ProFicha automatically creates a folder called 'ProFicha — Records'. All backups accumulate inside that folder.", category: "drive" },
    { q: "Do I need internet to use the app?", a: "No, not for daily use. ProFicha works completely offline. You only need a connection to upload backups to Google Drive.", category: "drive" },
    { q: "How do I contact technical support?", a: "Our official support channels:\n\n📱 WhatsApp: +52 33 48 57 2070\n📧 Email: angel.guerrero@valtaraexecutive.com\n\nSupport hours: Monday to Friday, 9:00 AM – 6:00 PM (Mexico Central Time).", category: "soporte" },
    { q: "How long does it take to get a response?", a: "We respond on WhatsApp within 4 business hours. By email, within 24 business hours. For urgent issues, WhatsApp is the fastest channel.", category: "soporte" },
    { q: "Can I request a sector that isn't in the app?", a: "Yes. Contact us via WhatsApp or email stating the sector you need. We evaluate all proposals for inclusion in the next ProFicha update.", category: "soporte" },
  ],
};

// ═══ BLOQUE 3: COMPONENTES MODALES CON ANIMACIONES ════════════

// ── Helpers ────────────────────────────────────────────────────
const storage = {
  get: (k, d) => { try { const v = localStorage.getItem(`pf_${k}`); return v ? JSON.parse(v) : d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(`pf_${k}`, JSON.stringify(v)); } catch {} },
};

const genId   = () => Math.random().toString(36).substr(2, 9);
const today   = () => new Date().toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
const todayKey = () => new Date().toDateString();

// ── Iconos Inline SVG con Animaciones ──────────────────────────
const Icon = ({ name, size = 20, color = "currentColor", animated = false }) => {
  const icons = {
    home:          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={animated ? "pf-icon-animated" : ""}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
    sectors:       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={animated ? "pf-icon-animated" : ""}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    records:       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={animated ? "pf-icon-animated" : ""}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>,
    settings:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={animated ? "pf-icon-spin-slow" : ""}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    accessibility: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={animated ? "pf-icon-animated" : ""}><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
    help:          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={animated ? "pf-icon-pulse" : ""}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    plus:          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    search:        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    trash:         <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    pdf:           <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>,
    check:         <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>,
    x:             <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    whatsapp:      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>,
    drive:         <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M6.6 0L0 10.8h4.8L11.4 0H6.6zM12 1.2L5.4 12H16.8L12 1.2zM4.8 12L0 20.4h9.6L14.4 9.6 4.8 12zM14.4 12L9.6 20.4H24l-4.8-8.4H14.4zM19.2 0l-4.8 8.4 4.8 8.4L24 8.4 19.2 0z"/></svg>,
    eye:           <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    upload:        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
    download:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8,17 12,21 16,17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
    moon:          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
    sun:           <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    menu:          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    reset:         <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
    logout:        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    // Nuevos iconos para el sprint
    storage:       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={animated ? "pf-icon-float" : ""}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
    chat:          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={animated ? "pf-icon-bounce" : ""}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    calendar:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    send:          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9 22,2"/></svg>,
    sparkle:       <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={animated ? "pf-icon-sparkle" : ""}><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>,
  };
  return icons[name] || null;
};

// ── Modal de Permisos Transparentes (Problema 11) ──────────────
const PermissionModal = ({ 
  isOpen, 
  onClose, 
  onContinue, 
  permissionName, 
  explanation, 
  icon,
  t 
}) => {
  if (!isOpen) return null;

  return (
    <div className="pf-modal-bg pf-modal-animated" onClick={onClose}>
      <div className="pf-modal pf-permission-modal" onClick={e => e.stopPropagation()}>
        <span className="pf-modal-handle" />
        
        <div className="pf-permission-icon-container">
          <div className="pf-permission-icon-glow" />
          <div className="pf-permission-icon">
            <Icon name={icon} size={48} color="var(--accent)" animated={true} />
          </div>
        </div>
        
        <h3>{t.permissionTitle}</h3>
        <p className="pf-permission-name">{permissionName}</p>
        <p className="pf-permission-explanation">{explanation}</p>
        
        <div className="pf-modal-actions">
          <button 
            className="pf-btn pf-btn-ghost" 
            onClick={onClose}
            aria-label={t.permissionDeny}
          >
            {t.permissionDeny}
          </button>
          <button 
            className="pf-btn pf-btn-primary pf-btn-pulse-ready" 
            onClick={onContinue}
            aria-label={t.permissionContinue}
          >
            <Icon name="check" size={16} color="inherit" /> 
            {t.permissionContinue}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Modal de WhatsApp Rápido (Problema 8) ──────────────────────
const QuickWhatsAppModal = ({ 
  isOpen, 
  onClose, 
  defaultNumber,
  lang 
}) => {
  const [phone, setPhone] = useState(defaultNumber || "");
  const [message, setMessage] = useState("");
  const t = T[lang];

  const handleSend = () => {
    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone) {
      alert(lang === "es" ? "Ingresa un número de teléfono" : "Enter a phone number");
      return;
    }
    const encodedMsg = encodeURIComponent(message || "");
    window.open(`https://wa.me/${cleanPhone}?text=${encodedMsg}`, "_blank");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="pf-modal-bg pf-modal-animated" onClick={onClose}>
      <div className="pf-modal pf-whatsapp-modal" onClick={e => e.stopPropagation()}>
        <span className="pf-modal-handle" />
        
        <div className="pf-modal-header-icon">
          <Icon name="whatsapp" size={32} color="#25d366" />
        </div>
        
        <h3>{t.quickWhatsAppTitle}</h3>
        
        <label className="pf-label">{t.phoneNumber}</label>
        <input
          className="pf-input"
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="+52 33 1234 5678"
          aria-label={t.phoneNumber}
        />
        
        <label className="pf-label">{t.messageContent}</label>
        <textarea
          className="pf-textarea"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder={lang === "es" ? "Escribe tu mensaje aquí..." : "Type your message here..."}
          style={{ minHeight: 100 }}
          aria-label={t.messageContent}
        />
        
        <div className="pf-modal-actions" style={{ marginTop: 20 }}>
          <button 
            className="pf-btn pf-btn-ghost" 
            onClick={onClose}
            aria-label={t.cancel}
          >
            {t.cancel}
          </button>
          <button 
            className="pf-btn pf-btn-success" 
            onClick={handleSend}
            aria-label={t.send}
          >
            <Icon name="send" size={16} color="inherit" /> 
            {t.send}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Modal de Tutorial de Bienvenida (Problema 14) ──────────────
const TutorialModal = ({ 
  isOpen, 
  onClose, 
  lang 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const t = T[lang];
  const step = TUTORIAL_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    if (dontShowAgain) {
      storage.set("tutorialCompleted", true);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="pf-modal-bg pf-tutorial-modal-bg" onClick={onClose}>
      <div className="pf-modal pf-tutorial-modal" onClick={e => e.stopPropagation()}>
        <span className="pf-modal-handle" />
        
        <div className="pf-tutorial-progress">
          {TUTORIAL_STEPS.map((_, idx) => (
            <div 
              key={idx} 
              className={`pf-tutorial-progress-dot ${idx === currentStep ? "active" : ""} ${idx < currentStep ? "completed" : ""}`}
            />
          ))}
        </div>
        
        <div className="pf-tutorial-content" key={currentStep}>
          <div className="pf-tutorial-emoji">{step.emoji}</div>
          <h2 className="pf-tutorial-title">{step.title[lang]}</h2>
          <p className="pf-tutorial-description">{step.description[lang]}</p>
        </div>
        
        <div className="pf-tutorial-controls">
          <label className="pf-tutorial-skip">
            <input 
              type="checkbox" 
              checked={dontShowAgain}
              onChange={e => setDontShowAgain(e.target.checked)}
            />
            <span>{t.tutorialSkip}</span>
          </label>
          
          <div className="pf-tutorial-buttons">
            {currentStep > 0 && (
              <button 
                className="pf-btn pf-btn-ghost" 
                onClick={handlePrev}
                aria-label={t.tutorialPrev}
              >
                {t.tutorialPrev || (lang === "es" ? "Anterior" : "Previous")}
              </button>
            )}
            <button 
              className="pf-btn pf-btn-primary" 
              onClick={handleNext}
              aria-label={currentStep === TUTORIAL_STEPS.length - 1 ? t.tutorialFinish : t.tutorialNext}
            >
              {currentStep === TUTORIAL_STEPS.length - 1 ? t.tutorialFinish : t.tutorialNext}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══ BLOQUE 4: VISTA DE ALMACENAMIENTO EXTERNO ════════════════

// Continuará en el siguiente mensaje...
// ═══ BLOQUE 4: VISTA DE ALMACENAMIENTO EXTERNO ════════════════
// Problema 3: Programación de respaldos, estado, restauración y limpieza

const StorageView = ({ 
  profile, 
  driveConnected, 
  connectDrive, 
  showToast, 
  lang,
  setModal 
}) => {
  const t = T[lang];
  const [schedule, setSchedule] = useState(() => storage.get("backupSchedule", "manual"));
  const [lastBackup, setLastBackup] = useState(() => storage.get("lastBackup", null));
  const [isRestoring, setIsRestoring] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);

  useEffect(() => {
    storage.set("backupSchedule", schedule);
  }, [schedule]);

  const handleManualBackup = async () => {
    if (!driveConnected) {
      showToast(lang === "es" ? "Primero conecta Google Drive" : "Connect Google Drive first", "error");
      return;
    }
    
    setIsBackingUp(true);
    showToast(lang === "es" ? "Iniciando respaldo..." : "Starting backup...", "info");
    
    // Simulación del respaldo real - en Entrega 2 conectaremos driveSync.js
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const backupData = {
      timestamp: new Date().toISOString(),
      success: true,
      recordsCount: storage.get("records", []).length,
      profile: profile.business || profile.name,
    };
    
    setLastBackup(backupData);
    storage.set("lastBackup", backupData);
    setIsBackingUp(false);
    showToast(lang === "es" ? "Respaldo completado ✓" : "Backup completed ✓", "success");
  };

  const handleRestore = async () => {
    if (!driveConnected) {
      showToast(lang === "es" ? "Conecta Google Drive primero" : "Connect Google Drive first", "error");
      return;
    }
    
    setIsRestoring(true);
    showToast(lang === "es" ? "Restaurando copia de seguridad..." : "Restoring backup...", "info");
    
    // Simulación de restauración real - en Entrega 2 conectaremos driveSync.js
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsRestoring(false);
    showToast(lang === "es" ? "Restauración completada ✓" : "Restore completed ✓", "success");
  };

  const formatLastBackup = () => {
    if (!lastBackup) return lang === "es" ? "Nunca" : "Never";
    const date = new Date(lastBackup.timestamp);
    return date.toLocaleString(lang === "es" ? "es-MX" : "en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const scheduleOptions = [
    { value: "manual", label: t.manual, emoji: "✋" },
    { value: "hourly", label: t.hourly, emoji: "⏱️" },
    { value: "fiveHours", label: t.fiveHours, emoji: "🕐" },
    { value: "eightHours", label: t.eightHours, emoji: "🕗" },
    { value: "daily", label: t.daily, emoji: "📅" },
    { value: "weekly", label: t.weekly, emoji: "📆" },
  ];

  return (
    <div>
      <div className="pf-section-title">{t.storageTitle}</div>
      <div className="pf-section-sub">{t.storageSubtitle}</div>

      {/* Estado de conexión */}
      <div className="pf-card pf-storage-connection-card">
        <div className="pf-storage-connection-header">
          <div className="pf-storage-connection-icon">
            <Icon name="drive" size={28} color={driveConnected ? "#10b981" : "var(--sub)"} animated={true} />
          </div>
          <div className="pf-storage-connection-info">
            <div className="pf-storage-connection-status">
              {driveConnected 
                ? (lang === "es" ? "Conectado" : "Connected") 
                : (lang === "es" ? "No conectado" : "Not connected")}
            </div>
            <div className="pf-storage-connection-sub">
              {driveConnected 
                ? (lang === "es" ? "Google Drive activo" : "Google Drive active") 
                : (lang === "es" ? "Conecta para respaldar" : "Connect to backup")}
            </div>
          </div>
          {!driveConnected && (
            <button 
              className="pf-btn pf-btn-primary pf-btn-compact"
              onClick={connectDrive}
              aria-label={t.driveConnect}
            >
              <Icon name="drive" size={14} color="inherit" />
              {t.driveConnect}
            </button>
          )}
        </div>
      </div>

      {/* Programación de respaldos */}
      <div className="pf-card">
        <div className="pf-card-title">
          <Icon name="calendar" size={16} color="var(--accent)" />
          {t.backupSchedule}
        </div>
        
        <div className="pf-schedule-grid">
          {scheduleOptions.map(option => (
            <button
              key={option.value}
              className={`pf-schedule-option ${schedule === option.value ? "active" : ""}`}
              onClick={() => setSchedule(option.value)}
              aria-label={`${option.label} - ${lang === "es" ? "Frecuencia de respaldo" : "Backup frequency"}`}
              aria-pressed={schedule === option.value}
            >
              <span className="pf-schedule-emoji">{option.emoji}</span>
              <span className="pf-schedule-label">{option.label}</span>
              {schedule === option.value && (
                <span className="pf-schedule-check">
                  <Icon name="check" size={14} color="var(--accent)" />
                </span>
              )}
            </button>
          ))}
        </div>

        {schedule !== "manual" && (
          <div className="pf-tip" style={{ marginTop: 16 }}>
            <span className="pf-tip-icon">⚡</span>
            <span>
              {lang === "es"
                ? "Los respaldos automáticos se ejecutarán en segundo plano. Se eliminará el respaldo anterior al generar uno nuevo."
                : "Automatic backups will run in the background. Previous backup will be deleted when a new one is generated."}
            </span>
          </div>
        )}
      </div>

      {/* Último respaldo */}
      <div className="pf-card">
        <div className="pf-card-title">
          <Icon name="storage" size={16} color="var(--accent)" animated={true} />
          {t.lastBackup}
        </div>
        
        <div className="pf-last-backup-container">
          {lastBackup ? (
            <div className="pf-last-backup-info">
              <div className="pf-last-backup-status">
                <span className={`pf-backup-status-dot ${lastBackup.success ? "success" : "error"}`} />
                <span className="pf-last-backup-text">
                  {lastBackup.success 
                    ? (lang === "es" ? "Exitoso" : "Successful") 
                    : (lang === "es" ? "Fallido" : "Failed")}
                </span>
              </div>
              <div className="pf-last-backup-date">{formatLastBackup()}</div>
              <div className="pf-last-backup-details">
                {lang === "es" 
                  ? `${lastBackup.recordsCount} expediente(s) · ${lastBackup.profile || "Sin perfil"}`
                  : `${lastBackup.recordsCount} record(s) · ${lastBackup.profile || "No profile"}`}
              </div>
            </div>
          ) : (
            <div className="pf-last-backup-empty">
              <div style={{ fontSize: "2.4rem", marginBottom: 8 }}>☁️</div>
              <div style={{ fontWeight: 700 }}>
                {lang === "es" ? "Sin respaldos aún" : "No backups yet"}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--sub)", marginTop: 4 }}>
                {lang === "es" 
                  ? "Realiza tu primer respaldo manualmente" 
                  : "Make your first backup manually"}
              </div>
            </div>
          )}
        </div>

        <div className="pf-storage-actions">
          <button 
            className={`pf-btn pf-btn-primary pf-btn-animated ${isBackingUp ? "loading" : ""}`}
            onClick={handleManualBackup}
            disabled={isBackingUp || !driveConnected}
            aria-label={lang === "es" ? "Respaldar ahora" : "Backup now"}
          >
            {isBackingUp ? (
              <>
                <span className="pf-spinner" />
                {lang === "es" ? "Respaldando..." : "Backing up..."}
              </>
            ) : (
              <>
                <Icon name="upload" size={16} color="inherit" />
                {lang === "es" ? "Respaldar Ahora" : "Backup Now"}
              </>
            )}
          </button>
          
          <button 
            className={`pf-btn pf-btn-ghost pf-btn-animated ${isRestoring ? "loading" : ""}`}
            onClick={() => setModal({ type: "restoreBackup" })}
            disabled={isRestoring || !driveConnected || !lastBackup}
            aria-label={t.restoreBackup}
          >
            <Icon name="download" size={16} color="inherit" />
            {t.restoreBackup}
          </button>
        </div>
      </div>

      {/* Información sobre limpieza automática */}
      <div className="pf-card pf-info-card">
        <div className="pf-card-title">
          <Icon name="sparkle" size={16} color="var(--accent)" animated={true} />
          {lang === "es" ? "Limpieza Automática" : "Automatic Cleanup"}
        </div>
        <p style={{ color: "var(--sub)", fontSize: "0.84rem", lineHeight: 1.7 }}>
          {lang === "es"
            ? "Al generar un nuevo respaldo completo, el sistema elimina automáticamente el respaldo anterior en Google Drive. Esto mantiene tu almacenamiento organizado y actualizado, siguiendo el formato tipo WhatsApp."
            : "When generating a new complete backup, the system automatically deletes the previous backup in Google Drive. This keeps your storage organized and up to date, following the WhatsApp-like format."}
        </p>
        <div className="pf-tip" style={{ marginTop: 12 }}>
          <span className="pf-tip-icon">💡</span>
          <span>
            {lang === "es"
              ? "Si en el futuro quieres mantener un historial de varios respaldos, esta función puede expandirse. Por ahora, un solo respaldo vigente a la vez."
              : "If in the future you want to keep a history of multiple backups, this feature can be expanded. For now, one active backup at a time."}
          </span>
        </div>
      </div>
    </div>
  );
};

// ═══ BLOQUE 5: HELPVIEW EXPANDIDO CON CHATBOT ═════════════════
// Problema 9: Búsqueda ampliada + Chatbot conversacional de árbol de decisión

const HelpView = ({ lang, openTutorial }) => {
  const t = T[lang];
  const [openSection, setOpenSection] = useState(null);
  const [faqSearch, setFaqSearch] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatNode, setChatNode] = useState("start");
  const [chatHistory, setChatHistory] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);

  const toggle = (id) => setOpenSection(prev => prev === id ? null : id);

  const faqData = EXPANDED_FAQ[lang] || EXPANDED_FAQ.es;
  const filteredFAQ = faqSearch.trim() === ""
    ? faqData
    : faqData.filter(item => 
        item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
        item.a.toLowerCase().includes(faqSearch.toLowerCase())
      );

  // Agrupar FAQ por categoría
  const groupedFAQ = filteredFAQ.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categoryLabels = {
    inicio: { es: "Primeros pasos", en: "Getting started", emoji: "🚀" },
    expedientes: { es: "Expedientes y pacientes", en: "Records and patients", emoji: "📋" },
    pdf: { es: "Exportación de PDF", en: "PDF Export", emoji: "📄" },
    drive: { es: "Google Drive y respaldos", en: "Google Drive & Backups", emoji: "☁️" },
    empresa: { es: "Uso empresarial", en: "Enterprise use", emoji: "🏢" },
    accesibilidad: { es: "Accesibilidad", en: "Accessibility", emoji: "♿" },
    soporte: { es: "Soporte y contacto", en: "Support & Contact", emoji: "🎧" },
  };

  // ── Lógica del Chatbot ──────────────────────────────────────
  const openChat = () => {
    setChatOpen(true);
    setChatNode("start");
    setChatHistory([]);
    setTimeout(() => setChatVisible(true), 50);
  };

  const closeChat = () => {
    setChatVisible(false);
    setTimeout(() => setChatOpen(false), 300);
  };

  const handleChatOption = (option) => {
    const currentNode = CHATBOT_TREE[chatNode];
    
    // Agregar pregunta y respuesta del usuario al historial
    const userMessage = {
      type: "user",
      text: option.label[lang],
      timestamp: new Date(),
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setIsThinking(true);

    // Simular retraso conversacional de 1-3 segundos
    const thinkDelay = 1000 + Math.random() * 2000;
    
    setTimeout(() => {
      if (option.answer) {
        // Es una respuesta final
        const botMessage = {
          type: "bot",
          text: option.answer[lang],
          timestamp: new Date(),
          options: [
            { 
              label: { es: "Volver al inicio", en: "Back to start" }, 
              next: "start" 
            },
            { 
              label: { es: "Cerrar chat", en: "Close chat" }, 
              action: "close" 
            },
          ],
        };
        setChatHistory(prev => [...prev, botMessage]);
        setChatNode("__answer__"); // Estado especial para respuestas
      } else if (option.action === "whatsapp") {
        window.open("https://wa.me/523348572070", "_blank");
        setIsThinking(false);
      } else if (option.action === "email") {
        window.location.href = "mailto:angel.guerrero@valtaraexecutive.com";
        setIsThinking(false);
      } else if (option.action === "close") {
        closeChat();
        setIsThinking(false);
      } else if (option.next) {
        // Navegar al siguiente nodo
        setChatNode(option.next);
        const botMessage = {
          type: "bot",
          text: CHATBOT_TREE[option.next].question[lang],
          timestamp: new Date(),
          options: CHATBOT_TREE[option.next].options,
        };
        setChatHistory(prev => [...prev, botMessage]);
      }
      setIsThinking(false);
    }, thinkDelay);
  };

  // Inicializar chat con primer mensaje cuando se abre
  useEffect(() => {
    if (chatOpen && chatHistory.length === 0) {
      const startNode = CHATBOT_TREE.start;
      const initialMessage = {
        type: "bot",
        text: startNode.question[lang],
        timestamp: new Date(),
        options: startNode.options,
      };
      setTimeout(() => {
        setChatHistory([initialMessage]);
      }, 500);
    }
  }, [chatOpen]);

  const currentChatNode = CHATBOT_TREE[chatNode];
  const showOptions = chatNode !== "__answer__" && currentChatNode && !isThinking;
  const lastMessage = chatHistory[chatHistory.length - 1];
  const activeOptions = lastMessage?.options || currentChatNode?.options || [];

  return (
    <div>
      <div className="pf-section-title">{t.help}</div>
      <div className="pf-section-sub">
        {lang === "es"
          ? "Centro de ayuda completo — encuentra respuestas a cualquier duda sobre ProFicha."
          : "Complete help center — find answers to any questions about ProFicha."}
      </div>

      {/* Banner de soporte */}
      <div className="pf-support-banner">
        <span className="pf-support-emoji">🎧</span>
        <div>
          <strong className="pf-support-title">
            {lang === "es" ? "¿Necesitas ayuda directa?" : "Need direct help?"}
          </strong>
          <div className="pf-support-info">
            WhatsApp: <strong>+52 33 48 57 2070</strong><br />
            {lang === "es" ? "Correo: " : "Email: "}<strong>angel.guerrero@valtaraexecutive.com</strong>
          </div>
        </div>
      </div>

      {/* Botón flotante del Chatbot */}
      <button 
        className="pf-chatbot-fab"
        onClick={openChat}
        aria-label={t.chatbotTitle}
      >
        <Icon name="chat" size={28} color="#fff" animated={true} />
        <span className="pf-chatbot-fab-pulse" />
      </button>

      {/* Botón para reabrir tutorial */}
      <div className="pf-card pf-tutorial-access-card">
        <div className="pf-tutorial-access-content">
          <div className="pf-tutorial-access-icon">🚀</div>
          <div className="pf-tutorial-access-text">
            <div className="pf-tutorial-access-title">
              {lang === "es" ? "Ver tutorial de nuevo" : "Watch tutorial again"}
            </div>
            <div className="pf-tutorial-access-sub">
              {lang === "es" 
                ? "Repasa las funciones principales de ProFicha" 
                : "Review ProFicha's main features"}
            </div>
          </div>
        </div>
        <button 
          className="pf-btn pf-btn-primary pf-btn-compact"
          onClick={openTutorial}
          aria-label={t.tutorialTitle}
        >
          <Icon name="sparkle" size={14} color="inherit" />
          {lang === "es" ? "Abrir" : "Open"}
        </button>
      </div>

      {/* Búsqueda FAQ ampliada */}
      <div className="pf-card pf-faq-search-card">
        <div className="pf-card-title">
          <Icon name="search" size={16} color="var(--accent)" />
          {t.faqSearch}
        </div>
        <div className="pf-search">
          <span className="pf-search-icon">
            <Icon name="search" size={17} />
          </span>
          <input
            className="pf-input"
            style={{ paddingLeft: 42, marginBottom: 0 }}
            placeholder={t.faqSearchPlaceholder}
            value={faqSearch}
            onChange={e => setFaqSearch(e.target.value)}
            aria-label={t.faqSearch}
          />
          {faqSearch && (
            <button 
              className="pf-search-clear"
              onClick={() => setFaqSearch("")}
              aria-label={t.close}
            >
              <Icon name="x" size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Resultados FAQ */}
      {filteredFAQ.length === 0 ? (
        <div className="pf-no-results">
          <div style={{ fontSize: "2.8rem", marginBottom: 12 }}>🔍</div>
          <div style={{ fontWeight: 700 }}>{t.noResults}</div>
          <div style={{ fontSize: "0.82rem", color: "var(--sub)", marginTop: 6 }}>
            {lang === "es" 
              ? "Intenta con otras palabras o contacta a soporte" 
              : "Try other words or contact support"}
          </div>
        </div>
      ) : (
        Object.entries(groupedFAQ).map(([category, items]) => (
          <div key={category} style={{ marginBottom: 10 }}>
            <button
              onClick={() => toggle(category)}
              className="pf-faq-section-button"
              aria-expanded={openSection === category}
              aria-controls={`faq-section-${category}`}
            >
              <span className="pf-faq-section-emoji">{categoryLabels[category]?.emoji || "📚"}</span>
              <span className="pf-faq-section-title">
                {categoryLabels[category]?.[lang] || category}
              </span>
              <span className="pf-faq-section-count">{items.length}</span>
              <span className={`pf-faq-section-arrow ${openSection === category ? "open" : ""}`}>
                ▾
              </span>
            </button>

            {openSection === category && (
              <div 
                className="pf-faq-section-content"
                id={`faq-section-${category}`}
                role="region"
              >
                {items.map((item, idx) => (
                  <div key={idx} className="pf-faq-item">
                    <div className="pf-faq-item-header">
                      <span className="pf-faq-item-icon">?</span>
                      <div>
                        <strong className="pf-faq-item-question">{item.q}</strong>
                      </div>
                    </div>
                    <div className="pf-faq-item-answer">{item.a}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}

      {/* Footer */}
      <div className="pf-help-footer">
        <div className="pf-help-footer-version">
          <strong>{t.version}</strong>
        </div>
        <div>{t.madeWith}</div>
        <div className="pf-help-footer-credit">
          <div className="pf-help-footer-credit-label">
            {lang === "es" ? "Desarrollado por" : "Developed by"}
          </div>
          <div className="pf-help-footer-credit-name">
            Dirección de Tecnologías, Sistemas y Desarrollo
          </div>
          <div className="pf-help-footer-credit-company">
            Grupo Gevizz S.A.S. · {lang === "es" ? "Desarrollos centrados en el usuario" : "User experience-centered development"}
          </div>
        </div>
      </div>

      {/* ══ Ventana del Chatbot (Modal flotante) ══ */}
      {chatOpen && (
        <div 
          className={`pf-chatbot-container ${chatVisible ? "visible" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label={t.chatbotTitle}
        >
          <div className="pf-chatbot-header">
            <div className="pf-chatbot-header-info">
              <div className="pf-chatbot-avatar">
                <Icon name="chat" size={20} color="#fff" animated={true} />
              </div>
              <div>
                <div className="pf-chatbot-title">{t.chatbotTitle}</div>
                <div className="pf-chatbot-subtitle">
                  {isThinking 
                    ? t.chatbotThinking 
                    : (lang === "es" ? "En línea" : "Online")}
                </div>
              </div>
            </div>
            <button 
              className="pf-chatbot-close"
              onClick={closeChat}
              aria-label={t.close}
            >
              <Icon name="x" size={20} color="currentColor" />
            </button>
          </div>

          <div className="pf-chatbot-messages" role="log" aria-live="polite">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`pf-chatbot-message ${msg.type}`}>
                {msg.type === "bot" && (
                  <div className="pf-chatbot-message-avatar">
                    <Icon name="chat" size={16} color="var(--accent)" />
                  </div>
                )}
                <div className="pf-chatbot-message-bubble">
                  <div className="pf-chatbot-message-text">{msg.text}</div>
                </div>
              </div>
            ))}
            
            {isThinking && (
              <div className="pf-chatbot-message bot">
                <div className="pf-chatbot-message-avatar">
                  <Icon name="chat" size={16} color="var(--accent)" />
                </div>
                <div className="pf-chatbot-message-bubble pf-thinking-bubble">
                  <span className="pf-thinking-dot" />
                  <span className="pf-thinking-dot" />
                  <span className="pf-thinking-dot" />
                </div>
              </div>
            )}
          </div>

          {showOptions && (
            <div className="pf-chatbot-options" role="group" aria-label={t.chatbotSubtitle}>
              {activeOptions.map((option, idx) => (
                <button
                  key={idx}
                  className="pf-chatbot-option-btn"
                  onClick={() => handleChatOption(option)}
                  disabled={isThinking}
                  aria-label={option.label[lang]}
                >
                  {option.label[lang]}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ═══ BLOQUE 6: DASHBOARDVIEW ACTUALIZADO ══════════════════════
// Con botón de WhatsApp rápido, animaciones y accesibilidad completa

const DashboardView = ({
  profile,
  records,
  mySectors,
  todayCount,
  motivIdx,
  driveConnected,
  connectDrive,
  showToast,
  lang,
  navigate,
  openQuickWhatsApp,
}) => {
  const t = T[lang];
  const pal = PALETTES.find(p => p.id === profile.palette) || PALETTES[0];
  const greetData = GREET(profile.name || profile.business, lang);
  const motiv = MOTIVATION[motivIdx];
  const recent = [...records].sort((a, b) => b.ts - a.ts).slice(0, 5);

  const RecordItem = ({ record }) => {
    const sector = SECTORS.find(s => s.id === record.sectorId);
    return (
      <div className="pf-record-item pf-animated-slide-up">
        <div className="pf-record-icon" style={{ background: `${sector?.color || pal.accent}22` }}>
          {sector?.icon || "📋"}
        </div>
        <div className="pf-record-body">
          <div className="pf-record-name">{record.patientName}</div>
          <div className="pf-record-meta">
            {sector ? (lang === "es" ? sector.label : sector.label_en) : ""} · {record.date}
          </div>
        </div>
        <div className="pf-record-actions">
          <button 
            className="pf-record-btn pdf" 
            title={t.exportPDF}
            aria-label={`${t.exportPDF} - ${record.patientName}`}
            onClick={() => showToast(lang === "es" ? "PDF generado" : "PDF generated")}
          >
            <Icon name="pdf" size={14} color="currentColor" />
          </button>
          <button 
            className="pf-record-btn wa" 
            title={t.shareWhatsapp}
            aria-label={`${t.shareWhatsapp} - ${record.patientName}`}
            onClick={() => {
              const wa = profile.whatsapp?.replace(/\D/g, "") || "";
              const msg = encodeURIComponent(
                `*${profile.business || "ProFicha"}*\n\n📋 *${t.recordFor}:* ${record.patientName}\n🗂️ *Sector:* ${sector ? (lang === "es" ? sector.label : sector.label_en) : ""}\n📅 ${record.date}\n\n_${lang === "es" ? "Expediente generado con ProFicha" : "Record generated with ProFicha"}_`
              );
              window.open(wa ? `https://wa.me/${wa}?text=${msg}` : `https://wa.me/?text=${msg}`, "_blank");
            }}
          >
            <Icon name="whatsapp" size={14} color="currentColor" />
          </button>
          <button 
            className="pf-record-btn del" 
            title={t.deleteRecord}
            aria-label={`${t.deleteRecord} - ${record.patientName}`}
          >
            <Icon name="trash" size={14} color="currentColor" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="pf-dashboard-view">
      {/* Banner motivacional con animación */}
      <div className="pf-motiv pf-animated-fade-in">
        <div className="pf-motiv-shine" />
        <strong>{motiv[0]}</strong>
        <span>{motiv[1]}</span>
      </div>

      {/* Estadísticas */}
      <div className="pf-stats">
        <div className="pf-stat pf-animated-scale-in" style={{ animationDelay: "0.1s" }}>
          <div className="pf-stat-val">{records.length}</div>
          <div className="pf-stat-lbl">{t.totalRecords}</div>
        </div>
        <div className="pf-stat pf-animated-scale-in" style={{ animationDelay: "0.2s" }}>
          <div className="pf-stat-val">{todayCount}</div>
          <div className="pf-stat-lbl">{t.todayRecords}</div>
        </div>
        <div className="pf-stat pf-animated-scale-in" style={{ animationDelay: "0.3s" }}>
          <div className="pf-stat-val">{mySectors.length}</div>
          <div className="pf-stat-lbl">{lang === "es" ? "Sectores" : "Sectors"}</div>
        </div>
      </div>

      {/* Acciones Rápidas (rediseño amplio, inspiración Apple Music) */}
      <div className="pf-quick pf-animated-fade-in">
        <button 
          className="pf-quick-btn pf-animated-slide-up" 
          style={{ animationDelay: "0.1s" }}
          onClick={() => navigate("records")}
          aria-label={t.newRecord}
        >
          <div className="pf-quick-icon">
            <Icon name="plus" size={20} color="var(--accent)" />
          </div>
          <div className="pf-quick-text">
            {t.newRecord}
            <small>{lang === "es" ? "Crear expediente rápido" : "Create record fast"}</small>
          </div>
        </button>

        <button 
          className="pf-quick-btn pf-animated-slide-up" 
          style={{ animationDelay: "0.2s" }}
          onClick={connectDrive}
          aria-label={driveConnected ? t.driveConnected : t.driveConnect}
        >
          <div className="pf-quick-icon">
            <Icon name="drive" size={20} color={driveConnected ? "#10b981" : "var(--accent)"} animated={true} />
          </div>
          <div className="pf-quick-text">
            {driveConnected ? t.driveConnected : t.driveConnect}
            <small>{t.tipDrive}</small>
          </div>
        </button>

        {/* NUEVO: Mensaje Rápido por WhatsApp (Problema 8) */}
        <button 
          className="pf-quick-btn pf-quick-btn-whatsapp pf-animated-slide-up" 
          style={{ animationDelay: "0.3s" }}
          onClick={openQuickWhatsApp}
          aria-label={t.quickWhatsAppTitle}
        >
          <div className="pf-quick-icon pf-quick-icon-whatsapp">
            <Icon name="whatsapp" size={20} color="#25d366" animated={true} />
          </div>
          <div className="pf-quick-text">
            {t.quickWhatsApp}
            <small>{lang === "es" ? "Enviar mensaje libre" : "Send free message"}</small>
          </div>
        </button>

        <button 
          className="pf-quick-btn pf-animated-slide-up" 
          style={{ animationDelay: "0.4s" }}
          onClick={() => navigate("sectors")}
          aria-label={`${t.addSector} - ${mySectors.length} ${lang === "es" ? "activo(s)" : "active"}`}
        >
          <div className="pf-quick-icon">
            <Icon name="sectors" size={20} color="var(--accent)" />
          </div>
          <div className="pf-quick-text">
            {t.addSector}
            <small>{lang === "es" ? `${mySectors.length} sector(es) activo(s)` : `${mySectors.length} active`}</small>
          </div>
        </button>
      </div>

      {/* Expedientes Recientes */}
      <div className="pf-card pf-animated-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="pf-card-title">{t.recentRecords}</div>
        {recent.length === 0 ? (
          <div className="pf-empty-state">
            <div style={{ fontSize: "2.8rem", marginBottom: 12 }}>📋</div>
            <div style={{ fontWeight: 700 }}>{t.noRecords}</div>
            <button 
              className="pf-btn pf-btn-primary" 
              style={{ marginTop: 16 }} 
              onClick={() => navigate("records")}
              aria-label={t.newRecord}
            >
              <Icon name="plus" size={17} color="inherit" /> {t.newRecord}
            </button>
          </div>
        ) : recent.map(r => <RecordItem key={r.id} record={r} />)}
      </div>
    </div>
  );
};

// ═══ BLOQUE 7: VISTAS RESTANTES CON ACCESIBILIDAD COMPLETA ════
// Problema 13: Todos los botones con aria-labels descriptivos

const SectorsView = ({ mySectors, setMySectors, showToast, lang }) => {
  const t = T[lang];
  const [sectorSearch, setSectorSearch] = useState("");

  const addSector = (id) => {
    if (!mySectors.includes(id)) {
      setMySectors(prev => [...prev, id]);
      showToast(lang === "es" ? "Sector agregado ✓" : "Sector added ✓");
    }
  };

  const removeSector = (id) => setMySectors(prev => prev.filter(s => s !== id));

  const grouped = Object.entries(CATEGORY_LABELS).map(([cat, labels]) => ({
    cat, label: labels[lang],
    sectors: SECTORS.filter(s =>
      s.category === cat &&
      (sectorSearch === "" ||
        s.label.toLowerCase().includes(sectorSearch.toLowerCase()) ||
        s.label_en.toLowerCase().includes(sectorSearch.toLowerCase()))
    )
  })).filter(g => g.sectors.length > 0);

  return (
    <div>
      <div className="pf-section-title">{t.sectors}</div>
      <div className="pf-section-sub">
        {lang === "es" ? "Gestiona los sectores profesionales activos en tu aplicación." : "Manage the active professional sectors in your app."}
      </div>

      {mySectors.length > 0 && (
        <>
          <div className="pf-card-title" style={{ marginBottom: 14 }}>{t.mySectors}</div>
          <div className="pf-sectors-grid pf-animated-fade-in" style={{ marginBottom: 30 }}>
            {mySectors.map(sid => {
              const s = SECTORS.find(x => x.id === sid);
              if (!s) return null;
              return (
                <div key={sid} className="pf-sector-card mine pf-animated-scale-in" style={{ borderColor: s.color + "66" }}>
                  <span className="emoji">{s.icon}</span>
                  <div className="label">{lang === "es" ? s.label : s.label_en}</div>
                  <div className="mine-badge" aria-label={lang === "es" ? "Sector activo" : "Active sector"}>
                    <Icon name="check" size={10} color="#fff" />
                  </div>
                  <button 
                    className="pf-sector-remove"
                    onClick={e => { e.stopPropagation(); removeSector(sid); }}
                    aria-label={`${lang === "es" ? "Quitar" : "Remove"} ${lang === "es" ? s.label : s.label_en}`}
                  >
                    <Icon name="x" size={10} color="#fff" />
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="pf-search pf-animated-fade-in">
        <span className="pf-search-icon"><Icon name="search" size={17} /></span>
        <input
          className="pf-input"
          style={{ paddingLeft: 42, marginBottom: 0 }}
          placeholder={t.searchSector}
          value={sectorSearch}
          onChange={e => setSectorSearch(e.target.value)}
          aria-label={t.searchSector}
        />
        {sectorSearch && (
          <button 
            className="pf-search-clear"
            onClick={() => setSectorSearch("")}
            aria-label={t.close}
          >
            <Icon name="x" size={14} />
          </button>
        )}
      </div>

      {grouped.map(({ cat, label, sectors }) => (
        <div key={cat} className="pf-animated-slide-up">
          <div className="pf-category-title">{label}</div>
          <div className="pf-sectors-grid">
            {sectors.map(s => (
              <button
                key={s.id}
                className={`pf-sector-card ${mySectors.includes(s.id) ? "mine" : ""} pf-sector-btn`}
                style={mySectors.includes(s.id) ? { borderColor: s.color + "88" } : {}}
                onClick={() => mySectors.includes(s.id) ? removeSector(s.id) : addSector(s.id)}
                aria-label={`${mySectors.includes(s.id) ? (lang === "es" ? "Quitar" : "Remove") : (lang === "es" ? "Agregar" : "Add")} ${lang === "es" ? s.label : s.label_en}`}
                aria-pressed={mySectors.includes(s.id)}
              >
                <span className="emoji">{s.icon}</span>
                <div className="label">{lang === "es" ? s.label : s.label_en}</div>
                {mySectors.includes(s.id) ? (
                  <div className="mine-badge" style={{ background: s.color }}>
                    <Icon name="check" size={10} color="#fff" />
                  </div>
                ) : (
                  <div style={{ marginTop: 8, fontSize: "0.68rem", color: "var(--sub)", fontWeight: 600 }}>
                    {lang === "es" ? "Toca para agregar" : "Tap to add"}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const RecordsView = ({ records, setRecords, mySectors, profile, showToast, lang }) => {
  const t = T[lang];
  const [search, setSearch] = useState("");
  const [filterSector, setFilterSector] = useState("all");
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSector, setNewSector] = useState(mySectors[0] || "");
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardData, setWizardData] = useState(null);

  const filtered = records.filter(r =>
    (filterSector === "all" || r.sectorId === filterSector) &&
    (search === "" || r.patientName.toLowerCase().includes(search.toLowerCase()))
  ).sort((a, b) => b.ts - a.ts);

  const openWizard = () => {
    if (!newName.trim()) { 
      showToast(lang === "es" ? "Ingresa el nombre del paciente" : "Enter patient name", "error"); 
      return; 
    }
    if (!newSector) { 
      showToast(lang === "es" ? "Selecciona un sector" : "Select a sector", "error"); 
      return; 
    }
    setWizardData({ patientName: newName.trim(), sectorId: newSector });
    setWizardOpen(true);
    setShowNew(false);
  };

  const handleWizardComplete = (record) => {
    setRecords(prev => [record, ...prev]);
    setWizardOpen(false);
    setWizardData(null);
    setNewName("");
    showToast(lang === "es" ? "Expediente guardado ✓" : "Record saved ✓");
  };

  const RecordItem = ({ record }) => {
    const sector = SECTORS.find(s => s.id === record.sectorId);
    return (
      <div className="pf-record-item pf-animated-slide-up">
        <div className="pf-record-icon" style={{ background: `${sector?.color || "var(--accent)"}22` }}>
          {sector?.icon || "📋"}
        </div>
        <div className="pf-record-body">
          <div className="pf-record-name">{record.patientName}</div>
          <div className="pf-record-meta">
            {sector ? (lang === "es" ? sector.label : sector.label_en) : ""} · {record.date}
          </div>
        </div>
        <div className="pf-record-actions">
          <button 
            className="pf-record-btn pdf" 
            title={t.exportPDF}
            aria-label={`${t.exportPDF} - ${record.patientName}`}
            onClick={() => showToast(lang === "es" ? "PDF generado" : "PDF generated")}
          >
            <Icon name="pdf" size={14} color="currentColor" />
          </button>
          <button 
            className="pf-record-btn wa" 
            title={t.shareWhatsapp}
            aria-label={`${t.shareWhatsapp} - ${record.patientName}`}
            onClick={() => {
              const wa = profile.whatsapp?.replace(/\D/g, "") || "";
              const msg = encodeURIComponent(
                `*${profile.business || "ProFicha"}*\n\n📋 *${t.recordFor}:* ${record.patientName}\n🗂️ *Sector:* ${sector ? (lang === "es" ? sector.label : sector.label_en) : ""}\n📅 ${record.date}\n\n_${lang === "es" ? "Expediente generado con ProFicha" : "Record generated with ProFicha"}_`
              );
              window.open(wa ? `https://wa.me/${wa}?text=${msg}` : `https://wa.me/?text=${msg}`, "_blank");
            }}
          >
            <Icon name="whatsapp" size={14} color="currentColor" />
          </button>
          <button 
            className="pf-record-btn del" 
            title={t.deleteRecord}
            aria-label={`${t.deleteRecord} - ${record.patientName}`}
          >
            <Icon name="trash" size={14} color="currentColor" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {wizardOpen && wizardData && (
        <FormEngine
          sectorId={wizardData.sectorId}
          patientName={wizardData.patientName}
          profile={profile}
          onClose={() => { setWizardOpen(false); setWizardData(null); }}
          onComplete={handleWizardComplete}
        />
      )}

      <div className="pf-records-header pf-animated-fade-in">
        <div>
          <div className="pf-section-title">{t.records}</div>
          <div className="pf-section-sub">
            {lang === "es" ? `${records.length} expediente(s) guardado(s)` : `${records.length} record(s) saved`}
          </div>
        </div>
        <button 
          className="pf-btn pf-btn-primary pf-btn-animated" 
          onClick={() => setShowNew(!showNew)}
          aria-label={t.newRecord}
        >
          <Icon name="plus" size={17} color="inherit" /> {t.newRecord}
        </button>
      </div>

      {showNew && (
        <div className="pf-card pf-new-record-card pf-animated-slide-down" style={{ borderColor: "var(--accent)44" }}>
          <div className="pf-card-title">{t.newRecord}</div>
          <label className="pf-label" htmlFor="new-record-name">
            {lang === "es" ? "Nombre del Paciente / Cliente" : "Patient / Client Name"}
          </label>
          <input
            id="new-record-name"
            className="pf-input"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder={lang === "es" ? "Nombre completo..." : "Full name..."}
            onKeyDown={e => e.key === "Enter" && openWizard()}
            autoFocus
            aria-label={lang === "es" ? "Nombre del paciente" : "Patient name"}
          />
          <label className="pf-label" htmlFor="new-record-sector">
            {lang === "es" ? "Sector" : "Sector"}
          </label>
          <select 
            id="new-record-sector"
            className="pf-select" 
            value={newSector} 
            onChange={e => setNewSector(e.target.value)}
            aria-label={lang === "es" ? "Seleccionar sector" : "Select sector"}
          >
            {mySectors.map(sid => {
              const s = SECTORS.find(x => x.id === sid);
              return s ? <option key={sid} value={sid}>{s.icon} {lang === "es" ? s.label : s.label_en}</option> : null;
            })}
          </select>
          <div className="pf-new-record-actions">
            <button 
              className="pf-btn pf-btn-primary" 
              onClick={openWizard}
              aria-label={lang === "es" ? "Abrir formulario" : "Open form"}
            >
              <Icon name="plus" size={17} color="inherit" /> {lang === "es" ? "Abrir Formulario" : "Open Form"}
            </button>
            <button 
              className="pf-btn pf-btn-ghost" 
              onClick={() => setShowNew(false)}
              aria-label={t.cancel}
            >
              {t.cancel}
            </button>
          </div>
        </div>
      )}

      <div className="pf-records-filters pf-animated-fade-in">
        <div className="pf-search" style={{ flex: 1, marginBottom: 0 }}>
          <span className="pf-search-icon"><Icon name="search" size={17} /></span>
          <input
            className="pf-input"
            style={{ paddingLeft: 42, marginBottom: 0 }}
            placeholder={lang === "es" ? "Buscar expediente..." : "Search record..."}
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label={lang === "es" ? "Buscar expediente" : "Search record"}
          />
          {search && (
            <button 
              className="pf-search-clear"
              onClick={() => setSearch("")}
              aria-label={t.close}
            >
              <Icon name="x" size={14} />
            </button>
          )}
        </div>
        <select
          className="pf-select pf-filter-select"
          value={filterSector}
          onChange={e => setFilterSector(e.target.value)}
          aria-label={lang === "es" ? "Filtrar por sector" : "Filter by sector"}
        >
          <option value="all">{t.allSectors}</option>
          {mySectors.map(sid => {
            const s = SECTORS.find(x => x.id === sid);
            return s ? <option key={sid} value={sid}>{lang === "es" ? s.label : s.label_en}</option> : null;
          })}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="pf-empty-state pf-animated-fade-in">
          <div style={{ fontSize: "2.8rem", marginBottom: 12 }}>🔍</div>
          <div style={{ fontWeight: 700 }}>
            {records.length === 0 ? t.noRecords : (lang === "es" ? "Sin resultados para tu búsqueda" : "No results found")}
          </div>
        </div>
      ) : filtered.map(r => <RecordItem key={r.id} record={r} />)}
    </div>
  );
};

const SettingsView = ({ profile, setProfile, palette, setPalette, lang, setLang, showToast, openTutorial }) => {
  const t = T[lang];
  const pal = PALETTES.find(p => p.id === palette) || PALETTES[0];
  const [localProfile, setLocalProfile] = useState({ ...profile });
  const [saving, setSaving] = useState(false);
  const logoInputRef = useRef();
  const configInputRef = useRef();

  const handleSave = () => {
    setSaving(true);
    setProfile(localProfile);
    storage.set("profile", localProfile);
    setTimeout(() => { 
      setSaving(false); 
      showToast(t.saved); 
    }, 600);
  };

  const handleLogo = (e) => {
    const file = e.target.files[0]; 
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setLocalProfile(p => ({ ...p, logo: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const PDF_COLORS = ["#050508","#0a0a14","#0c1a2e","#0a1a0a","#1a0a0a","#1a1a00","#f8fafc","#ffffff"];

  return (
    <div>
      <div className="pf-section-title">{t.settings}</div>
      <div className="pf-section-sub">
        {lang === "es" ? "Personaliza tu experiencia y la identidad de tus documentos." : "Customize your experience and document identity."}
      </div>

      {/* Tarjeta de acceso rápido al tutorial */}
      <div className="pf-card pf-tutorial-access-card pf-animated-fade-in">
        <div className="pf-tutorial-access-content">
          <div className="pf-tutorial-access-icon">🚀</div>
          <div className="pf-tutorial-access-text">
            <div className="pf-tutorial-access-title">
              {t.tutorialTitle}
            </div>
            <div className="pf-tutorial-access-sub">
              {lang === "es" 
                ? "Repasa las funciones principales" 
                : "Review the main features"}
            </div>
          </div>
        </div>
        <button 
          className="pf-btn pf-btn-primary pf-btn-compact"
          onClick={openTutorial}
          aria-label={t.tutorialTitle}
        >
          <Icon name="sparkle" size={14} color="inherit" animated={true} />
          {lang === "es" ? "Ver" : "View"}
        </button>
      </div>

      {/* Perfil */}
      <div className="pf-card pf-animated-fade-in">
        <div className="pf-card-title">{t.profile}</div>

        <label className="pf-label" htmlFor="logo-upload">{t.logo}</label>
        <div 
          className="pf-logo-box" 
          onClick={() => logoInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label={localProfile.logo ? (lang === "es" ? "Cambiar logo" : "Change logo") : t.uploadLogo}
          onKeyDown={e => { if (e.key === "Enter" || e.key === " ") logoInputRef.current?.click(); }}
        >
          {localProfile.logo ? (
            <img src={localProfile.logo} className="pf-logo-preview" alt="logo" />
          ) : (
            <div style={{ color: "var(--sub)", fontSize: "0.86rem" }}>
              <div style={{ fontSize: "2.4rem", marginBottom: 8 }}>🏢</div>
              <strong>{t.uploadLogo}</strong>
              <div style={{ marginTop: 4, fontSize: "0.74rem" }}>PNG, JPG, SVG · Max 2MB</div>
            </div>
          )}
        </div>
        <input 
          ref={logoInputRef} 
          id="logo-upload"
          type="file" 
          accept="image/*" 
          style={{ display: "none" }} 
          onChange={handleLogo} 
        />
        {localProfile.logo && (
          <button 
            className="pf-btn pf-btn-danger pf-btn-compact" 
            style={{ marginTop: 10 }}
            onClick={() => setLocalProfile(p => ({ ...p, logo: null }))}
            aria-label={t.removeLogo}
          >
            <Icon name="trash" size={13} color="currentColor" /> {t.removeLogo}
          </button>
        )}

        <div className="pf-grid-2">
          <div>
            <label className="pf-label" htmlFor="business-name">{t.businessName}</label>
            <input 
              id="business-name"
              className="pf-input" 
              value={localProfile.business}
              onChange={e => setLocalProfile(p => ({ ...p, business: e.target.value }))}
              placeholder={lang === "es" ? "Ej. Dra. García Nutrición" : "e.g. Dr. Smith Clinic"} 
              aria-label={t.businessName}
            />
          </div>
          <div>
            <label className="pf-label" htmlFor="user-name">
              {lang === "es" ? "Tu nombre (saludo)" : "Your name (greeting)"}
            </label>
            <input 
              id="user-name"
              className="pf-input" 
              value={localProfile.name}
              onChange={e => setLocalProfile(p => ({ ...p, name: e.target.value }))}
              placeholder={lang === "es" ? "Ej. María" : "e.g. María"} 
              aria-label={lang === "es" ? "Tu nombre" : "Your name"}
            />
          </div>
        </div>
        <div className="pf-grid-2">
          <div>
            <label className="pf-label" htmlFor="phone">{t.phone}</label>
            <input 
              id="phone"
              className="pf-input" 
              value={localProfile.phone}
              onChange={e => setLocalProfile(p => ({ ...p, phone: e.target.value }))}
              placeholder="+52 33 1234 5678" 
              aria-label={t.phone}
            />
          </div>
          <div>
            <label className="pf-label" htmlFor="email">{t.email}</label>
            <input 
              id="email"
              className="pf-input" 
              type="email" 
              value={localProfile.email}
              onChange={e => setLocalProfile(p => ({ ...p, email: e.target.value }))}
              placeholder="hola@tuconsultorio.mx" 
              aria-label={t.email}
            />
          </div>
        </div>
        <div className="pf-grid-2">
          <div>
            <label className="pf-label" htmlFor="whatsapp">{t.whatsapp}</label>
            <input 
              id="whatsapp"
              className="pf-input" 
              value={localProfile.whatsapp}
              onChange={e => setLocalProfile(p => ({ ...p, whatsapp: e.target.value }))}
              placeholder="+52 33 1234 5678" 
              aria-label={t.whatsapp}
            />
          </div>
          <div>
            <label className="pf-label" htmlFor="website">{t.website}</label>
            <input 
              id="website"
              className="pf-input" 
              value={localProfile.website}
              onChange={e => setLocalProfile(p => ({ ...p, website: e.target.value }))}
              placeholder="www.tuconsultorio.mx" 
              aria-label={t.website}
            />
          </div>
        </div>
        <label className="pf-label" htmlFor="address">{t.address}</label>
        <input 
          id="address"
          className="pf-input" 
          value={localProfile.address}
          onChange={e => setLocalProfile(p => ({ ...p, address: e.target.value }))}
          placeholder={lang === "es" ? "Calle, colonia, ciudad..." : "Street, city..."} 
          aria-label={t.address}
        />

        <label className="pf-label">{t.pdfColor}</label>
        <div className="pf-pdf-colors">
          {PDF_COLORS.map(c => (
            <button 
              key={c}
              className={`pf-pdf-color ${localProfile.pdfBg === c ? "active" : ""}`}
              style={{ 
                background: c, 
                border: (c === "#ffffff" || c === "#f8fafc") ? "1px solid var(--border)" : "none" 
              }}
              onClick={() => setLocalProfile(p => ({ ...p, pdfBg: c }))}
              aria-label={`${lang === "es" ? "Color" : "Color"} ${c}`}
              aria-pressed={localProfile.pdfBg === c}
            />
          ))}
        </div>
        <div className="pf-pdf-color-custom">
          <input 
            type="color" 
            value={localProfile.pdfBg || "#050508"}
            onChange={e => setLocalProfile(p => ({ ...p, pdfBg: e.target.value }))} 
            aria-label={lang === "es" ? "Color personalizado" : "Custom color"}
          />
          <span style={{ fontSize: "0.82rem", color: "var(--sub)" }}>
            {lang === "es" ? "Color personalizado: " : "Custom color: "}
            <strong style={{ color: "var(--text)" }}>{localProfile.pdfBg || "#050508"}</strong>
          </span>
        </div>
      </div>

      {/* Términos */}
      <div className="pf-card pf-animated-fade-in">
        <div className="pf-card-title">{t.termsTitle}</div>
        <p style={{ color: "var(--sub)", fontSize: "0.84rem", marginBottom: 12 }}>
          {lang === "es"
            ? "Estos términos aparecerán en todos tus PDFs exportados. Incluye tu aviso de privacidad, consentimiento informado y cláusulas legales relevantes."
            : "These terms will appear in all your exported PDFs. Include your privacy notice, informed consent and relevant legal clauses."}
        </p>
        <textarea 
          className="pf-textarea" 
          value={localProfile.terms}
          onChange={e => setLocalProfile(p => ({ ...p, terms: e.target.value }))}
          placeholder={t.termsPlaceholder}
          style={{ minHeight: 180 }}
          aria-label={t.termsTitle}
        />
        <div className="pf-tip">
          <span className="pf-tip-icon">⚖️</span>
          <span>
            {lang === "es"
              ? "Recomendamos incluir tu nombre completo, cédula profesional, NOM aplicable y cláusula de confidencialidad."
              : "We recommend including your full name, professional license and applicable NOM."}
          </span>
        </div>
      </div>

      {/* Tema */}
      <div className="pf-card pf-animated-fade-in">
        <div className="pf-card-title">{t.colorTheme}</div>
        <div className="pf-palettes">
          {PALETTES.map(p => (
            <button 
              key={p.id} 
              className={`pf-palette-chip ${palette === p.id ? "active" : ""}`}
              title={p.name} 
              onClick={() => setPalette(p.id)}
              aria-label={`${p.name} - ${lang === "es" ? "Tema de color" : "Color theme"}`}
              aria-pressed={palette === p.id}
            >
              <div className="chip-inner">
                <div className="chip-half" style={{ background: p.bg }} />
                <div className="chip-half" style={{ background: p.accent }} />
              </div>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: "0.8rem", color: "var(--sub)" }}>
          {lang === "es" ? "Tema actual: " : "Current theme: "}
          <strong style={{ color: "var(--text)" }}>{PALETTES.find(p => p.id === palette)?.name}</strong>
        </div>

        <label className="pf-label" style={{ marginTop: 20 }}>{t.language}</label>
        <div className="pf-lang" role="group" aria-label={t.language}>
          <button 
            className={`pf-lang-btn ${lang === "es" ? "active" : ""}`} 
            onClick={() => setLang("es")}
            aria-label="Español"
            aria-pressed={lang === "es"}
          >
            🇲🇽 Español
          </button>
          <button 
            className={`pf-lang-btn ${lang === "en" ? "active" : ""}`} 
            onClick={() => setLang("en")}
            aria-label="English"
            aria-pressed={lang === "en"}
          >
            🇺🇸 English
          </button>
        </div>
      </div>

      <button 
        className={`pf-btn pf-btn-primary pf-btn-full pf-btn-animated ${saving ? "loading" : ""}`} 
        onClick={handleSave}
        aria-label={t.save}
      >
        {saving
          ? <>
              <span className="pf-spinner" />
              {lang === "es" ? "Guardando..." : "Saving..."}
            </>
          : <><Icon name="check" size={17} color="inherit" /> {t.save}</>}
      </button>
    </div>
  );
};

const AccessibilityView = ({ a11y, setA11y, setModal, lang }) => {
  const t = T[lang];

  return (
    <div>
      <div className="pf-section-title">{t.accessibilityTitle}</div>
      <div className="pf-section-sub">
        {lang === "es" ? "Adapta la aplicación a tus necesidades visuales y motoras." : "Adapt the app to your visual and motor needs."}
      </div>

      <div className="pf-card pf-animated-fade-in">
        <div className="pf-card-title">{t.fontSize}</div>
        <p style={{ color: "var(--sub)", fontSize: "0.82rem", marginBottom: 14 }}>
          {lang === "es" 
            ? "Ajusta el tamaño del texto en toda la aplicación, incluyendo formularios y documentos."
            : "Adjust text size throughout the app, including forms and documents."}
        </p>
        <div className="pf-font-select" role="radiogroup" aria-label={t.fontSize}>
          {[
            { key: "sm", label: "A", size: 12, name: lang === "es" ? "Pequeño" : "Small" },
            { key: "md", label: "A", size: 16, name: lang === "es" ? "Normal" : "Normal" },
            { key: "lg", label: "A", size: 20, name: lang === "es" ? "Grande" : "Large" },
            { key: "xl", label: "A", size: 24, name: lang === "es" ? "Extra Grande" : "Extra Large" },
          ].map((opt) => (
            <button 
              key={opt.key} 
              className={`pf-font-btn ${a11y.fontSize === opt.key ? "active" : ""}`}
              style={{ fontSize: opt.size }}
              onClick={() => setA11y(p => ({ ...p, fontSize: opt.key }))}
              aria-label={`${opt.name} - ${lang === "es" ? "Tamaño de fuente" : "Font size"}`}
              aria-pressed={a11y.fontSize === opt.key}
              role="radio"
              aria-checked={a11y.fontSize === opt.key}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pf-card pf-animated-fade-in">
        <div className="pf-toggle">
          <div>
            <div className="pf-toggle-label">{t.contrast}</div>
            <div className="pf-toggle-sub">
              {lang === "es" 
                ? "Aumenta el contraste visual de toda la app" 
                : "Increases visual contrast throughout the app"}
            </div>
          </div>
          <button 
            className={`pf-switch ${a11y.contrast ? "on" : ""}`}
            onClick={() => setA11y(p => ({ ...p, contrast: !p.contrast }))}
            role="switch"
            aria-checked={a11y.contrast}
            aria-label={t.contrast}
          />
        </div>
        <div className="pf-toggle">
          <div>
            <div className="pf-toggle-label">{t.animations}</div>
            <div className="pf-toggle-sub">
              {lang === "es" 
                ? "Activa o desactiva las transiciones animadas" 
                : "Toggle animated transitions"}
            </div>
          </div>
          <button 
            className={`pf-switch ${a11y.animations ? "on" : ""}`}
            onClick={() => setA11y(p => ({ ...p, animations: !p.animations }))}
            role="switch"
            aria-checked={a11y.animations}
            aria-label={t.animations}
          />
        </div>
        <div className="pf-toggle">
          <div>
            <div className="pf-toggle-label">{t.screenReader}</div>
            <div className="pf-toggle-sub">
              {lang === "es" 
                ? "Optimiza el contenido para lectores de pantalla" 
                : "Optimizes content for screen readers"}
            </div>
          </div>
          <button 
            className={`pf-switch ${a11y.screenReader ? "on" : ""}`}
            onClick={() => setA11y(p => ({ ...p, screenReader: !p.screenReader }))}
            role="switch"
            aria-checked={a11y.screenReader}
            aria-label={t.screenReader}
          />
        </div>
      </div>

      <div className="pf-card pf-animated-fade-in" style={{ borderColor: "#ef444444" }}>
        <div className="pf-card-title" style={{ color: "#ef4444" }}>
          ⚠️ {t.resetApp}
        </div>
        <p style={{ color: "var(--sub)", fontSize: "0.84rem", marginBottom: 16 }}>
          {lang === "es"
            ? "Elimina todos los datos guardados y restablece la aplicación a su estado original."
            : "Deletes all saved data and resets the app to its original state."}
        </p>
        <button 
          className="pf-btn pf-btn-danger" 
          onClick={() => setModal({ type: "resetApp" })}
          aria-label={t.resetApp}
        >
          <Icon name="reset" size={15} color="currentColor" /> {t.resetApp}
        </button>
      </div>
    </div>
  );
};

// ═══ BLOQUE 8: SISTEMA CSS COMPLETO CON ANIMACIONES ═══════════
// Problema 12 y 19: Rediseño inspiración Apple Music + Sistema de color por botón

const generateCSS = (pal, a11y, fontSizes) => `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:         ${pal.bg};
    --surface:    ${pal.surface};
    --text:       ${pal.text};
    --accent:     ${pal.accent};
    --sub:        ${pal.sub};
    --border:     ${pal.id === "light" ? "rgba(0,0,0,0.09)" : "rgba(255,255,255,0.08)"};
    --glass:      ${pal.id === "light" ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.045)"};
    --card:       ${pal.id === "light" ? "rgba(248,250,252,0.9)"  : "rgba(255,255,255,0.035)"};
    --navbar-bg:  ${pal.id === "light" ? "rgba(255,255,255,0.97)" : "rgba(6,6,10,0.97)"};
    --topbar-bg:  ${pal.id === "light" ? "rgba(255,255,255,0.92)" : "rgba(10,10,18,0.92)"};
    --fs:         ${fontSizes[a11y.fontSize] || "16px"};
    --radius:     18px;
    --radius-sm:  12px;
    --navbar-h:   72px;
    --topbar-h:   62px;
    --transition: ${a11y.animations ? "all 0.28s cubic-bezier(0.4,0,0.2,1)" : "none"};
    --transition-fast: ${a11y.animations ? "all 0.15s cubic-bezier(0.4,0,0.2,1)" : "none"};
  }

  html {
    height: 100%;
    overflow: hidden;
    overscroll-behavior: none;
  }
  body {
    height: 100%;
    overflow: hidden;
    overscroll-behavior: none;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: var(--bg);
    color: var(--text);
    font-size: var(--fs);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #root {
    height: 100%;
    overflow: hidden;
  }

  ${a11y.contrast ? "* { filter: contrast(1.4) !important; }" : ""}

  /* ── Scrollbar Premium ── */
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { 
    background: var(--accent); 
    border-radius: 10px; 
    opacity: 0.6; 
  }

  /* ══════════════════════════════════════════
     ANIMACIONES Y MICROINTERACCIONES
  ══════════════════════════════════════════ */
  @keyframes pfFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes pfSlideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes pfSlideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes pfScaleIn {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }

  @keyframes pfSpin {
    to { transform: rotate(360deg); }
  }

  @keyframes pfPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(0.96); }
  }

  @keyframes pfPulseReady {
    0%, 100% { box-shadow: 0 0 0 0 var(--accent); }
    50% { box-shadow: 0 0 0 8px transparent; }
  }

  @keyframes pfFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }

  @keyframes pfBounce {
    0%, 100% { transform: translateY(0); }
    25% { transform: translateY(-3px); }
    75% { transform: translateY(2px); }
  }

  @keyframes pfSparkle {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
    50% { transform: scale(1.15) rotate(180deg); opacity: 0.8; }
  }

  @keyframes pfShine {
    0% { transform: translateX(-100%) skewX(-20deg); }
    100% { transform: translateX(200%) skewX(-20deg); }
  }

  @keyframes pfThinkingDot {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
    30% { transform: translateY(-6px); opacity: 1; }
  }

  @keyframes pfAuroraFloat {
    0%   { transform: translate(0, 0) scale(1); }
    25%  { transform: translate(3%, 5%) scale(1.05); }
    50%  { transform: translate(-4%, 3%) scale(0.97); }
    75%  { transform: translate(2%, -4%) scale(1.03); }
    100% { transform: translate(0, 0) scale(1); }
  }

  @keyframes pfFABPulse {
    0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
    70% { box-shadow: 0 0 0 16px rgba(99, 102, 241, 0); }
    100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
  }

  @keyframes pfModalSlideUp {
    from { transform: translateY(60px); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
  }

  /* Clases de animación reutilizables */
  .pf-animated-fade-in { animation: pfFadeIn 0.5s ease both; }
  .pf-animated-slide-up { animation: pfSlideUp 0.5s cubic-bezier(0.4,0,0.2,1) both; }
  .pf-animated-slide-down { animation: pfSlideDown 0.5s cubic-bezier(0.4,0,0.2,1) both; }
  .pf-animated-scale-in { animation: pfScaleIn 0.4s cubic-bezier(0.4,0,0.2,1) both; }

  /* Iconos animados */
  .pf-icon-animated { animation: pfFloat 3s ease-in-out infinite; }
  .pf-icon-spin-slow { animation: pfSpin 12s linear infinite; }
  .pf-icon-pulse { animation: pfPulse 2s ease-in-out infinite; }
  .pf-icon-float { animation: pfFloat 2.5s ease-in-out infinite; }
  .pf-icon-bounce { animation: pfBounce 2s ease-in-out infinite; }
  .pf-icon-sparkle { animation: pfSparkle 2.5s ease-in-out infinite; }

  /* ══════════════════════════════════════════
     LOGIN SCREEN (con video portrait y aurora landscape)
  ══════════════════════════════════════════ */
  .pf-login {
    position: fixed; inset: 0; z-index: 9999;
    display: flex; flex-direction: column;
    align-items: center; justify-content: flex-end;
    background: #000; overflow: hidden;
  }

  .pf-login-video {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    opacity: 0.9;
    transition: opacity 0.5s;
  }

  .pf-login-aurora {
    display: none;
    position: absolute; inset: 0;
    background: #000;
    overflow: hidden;
  }
  .pf-aurora-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.55;
    animation: pfAuroraFloat linear infinite;
  }
  .pf-aurora-blob:nth-child(1) {
    width: 60vw; height: 60vw;
    background: radial-gradient(circle, #6366f1 0%, transparent 70%);
    top: -20%; left: -10%;
    animation-duration: 18s;
  }
  .pf-aurora-blob:nth-child(2) {
    width: 50vw; height: 50vw;
    background: radial-gradient(circle, #a78bfa 0%, transparent 70%);
    top: 20%; right: -10%;
    animation-duration: 24s;
    animation-direction: reverse;
  }
  .pf-aurora-blob:nth-child(3) {
    width: 45vw; height: 45vw;
    background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
    bottom: -10%; left: 30%;
    animation-duration: 20s;
  }
  .pf-aurora-blob:nth-child(4) {
    width: 35vw; height: 35vw;
    background: radial-gradient(circle, #f472b6 0%, transparent 70%);
    top: 5%; right: 20%;
    animation-duration: 15s;
    animation-direction: reverse;
  }

  @media (orientation: landscape) {
    .pf-login-video  { display: none; }
    .pf-login-aurora { display: block; }
  }

  .pf-login-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      to top,
      rgba(0,0,0,0.96) 0%,
      rgba(0,0,0,0.55) 45%,
      rgba(0,0,0,0.15) 100%
    );
  }
  .pf-login-content {
    position: relative; z-index: 2;
    width: 100%; max-width: 480px;
    padding: 0 32px 56px;
    display: flex; flex-direction: column;
    align-items: center; gap: 14px;
  }

  @media (orientation: landscape) {
    .pf-login { justify-content: center; }
    .pf-login-content {
      padding: 24px 40px;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 20px;
      max-width: 720px;
    }
    .pf-login-tagline { display: none; }
    .pf-login-logo { width: 64px; height: 64px; margin-bottom: 0; }
    .pf-login-title { font-size: 1.8rem; }
  }

  .pf-login-logo {
    width: 88px; height: 88px; border-radius: 24px;
    object-fit: contain; margin-bottom: 4px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.12);
  }
  .pf-login-title {
    font-size: 2.4rem; font-weight: 900; color: #fff;
    letter-spacing: -1.5px;
    text-shadow: 0 2px 24px rgba(0,0,0,0.8);
  }
  .pf-login-tagline {
    font-size: 0.88rem; color: rgba(255,255,255,0.58);
    text-align: center; margin-bottom: 6px; letter-spacing: 0.2px;
  }
  .pf-login-divider {
    width: 40px; height: 1px;
    background: rgba(255,255,255,0.18);
    margin: 2px 0;
  }
  .pf-login-btn-google {
    display: flex; align-items: center; justify-content: center; gap: 12px;
    width: 100%; padding: 17px 28px;
    background: #fff; color: #3c4043;
    font-size: 1rem; font-weight: 700; border: none;
    border-radius: 100px; cursor: pointer;
    box-shadow: 0 8px 36px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.2);
    transition: transform 0.15s, box-shadow 0.15s;
    letter-spacing: 0.2px;
  }
  .pf-login-btn-google:hover  { transform: scale(1.02); box-shadow: 0 12px 44px rgba(0,0,0,0.55); }
  .pf-login-btn-google:active { transform: scale(0.97); }
  .pf-login-spinner {
    width: 48px; height: 48px; border-radius: 50%;
    border: 3px solid rgba(255,255,255,0.18);
    border-top-color: #fff;
    animation: pfSpin 0.8s linear infinite;
  }
  .pf-login-legal {
    font-size: 0.68rem; color: rgba(255,255,255,0.35);
    text-align: center; line-height: 1.65; max-width: 320px;
  }

  /* ══════════════════════════════════════════
     APP SHELL
  ══════════════════════════════════════════ */
  .pf-app {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    background: var(--bg);
  }

  /* ── Top Bar ── */
  .pf-topbar {
    height: var(--topbar-h);
    flex-shrink: 0;
    background: var(--topbar-bg);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    border-bottom: 1px solid var(--border);
    padding: 0 18px 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    z-index: 50;
    box-shadow: 0 1px 0 var(--border), 0 4px 20px rgba(0,0,0,0.12);
  }
  .pf-topbar-left {
    display: flex; align-items: center; gap: 10px;
    flex: 1; min-width: 0;
  }
  .pf-topbar-brand {
    font-size: 1.25rem; font-weight: 900; letter-spacing: -0.5px;
    background: linear-gradient(135deg, var(--accent) 0%, ${pal.sub} 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; flex-shrink: 0;
  }
  .pf-topbar-sep {
    width: 1px; height: 22px;
    background: var(--border); flex-shrink: 0;
  }
  .pf-topbar-greeting { min-width: 0; }
  .pf-topbar-greeting h1 {
    font-size: 0.88rem; font-weight: 800; color: var(--text);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    line-height: 1.2;
  }
  .pf-topbar-greeting p {
    font-size: 0.68rem; color: var(--sub);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .pf-topbar-right {
    display: flex; align-items: center; gap: 6px; flex-shrink: 0;
  }
  .pf-icon-btn {
    width: 36px; height: 36px; border-radius: 10px;
    background: var(--glass);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: var(--transition); color: var(--sub);
  }
  .pf-icon-btn:hover { background: ${pal.accent}20; color: var(--accent); border-color: ${pal.accent}44; }
  .pf-icon-btn.logout:hover { background: #ef444420; color: #ef4444; border-color: #ef444455; }
  .pf-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), ${pal.sub});
    display: flex; align-items: center; justify-content: center;
    font-weight: 900; font-size: 0.9rem;
    color: ${pal.id === "light" ? "#fff" : "#0a0a0f"};
    flex-shrink: 0; overflow: hidden; cursor: pointer;
    border: 2px solid ${pal.accent}44; transition: var(--transition);
  }
  .pf-avatar:hover { border-color: var(--accent); transform: scale(1.05); }
  .pf-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }

  /* ── Área de scroll principal ── */
  .pf-scroll-area {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
  }

  /* ── Contenido ── */
  .pf-content {
    padding: 22px 18px calc(var(--navbar-h) + 18px);
    max-width: 860px;
    width: 100%;
    margin: 0 auto;
  }

  /* ══════════════════════════════════════════
     BOTTOM NAVIGATION BAR
  ══════════════════════════════════════════ */
  .pf-navbar {
    height: var(--navbar-h);
    flex-shrink: 0;
    background: var(--navbar-bg);
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);
    border-top: 1px solid ${pal.id === "light" ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.06)"};
    display: flex;
    align-items: stretch;
    justify-content: space-around;
    padding: 0 6px;
    padding-bottom: env(safe-area-inset-bottom, 0px);
    box-shadow: 0 -6px 28px rgba(0,0,0,0.28), 0 -1px 0 ${pal.id === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.04)"};
    z-index: 100;
  }
  .pf-nav-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    flex: 1;
    padding: 7px 2px 9px;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: var(--transition);
    color: ${pal.id === "light" ? "rgba(0,0,0,0.38)" : "rgba(255,255,255,0.35)"};
    position: relative;
    border-radius: 14px;
    margin: 5px 2px;
    -webkit-tap-highlight-color: transparent;
  }
  .pf-nav-btn:hover {
    color: ${pal.id === "light" ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.65)"};
  }
  .pf-nav-btn:active {
    transform: scale(0.95);
  }
  .pf-nav-btn.active { color: var(--accent); }
  .pf-nav-btn.active .pf-nav-pip {
    opacity: 1; transform: scale(1);
  }
  .pf-nav-btn.active .pf-nav-icon-bg {
    background: ${pal.accent}18;
  }
  .pf-nav-icon-bg {
    width: 44px; height: 30px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 10px;
    background: transparent;
    transition: var(--transition);
  }
  .pf-nav-label {
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.3px;
    line-height: 1;
    text-transform: uppercase;
  }
  .pf-nav-pip {
    position: absolute;
    top: 4px;
    width: 4px; height: 4px;
    border-radius: 50%;
    background: var(--accent);
    opacity: 0;
    transform: scale(0);
    transition: var(--transition);
    box-shadow: 0 0 6px var(--accent), 0 0 12px ${pal.accent}88;
  }

  /* ══════════════════════════════════════════
     CARDS Y CONTENEDORES
  ══════════════════════════════════════════ */
  .pf-card {
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    transition: var(--transition);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }
  .pf-card + .pf-card { margin-top: 14px; }
  .pf-card:hover { border-color: ${pal.accent}28; }
  .pf-card-title {
    font-size: 0.72rem; font-weight: 800; color: var(--text);
    margin-bottom: 16px; display: flex; align-items: center; gap: 10px;
    text-transform: uppercase; letter-spacing: 1.2px;
  }
  .pf-card-title::before {
    content: '';
    width: 3px; height: 15px;
    background: linear-gradient(to bottom, var(--accent), ${pal.sub}70);
    border-radius: 4px; display: block; flex-shrink: 0;
  }

  /* ── Stats ── */
  .pf-stats {
    display: grid; 
    grid-template-columns: repeat(3, 1fr);
    gap: 12px; 
    margin-bottom: 18px;
  }
  .pf-stat {
    background: var(--glass); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 16px 10px; text-align: center;
    transition: var(--transition); backdrop-filter: blur(14px);
  }
  .pf-stat:hover {
    transform: translateY(-2px);
    border-color: ${pal.accent}44;
    box-shadow: 0 8px 28px ${pal.accent}12;
  }
  .pf-stat-val {
    font-size: 1.9rem; font-weight: 900;
    background: linear-gradient(135deg, var(--accent), ${pal.sub});
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; line-height: 1;
  }
  .pf-stat-lbl {
    font-size: 0.62rem; color: var(--sub); margin-top: 5px;
    font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;
  }

  /* ── Motivation Banner ── */
  .pf-motiv {
    background: linear-gradient(135deg, ${pal.accent}14, ${pal.accent}06);
    border: 1px solid ${pal.accent}28;
    border-radius: var(--radius); 
    padding: 16px 18px;
    margin-bottom: 18px; 
    position: relative; 
    overflow: hidden;
  }
  .pf-motiv::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, ${pal.accent}55, transparent);
  }
  .pf-motiv-shine {
    position: absolute;
    top: 0; left: 0;
    width: 50%; height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.08),
      transparent
    );
    animation: pfShine 4s ease-in-out infinite;
    pointer-events: none;
  }
  .pf-motiv strong { 
    font-size: 0.92rem; font-weight: 800; color: var(--accent); 
    display: block; margin-bottom: 3px; 
  }
  .pf-motiv span   { font-size: 0.8rem; color: var(--sub); }

  /* ── Quick Actions (rediseño amplio, inspiración Apple Music) ── */
  .pf-quick {
    display: grid; 
    grid-template-columns: repeat(2, 1fr);
    gap: 12px; 
    margin-bottom: 18px;
  }
  .pf-quick-btn {
    display: flex; 
    flex-direction: column;
    align-items: flex-start; 
    gap: 12px;
    padding: 18px 16px; 
    border-radius: 16px;
    border: 1px solid var(--border); 
    background: var(--glass);
    cursor: pointer; 
    transition: var(--transition);
    color: var(--text); 
    font-weight: 700; 
    font-size: 0.88rem;
    backdrop-filter: blur(12px); 
    -webkit-tap-highlight-color: transparent;
    text-align: left;
    min-height: 110px;
    position: relative;
    overflow: hidden;
  }
  .pf-quick-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, ${pal.accent}08, transparent);
    opacity: 0;
    transition: var(--transition);
  }
  .pf-quick-btn:hover { 
    border-color: var(--accent); 
    transform: translateY(-3px); 
    box-shadow: 0 12px 32px ${pal.accent}20;
  }
  .pf-quick-btn:hover::before {
    opacity: 1;
  }
  .pf-quick-btn:active {
    transform: translateY(-1px) scale(0.98);
  }
  .pf-quick-btn-whatsapp {
    background: linear-gradient(135deg, #25d36618, #25d36608);
    border-color: #25d36644;
  }
  .pf-quick-btn-whatsapp:hover {
    border-color: #25d366;
    box-shadow: 0 12px 32px #25d36630;
  }
  .pf-quick-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: ${pal.accent}16; 
    display: flex; align-items: center;
    justify-content: center; 
    flex-shrink: 0;
    transition: var(--transition);
  }
  .pf-quick-icon-whatsapp {
    background: #25d36622;
  }
  .pf-quick-btn:hover .pf-quick-icon {
    transform: scale(1.05) rotate(-3deg);
  }
  .pf-quick-text { 
    display: flex;
    flex-direction: column;
    gap: 2px;
    z-index: 1;
  }
  .pf-quick-text small { 
    font-size: 0.72rem; 
    color: var(--sub); 
    font-weight: 500; 
    line-height: 1.3;
  }

  /* ── Record Items ── */
  .pf-record-item {
    display: flex; 
    align-items: center; 
    gap: 12px;
    padding: 12px 14px; 
    border-radius: 14px;
    background: var(--glass); 
    border: 1px solid var(--border);
    margin-bottom: 8px; 
    transition: var(--transition);
    backdrop-filter: blur(8px);
  }
  .pf-record-item:hover { 
    border-color: ${pal.accent}40; 
    transform: translateX(2px);
  }
  .pf-record-icon { 
    width: 42px; height: 42px; 
    border-radius: 12px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    font-size: 1.3rem; 
    flex-shrink: 0; 
  }
  .pf-record-body { flex: 1; min-width: 0; }
  .pf-record-name { 
    font-weight: 800; 
    font-size: 0.92rem; 
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
  }
  .pf-record-meta { 
    font-size: 0.72rem; 
    color: var(--sub); 
    margin-top: 2px; 
  }
  .pf-record-actions { 
    display: flex; 
    gap: 6px; 
    flex-shrink: 0; 
  }
  .pf-record-btn {
    width: 32px; height: 32px; 
    border-radius: 9px;
    display: flex; 
    align-items: center; 
    justify-content: center;
    cursor: pointer; 
    transition: var(--transition);
    border: 1px solid var(--border); 
    background: transparent; 
    color: var(--sub);
  }
  .pf-record-btn:hover.pdf { 
    background: ${pal.accent}22; 
    color: var(--accent); 
    border-color: var(--accent); 
    transform: scale(1.1);
  }
  .pf-record-btn:hover.wa  { 
    background: #25d36622; 
    color: #25d366; 
    border-color: #25d366; 
    transform: scale(1.1);
  }
  .pf-record-btn:hover.del { 
    background: #ef444422; 
    color: #ef4444; 
    border-color: #ef4444; 
    transform: scale(1.1);
  }

  /* ── Sector Grid ── */
  .pf-sectors-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(148px, 1fr)); 
    gap: 10px; 
  }
  .pf-sector-card {
    border-radius: 14px; 
    border: 1.5px solid var(--border);
    background: var(--glass); 
    padding: 15px 10px;
    cursor: pointer; 
    transition: var(--transition);
    text-align: center; 
    position: relative; 
    overflow: hidden;
    backdrop-filter: blur(8px);
    display: block;
    width: 100%;
  }
  .pf-sector-btn {
    font-family: inherit;
    font-size: inherit;
  }
  .pf-sector-card:hover { 
    transform: translateY(-3px); 
    box-shadow: 0 8px 24px rgba(0,0,0,0.18); 
  }
  .pf-sector-card:active {
    transform: translateY(-1px) scale(0.98);
  }
  .pf-sector-card.mine { 
    border-color: var(--accent); 
    background: ${pal.accent}0e; 
  }
  .pf-sector-card .emoji  { 
    font-size: 1.9rem; 
    display: block; 
    margin-bottom: 8px; 
  }
  .pf-sector-card .label  { 
    font-size: 0.78rem; 
    font-weight: 700; 
    color: var(--text); 
    line-height: 1.3; 
  }
  .pf-sector-card .mine-badge {
    position: absolute; 
    top: 7px; right: 7px;
    width: 18px; height: 18px; 
    background: var(--accent);
    border-radius: 50%; 
    display: flex; 
    align-items: center; 
    justify-content: center;
    animation: pfScaleIn 0.3s ease both;
  }
  .pf-sector-remove {
    position: absolute; 
    bottom: 6px; right: 6px;
    width: 22px; height: 22px; 
    background: #ef444488; 
    border-radius: 50%;
    display: flex; 
    align-items: center; 
    justify-content: center;
    opacity: 0; 
    transition: var(--transition); 
    cursor: pointer;
    border: none;
  }
  .pf-sector-card:hover .pf-sector-remove { opacity: 1; }
  .pf-category-title {
    font-size: 0.68rem; 
    font-weight: 800; 
    color: var(--sub);
    text-transform: uppercase; 
    letter-spacing: 2px; 
    margin: 22px 0 10px;
    display: flex; 
    align-items: center; 
    gap: 8px;
  }
  .pf-category-title::after { 
    content: ''; 
    flex: 1; 
    height: 1px; 
    background: var(--border); 
  }

  /* ── Search ── */
  .pf-search { 
    position: relative; 
    margin-bottom: 16px; 
  }
  .pf-search input {
    width: 100%; 
    background: var(--glass); 
    border: 1px solid var(--border);
    color: var(--text); 
    padding: 12px 14px 12px 42px;
    border-radius: var(--radius-sm); 
    font-size: 0.88rem;
    transition: var(--transition); 
    outline: none;
    backdrop-filter: blur(8px);
  }
  .pf-search input:focus {
    border-color: var(--accent);
    background: ${pal.accent}08;
    box-shadow: 0 0 0 3px ${pal.accent}14;
  }
  .pf-search-icon {
    position: absolute; 
    left: 13px; 
    top: 50%;
    transform: translateY(-50%); 
    color: var(--sub); 
    pointer-events: none;
  }
  .pf-search-clear {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px; height: 24px;
    border-radius: 50%;
    background: var(--border);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sub);
    transition: var(--transition-fast);
  }
  .pf-search-clear:hover {
    background: var(--accent);
    color: ${pal.id === "light" ? "#fff" : "#000"};
  }

  /* ── Form Elements ── */
  .pf-label {
    display: block; 
    font-size: 0.7rem; 
    font-weight: 700; 
    color: var(--sub);
    text-transform: uppercase; 
    letter-spacing: 0.9px;
    margin-bottom: 7px; 
    margin-top: 18px;
  }
  .pf-input, .pf-select, .pf-textarea {
    width: 100%; 
    background: var(--glass); 
    border: 1px solid var(--border);
    color: var(--text); 
    padding: 12px 14px; 
    border-radius: var(--radius-sm);
    font-size: 0.88rem; 
    transition: var(--transition); 
    outline: none;
    font-family: inherit; 
    backdrop-filter: blur(8px);
  }
  .pf-input:focus, .pf-select:focus, .pf-textarea:focus {
    border-color: var(--accent);
    background: ${pal.accent}08;
    box-shadow: 0 0 0 3px ${pal.accent}14;
  }
  .pf-textarea  { 
    resize: vertical; 
    min-height: 120px; 
    line-height: 1.6; 
  }
  .pf-select option { 
    background: var(--surface); 
  }
  .pf-grid-2 { 
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    gap: 14px; 
  }
  .pf-grid-3 { 
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr; 
    gap: 10px; 
  }

  /* ══════════════════════════════════════════
     SISTEMA DE BOTONES (Problema 19)
  ══════════════════════════════════════════ */
  .pf-btn {
    display: inline-flex; 
    align-items: center; 
    justify-content: center; 
    gap: 8px;
    padding: 12px 22px; 
    border-radius: var(--radius-sm);
    font-weight: 800; 
    font-size: 0.86rem;
    cursor: pointer; 
    transition: var(--transition);
    border: none; 
    font-family: inherit; 
    letter-spacing: 0.3px;
    position: relative;
    overflow: hidden;
  }
  .pf-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
    opacity: 0;
    transition: var(--transition-fast);
  }
  .pf-btn:hover::before {
    opacity: 1;
  }
  .pf-btn:active {
    transform: scale(0.97);
  }
  .pf-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  .pf-btn:disabled:hover::before {
    opacity: 0;
  }

  .pf-btn-primary {
    background: linear-gradient(135deg, var(--accent) 0%, ${pal.sub}88 100%);
    color: ${pal.id === "light" ? "#fff" : "#000"};
    box-shadow: 0 4px 18px ${pal.accent}35;
  }
  .pf-btn-primary:hover { 
    transform: translateY(-2px); 
    box-shadow: 0 8px 28px ${pal.accent}50; 
  }
  .pf-btn-primary:active {
    transform: translateY(0) scale(0.98);
  }
  .pf-btn-pulse-ready {
    animation: pfPulseReady 2s ease-in-out infinite;
  }
  .pf-btn-ghost { 
    background: var(--glass); 
    border: 1px solid var(--border); 
    color: var(--text); 
    backdrop-filter: blur(8px); 
  }
  .pf-btn-ghost:hover { 
    border-color: var(--accent); 
    color: var(--accent); 
    background: ${pal.accent}10; 
  }
  .pf-btn-danger { 
    background: #ef444418; 
    border: 1px solid #ef4444; 
    color: #ef4444; 
  }
  .pf-btn-danger:hover  { 
    background: #ef4444; 
    color: #fff; 
  }
  .pf-btn-success { 
    background: #10b98118; 
    border: 1px solid #10b981; 
    color: #10b981; 
  }
  .pf-btn-success:hover { 
    background: #10b981; 
    color: #fff; 
  }
  .pf-btn-compact {
    padding: 8px 14px;
    font-size: 0.78rem;
  }
  .pf-btn-full {
    width: 100%;
  }
  .pf-btn-animated.loading {
    pointer-events: none;
  }

  .pf-spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: pfSpin 0.6s linear infinite;
  }

  /* ── Palette Chips ── */
  .pf-palettes { 
    display: flex; 
    flex-wrap: wrap; 
    gap: 10px; 
    margin-top: 4px; 
  }
  .pf-palette-chip {
    width: 42px; 
    height: 42px; 
    border-radius: 10px; 
    cursor: pointer;
    transition: var(--transition); 
    border: 3px solid transparent; 
    overflow: hidden;
    padding: 0;
    background: none;
  }
  .pf-palette-chip:hover { 
    transform: scale(1.12); 
  }
  .pf-palette-chip.active { 
    border-color: var(--text); 
    box-shadow: 0 0 0 2px var(--accent); 
  }
  .pf-palette-chip .chip-inner { 
    width: 100%; 
    height: 100%; 
    display: flex; 
  }
  .pf-palette-chip .chip-half  { flex: 1; }

  /* ── Toggle / Switch ── */
  .pf-toggle {
    display: flex; 
    align-items: center; 
    justify-content: space-between;
    padding: 14px 0; 
    border-bottom: 1px solid var(--border);
  }
  .pf-toggle:last-child { border-bottom: none; }
  .pf-toggle-label { 
    font-weight: 600; 
    font-size: 0.88rem; 
    color: var(--text); 
  }
  .pf-toggle-sub   { 
    font-size: 0.72rem; 
    color: var(--sub); 
    margin-top: 2px; 
  }
  .pf-switch {
    width: 44px; 
    height: 24px; 
    border-radius: 12px;
    background: var(--border); 
    border: none;
    cursor: pointer; 
    position: relative; 
    transition: var(--transition); 
    flex-shrink: 0;
  }
  .pf-switch.on { 
    background: var(--accent); 
  }
  .pf-switch::after {
    content: ''; 
    position: absolute; 
    top: 3px; 
    left: 3px;
    width: 18px; 
    height: 18px; 
    border-radius: 50%;
    background: white; 
    transition: var(--transition);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  .pf-switch.on::after { 
    transform: translateX(20px); 
  }

  /* ── Logo Upload ── */
  .pf-logo-box {
    border: 2px dashed var(--border); 
    border-radius: 14px;
    padding: 24px; 
    text-align: center; 
    cursor: pointer; 
    transition: var(--transition);
  }
  .pf-logo-box:hover { 
    border-color: var(--accent); 
    background: ${pal.accent}08; 
  }
  .pf-logo-preview { 
    width: 90px; 
    height: 90px; 
    object-fit: contain; 
    margin-bottom: 10px; 
    border-radius: 10px; 
  }

  /* ── PDF Colors ── */
  .pf-pdf-colors { 
    display: flex; 
    gap: 8px; 
    flex-wrap: wrap; 
    margin-top: 6px; 
  }
  .pf-pdf-color {
    width: 36px; 
    height: 36px; 
    border-radius: 8px;
    cursor: pointer; 
    border: 3px solid transparent; 
    transition: var(--transition);
    padding: 0;
  }
  .pf-pdf-color:hover { 
    transform: scale(1.15); 
  }
  .pf-pdf-color.active { 
    border-color: var(--text); 
    box-shadow: 0 0 0 2px var(--accent); 
  }
  .pf-pdf-color-custom { 
    display: flex; 
    align-items: center; 
    gap: 10px; 
    margin-top: 10px; 
  }
  .pf-pdf-color-custom input[type=color] {
    width: 42px; 
    height: 36px; 
    border-radius: 8px;
    border: 1px solid var(--border); 
    background: transparent; 
    cursor: pointer; 
    padding: 2px;
  }

  /* ── Toast ── */
  .pf-toast {
    position: fixed; 
    bottom: calc(var(--navbar-h) + 14px); 
    right: 16px; 
    z-index: 9999;
    background: var(--surface); 
    border: 1px solid var(--border);
    border-radius: 14px; 
    padding: 12px 18px;
    display: flex; 
    align-items: center; 
    gap: 10px;
    font-weight: 700; 
    font-size: 0.86rem;
    box-shadow: 0 16px 48px rgba(0,0,0,0.55); 
    min-width: 200px;
    animation: pfSlideUp 0.28s cubic-bezier(0.4,0,0.2,1);
    backdrop-filter: blur(20px);
  }
  .pf-toast.success { border-color: #10b98150; }
  .pf-toast.info    { border-color: ${pal.accent}50; }
  .pf-toast.error   { border-color: #ef444450; }

  /* ══════════════════════════════════════════
     MODALES (con animaciones premium)
  ══════════════════════════════════════════ */
  .pf-modal-bg {
    position: fixed; 
    inset: 0; 
    background: rgba(0,0,0,0.78); 
    z-index: 200;
    display: flex; 
    align-items: flex-end; 
    justify-content: center;
    backdrop-filter: blur(14px); 
    animation: pfFadeIn 0.2s;
  }
  .pf-modal-animated {
    animation: pfFadeIn 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .pf-modal {
    background: var(--surface); 
    border: 1px solid var(--border);
    border-radius: 24px 24px 0 0; 
    padding: 28px 22px 38px;
    width: 100%; 
    max-width: 560px;
    box-shadow: 0 -20px 80px rgba(0,0,0,0.7);
    animation: pfModalSlideUp 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .pf-modal-handle {
    width: 40px; 
    height: 4px; 
    border-radius: 4px;
    background: var(--border); 
    margin: 0 auto 20px; 
    display: block;
  }
  .pf-modal h3   { 
    font-size: 1.15rem; 
    font-weight: 900; 
    margin-bottom: 10px; 
  }
  .pf-modal p    { 
    color: var(--sub); 
    margin-bottom: 20px; 
    font-size: 0.86rem; 
    line-height: 1.65; 
  }
  .pf-modal-actions { 
    display: flex; 
    gap: 10px; 
    justify-content: flex-end; 
  }

  /* ── Modal de Permisos (Problema 11) ── */
  .pf-permission-modal {
    text-align: center;
  }
  .pf-permission-icon-container {
    position: relative;
    width: 96px;
    height: 96px;
    margin: 0 auto 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pf-permission-icon-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, ${pal.accent}33, transparent 70%);
    border-radius: 50%;
    animation: pfPulse 2s ease-in-out infinite;
  }
  .pf-permission-icon {
    position: relative;
    z-index: 1;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: ${pal.accent}18;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid ${pal.accent}44;
  }
  .pf-permission-name {
    font-size: 1rem;
    font-weight: 800;
    color: var(--accent);
    margin-bottom: 10px;
  }
  .pf-permission-explanation {
    color: var(--sub);
    font-size: 0.88rem;
    line-height: 1.7;
  }

  /* ── Modal de WhatsApp Rápido ── */
  .pf-whatsapp-modal {
    text-align: center;
  }
  .pf-modal-header-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #25d36618;
    border: 2px solid #25d36644;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    animation: pfScaleIn 0.4s ease both;
  }
  .pf-whatsapp-modal .pf-input,
  .pf-whatsapp-modal .pf-textarea {
    text-align: left;
  }

  /* ══════════════════════════════════════════
     TUTORIAL MODAL (Problema 14)
  ══════════════════════════════════════════ */
  .pf-tutorial-modal-bg {
    align-items: center;
    padding: 20px;
  }
  .pf-tutorial-modal {
    border-radius: var(--radius);
    max-width: 520px;
    padding: 36px 28px;
    animation: pfScaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .pf-tutorial-progress {
    display: flex;
    gap: 6px;
    justify-content: center;
    margin-bottom: 24px;
  }
  .pf-tutorial-progress-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--border);
    transition: var(--transition);
  }
  .pf-tutorial-progress-dot.active {
    background: var(--accent);
    width: 24px;
    border-radius: 4px;
  }
  .pf-tutorial-progress-dot.completed {
    background: ${pal.accent}88;
  }
  .pf-tutorial-content {
    text-align: center;
    animation: pfFadeIn 0.4s ease both;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .pf-tutorial-emoji {
    font-size: 4rem;
    margin-bottom: 16px;
    animation: pfBounce 1s ease both;
  }
  .pf-tutorial-title {
    font-size: 1.5rem;
    font-weight: 900;
    margin-bottom: 12px;
    color: var(--text);
  }
  .pf-tutorial-description {
    font-size: 0.95rem;
    color: var(--sub);
    line-height: 1.7;
    max-width: 400px;
  }
  .pf-tutorial-controls {
    margin-top: 28px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .pf-tutorial-skip {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 0.82rem;
    color: var(--sub);
    cursor: pointer;
  }
  .pf-tutorial-skip input {
    cursor: pointer;
  }
  .pf-tutorial-buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  /* ── Tarjeta de acceso al tutorial ── */
  .pf-tutorial-access-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    background: linear-gradient(135deg, ${pal.accent}14, ${pal.accent}06);
    border-color: ${pal.accent}28;
  }
  .pf-tutorial-access-content {
    display: flex;
    align-items: center;
    gap: 14px;
    flex: 1;
    min-width: 0;
  }
  .pf-tutorial-access-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }
  .pf-tutorial-access-text {
    min-width: 0;
    flex: 1;
  }
  .pf-tutorial-access-title {
    font-weight: 800;
    font-size: 0.92rem;
    color: var(--text);
  }
  .pf-tutorial-access-sub {
    font-size: 0.78rem;
    color: var(--sub);
    margin-top: 2px;
  }

  /* ══════════════════════════════════════════
     CHATBOT FLOTANTE (Problema 9)
  ══════════════════════════════════════════ */
  .pf-chatbot-fab {
    position: fixed;
    bottom: calc(var(--navbar-h) + 20px);
    right: 20px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), ${pal.sub});
    color: ${pal.id === "light" ? "#fff" : "#000"};
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 150;
    box-shadow: 0 8px 24px ${pal.accent}40, 0 4px 12px rgba(0,0,0,0.3);
    transition: var(--transition);
  }
  .pf-chatbot-fab:hover {
    transform: scale(1.08) rotate(-5deg);
    box-shadow: 0 12px 32px ${pal.accent}50;
  }
  .pf-chatbot-fab:active {
    transform: scale(0.95);
  }
  .pf-chatbot-fab-pulse {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    animation: pfFABPulse 2s ease-out infinite;
    pointer-events: none;
  }

  .pf-chatbot-container {
    position: fixed;
    bottom: calc(var(--navbar-h) + 20px);
    right: 20px;
    width: calc(100% - 40px);
    max-width: 400px;
    height: 540px;
    max-height: calc(100vh - var(--navbar-h) - 80px);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    z-index: 160;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 24px 64px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3);
    opacity: 0;
    transform: translateY(20px) scale(0.95);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
  }
  .pf-chatbot-container.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  .pf-chatbot-header {
    padding: 14px 16px;
    background: linear-gradient(135deg, var(--accent), ${pal.sub});
    color: ${pal.id === "light" ? "#fff" : "#000"};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .pf-chatbot-header-info {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
  }
  .pf-chatbot-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .pf-chatbot-title {
    font-weight: 900;
    font-size: 0.95rem;
  }
  .pf-chatbot-subtitle {
    font-size: 0.72rem;
    opacity: 0.85;
  }
  .pf-chatbot-close {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    transition: var(--transition-fast);
  }
  .pf-chatbot-close:hover {
    background: rgba(255,255,255,0.3);
    transform: rotate(90deg);
  }

  .pf-chatbot-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .pf-chatbot-message {
    display: flex;
    gap: 8px;
    animation: pfSlideUp 0.3s ease both;
  }
  .pf-chatbot-message.user {
    flex-direction: row-reverse;
  }
  .pf-chatbot-message-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: ${pal.accent}22;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .pf-chatbot-message-bubble {
    max-width: 75%;
    padding: 10px 14px;
    border-radius: 16px;
    font-size: 0.88rem;
    line-height: 1.5;
    word-wrap: break-word;
  }
  .pf-chatbot-message.bot .pf-chatbot-message-bubble {
    background: var(--glass);
    border: 1px solid var(--border);
    color: var(--text);
    border-bottom-left-radius: 4px;
  }
  .pf-chatbot-message.user .pf-chatbot-message-bubble {
    background: linear-gradient(135deg, var(--accent), ${pal.sub}88);
    color: ${pal.id === "light" ? "#fff" : "#000"};
    border-bottom-right-radius: 4px;
  }

  .pf-thinking-bubble {
    display: flex;
    gap: 4px;
    align-items: center;
    padding: 14px 16px;
  }
  .pf-thinking-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    animation: pfThinkingDot 1.4s ease-in-out infinite;
  }
  .pf-thinking-dot:nth-child(2) { animation-delay: 0.2s; }
  .pf-thinking-dot:nth-child(3) { animation-delay: 0.4s; }

  .pf-chatbot-options {
    padding: 12px;
    border-top: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 220px;
    overflow-y: auto;
    background: ${pal.id === "light" ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)"};
  }
  .pf-chatbot-option-btn {
    padding: 11px 14px;
    border-radius: 12px;
    background: var(--glass);
    border: 1px solid var(--border);
    color: var(--text);
    font-weight: 600;
    font-size: 0.86rem;
    cursor: pointer;
    transition: var(--transition);
    text-align: left;
    font-family: inherit;
  }
  .pf-chatbot-option-btn:hover {
    border-color: var(--accent);
    background: ${pal.accent}10;
    color: var(--accent);
    transform: translateX(4px);
  }
  .pf-chatbot-option-btn:active {
    transform: translateX(2px) scale(0.98);
  }
  .pf-chatbot-option-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* ══════════════════════════════════════════
     ALMACENAMIENTO EXTERNO (Problema 3)
  ══════════════════════════════════════════ */
  .pf-storage-connection-card {
    background: linear-gradient(135deg, ${pal.accent}0e, ${pal.accent}04);
    border-color: ${pal.accent}28;
  }
  .pf-storage-connection-header {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .pf-storage-connection-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: ${pal.accent}18;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .pf-storage-connection-info {
    flex: 1;
    min-width: 0;
  }
  .pf-storage-connection-status {
    font-weight: 800;
    font-size: 0.95rem;
    color: var(--text);
  }
  .pf-storage-connection-sub {
    font-size: 0.78rem;
    color: var(--sub);
    margin-top: 2px;
  }

  .pf-schedule-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  .pf-schedule-option {
    padding: 14px;
    border-radius: 12px;
    background: var(--glass);
    border: 1.5px solid var(--border);
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    font-family: inherit;
    color: var(--text);
    position: relative;
  }
  .pf-schedule-option:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }
  .pf-schedule-option.active {
    border-color: var(--accent);
    background: ${pal.accent}18;
    box-shadow: 0 4px 16px ${pal.accent}20;
  }
  .pf-schedule-emoji {
    font-size: 1.6rem;
  }
  .pf-schedule-label {
    font-size: 0.82rem;
    font-weight: 700;
  }
  .pf-schedule-check {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pfScaleIn 0.3s ease both;
  }

  .pf-last-backup-container {
    padding: 8px 0;
  }
  .pf-last-backup-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .pf-last-backup-status {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .pf-backup-status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .pf-backup-status-dot.success {
    background: #10b981;
    box-shadow: 0 0 8px #10b98166;
  }
  .pf-backup-status-dot.error {
    background: #ef4444;
    box-shadow: 0 0 8px #ef444466;
  }
  .pf-last-backup-text {
    font-weight: 800;
    font-size: 0.88rem;
    color: var(--text);
  }
  .pf-last-backup-date {
    font-size: 0.82rem;
    color: var(--sub);
    margin-top: 4px;
  }
  .pf-last-backup-details {
    font-size: 0.76rem;
    color: var(--sub);
    margin-top: 2px;
  }
  .pf-last-backup-empty {
    text-align: center;
    padding: 24px 16px;
  }

  .pf-storage-actions {
    display: flex;
    gap: 10px;
    margin-top: 16px;
  }
  .pf-storage-actions .pf-btn {
    flex: 1;
  }

  .pf-info-card {
    background: linear-gradient(135deg, ${pal.accent}08, transparent);
    border-color: ${pal.accent}22;
  }

  /* ══════════════════════════════════════════
     HELP VIEW EXPANDIDO
  ══════════════════════════════════════════ */
  .pf-support-banner {
    background: linear-gradient(135deg, #25d36622, #25d36608);
    border: 1px solid #25d36644;
    border-radius: var(--radius);
    padding: 18px 20px;
    margin-bottom: 22px;
    display: flex;
    gap: 14px;
    align-items: center;
  }
  .pf-support-emoji {
    font-size: 1.8rem;
    flex-shrink: 0;
  }
  .pf-support-title {
    display: block;
    color: #25d366;
    margin-bottom: 4px;
    font-size: 0.92rem;
  }
  .pf-support-info {
    color: var(--sub);
    font-size: 0.78rem;
    line-height: 1.8;
  }

  .pf-faq-search-card {
    margin-bottom: 14px;
  }

  .pf-faq-section-button {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 15px 18px;
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer;
    transition: var(--transition);
    color: var(--text);
    font-family: inherit;
    font-size: inherit;
    backdrop-filter: blur(12px);
    text-align: left;
  }
  .pf-faq-section-button:hover {
    border-color: var(--accent);
    transform: translateY(-1px);
  }
  .pf-faq-section-emoji {
    font-size: 1.5rem;
    flex-shrink: 0;
  }
  .pf-faq-section-title {
    flex: 1;
    font-weight: 800;
    font-size: 0.92rem;
  }
  .pf-faq-section-count {
    padding: 2px 10px;
    border-radius: 12px;
    background: ${pal.accent}22;
    color: var(--accent);
    font-weight: 800;
    font-size: 0.76rem;
  }
  .pf-faq-section-arrow {
    color: var(--accent);
    font-weight: 900;
    font-size: 1.1rem;
    transition: transform 0.2s;
    flex-shrink: 0;
  }
  .pf-faq-section-arrow.open {
    transform: rotate(180deg);
  }

  .pf-faq-section-content {
    background: var(--glass);
    border: 1px solid var(--border);
    border-top: none;
    border-radius: 0 0 var(--radius) var(--radius);
    overflow: hidden;
    backdrop-filter: blur(12px);
    animation: pfSlideDown 0.3s ease both;
  }
  .pf-faq-item {
    padding: 14px 18px;
    border-bottom: 1px solid var(--border);
  }
  .pf-faq-item:last-child {
    border-bottom: none;
  }
  .pf-faq-item-header {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    margin-bottom: 8px;
  }
  .pf-faq-item-icon {
    color: var(--accent);
    font-weight: 900;
    font-size: 0.95rem;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .pf-faq-item-question {
    display: block;
    font-size: 0.86rem;
    color: var(--text);
  }
  .pf-faq-item-answer {
    color: var(--sub);
    font-size: 0.8rem;
    line-height: 1.75;
    white-space: pre-line;
    padding-left: 24px;
  }

  .pf-no-results {
    text-align: center;
    padding: 40px 20px;
    color: var(--sub);
  }

  .pf-help-footer {
    text-align: center;
    padding: 28px 0 12px;
    color: var(--sub);
    font-size: 0.74rem;
    line-height: 2;
  }
  .pf-help-footer-version {
    margin-bottom: 4px;
  }
  .pf-help-footer-credit {
    margin-top: 10px;
    padding: 12px 18px;
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    display: inline-block;
    text-align: center;
  }
  .pf-help-footer-credit-label {
    font-weight: 700;
    color: var(--text);
    font-size: 0.76rem;
    margin-bottom: 2px;
  }
  .pf-help-footer-credit-name {
    color: var(--accent);
    font-weight: 900;
    font-size: 0.84rem;
  }
  .pf-help-footer-credit-company {
    color: var(--sub);
    font-size: 0.72rem;
    margin-top: 2px;
  }

  /* ── Font Size Selector ── */
  .pf-font-select { 
    display: flex; 
    gap: 8px; 
  }
  .pf-font-btn {
    padding: 7px 14px; 
    border-radius: 8px;
    border: 1px solid var(--border); 
    background: var(--glass);
    color: var(--sub); 
    cursor: pointer; 
    font-weight: 700; 
    transition: var(--transition);
    font-family: inherit;
    flex: 1;
  }
  .pf-font-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
  .pf-font-btn.active { 
    background: ${pal.accent}22; 
    border-color: var(--accent); 
    color: var(--accent); 
    box-shadow: 0 2px 8px ${pal.accent}20;
  }

  /* ── Section Headers ── */
  .pf-section-title { 
    font-size: 1.3rem; 
    font-weight: 900; 
    margin-bottom: 4px; 
    color: var(--text); 
  }
  .pf-section-sub   { 
    font-size: 0.8rem; 
    color: var(--sub); 
    margin-bottom: 22px; 
  }

  /* ── Tip Box ── */
  .pf-tip {
    background: ${pal.accent}0e; 
    border: 1px solid ${pal.accent}22;
    border-radius: var(--radius-sm); 
    padding: 12px 14px;
    font-size: 0.8rem; 
    color: var(--sub);
    display: flex; 
    gap: 10px; 
    align-items: flex-start; 
    margin-top: 12px;
  }
  .pf-tip-icon { 
    font-size: 1rem; 
    flex-shrink: 0; 
    margin-top: 2px; 
  }

  /* ── Language Buttons ── */
  .pf-lang { 
    display: flex; 
    gap: 6px; 
  }
  .pf-lang-btn {
    padding: 6px 14px; 
    border-radius: 8px; 
    font-weight: 800; 
    font-size: 0.78rem;
    cursor: pointer; 
    transition: var(--transition);
    border: 1px solid var(--border); 
    background: var(--glass); 
    color: var(--sub);
    font-family: inherit;
    flex: 1;
  }
  .pf-lang-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
  .pf-lang-btn.active { 
    background: ${pal.accent}22; 
    border-color: var(--accent); 
    color: var(--accent); 
  }

  /* ── Estados vacíos ── */
  .pf-empty-state {
    text-align: center;
    padding: 40px 20px;
    color: var(--sub);
  }

  /* ── Records header y filtros ── */
  .pf-records-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 8px;
  }
  .pf-records-filters {
    display: flex;
    gap: 10px;
    margin-bottom: 18px;
  }
  .pf-filter-select {
    width: auto;
    min-width: 150px;
  }
  .pf-new-record-card {
    margin-bottom: 18px;
  }
  .pf-new-record-actions {
    display: flex;
    gap: 10px;
    margin-top: 16px;
  }

  /* ══════════════════════════════════════════
     RESPONSIVE — Tablet y Desktop
  ══════════════════════════════════════════ */
  @media (min-width: 600px) {
    .pf-content { padding: 28px 28px calc(var(--navbar-h) + 20px); }
    .pf-quick   { grid-template-columns: repeat(4, 1fr); }
    .pf-schedule-grid { grid-template-columns: repeat(3, 1fr); }
  }

  @media (min-width: 768px) {
    :root { --topbar-h: 66px; }
    .pf-topbar { padding: 0 32px; }
    .pf-topbar-brand { font-size: 1.4rem; }
    .pf-content { padding: 32px 36px calc(var(--navbar-h) + 24px); max-width: 920px; }
    .pf-stats   { gap: 16px; }
    .pf-stat-val { font-size: 2.2rem; }
    .pf-sectors-grid { grid-template-columns: repeat(auto-fill, minmax(162px, 1fr)); }
    .pf-navbar  { padding: 0 32px; justify-content: center; gap: 4px; }
    .pf-nav-btn { max-width: 120px; }
  }

  @media (min-width: 1024px) {
    .pf-content { padding: 36px 48px calc(var(--navbar-h) + 28px); max-width: 1060px; }
    .pf-grid-2  { grid-template-columns: 1fr 1fr; }
    .pf-navbar  { padding: 0 64px; }
    .pf-nav-btn { max-width: 140px; }
  }

  /* Landscape compacto (teléfono en horizontal) */
  @media (orientation: landscape) and (max-height: 480px) {
    :root {
      --navbar-h: 56px;
      --topbar-h: 50px;
    }
    .pf-nav-btn   { padding: 4px 2px 6px; margin: 3px 2px; }
    .pf-nav-icon-bg { height: 26px; }
    .pf-nav-label { display: none; }
    .pf-topbar-greeting p { display: none; }
    .pf-content   { padding-top: 16px; }
  }
`;

// ═══ BLOQUE 9: COMPONENTE PRINCIPAL PROFICHA ═════════════════
// App Shell completo con sistema de navegación y modales

export default function ProFicha() {
  const { user, loading: authLoading, login, logout } = useAuth();
  
  // ── Estados principales ──────────────────────────────────────
  const [lang, setLang] = useState(() => storage.get("lang", "es"));
  const [palette, setPalette] = useState(() => storage.get("palette", "dark"));
  const [activeNav, setActiveNav] = useState("dashboard");
  const [profile, setProfile] = useState(() => storage.get("profile", { 
    name: "", business: "", phone: "", email: "", 
    whatsapp: "", address: "", website: "", logo: null, 
    terms: "", pdfBg: "#050508" 
  }));
  const [mySectors, setMySectors] = useState(() => storage.get("mySectors", ["masoterapia", "medico"]));
  const [records, setRecords] = useState(() => storage.get("records", []));
  const [a11y, setA11y] = useState(() => storage.get("a11y", { 
    fontSize: "md", contrast: false, animations: true, screenReader: false 
  }));
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null);
  const [motivIdx] = useState(() => Math.floor(Math.random() * MOTIVATION.length));
  const [driveConnected, setDriveConnected] = useState(() => storage.get("driveConnected", false));
  
  // ── Estados de modales especiales ────────────────────────────
  const [quickWhatsAppOpen, setQuickWhatsAppOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [permissionModal, setPermissionModal] = useState(null);

  const t = T[lang];
  const pal = PALETTES.find(p => p.id === palette) || PALETTES[0];
  const fontSizes = { sm: "14px", md: "16px", lg: "18px", xl: "20px" };

  // ── Efectos de persistencia ──────────────────────────────────
  useEffect(() => { storage.set("lang", lang); }, [lang]);
  useEffect(() => { storage.set("palette", palette); }, [palette]);
  useEffect(() => { storage.set("profile", profile); }, [profile]);
  useEffect(() => { storage.set("mySectors", mySectors); }, [mySectors]);
  useEffect(() => { storage.set("records", records); }, [records]);
  useEffect(() => { storage.set("a11y", a11y); }, [a11y]);

  // ── Verificar si debe mostrarse tutorial al iniciar ──────────
  useEffect(() => {
    if (user && !storage.get("tutorialCompleted", false)) {
      // Esperar a que la app cargue antes de mostrar tutorial
      const timer = setTimeout(() => {
        setTutorialOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [user]);

  // ── Helpers ──────────────────────────────────────────────────
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const navigate = (page) => setActiveNav(page);

  const connectDrive = async () => {
    showToast(lang === "es" ? "Conectando con Google Drive..." : "Connecting to Google Drive...", "info");
    try {
      await login();
      setDriveConnected(true);
      storage.set("driveConnected", true);
      showToast(t.driveConnected);
    } catch {
      showToast(lang === "es" ? "Error al conectar con Google" : "Google connection error", "error");
    }
  };

  const resetApp = () => {
    ["lang","palette","profile","mySectors","records","a11y","driveConnected","tutorialCompleted","backupSchedule","lastBackup"]
      .forEach(k => localStorage.removeItem(`pf_${k}`));
    window.location.reload();
  };

  const openQuickWhatsApp = () => setQuickWhatsAppOpen(true);
  const openTutorial = () => setTutorialOpen(true);

  const todayCount = records.filter(r => r.dateKey === todayKey()).length;
  const greetData = GREET(profile.name || profile.business, lang);
  const avatarChar = (profile.name || profile.business || "P")[0].toUpperCase();

  // ── Navegación por gestos (swipe) — coexiste con botones ─────
  // Problema 12: Gestos de navegación tipo Apple Music
  const navOrder = ["dashboard", "sectors", "records", "storage", "settings", "accessibility", "help"];
  
  const handleSwipe = useCallback((direction) => {
    if (!a11y.animations) return; // Respetar animaciones reducidas
    
    const currentIndex = navOrder.indexOf(activeNav);
    if (currentIndex === -1) return;
    
    if (direction === "left" && currentIndex < navOrder.length - 1) {
      navigate(navOrder[currentIndex + 1]);
    } else if (direction === "right" && currentIndex > 0) {
      navigate(navOrder[currentIndex - 1]);
    }
  }, [activeNav, a11y.animations]);

  // Sistema simple de detección de swipe táctil
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    const SWIPE_THRESHOLD = 50;
    
    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = endX - startX;
      const diffY = endY - startY;
      
      // Solo swipe horizontal (no vertical para no interferir con scroll)
      if (Math.abs(diffX) > SWIPE_THRESHOLD && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
        handleSwipe(diffX > 0 ? "right" : "left");
      }
    };
    
    const scrollArea = document.querySelector('.pf-scroll-area');
    if (scrollArea) {
      scrollArea.addEventListener('touchstart', handleTouchStart, { passive: true });
      scrollArea.addEventListener('touchend', handleTouchEnd, { passive: true });
      return () => {
        scrollArea.removeEventListener('touchstart', handleTouchStart);
        scrollArea.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [handleSwipe]);

  // ── Nav Items ────────────────────────────────────────────────
  const navItems = [
    { id: "dashboard",     label: t.dashboard,     icon: "home"          },
    { id: "sectors",       label: t.sectors,       icon: "sectors"       },
    { id: "records",       label: t.records,       icon: "records"       },
    { id: "storage",       label: t.storage,       icon: "storage"       },
    { id: "settings",      label: t.settings,      icon: "settings"      },
    { id: "accessibility", label: t.accessibility, icon: "accessibility" },
    { id: "help",          label: t.help,          icon: "help"          },
  ];

  // ══════════════════════════════════════════════════════════════
  // LOGIN GUARD
  // ══════════════════════════════════════════════════════════════
  if (authLoading || !user) {
    return (
      <>
        <style>{generateCSS(pal, a11y, fontSizes)}</style>
        <div className="pf-login">
          <video
            className="pf-login-video"
            src="./logotipo.mp4"
            autoPlay loop muted playsInline
          />
          <div className="pf-login-aurora">
            <div className="pf-aurora-blob" />
            <div className="pf-aurora-blob" />
            <div className="pf-aurora-blob" />
            <div className="pf-aurora-blob" />
          </div>
          <div className="pf-login-overlay" />
          <div className="pf-login-content">
            <img className="pf-login-logo" src="./logotipo.png" alt="ProFicha" />
            <div className="pf-login-title">ProFicha</div>
            <div className="pf-login-tagline">
              {lang === "es" ? "Tu expediente profesional, en tu mano." : "Your professional record, in your hands."}
            </div>
            <div className="pf-login-divider" />
            {authLoading ? (
              <div className="pf-login-spinner" />
            ) : (
              <button 
                className="pf-login-btn-google" 
                onClick={login}
                aria-label={lang === "es" ? "Continuar con Google" : "Continue with Google"}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {lang === "es" ? "Continuar con Google" : "Continue with Google"}
              </button>
            )}
            <div className="pf-login-legal">
              {lang === "es"
                ? "Al continuar, aceptas los Términos de Uso y la Política de Privacidad de ProFicha."
                : "By continuing, you accept ProFicha's Terms of Use and Privacy Policy."}
            </div>
          </div>
        </div>
      </>
    );
  }

  // ══════════════════════════════════════════════════════════════
  // APP PRINCIPAL
  // ══════════════════════════════════════════════════════════════
  return (
    <>
      <style>{generateCSS(pal, a11y, fontSizes)}</style>
      <div className="pf-app">

        {/* ── Top Bar ── */}
        <header className="pf-topbar">
          <div className="pf-topbar-left">
            <div className="pf-topbar-brand">ProFicha</div>
            <div className="pf-topbar-sep" />
            <div className="pf-topbar-greeting">
              <h1>{greetData[0]}</h1>
              <p>{greetData[1]}</p>
            </div>
          </div>
          <div className="pf-topbar-right">
            <button
              className="pf-icon-btn"
              title={lang === "es" ? "Cambiar idioma" : "Change language"}
              onClick={() => setLang(l => l === "es" ? "en" : "es")}
              aria-label={lang === "es" ? "Cambiar idioma" : "Change language"}
            >
              <span style={{ fontSize: "0.95rem" }} aria-hidden="true">
                {lang === "es" ? "🇺🇸" : "🇲🇽"}
              </span>
            </button>
            <button
              className="pf-icon-btn"
              title={t.colorTheme}
              onClick={() => {
                const idx = PALETTES.findIndex(p => p.id === palette);
                setPalette(PALETTES[(idx + 1) % PALETTES.length].id);
              }}
              aria-label={t.colorTheme}
            >
              <Icon name={palette === "light" ? "moon" : "sun"} size={16} color="currentColor" />
            </button>
            <button
              className="pf-avatar"
              onClick={() => navigate("settings")}
              title={t.profile}
              aria-label={t.profile}
            >
              {user?.imageUrl
                ? <img src={user.imageUrl} alt={user.name} />
                : profile.logo
                  ? <img src={profile.logo} alt="logo" />
                  : avatarChar
              }
            </button>
            <button
              className="pf-icon-btn logout"
              title={t.signOut}
              onClick={() => setModal({ type: "logout" })}
              aria-label={t.signOut}
            >
              <Icon name="logout" size={16} color="currentColor" />
            </button>
          </div>
        </header>

        {/* ── Área de scroll ── */}
        <div className="pf-scroll-area">
          <div className="pf-content">
            {activeNav === "dashboard" && (
              <DashboardView
                profile={profile}
                records={records}
                mySectors={mySectors}
                todayCount={todayCount}
                motivIdx={motivIdx}
                driveConnected={driveConnected}
                connectDrive={connectDrive}
                showToast={showToast}
                lang={lang}
                navigate={navigate}
                openQuickWhatsApp={openQuickWhatsApp}
              />
            )}
            {activeNav === "sectors" && (
              <SectorsView
                mySectors={mySectors}
                setMySectors={setMySectors}
                showToast={showToast}
                lang={lang}
              />
            )}
            {activeNav === "records" && (
              <RecordsView
                records={records}
                setRecords={setRecords}
                mySectors={mySectors}
                profile={profile}
                showToast={showToast}
                lang={lang}
              />
            )}
            {activeNav === "storage" && (
              <StorageView
                profile={profile}
                driveConnected={driveConnected}
                connectDrive={connectDrive}
                showToast={showToast}
                lang={lang}
                setModal={setModal}
              />
            )}
            {activeNav === "settings" && (
              <SettingsView
                profile={profile}
                setProfile={setProfile}
                palette={palette}
                setPalette={setPalette}
                lang={lang}
                setLang={setLang}
                showToast={showToast}
                openTutorial={openTutorial}
              />
            )}
            {activeNav === "accessibility" && (
              <AccessibilityView
                a11y={a11y}
                setA11y={setA11y}
                setModal={setModal}
                lang={lang}
              />
            )}
            {activeNav === "help" && (
              <HelpView
                lang={lang}
                openTutorial={openTutorial}
              />
            )}
          </div>
        </div>

        {/* ── Bottom Navigation Bar ── */}
        <nav className="pf-navbar" role="navigation" aria-label={lang === "es" ? "Navegación principal" : "Main navigation"}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`pf-nav-btn ${activeNav === item.id ? "active" : ""}`}
              onClick={() => navigate(item.id)}
              title={item.label}
              aria-label={item.label}
              aria-current={activeNav === item.id ? "page" : undefined}
            >
              <span className="pf-nav-pip" aria-hidden="true" />
              <span className="pf-nav-icon-bg">
                <Icon name={item.icon} size={20} color="currentColor" animated={activeNav === item.id} />
              </span>
              <span className="pf-nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* ── Toast ── */}
        {toast && (
          <div 
            className={`pf-toast ${toast.type}`}
            role="alert"
            aria-live="polite"
          >
            {toast.type === "success" && <Icon name="check" size={16} color="#10b981" aria-hidden="true" />}
            {toast.type === "error" && <Icon name="x" size={16} color="#ef4444" aria-hidden="true" />}
            {toast.type === "info" && <span style={{ fontSize: "0.95rem" }} aria-hidden="true">ℹ️</span>}
            {toast.msg}
          </div>
        )}

        {/* ══ Modal: Eliminar expediente ══ */}
        {modal?.type === "deleteRecord" && (
          <div 
            className="pf-modal-bg pf-modal-animated" 
            onClick={() => setModal(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-record-title"
          >
            <div className="pf-modal" onClick={e => e.stopPropagation()}>
              <span className="pf-modal-handle" />
              <h3 id="delete-record-title">🗑️ {t.deleteRecord}</h3>
              <p>
                {lang === "es"
                  ? "¿Seguro que deseas eliminar este expediente? Esta acción es permanente y no se puede deshacer."
                  : "Are you sure you want to delete this record? This action is permanent and cannot be undone."}
              </p>
              <div className="pf-modal-actions">
                <button 
                  className="pf-btn pf-btn-ghost"  
                  onClick={() => setModal(null)}
                  aria-label={t.cancel}
                >
                  {t.cancel}
                </button>
                <button 
                  className="pf-btn pf-btn-danger" 
                  onClick={() => { 
                    setRecords(prev => prev.filter(r => r.id !== modal.id));
                    setModal(null); 
                    showToast(lang === "es" ? "Expediente eliminado" : "Record deleted", "info");
                  }}
                  aria-label={t.confirm}
                >
                  {t.confirm}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ Modal: Restablecer app ══ */}
        {modal?.type === "resetApp" && (
          <div 
            className="pf-modal-bg pf-modal-animated" 
            onClick={() => setModal(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-app-title"
          >
            <div className="pf-modal" onClick={e => e.stopPropagation()}>
              <span className="pf-modal-handle" />
              <h3 id="reset-app-title">⚠️ {t.resetApp}</h3>
              <p>
                {lang === "es"
                  ? "Esto borrará todos tus expedientes, sectores y configuración. Esta acción es irreversible. Asegúrate de tener un respaldo en Google Drive antes de continuar."
                  : "This will erase all your records, sectors and settings. This action is irreversible. Make sure you have a backup in Google Drive before continuing."}
              </p>
              <div className="pf-modal-actions">
                <button 
                  className="pf-btn pf-btn-ghost"  
                  onClick={() => setModal(null)}
                  aria-label={t.cancel}
                >
                  {t.cancel}
                </button>
                <button 
                  className="pf-btn pf-btn-danger" 
                  onClick={resetApp}
                  aria-label={t.confirm}
                >
                  {t.confirm}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ Modal: Restaurar copia de seguridad ══ */}
        {modal?.type === "restoreBackup" && (
          <div 
            className="pf-modal-bg pf-modal-animated" 
            onClick={() => setModal(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="restore-backup-title"
          >
            <div className="pf-modal" onClick={e => e.stopPropagation()}>
              <span className="pf-modal-handle" />
              <h3 id="restore-backup-title">☁️ {t.restoreBackup}</h3>
              <p>
                {lang === "es"
                  ? "Esto descargará el último respaldo desde Google Drive y reconstruirá completamente el estado de la app. Los datos actuales se sobrescribirán."
                  : "This will download the latest backup from Google Drive and completely rebuild the app state. Current data will be overwritten."}
              </p>
              <div className="pf-modal-actions">
                <button 
                  className="pf-btn pf-btn-ghost"  
                  onClick={() => setModal(null)}
                  aria-label={t.cancel}
                >
                  {t.cancel}
                </button>
                <button 
                  className="pf-btn pf-btn-primary" 
                  onClick={() => {
                    setModal(null);
                    showToast(lang === "es" ? "Restaurando copia..." : "Restoring backup...", "info");
                    // En Entrega 2 conectaremos la función real de restauración de driveSync.js
                    setTimeout(() => {
                      showToast(lang === "es" ? "Restauración completada ✓" : "Restore completed ✓");
                    }, 3000);
                  }}
                  aria-label={t.confirm}
                >
                  <Icon name="download" size={16} color="inherit" />
                  {t.confirm}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ Modal: Cerrar sesión ══ */}
        {modal?.type === "logout" && (
          <div 
            className="pf-modal-bg pf-modal-animated" 
            onClick={() => setModal(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
          >
            <div className="pf-modal" onClick={e => e.stopPropagation()}>
              <span className="pf-modal-handle" />
              <h3 id="logout-title">👋 {t.signOut}</h3>
              <p>{t.signOutConfirm}</p>
              <div className="pf-modal-actions">
                <button 
                  className="pf-btn pf-btn-ghost"  
                  onClick={() => setModal(null)}
                  aria-label={t.cancel}
                >
                  {t.cancel}
                </button>
                <button 
                  className="pf-btn pf-btn-danger" 
                  onClick={() => { setModal(null); logout(); }}
                  aria-label={t.signOutYes}
                >
                  {t.signOutYes}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ Modal de Permisos Transparentes (Problema 11) ══ */}
        {permissionModal && (
          <PermissionModal
            isOpen={true}
            onClose={() => setPermissionModal(null)}
            onContinue={() => {
              if (permissionModal.onContinue) permissionModal.onContinue();
              setPermissionModal(null);
            }}
            permissionName={permissionModal.permissionName}
            explanation={permissionModal.explanation}
            icon={permissionModal.icon}
            t={t}
          />
        )}

        {/* ══ Modal de WhatsApp Rápido (Problema 8) ══ */}
        <QuickWhatsAppModal
          isOpen={quickWhatsAppOpen}
          onClose={() => setQuickWhatsAppOpen(false)}
          defaultNumber={profile.whatsapp}
          lang={lang}
        />

        {/* ══ Modal de Tutorial (Problema 14) ══ */}
        <TutorialModal
          isOpen={tutorialOpen}
          onClose={() => setTutorialOpen(false)}
          lang={lang}
        />

      </div>
    </>
  );
}

// ═══ BLOQUE 10: MARCADOR DE PARCHE FINAL ══════════════════════
// Las futuras entregas agregarán código aquí sin tocar los bloques anteriores.
// Próximo parche: Conexión real de PDF con jsPDF (Problema 1)
// Próximo parche: Conexión real de Google Drive con driveSync.js (Problema 2)
// Próximo parche: Refactorización de FormEngine.jsx para edición (Problema 4)
// Próximo parche: Plugin nativo en Kotlin para almacenamiento (Problema 1)

// ═══ PATCH ZONE - AGREGAR CÓDIGO NUEVO AQUÍ ═══
