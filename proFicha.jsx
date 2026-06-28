import { FormEngine } from "./src/FormEngine.jsx";
import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "./src/hooks/useAuth.js";
import { driveService } from "./src/core/services/driveService.js";

// ═══════════════════════════════════════════════════════════════
// PROFICHA — Motor Central v2.0
// Fase 1: Dashboard, Sectores, Personalización, PDF Bancario
// Rediseño Premium — Barra inferior, Aurora Login, Logout
// ═══════════════════════════════════════════════════════════════

// ── Datos ──────────────────────────────────────────────────────
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

const MOTIVATION = [
  ["Cada ficha que llenas es un escudo legal para tu negocio.", "Profesionalismo que se nota desde la primera firma."],
  ["Tu consultorio merece herramientas de clase mundial.",      "Hoy atendiste a alguien. Eso importa."],
  ["La documentación bien hecha es la mejor inversión.",       "Un expediente completo vale más que mil palabras."],
  ["Los grandes profesionales cuidan cada detalle.",           "Y tú estás aquí, cuidando los tuyos."],
];

const T = {
  es: {
    appName: "ProFicha",
    tagline: "Tu expediente profesional, en tu mano.",
    dashboard: "Inicio",
    sectors: "Sectores",
    records: "Expedientes",
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
  },
  en: {
    appName: "ProFicha",
    tagline: "Your professional record, in your hand.",
    dashboard: "Home",
    sectors: "Sectors",
    records: "Records",
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
  },
};

// ── Helpers ────────────────────────────────────────────────────
const storage = {
  get: (k, d) => { try { const v = localStorage.getItem(`pf_${k}`); return v ? JSON.parse(v) : d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(`pf_${k}`, JSON.stringify(v)); } catch {} },
};

const genId   = () => Math.random().toString(36).substr(2, 9);
const today   = () => new Date().toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
const todayKey = () => new Date().toDateString();

// ── Iconos Inline SVG ──────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    home:          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
    sectors:       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    records:       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>,
    settings:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    accessibility: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
    help:          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
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
  };
  return icons[name] || null;
};

// ═══════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════
export default function ProFicha() {
  const { user, loading: authLoading, login, logout } = useAuth();
  const [lang,           setLang]           = useState(() => storage.get("lang", "es"));
  const [palette,        setPalette]        = useState(() => storage.get("palette", "dark"));
  const [activeNav,      setActiveNav]      = useState("dashboard");
  const [profile,        setProfile]        = useState(() => storage.get("profile", { name: "", business: "", phone: "", email: "", whatsapp: "", address: "", website: "", logo: null, terms: "", pdfBg: "#050508" }));
  const [mySectors,      setMySectors]      = useState(() => storage.get("mySectors", ["masoterapia", "medico"]));
  const [records,        setRecords]        = useState(() => storage.get("records", []));
  const [a11y,           setA11y]           = useState(() => storage.get("a11y", { fontSize: "md", contrast: false, animations: true, screenReader: false }));
  const [toast,          setToast]          = useState(null);
  const [modal,          setModal]          = useState(null);
  const [motivIdx]                          = useState(() => Math.floor(Math.random() * MOTIVATION.length));
  const [driveConnected, setDriveConnected] = useState(() => storage.get("driveConnected", false));
  const [savedPulse,     setSavedPulse]     = useState(false);

  const t   = T[lang];
  const pal = PALETTES.find(p => p.id === palette) || PALETTES[0];

  useEffect(() => { storage.set("lang",     lang);     }, [lang]);
  useEffect(() => { storage.set("palette",  palette);  }, [palette]);
  useEffect(() => { storage.set("profile",  profile);  }, [profile]);
  useEffect(() => { storage.set("mySectors",mySectors);}, [mySectors]);
  useEffect(() => { storage.set("records",  records);  }, [records]);
  useEffect(() => { storage.set("a11y",     a11y);     }, [a11y]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const navigate = (page) => setActiveNav(page);

  const addSector = (id) => {
    if (!mySectors.includes(id)) {
      setMySectors(prev => [...prev, id]);
      showToast(lang === "es" ? "Sector agregado ✓" : "Sector added ✓");
    }
  };

  const removeSector = (id) => setMySectors(prev => prev.filter(s => s !== id));

  const deleteRecord = (rid) => {
    setRecords(prev => prev.filter(r => r.id !== rid));
    showToast(lang === "es" ? "Expediente eliminado" : "Record deleted", "info");
  };

  const shareWhatsApp = (record) => {
    const wa  = profile.whatsapp?.replace(/\D/g, "") || "";
    const sec = SECTORS.find(s => s.id === record.sectorId);
    const msg = encodeURIComponent(
      `*${profile.business || "ProFicha"}*\n\n📋 *${t.recordFor}:* ${record.patientName}\n🗂️ *Sector:* ${sec ? (lang === "es" ? sec.label : sec.label_en) : ""}\n📅 ${record.date}\n\n_${lang === "es" ? "Expediente generado con ProFicha" : "Record generated with ProFicha"}_`
    );
    window.open(wa ? `https://wa.me/${wa}?text=${msg}` : `https://wa.me/?text=${msg}`, "_blank");
  };

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

  const exportConfig = () => {
    const pass = modal?.password;
    if (!pass || pass.length < 4) { showToast(lang === "es" ? "Contraseña muy corta" : "Password too short", "error"); return; }
    const config = { profile, mySectors, palette, lang, a11y, exportedAt: new Date().toISOString() };
    const blob   = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url    = URL.createObjectURL(blob);
    const a      = document.createElement("a");
    a.href = url; a.download = "proficha-config.json"; a.click();
    setModal(null);
    showToast(lang === "es" ? "Configuración exportada" : "Config exported");
  };

  const resetApp = () => {
    ["lang","palette","profile","mySectors","records","a11y","driveConnected"]
      .forEach(k => localStorage.removeItem(`pf_${k}`));
    window.location.reload();
  };

  const todayCount = records.filter(r => r.dateKey === todayKey()).length;
  const fontSizes  = { sm: "14px", md: "16px", lg: "18px", xl: "20px" };

  // ── Estilos Dinámicos Premium ────────────────────────────────
  const css = `
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
      --transition: ${a11y.animations ? "all 0.22s cubic-bezier(0.4,0,0.2,1)" : "none"};
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

    /* ── Scrollbar ── */
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 10px; opacity: 0.6; }

    /* ══════════════════════════════════════════════
       LOGIN SCREEN
    ══════════════════════════════════════════════ */
    .pf-login {
      position: fixed; inset: 0; z-index: 9999;
      display: flex; flex-direction: column;
      align-items: center; justify-content: flex-end;
      background: #000; overflow: hidden;
    }

    /* Video — visible en portrait (vertical) */
    .pf-login-video {
      position: absolute; inset: 0;
      width: 100%; height: 100%;
      object-fit: cover;
      opacity: 0.9;
      transition: opacity 0.5s;
    }

    /* Aurora — visible en landscape (horizontal) */
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
    @keyframes pfAuroraFloat {
      0%   { transform: translate(0, 0) scale(1);     }
      25%  { transform: translate(3%, 5%) scale(1.05); }
      50%  { transform: translate(-4%, 3%) scale(0.97); }
      75%  { transform: translate(2%, -4%) scale(1.03); }
      100% { transform: translate(0, 0) scale(1);     }
    }

    /* En landscape: ocultar video, mostrar aurora */
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

    /* En landscape: centrar verticalmente el contenido de login */
    @media (orientation: landscape) {
      .pf-login {
        justify-content: center;
      }
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
    @keyframes pfSpin { to { transform: rotate(360deg); } }
    .pf-login-legal {
      font-size: 0.68rem; color: rgba(255,255,255,0.35);
      text-align: center; line-height: 1.65; max-width: 320px;
    }

    /* ══════════════════════════════════════════════
       APP SHELL — Sin scroll en body, todo en flex
    ══════════════════════════════════════════════ */
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

    /* ══════════════════════════════════════════════
       BOTTOM NAVIGATION BAR — Negro elegante
    ══════════════════════════════════════════════ */
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

    /* ══════════════════════════════════════════════
       CARDS
    ══════════════════════════════════════════════ */
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
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 12px; margin-bottom: 18px;
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
      border-radius: var(--radius); padding: 16px 18px;
      margin-bottom: 18px; position: relative; overflow: hidden;
    }
    .pf-motiv::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, ${pal.accent}55, transparent);
    }
    .pf-motiv strong { font-size: 0.92rem; font-weight: 800; color: var(--accent); display: block; margin-bottom: 3px; }
    .pf-motiv span   { font-size: 0.8rem; color: var(--sub); }

    /* ── Quick Actions ── */
    .pf-quick {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 10px; margin-bottom: 18px;
    }
    .pf-quick-btn {
      display: flex; align-items: center; gap: 12px;
      padding: 13px 14px; border-radius: 14px;
      border: 1px solid var(--border); background: var(--glass);
      cursor: pointer; transition: var(--transition);
      color: var(--text); font-weight: 700; font-size: 0.8rem;
      backdrop-filter: blur(12px); -webkit-tap-highlight-color: transparent;
    }
    .pf-quick-btn:hover { border-color: var(--accent); background: ${pal.accent}10; color: var(--accent); transform: translateY(-1px); }
    .pf-quick-icon {
      width: 36px; height: 36px; border-radius: 10px;
      background: ${pal.accent}16; display: flex; align-items: center;
      justify-content: center; flex-shrink: 0;
    }
    .pf-quick-text small { font-size: 0.66rem; color: var(--sub); font-weight: 400; display: block; margin-top: 2px; }

    /* ── Record Items ── */
    .pf-record-item {
      display: flex; align-items: center; gap: 12px;
      padding: 11px 13px; border-radius: 12px;
      background: var(--glass); border: 1px solid var(--border);
      margin-bottom: 8px; transition: var(--transition);
      backdrop-filter: blur(8px);
    }
    .pf-record-item:hover { border-color: ${pal.accent}40; }
    .pf-record-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0; }
    .pf-record-body { flex: 1; min-width: 0; }
    .pf-record-name { font-weight: 800; font-size: 0.88rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .pf-record-meta { font-size: 0.7rem; color: var(--sub); margin-top: 2px; }
    .pf-record-actions { display: flex; gap: 6px; flex-shrink: 0; }
    .pf-record-btn {
      width: 30px; height: 30px; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: var(--transition);
      border: 1px solid var(--border); background: transparent; color: var(--sub);
    }
    .pf-record-btn:hover.pdf { background: ${pal.accent}22; color: var(--accent); border-color: var(--accent); }
    .pf-record-btn:hover.wa  { background: #25d36622; color: #25d366; border-color: #25d366; }
    .pf-record-btn:hover.del { background: #ef444422; color: #ef4444; border-color: #ef4444; }

    /* ── Sector Grid ── */
    .pf-sectors-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(148px, 1fr)); gap: 10px; }
    .pf-sector-card {
      border-radius: 14px; border: 1.5px solid var(--border);
      background: var(--glass); padding: 15px 10px;
      cursor: pointer; transition: var(--transition);
      text-align: center; position: relative; overflow: hidden;
      backdrop-filter: blur(8px);
    }
    .pf-sector-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.18); }
    .pf-sector-card.mine { border-color: var(--accent); background: ${pal.accent}0e; }
    .pf-sector-card .emoji  { font-size: 1.9rem; display: block; margin-bottom: 8px; }
    .pf-sector-card .label  { font-size: 0.76rem; font-weight: 700; color: var(--text); line-height: 1.3; }
    .pf-sector-card .mine-badge {
      position: absolute; top: 7px; right: 7px;
      width: 18px; height: 18px; background: var(--accent);
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
    }
    .pf-sector-remove {
      position: absolute; bottom: 6px; right: 6px;
      width: 20px; height: 20px; background: #ef444488; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: var(--transition); cursor: pointer;
    }
    .pf-sector-card:hover .pf-sector-remove { opacity: 1; }
    .pf-category-title {
      font-size: 0.68rem; font-weight: 800; color: var(--sub);
      text-transform: uppercase; letter-spacing: 2px; margin: 22px 0 10px;
      display: flex; align-items: center; gap: 8px;
    }
    .pf-category-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }

    /* ── Search ── */
    .pf-search { position: relative; margin-bottom: 16px; }
    .pf-search input {
      width: 100%; background: var(--glass); border: 1px solid var(--border);
      color: var(--text); padding: 12px 14px 12px 42px;
      border-radius: var(--radius-sm); font-size: 0.88rem;
      transition: var(--transition); outline: none;
      backdrop-filter: blur(8px);
    }
    .pf-search input:focus {
      border-color: var(--accent);
      background: ${pal.accent}08;
      box-shadow: 0 0 0 3px ${pal.accent}14;
    }
    .pf-search-icon {
      position: absolute; left: 13px; top: 50%;
      transform: translateY(-50%); color: var(--sub); pointer-events: none;
    }

    /* ── Form Elements ── */
    .pf-label {
      display: block; font-size: 0.7rem; font-weight: 700; color: var(--sub);
      text-transform: uppercase; letter-spacing: 0.9px;
      margin-bottom: 7px; margin-top: 18px;
    }
    .pf-input, .pf-select, .pf-textarea {
      width: 100%; background: var(--glass); border: 1px solid var(--border);
      color: var(--text); padding: 12px 14px; border-radius: var(--radius-sm);
      font-size: 0.88rem; transition: var(--transition); outline: none;
      font-family: inherit; backdrop-filter: blur(8px);
    }
    .pf-input:focus, .pf-select:focus, .pf-textarea:focus {
      border-color: var(--accent);
      background: ${pal.accent}08;
      box-shadow: 0 0 0 3px ${pal.accent}14;
    }
    .pf-textarea  { resize: vertical; min-height: 120px; line-height: 1.6; }
    .pf-select option { background: var(--surface); }
    .pf-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .pf-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }

    /* ── Buttons ── */
    .pf-btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      padding: 12px 22px; border-radius: var(--radius-sm);
      font-weight: 800; font-size: 0.86rem;
      cursor: pointer; transition: var(--transition);
      border: none; font-family: inherit; letter-spacing: 0.3px;
    }
    .pf-btn-primary {
      background: linear-gradient(135deg, var(--accent) 0%, ${pal.sub}88 100%);
      color: ${pal.id === "light" ? "#fff" : "#000"};
      box-shadow: 0 4px 18px ${pal.accent}35;
    }
    .pf-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px ${pal.accent}50; }
    .pf-btn-ghost   { background: var(--glass); border: 1px solid var(--border); color: var(--text); backdrop-filter: blur(8px); }
    .pf-btn-ghost:hover { border-color: var(--accent); color: var(--accent); background: ${pal.accent}10; }
    .pf-btn-danger  { background: #ef444418; border: 1px solid #ef4444; color: #ef4444; }
    .pf-btn-danger:hover  { background: #ef4444; color: #fff; }
    .pf-btn-success { background: #10b98118; border: 1px solid #10b981; color: #10b981; }
    .pf-btn-success:hover { background: #10b981; color: #fff; }
    .pf-btn.pulse { animation: pfPulse 0.6s ease; }
    @keyframes pfPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(0.96)} }

    /* ── Palette Chips ── */
    .pf-palettes { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 4px; }
    .pf-palette-chip {
      width: 42px; height: 42px; border-radius: 10px; cursor: pointer;
      transition: var(--transition); border: 3px solid transparent; overflow: hidden;
    }
    .pf-palette-chip:hover { transform: scale(1.12); }
    .pf-palette-chip.active { border-color: var(--text); box-shadow: 0 0 0 2px var(--accent); }
    .pf-palette-chip .chip-inner { width: 100%; height: 100%; display: flex; }
    .pf-palette-chip .chip-half  { flex: 1; }

    /* ── Toggle / Switch ── */
    .pf-toggle {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 0; border-bottom: 1px solid var(--border);
    }
    .pf-toggle:last-child { border-bottom: none; }
    .pf-toggle-label { font-weight: 600; font-size: 0.88rem; color: var(--text); }
    .pf-toggle-sub   { font-size: 0.72rem; color: var(--sub); margin-top: 2px; }
    .pf-switch {
      width: 44px; height: 24px; border-radius: 12px;
      background: var(--border); border: none;
      cursor: pointer; position: relative; transition: var(--transition); flex-shrink: 0;
    }
    .pf-switch.on { background: var(--accent); }
    .pf-switch::after {
      content: ''; position: absolute; top: 3px; left: 3px;
      width: 18px; height: 18px; border-radius: 50%;
      background: white; transition: var(--transition);
    }
    .pf-switch.on::after { transform: translateX(20px); }

    /* ── Logo Upload ── */
    .pf-logo-box {
      border: 2px dashed var(--border); border-radius: 14px;
      padding: 24px; text-align: center; cursor: pointer; transition: var(--transition);
    }
    .pf-logo-box:hover { border-color: var(--accent); background: ${pal.accent}08; }
    .pf-logo-preview { width: 90px; height: 90px; object-fit: contain; margin-bottom: 10px; border-radius: 10px; }

    /* ── PDF Colors ── */
    .pf-pdf-colors { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px; }
    .pf-pdf-color {
      width: 36px; height: 36px; border-radius: 8px;
      cursor: pointer; border: 3px solid transparent; transition: var(--transition);
    }
    .pf-pdf-color:hover { transform: scale(1.15); }
    .pf-pdf-color.active { border-color: var(--text); box-shadow: 0 0 0 2px var(--accent); }
    .pf-pdf-color-custom { display: flex; align-items: center; gap: 10px; margin-top: 10px; }
    .pf-pdf-color-custom input[type=color] {
      width: 42px; height: 36px; border-radius: 8px;
      border: 1px solid var(--border); background: transparent; cursor: pointer; padding: 2px;
    }

    /* ── Toast ── */
    .pf-toast {
      position: fixed; bottom: calc(var(--navbar-h) + 14px); right: 16px; z-index: 9999;
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 14px; padding: 12px 18px;
      display: flex; align-items: center; gap: 10px;
      font-weight: 700; font-size: 0.86rem;
      box-shadow: 0 16px 48px rgba(0,0,0,0.55); min-width: 200px;
      animation: pfSlideUp 0.28s cubic-bezier(0.4,0,0.2,1);
      backdrop-filter: blur(20px);
    }
    .pf-toast.success { border-color: #10b98150; }
    .pf-toast.info    { border-color: ${pal.accent}50; }
    .pf-toast.error   { border-color: #ef444450; }
    @keyframes pfSlideUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Modal — bottom sheet premium ── */
    .pf-modal-bg {
      position: fixed; inset: 0; background: rgba(0,0,0,0.78); z-index: 200;
      display: flex; align-items: flex-end; justify-content: center;
      backdrop-filter: blur(14px); animation: pfFadeIn 0.2s;
    }
    @keyframes pfFadeIn { from { opacity: 0; } to { opacity: 1; } }
    .pf-modal {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 24px 24px 0 0; padding: 28px 22px 38px;
      width: 100%; max-width: 560px;
      box-shadow: 0 -20px 80px rgba(0,0,0,0.7);
      animation: pfSlideModal 0.3s cubic-bezier(0.4,0,0.2,1);
    }
    @keyframes pfSlideModal {
      from { transform: translateY(60px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    .pf-modal-handle {
      width: 40px; height: 4px; border-radius: 4px;
      background: var(--border); margin: 0 auto 20px; display: block;
    }
    .pf-modal h3   { font-size: 1.15rem; font-weight: 900; margin-bottom: 10px; }
    .pf-modal p    { color: var(--sub); margin-bottom: 20px; font-size: 0.86rem; line-height: 1.65; }
    .pf-modal-actions { display: flex; gap: 10px; justify-content: flex-end; }

    /* ── Font Size Selector ── */
    .pf-font-select { display: flex; gap: 8px; }
    .pf-font-btn {
      padding: 7px 14px; border-radius: 8px;
      border: 1px solid var(--border); background: var(--glass);
      color: var(--sub); cursor: pointer; font-weight: 700; transition: var(--transition);
    }
    .pf-font-btn.active { background: ${pal.accent}22; border-color: var(--accent); color: var(--accent); }

    /* ── Section Headers ── */
    .pf-section-title { font-size: 1.3rem; font-weight: 900; margin-bottom: 4px; color: var(--text); }
    .pf-section-sub   { font-size: 0.8rem; color: var(--sub); margin-bottom: 22px; }

    /* ── Tip Box ── */
    .pf-tip {
      background: ${pal.accent}0e; border: 1px solid ${pal.accent}22;
      border-radius: var(--radius-sm); padding: 12px 14px;
      font-size: 0.8rem; color: var(--sub);
      display: flex; gap: 10px; align-items: flex-start; margin-top: 12px;
    }
    .pf-tip-icon { font-size: 1rem; flex-shrink: 0; margin-top: 2px; }

    /* ── Language Buttons ── */
    .pf-lang { display: flex; gap: 6px; }
    .pf-lang-btn {
      padding: 6px 14px; border-radius: 8px; font-weight: 800; font-size: 0.78rem;
      cursor: pointer; transition: var(--transition);
      border: 1px solid var(--border); background: var(--glass); color: var(--sub);
    }
    .pf-lang-btn.active { background: ${pal.accent}22; border-color: var(--accent); color: var(--accent); }

    /* ══════════════════════════════════════════════
       RESPONSIVE — Tablet y Desktop
    ══════════════════════════════════════════════ */
    @media (min-width: 600px) {
      .pf-content { padding: 28px 28px calc(var(--navbar-h) + 20px); }
      .pf-quick   { grid-template-columns: repeat(4, 1fr); }
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

  // ── Vistas ───────────────────────────────────────────────────
  const [sectorSearch, setSectorSearch] = useState("");

  const DashboardView = () => {
    const greetData = GREET(profile.name || profile.business, lang);
    const motiv     = MOTIVATION[motivIdx];
    const recent    = [...records].sort((a, b) => b.ts - a.ts).slice(0, 5);

    return (
      <div>
        <div className="pf-motiv">
          <strong>{motiv[0]}</strong>
          <span>{motiv[1]}</span>
        </div>

        <div className="pf-stats">
          <div className="pf-stat">
            <div className="pf-stat-val">{records.length}</div>
            <div className="pf-stat-lbl">{t.totalRecords}</div>
          </div>
          <div className="pf-stat">
            <div className="pf-stat-val">{todayCount}</div>
            <div className="pf-stat-lbl">{t.todayRecords}</div>
          </div>
          <div className="pf-stat">
            <div className="pf-stat-val">{mySectors.length}</div>
            <div className="pf-stat-lbl">{lang === "es" ? "Sectores" : "Sectors"}</div>
          </div>
        </div>

        <div className="pf-quick">
          <div className="pf-quick-btn" onClick={() => navigate("records")}>
            <div className="pf-quick-icon"><Icon name="plus" size={20} color={pal.accent} /></div>
            <div className="pf-quick-text">
              {t.newRecord}
              <small>{lang === "es" ? "Crear expediente rápido" : "Create record fast"}</small>
            </div>
          </div>
          <div className="pf-quick-btn" onClick={connectDrive}>
            <div className="pf-quick-icon"><Icon name="drive" size={20} color={driveConnected ? "#10b981" : pal.accent} /></div>
            <div className="pf-quick-text">
              {driveConnected ? t.driveConnected : t.driveConnect}
              <small>{t.tipDrive}</small>
            </div>
          </div>
          <div className="pf-quick-btn" onClick={() => navigate("settings")}>
            <div className="pf-quick-icon"><Icon name="upload" size={20} color={pal.accent} /></div>
            <div className="pf-quick-text">
              {lang === "es" ? "Mi Logo" : "My Logo"}
              <small>{t.tipLogo}</small>
            </div>
          </div>
          <div className="pf-quick-btn" onClick={() => navigate("sectors")}>
            <div className="pf-quick-icon"><Icon name="sectors" size={20} color={pal.accent} /></div>
            <div className="pf-quick-text">
              {t.addSector}
              <small>{lang === "es" ? `${mySectors.length} sector(es) activo(s)` : `${mySectors.length} active`}</small>
            </div>
          </div>
        </div>

        <div className="pf-card">
          <div className="pf-card-title">{t.recentRecords}</div>
          {recent.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--sub)" }}>
              <div style={{ fontSize: "2.8rem", marginBottom: 12 }}>📋</div>
              <div style={{ fontWeight: 700 }}>{t.noRecords}</div>
              <button className="pf-btn pf-btn-primary" style={{ marginTop: 16 }} onClick={() => navigate("records")}>
                <Icon name="plus" size={17} color="inherit" /> {t.newRecord}
              </button>
            </div>
          ) : recent.map(r => <RecordItem key={r.id} record={r} />)}
        </div>
      </div>
    );
  };

  const RecordItem = ({ record }) => {
    const sector = SECTORS.find(s => s.id === record.sectorId);
    return (
      <div className="pf-record-item">
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
          <div className="pf-record-btn pdf" title={t.exportPDF}
            onClick={() => showToast(lang === "es" ? "PDF generado" : "PDF generated")}>
            <Icon name="pdf" size={14} color="currentColor" />
          </div>
          <div className="pf-record-btn wa" title={t.shareWhatsapp}
            onClick={() => shareWhatsApp(record)}>
            <Icon name="whatsapp" size={14} color="currentColor" />
          </div>
          <div className="pf-record-btn del" title={t.deleteRecord}
            onClick={() => setModal({ type: "deleteRecord", id: record.id })}>
            <Icon name="trash" size={14} color="currentColor" />
          </div>
        </div>
      </div>
    );
  };

  const SectorsView = () => {
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
            <div className="pf-sectors-grid" style={{ marginBottom: 30 }}>
              {mySectors.map(sid => {
                const s = SECTORS.find(x => x.id === sid);
                if (!s) return null;
                return (
                  <div key={sid} className="pf-sector-card mine" style={{ borderColor: s.color + "66" }}>
                    <span className="emoji">{s.icon}</span>
                    <div className="label">{lang === "es" ? s.label : s.label_en}</div>
                    <div className="mine-badge"><Icon name="check" size={10} color="#fff" /></div>
                    <div className="pf-sector-remove"
                      onClick={e => { e.stopPropagation(); removeSector(sid); }}>
                      <Icon name="x" size={10} color="#fff" />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="pf-search">
          <span className="pf-search-icon"><Icon name="search" size={17} /></span>
          <input
            className="pf-input"
            style={{ paddingLeft: 42, marginBottom: 0 }}
            placeholder={t.searchSector}
            value={sectorSearch}
            onChange={e => setSectorSearch(e.target.value)}
          />
        </div>

        {grouped.map(({ cat, label, sectors }) => (
          <div key={cat}>
            <div className="pf-category-title">{label}</div>
            <div className="pf-sectors-grid">
              {sectors.map(s => (
                <div
                  key={s.id}
                  className={`pf-sector-card ${mySectors.includes(s.id) ? "mine" : ""}`}
                  style={mySectors.includes(s.id) ? { borderColor: s.color + "88" } : {}}
                  onClick={() => mySectors.includes(s.id) ? removeSector(s.id) : addSector(s.id)}
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
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const RecordsView = () => {
    const [search,      setSearch]      = useState("");
    const [filterSector,setFilterSector]= useState("all");
    const [showNew,     setShowNew]     = useState(false);
    const [newName,     setNewName]     = useState("");
    const [newSector,   setNewSector]   = useState(mySectors[0] || "");
    const [wizardOpen,  setWizardOpen]  = useState(false);
    const [wizardData,  setWizardData]  = useState(null);

    const filtered = records.filter(r =>
      (filterSector === "all" || r.sectorId === filterSector) &&
      (search === "" || r.patientName.toLowerCase().includes(search.toLowerCase()))
    ).sort((a, b) => b.ts - a.ts);

    const openWizard = () => {
      if (!newName.trim()) { showToast(lang === "es" ? "Ingresa el nombre del paciente" : "Enter patient name", "error"); return; }
      if (!newSector)      { showToast(lang === "es" ? "Selecciona un sector"           : "Select a sector",    "error"); return; }
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

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div className="pf-section-title">{t.records}</div>
          <button className="pf-btn pf-btn-primary" onClick={() => setShowNew(!showNew)}>
            <Icon name="plus" size={17} color="inherit" /> {t.newRecord}
          </button>
        </div>
        <div className="pf-section-sub">
          {lang === "es" ? `${records.length} expediente(s) guardado(s)` : `${records.length} record(s) saved`}
        </div>

        {showNew && (
          <div className="pf-card" style={{ marginBottom: 18, borderColor: pal.accent + "44" }}>
            <div className="pf-card-title">{t.newRecord}</div>
            <label className="pf-label">{lang === "es" ? "Nombre del Paciente / Cliente" : "Patient / Client Name"}</label>
            <input
              className="pf-input"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder={lang === "es" ? "Nombre completo..." : "Full name..."}
              onKeyDown={e => e.key === "Enter" && openWizard()}
              autoFocus
            />
            <label className="pf-label">{lang === "es" ? "Sector" : "Sector"}</label>
            <select className="pf-select" value={newSector} onChange={e => setNewSector(e.target.value)}>
              {mySectors.map(sid => {
                const s = SECTORS.find(x => x.id === sid);
                return s ? <option key={sid} value={sid}>{s.icon} {lang === "es" ? s.label : s.label_en}</option> : null;
              })}
            </select>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button className="pf-btn pf-btn-primary" onClick={openWizard}>
                <Icon name="plus" size={17} color="inherit" /> {lang === "es" ? "Abrir Formulario" : "Open Form"}
              </button>
              <button className="pf-btn pf-btn-ghost" onClick={() => setShowNew(false)}>{t.cancel}</button>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
          <div className="pf-search" style={{ flex: 1, marginBottom: 0 }}>
            <span className="pf-search-icon"><Icon name="search" size={17} /></span>
            <input
              className="pf-input"
              style={{ paddingLeft: 42, marginBottom: 0 }}
              placeholder={lang === "es" ? "Buscar expediente..." : "Search record..."}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="pf-select"
            style={{ width: "auto", minWidth: 150 }}
            value={filterSector}
            onChange={e => setFilterSector(e.target.value)}
          >
            <option value="all">{t.allSectors}</option>
            {mySectors.map(sid => {
              const s = SECTORS.find(x => x.id === sid);
              return s ? <option key={sid} value={sid}>{lang === "es" ? s.label : s.label_en}</option> : null;
            })}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--sub)" }}>
            <div style={{ fontSize: "2.8rem", marginBottom: 12 }}>🔍</div>
            <div style={{ fontWeight: 700 }}>
              {records.length === 0 ? t.noRecords : (lang === "es" ? "Sin resultados para tu búsqueda" : "No results found")}
            </div>
          </div>
        ) : filtered.map(r => <RecordItem key={r.id} record={r} />)}
      </div>
    );
  };

  const logoInputRef   = useRef();
  const configInputRef = useRef();

  const SettingsView = () => {
    const [localProfile, setLocalProfile] = useState({ ...profile });
    const [saving,       setSaving]       = useState(false);

    const handleSave = () => {
      setSaving(true);
      setProfile(localProfile);
      storage.set("profile", localProfile);
      setTimeout(() => { setSaving(false); showToast(t.saved); }, 600);
    };

    const handleLogo = (e) => {
      const file = e.target.files[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => setLocalProfile(p => ({ ...p, logo: ev.target.result }));
      reader.readAsDataURL(file);
    };

    const handleImportConfig = (e) => {
      const file = e.target.files[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const cfg = JSON.parse(ev.target.result);
          if (cfg.profile)    setProfile(cfg.profile);
          if (cfg.mySectors)  setMySectors(cfg.mySectors);
          if (cfg.palette)    setPalette(cfg.palette);
          if (cfg.lang)       setLang(cfg.lang);
          showToast(lang === "es" ? "Configuración importada ✓" : "Config imported ✓");
        } catch { showToast(lang === "es" ? "Archivo inválido" : "Invalid file", "error"); }
      };
      reader.readAsText(file);
    };

    const PDF_COLORS = ["#050508","#0a0a14","#0c1a2e","#0a1a0a","#1a0a0a","#1a1a00","#f8fafc","#ffffff"];

    return (
      <div>
        <div className="pf-section-title">{t.settings}</div>
        <div className="pf-section-sub">
          {lang === "es" ? "Personaliza tu experiencia y la identidad de tus documentos." : "Customize your experience and document identity."}
        </div>

        {/* Perfil */}
        <div className="pf-card" style={{ marginBottom: 14 }}>
          <div className="pf-card-title">{t.profile}</div>

          <label className="pf-label">{t.logo}</label>
          <div className="pf-logo-box" onClick={() => logoInputRef.current?.click()}>
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
          <input ref={logoInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleLogo} />
          {localProfile.logo && (
            <button className="pf-btn pf-btn-danger" style={{ marginTop: 10, padding: "7px 14px", fontSize: "0.8rem" }}
              onClick={() => setLocalProfile(p => ({ ...p, logo: null }))}>
              <Icon name="trash" size={13} color="currentColor" /> {t.removeLogo}
            </button>
          )}

          <div className="pf-grid-2">
            <div>
              <label className="pf-label">{t.businessName}</label>
              <input className="pf-input" value={localProfile.business}
                onChange={e => setLocalProfile(p => ({ ...p, business: e.target.value }))}
                placeholder={lang === "es" ? "Ej. Dra. García Nutrición" : "e.g. Dr. Smith Clinic"} />
            </div>
            <div>
              <label className="pf-label">{lang === "es" ? "Tu nombre (saludo)" : "Your name (greeting)"}</label>
              <input className="pf-input" value={localProfile.name}
                onChange={e => setLocalProfile(p => ({ ...p, name: e.target.value }))}
                placeholder={lang === "es" ? "Ej. María" : "e.g. María"} />
            </div>
          </div>
          <div className="pf-grid-2">
            <div>
              <label className="pf-label">{t.phone}</label>
              <input className="pf-input" value={localProfile.phone}
                onChange={e => setLocalProfile(p => ({ ...p, phone: e.target.value }))}
                placeholder="+52 33 1234 5678" />
            </div>
            <div>
              <label className="pf-label">{t.email}</label>
              <input className="pf-input" type="email" value={localProfile.email}
                onChange={e => setLocalProfile(p => ({ ...p, email: e.target.value }))}
                placeholder="hola@tuconsultorio.mx" />
            </div>
          </div>
          <div className="pf-grid-2">
            <div>
              <label className="pf-label">{t.whatsapp}</label>
              <input className="pf-input" value={localProfile.whatsapp}
                onChange={e => setLocalProfile(p => ({ ...p, whatsapp: e.target.value }))}
                placeholder="+52 33 1234 5678" />
            </div>
            <div>
              <label className="pf-label">{t.website}</label>
              <input className="pf-input" value={localProfile.website}
                onChange={e => setLocalProfile(p => ({ ...p, website: e.target.value }))}
                placeholder="www.tuconsultorio.mx" />
            </div>
          </div>
          <label className="pf-label">{t.address}</label>
          <input className="pf-input" value={localProfile.address}
            onChange={e => setLocalProfile(p => ({ ...p, address: e.target.value }))}
            placeholder={lang === "es" ? "Calle, colonia, ciudad..." : "Street, city..."} />

          <label className="pf-label">{t.pdfColor}</label>
          <div className="pf-pdf-colors">
            {PDF_COLORS.map(c => (
              <div key={c}
                className={`pf-pdf-color ${localProfile.pdfBg === c ? "active" : ""}`}
                style={{ background: c, border: (c === "#ffffff" || c === "#f8fafc") ? "1px solid var(--border)" : "none" }}
                onClick={() => setLocalProfile(p => ({ ...p, pdfBg: c }))}
                title={c}
              />
            ))}
          </div>
          <div className="pf-pdf-color-custom">
            <input type="color" value={localProfile.pdfBg || "#050508"}
              onChange={e => setLocalProfile(p => ({ ...p, pdfBg: e.target.value }))} />
            <span style={{ fontSize: "0.82rem", color: "var(--sub)" }}>
              {lang === "es" ? "Color personalizado: " : "Custom color: "}
              <strong style={{ color: "var(--text)" }}>{localProfile.pdfBg || "#050508"}</strong>
            </span>
          </div>
        </div>

        {/* Términos */}
        <div className="pf-card" style={{ marginBottom: 14 }}>
          <div className="pf-card-title">{t.termsTitle}</div>
          <p style={{ color: "var(--sub)", fontSize: "0.84rem", marginBottom: 12 }}>
            {lang === "es"
              ? "Estos términos aparecerán en todos tus PDFs exportados. Incluye tu aviso de privacidad, consentimiento informado y cláusulas legales relevantes."
              : "These terms will appear in all your exported PDFs. Include your privacy notice, informed consent and relevant legal clauses."}
          </p>
          <textarea className="pf-textarea" value={localProfile.terms}
            onChange={e => setLocalProfile(p => ({ ...p, terms: e.target.value }))}
            placeholder={t.termsPlaceholder}
            style={{ minHeight: 180 }}
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
        <div className="pf-card" style={{ marginBottom: 14 }}>
          <div className="pf-card-title">{t.colorTheme}</div>
          <div className="pf-palettes">
            {PALETTES.map(p => (
              <div key={p.id} className={`pf-palette-chip ${palette === p.id ? "active" : ""}`}
                title={p.name} onClick={() => setPalette(p.id)}>
                <div className="chip-inner">
                  <div className="chip-half" style={{ background: p.bg }} />
                  <div className="chip-half" style={{ background: p.accent }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: "0.8rem", color: "var(--sub)" }}>
            {lang === "es" ? "Tema actual: " : "Current theme: "}
            <strong style={{ color: "var(--text)" }}>{PALETTES.find(p => p.id === palette)?.name}</strong>
          </div>

          <label className="pf-label" style={{ marginTop: 20 }}>{t.language}</label>
          <div className="pf-lang">
            <button className={`pf-lang-btn ${lang === "es" ? "active" : ""}`} onClick={() => setLang("es")}>🇲🇽 Español</button>
            <button className={`pf-lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>🇺🇸 English</button>
          </div>
        </div>

        {/* Empresarial */}
        <div className="pf-card" style={{ marginBottom: 14, borderColor: pal.accent + "44" }}>
          <div className="pf-card-title">🏢 {lang === "es" ? "Configuración Empresarial" : "Enterprise Config"}</div>
          <p style={{ color: "var(--sub)", fontSize: "0.84rem", marginBottom: 16 }}>
            {lang === "es"
              ? "Exporta o importa la configuración completa para replicarla en múltiples dispositivos."
              : "Export or import the full app configuration to replicate it across multiple devices."}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="pf-btn pf-btn-ghost" onClick={() => setModal({ type: "exportConfig" })}>
              <Icon name="download" size={15} color="currentColor" /> {t.exportConfig}
            </button>
            <button className="pf-btn pf-btn-ghost" onClick={() => configInputRef.current?.click()}>
              <Icon name="upload" size={15} color="currentColor" /> {t.importConfig}
            </button>
          </div>
          <input ref={configInputRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleImportConfig} />
          <div className="pf-tip" style={{ marginTop: 14 }}>
            <span className="pf-tip-icon">🔒</span>
            <span>
              {lang === "es"
                ? "Exporta tu configuración protegida con una contraseña que tú eliges. Solo quien tenga esa contraseña podrá importar el archivo."
                : "Export your configuration protected with a password you choose. Only those with the password can import the file."}
            </span>
          </div>
        </div>

        {/* WhatsApp tip */}
        <div className="pf-card" style={{ marginBottom: 14 }}>
          <div className="pf-card-title">💬 WhatsApp</div>
          <p style={{ color: "var(--sub)", fontSize: "0.84rem", marginBottom: 0 }}>{t.tipWhatsapp}</p>
          <div className="pf-tip">
            <span className="pf-tip-icon">📱</span>
            <span>
              {lang === "es"
                ? "Con el número de WhatsApp configurado, cada expediente tendrá un botón de envío directo sin necesidad de agregar el contacto primero."
                : "With your WhatsApp number configured, each record will have a direct send button without needing to save the contact first."}
            </span>
          </div>
        </div>

        {/* Drive tip */}
        <div className="pf-card" style={{ marginBottom: 20 }}>
          <div className="pf-card-title">☁️ Google Drive</div>
          <p style={{ color: "var(--sub)", fontSize: "0.84rem", marginBottom: 0 }}>{t.tipDrive}</p>
          <div className="pf-tip">
            <span className="pf-tip-icon">📁</span>
            <span>
              {lang === "es"
                ? "Al conectar tu Google Drive, ProFicha crea automáticamente la carpeta 'ProFicha — Expedientes'. Todos los respaldos se acumulan ahí sin sobreescribirse."
                : "When you connect Google Drive, ProFicha automatically creates the 'ProFicha — Records' folder. All backups accumulate there without overwriting."}
            </span>
          </div>
        </div>

        <button className="pf-btn pf-btn-primary" style={{ width: "100%" }} onClick={handleSave}>
          {saving
            ? (lang === "es" ? "Guardando..." : "Saving...")
            : <><Icon name="check" size={17} color="inherit" /> {t.save}</>}
        </button>
      </div>
    );
  };

  const AccessibilityView = () => (
    <div>
      <div className="pf-section-title">{t.accessibilityTitle}</div>
      <div className="pf-section-sub">
        {lang === "es" ? "Adapta la aplicación a tus necesidades visuales y motoras." : "Adapt the app to your visual and motor needs."}
      </div>

      <div className="pf-card" style={{ marginBottom: 14 }}>
        <div className="pf-card-title">{t.fontSize}</div>
        <div className="pf-font-select">
          {[["sm","A"],[" md","A"],["lg","A"],["xl","A"]].map(([k,l], i) => (
            <button key={k.trim()} className={`pf-font-btn ${a11y.fontSize === k.trim() ? "active" : ""}`}
              style={{ fontSize: [12,16,20,24][i] }}
              onClick={() => setA11y(p => ({ ...p, fontSize: k.trim() }))}>{l}</button>
          ))}
        </div>
      </div>

      <div className="pf-card" style={{ marginBottom: 14 }}>
        <div className="pf-toggle">
          <div>
            <div className="pf-toggle-label">{t.contrast}</div>
            <div className="pf-toggle-sub">{lang === "es" ? "Aumenta el contraste visual de toda la app" : "Increases visual contrast throughout the app"}</div>
          </div>
          <button className={`pf-switch ${a11y.contrast ? "on" : ""}`}
            onClick={() => setA11y(p => ({ ...p, contrast: !p.contrast }))} />
        </div>
        <div className="pf-toggle">
          <div>
            <div className="pf-toggle-label">{t.animations}</div>
            <div className="pf-toggle-sub">{lang === "es" ? "Activa o desactiva las transiciones animadas" : "Toggle animated transitions"}</div>
          </div>
          <button className={`pf-switch ${a11y.animations ? "on" : ""}`}
            onClick={() => setA11y(p => ({ ...p, animations: !p.animations }))} />
        </div>
        <div className="pf-toggle">
          <div>
            <div className="pf-toggle-label">{t.screenReader}</div>
            <div className="pf-toggle-sub">{lang === "es" ? "Optimiza el contenido para lectores de pantalla" : "Optimizes content for screen readers"}</div>
          </div>
          <button className={`pf-switch ${a11y.screenReader ? "on" : ""}`}
            onClick={() => setA11y(p => ({ ...p, screenReader: !p.screenReader }))} />
        </div>
      </div>

      <div className="pf-card" style={{ borderColor: "#ef444444" }}>
        <div className="pf-card-title" style={{ color: "#ef4444" }}>⚠️ {t.resetApp}</div>
        <p style={{ color: "var(--sub)", fontSize: "0.84rem", marginBottom: 16 }}>
          {lang === "es"
            ? "Elimina todos los datos guardados y restablece la aplicación a su estado original."
            : "Deletes all saved data and resets the app to its original state."}
        </p>
        <button className="pf-btn pf-btn-danger" onClick={() => setModal({ type: "resetApp" })}>
          <Icon name="reset" size={15} color="currentColor" /> {t.resetApp}
        </button>
      </div>
    </div>
  );

  const HelpView = () => {
    const [openSection, setOpenSection] = useState(null);
    const toggle = (id) => setOpenSection(prev => prev === id ? null : id);

    const helpSections = lang === "es" ? [
      { id: "inicio", emoji: "🚀", title: "Primeros pasos", color: "#6366f1", items: [
        { q: "¿Cómo configuro mi perfil por primera vez?", a: "Ve a Ajustes (ícono ⚙️ en la barra inferior). Agrega tu nombre profesional, el nombre de tu negocio, teléfono, correo, WhatsApp y dirección. Este perfil aparecerá en todos tus PDFs exportados." },
        { q: "¿Cómo subo mi logo?", a: "En Ajustes, toca el área de logo (ícono 🏢). Selecciona una imagen PNG, JPG o SVG de hasta 2MB. Tu logo aparecerá automáticamente en todos los PDFs que generes." },
        { q: "¿Cómo activo los sectores que necesito?", a: "Ve a Sectores (ícono de cuadrícula en la barra inferior). Verás todos los sectores disponibles agrupados por categoría. Toca cualquiera para agregarlo a tus sectores activos." },
        { q: "¿Puedo cambiar el idioma de la app?", a: "Sí. En la barra superior hay un botón con bandera 🇺🇸/🇲🇽. También puedes cambiarlo desde Ajustes → Idioma. El cambio aplica a toda la interfaz al instante." },
        { q: "¿Qué pasa si cierro la app? ¿Pierdo mis datos?", a: "No. Todos tus expedientes, configuración y sectores se guardan automáticamente en el dispositivo. Puedes cerrar y reabrir la app sin perder nada." },
      ]},
      { id: "expedientes", emoji: "📋", title: "Expedientes y pacientes", color: "#10b981", items: [
        { q: "¿Cómo creo un nuevo expediente?", a: "Ve a Expedientes y toca el botón 'Nuevo Expediente'. Escribe el nombre del paciente o cliente, selecciona el sector correspondiente y completa el formulario. Al finalizar, el expediente queda guardado automáticamente." },
        { q: "¿Puedo buscar un expediente específico?", a: "Sí. En la sección Expedientes hay una barra de búsqueda en la parte superior. Escribe el nombre del paciente y los resultados se filtran en tiempo real." },
        { q: "¿Puedo filtrar expedientes por sector?", a: "Sí. En la sección Expedientes hay un filtro por sector al lado de la barra de búsqueda. Selecciona el sector que necesitas y solo verás los expedientes de ese tipo." },
        { q: "¿Cómo elimino un expediente?", a: "Toca el ícono de basura 🗑️ en el expediente. La app te pedirá confirmación antes de borrarlo permanentemente. Esta acción no se puede deshacer." },
        { q: "¿Cuántos expedientes puedo guardar?", a: "No hay límite. Puedes guardar todos los expedientes que quieras, limitado únicamente por el espacio de almacenamiento de tu dispositivo." },
      ]},
      { id: "pdf", emoji: "📄", title: "Exportación de PDF", color: "#f59e0b", items: [
        { q: "¿Cómo exporto un expediente como PDF?", a: "En la lista de Expedientes, cada registro tiene un botón de PDF (ícono 📄). Tócalo y el archivo se descargará automáticamente a tu dispositivo con tu logo, datos y los términos que configuraste." },
        { q: "¿El PDF se ve bien en papel?", a: "Sí. Los PDFs de ProFicha están optimizados para impresión bancaria/profesional: márgenes correctos, saltos de página automáticos, tipografía legible y sin cortes." },
        { q: "¿Mi logo aparece en el PDF?", a: "Sí. Si tienes un logo configurado, aparecerá en el encabezado de cada página del PDF junto con tu nombre y datos de contacto." },
        { q: "¿Puedo personalizar el color del fondo del PDF?", a: "Sí. En Ajustes → Color de Fondo del PDF, puedes elegir entre paletas predefinidas o ingresar cualquier color hexadecimal personalizado." },
        { q: "¿Los términos y consentimientos aparecen en el PDF?", a: "Sí. El texto que escribas en Ajustes → Términos y Consentimientos aparecerá automáticamente al final de cada PDF exportado." },
        { q: "¿Puedo enviar el PDF por WhatsApp directamente?", a: "Sí. Cada expediente tiene un botón de WhatsApp (verde 💬). Al tocarlo, se abre WhatsApp con el número de tu cliente preconfigurado y un resumen del expediente." },
      ]},
      { id: "drive", emoji: "☁️", title: "Google Drive y respaldos", color: "#3b82f6", items: [
        { q: "¿Cómo conecto Google Drive?", a: "En el Panel Principal, toca el botón 'Conectar Google Drive'. La app te redirigirá a la pantalla de autorización de Google. Acepta los permisos y Drive quedará vinculado a tu cuenta." },
        { q: "¿Se crea una carpeta automática en mi Drive?", a: "Sí. Al conectar Google Drive, ProFicha crea automáticamente una carpeta llamada 'ProFicha — Expedientes' en tu unidad. Todos los respaldos se guardan dentro de esa carpeta, organizados y acumulados." },
        { q: "¿Los expedientes se suben solos o tengo que hacerlo manualmente?", a: "Tienes control total. En el Panel Principal hay un botón 'Respaldar en Google Drive'. Al tocarlo, todos tus expedientes actuales se suben a la carpeta de ProFicha en tu Drive." },
        { q: "¿Se sobreescriben los archivos viejos en Drive?", a: "No. Cada respaldo genera un archivo nuevo con fecha y hora en el nombre. Tu historial de respaldos se acumula en la carpeta de ProFicha sin borrar los anteriores." },
        { q: "¿Necesito internet para usar la app?", a: "No para el uso diario. ProFicha funciona completamente sin internet: crear expedientes, exportar PDFs, ver tu historial. Solo necesitas conexión para subir respaldos a Google Drive." },
      ]},
      { id: "empresa", emoji: "🏢", title: "Uso empresarial", color: "#a855f7", items: [
        { q: "¿Qué es la contraseña empresarial?", a: "Es una contraseña que tú configuras y entregas a tus colaboradores para que puedan importar la configuración de tu empresa — perfil, logo, sectores, colores y términos — sin poder modificar los ajustes de seguridad." },
        { q: "¿Cómo exporto la configuración para mis empleados?", a: "Ve a Ajustes → Configuración Empresarial → Exportar Configuración. La app te pedirá la contraseña empresarial y generará un archivo JSON que puedes compartir con tus colaboradores." },
        { q: "¿Cómo importa la configuración un colaborador?", a: "El colaborador recibe el archivo JSON y va a Ajustes → Importar Configuración. Selecciona el archivo y la app se configura automáticamente con la identidad de tu negocio." },
        { q: "¿Qué incluye la membresía básica ($250)?", a: "Acceso completo a todos los sectores, generación ilimitada de expedientes y PDFs, exportación a Google Drive, personalización de perfil y logo, y 3 actualizaciones mayores gratuitas incluidas." },
      ]},
      { id: "accesibilidad", emoji: "♿", title: "Accesibilidad", color: "#06b6d4", items: [
        { q: "¿Cómo cambio el tamaño del texto?", a: "Ve a la sección Acceso (ícono de reloj en la barra inferior) → Tamaño de Fuente. Hay 4 niveles: Pequeño, Normal, Grande y Extra Grande. El cambio aplica a toda la app de inmediato." },
        { q: "¿Qué hace el modo de Alto Contraste?", a: "Aumenta significativamente el contraste visual de toda la interfaz, útil para personas con visión reducida o en entornos con mucha luz." },
        { q: "¿Qué son las Animaciones Reducidas?", a: "Desactiva todas las transiciones y animaciones de la app. Útil para personas con sensibilidad al movimiento o dispositivos más lentos." },
        { q: "¿Los cambios de accesibilidad se guardan?", a: "Sí. Todos los ajustes de accesibilidad se guardan automáticamente y persisten entre sesiones." },
      ]},
      { id: "soporte", emoji: "🎧", title: "Soporte y contacto", color: "#25d366", items: [
        { q: "¿Cómo contacto al soporte técnico?", a: "Nuestros medios oficiales de atención son:\n\n📱 WhatsApp: +52 33 48 57 2070\n📧 Correo: angel.guerrero@valtaraexecutive.com\n\nHorario: Lunes a viernes de 9:00 a 18:00 h (hora del centro de México)." },
        { q: "¿Cuánto tiempo tardan en responder?", a: "Respondemos por WhatsApp en un máximo de 4 horas hábiles. Por correo, en 24 horas hábiles. Para urgencias, WhatsApp es el canal más rápido." },
        { q: "¿Qué información debo incluir al reportar un problema?", a: "Para atenderte más rápido, incluye: descripción del problema, sector o función donde ocurre, nombre y versión de tu dispositivo, y si es posible, una captura de pantalla del error." },
        { q: "¿Puedo solicitar un sector que no está en la app?", a: "Sí. Contáctanos por WhatsApp o correo indicando el sector que necesitas. Lo evaluamos para incluirlo en la próxima actualización." },
      ]},
    ] : [
      { id: "inicio", emoji: "🚀", title: "Getting started", color: "#6366f1", items: [
        { q: "How do I set up my profile for the first time?", a: "Go to Settings (⚙️ icon in the bottom bar). Add your professional name, business name, phone, email, WhatsApp and address. This profile will appear on all your exported PDFs." },
        { q: "How do I upload my logo?", a: "In Settings, tap the logo area (🏢 icon). Select a PNG, JPG or SVG image up to 2MB. Your logo will automatically appear on all PDFs you generate." },
        { q: "How do I activate the sectors I need?", a: "Go to Sectors (grid icon in the bottom bar). You'll see all available sectors grouped by category. Tap any one to add it to your active sectors." },
        { q: "Can I change the app language?", a: "Yes. In the top bar there's a flag button 🇺🇸/🇲🇽. You can also change it from Settings → Language. The change applies instantly." },
        { q: "What happens if I close the app? Do I lose my data?", a: "No. All your records, settings and sectors are automatically saved on the device. You can close and reopen the app without losing anything." },
      ]},
      { id: "expedientes", emoji: "📋", title: "Records and patients", color: "#10b981", items: [
        { q: "How do I create a new record?", a: "Go to Records and tap 'New Record'. Type the patient's name, select the sector and fill out the form. When done, the record is saved automatically." },
        { q: "Can I search for a specific record?", a: "Yes. In the Records section there's a search bar at the top. Type the patient's name and results filter in real time." },
        { q: "How do I delete a record?", a: "Tap the trash icon 🗑️ on the record. The app will ask for confirmation before permanently deleting it. This cannot be undone." },
        { q: "How many records can I store?", a: "There is no limit. You can store as many records as you want, limited only by your device's storage space." },
      ]},
      { id: "drive", emoji: "☁️", title: "Google Drive & Backups", color: "#3b82f6", items: [
        { q: "How do I connect Google Drive?", a: "In the Dashboard, tap 'Connect Google Drive'. The app will redirect you to Google's authorization screen. Accept the permissions and Drive will be linked." },
        { q: "Is a folder automatically created in my Drive?", a: "Yes. When you connect Google Drive, ProFicha automatically creates a folder called 'ProFicha — Records'. All backups accumulate inside that folder." },
        { q: "Do I need internet to use the app?", a: "No, not for daily use. ProFicha works completely offline. You only need a connection to upload backups to Google Drive." },
      ]},
      { id: "soporte", emoji: "🎧", title: "Support & Contact", color: "#25d366", items: [
        { q: "How do I contact technical support?", a: "Our official support channels:\n\n📱 WhatsApp: +52 33 48 57 2070\n📧 Email: angel.guerrero@valtaraexecutive.com\n\nSupport hours: Monday to Friday, 9:00 AM – 6:00 PM (Mexico Central Time)." },
        { q: "How long does it take to get a response?", a: "We respond on WhatsApp within 4 business hours. By email, within 24 business hours. For urgent issues, WhatsApp is the fastest channel." },
        { q: "Can I request a sector that isn't in the app?", a: "Yes. Contact us via WhatsApp or email stating the sector you need. We evaluate all proposals for inclusion in the next ProFicha update." },
      ]},
    ];

    return (
      <div>
        <div className="pf-section-title">{t.help}</div>
        <div className="pf-section-sub">
          {lang === "es"
            ? "Centro de ayuda completo — encuentra respuestas a cualquier duda sobre ProFicha."
            : "Complete help center — find answers to any questions about ProFicha."}
        </div>

        {/* Banner de soporte */}
        <div style={{
          background: "linear-gradient(135deg, #25d36622, #25d36608)",
          border: "1px solid #25d36644", borderRadius: "var(--radius)",
          padding: "18px 20px", marginBottom: 22,
          display: "flex", gap: 14, alignItems: "center"
        }}>
          <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>🎧</span>
          <div>
            <strong style={{ display: "block", color: "#25d366", marginBottom: 4, fontSize: "0.92rem" }}>
              {lang === "es" ? "¿Necesitas ayuda directa?" : "Need direct help?"}
            </strong>
            <div style={{ color: "var(--sub)", fontSize: "0.78rem", lineHeight: 1.8 }}>
              WhatsApp: <strong style={{ color: "var(--text)" }}>+52 33 48 57 2070</strong><br />
              {lang === "es" ? "Correo: " : "Email: "}<strong style={{ color: "var(--text)" }}>angel.guerrero@valtaraexecutive.com</strong>
            </div>
          </div>
        </div>

        {/* Secciones acordeón */}
        {helpSections.map((section) => (
          <div key={section.id} style={{ marginBottom: 10 }}>
            <button
              onClick={() => toggle(section.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 14,
                padding: "15px 18px",
                background: openSection === section.id ? `${section.color}18` : "var(--glass)",
                border: `1px solid ${openSection === section.id ? section.color + "55" : "var(--border)"}`,
                borderRadius: openSection === section.id ? "var(--radius) var(--radius) 0 0" : "var(--radius)",
                cursor: "pointer", transition: "all 0.2s", color: "var(--text)", fontFamily: "inherit",
                backdropFilter: "blur(12px)",
              }}
            >
              <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{section.emoji}</span>
              <span style={{ flex: 1, textAlign: "left", fontWeight: 800, fontSize: "0.92rem" }}>{section.title}</span>
              <span style={{
                color: section.color, fontWeight: 900, fontSize: "1.1rem", flexShrink: 0,
                transition: "transform 0.2s",
                transform: openSection === section.id ? "rotate(180deg)" : "none"
              }}>▾</span>
            </button>

            {openSection === section.id && (
              <div style={{
                background: "var(--glass)", border: `1px solid ${section.color}55`,
                borderTop: "none", borderRadius: "0 0 var(--radius) var(--radius)",
                overflow: "hidden", backdropFilter: "blur(12px)",
              }}>
                {section.items.map((item, idx) => (
                  <div key={idx} style={{
                    padding: "14px 18px",
                    borderBottom: idx < section.items.length - 1 ? "1px solid var(--border)" : "none"
                  }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ color: section.color, fontWeight: 900, fontSize: "0.95rem", flexShrink: 0, marginTop: 1 }}>?</span>
                      <div>
                        <strong style={{ display: "block", fontSize: "0.86rem", marginBottom: 5, color: "var(--text)" }}>{item.q}</strong>
                        <span style={{ color: "var(--sub)", fontSize: "0.8rem", lineHeight: 1.75, whiteSpace: "pre-line" }}>{item.a}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "28px 0 12px", color: "var(--sub)", fontSize: "0.74rem", lineHeight: 2 }}>
          <div style={{ marginBottom: 4 }}><strong style={{ color: "var(--text)" }}>{t.version}</strong></div>
          <div>{t.madeWith}</div>
          <div style={{ marginTop: 10, padding: "12px 18px", background: "var(--glass)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", display: "inline-block", textAlign: "center" }}>
            <div style={{ fontWeight: 700, color: "var(--text)", fontSize: "0.76rem", marginBottom: 2 }}>
              {lang === "es" ? "Desarrollado por" : "Developed by"}
            </div>
            <div style={{ color: "var(--accent)", fontWeight: 900, fontSize: "0.84rem" }}>
              Dirección de Tecnologías, Sistemas y Desarrollo
            </div>
            <div style={{ color: "var(--sub)", fontSize: "0.72rem", marginTop: 2 }}>
              Grupo Gevizz S.A.S. · {lang === "es" ? "Desarrollos centrados en el usuario" : "User experience-centered development"}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── Nav Items ────────────────────────────────────────────────
  const navItems = [
    { id: "dashboard",     label: t.dashboard,     icon: "home"          },
    { id: "sectors",       label: t.sectors,        icon: "sectors"       },
    { id: "records",       label: t.records,        icon: "records"       },
    { id: "settings",      label: t.settings,       icon: "settings"      },
    { id: "accessibility", label: t.accessibility,  icon: "accessibility" },
    { id: "help",          label: t.help,           icon: "help"          },
  ];

  const greetData   = GREET(profile.name || profile.business, lang);
  const avatarChar  = (profile.name || profile.business || "P")[0].toUpperCase();

  // ══════════════════════════════════════════════════════════════
  // LOGIN GUARD
  // ══════════════════════════════════════════════════════════════
  if (authLoading || !user) {
    return (
      <>
        <style>{css}</style>
        <div className="pf-login">
          {/* Video — solo en portrait */}
          <video
            className="pf-login-video"
            src="./logotipo.mp4"
            autoPlay loop muted playsInline
          />

          {/* Aurora animada — solo en landscape */}
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
              <button className="pf-login-btn-google" onClick={login}>
                <svg width="22" height="22" viewBox="0 0 24 24">
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
      <style>{css}</style>
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
            {/* Cambiar idioma */}
            <button
              className="pf-icon-btn"
              title={lang === "es" ? "Cambiar idioma" : "Change language"}
              onClick={() => setLang(l => l === "es" ? "en" : "es")}
            >
              <span style={{ fontSize: "0.95rem" }}>{lang === "es" ? "🇺🇸" : "🇲🇽"}</span>
            </button>

            {/* Cambiar tema */}
            <button
              className="pf-icon-btn"
              title={t.colorTheme}
              onClick={() => {
                const idx = PALETTES.findIndex(p => p.id === palette);
                setPalette(PALETTES[(idx + 1) % PALETTES.length].id);
              }}
            >
              <Icon name={palette === "light" ? "moon" : "sun"} size={16} color="currentColor" />
            </button>

            {/* Avatar / perfil */}
            <div
              className="pf-avatar"
              onClick={() => navigate("settings")}
              title={t.profile}
            >
              {user?.imageUrl
                ? <img src={user.imageUrl} alt={user.name} />
                : profile.logo
                  ? <img src={profile.logo} alt="logo" />
                  : avatarChar
              }
            </div>

            {/* Cerrar sesión */}
            <button
              className="pf-icon-btn logout"
              title={t.signOut}
              onClick={() => setModal({ type: "logout" })}
            >
              <Icon name="logout" size={16} color="currentColor" />
            </button>
          </div>
        </header>

        {/* ── Área de scroll ── */}
        <div className="pf-scroll-area">
          <div className="pf-content">
            {activeNav === "dashboard"     && <DashboardView />}
            {activeNav === "sectors"       && <SectorsView />}
            {activeNav === "records"       && <RecordsView />}
            {activeNav === "settings"      && <SettingsView />}
            {activeNav === "accessibility" && <AccessibilityView />}
            {activeNav === "help"          && <HelpView />}
          </div>
        </div>

        {/* ── Bottom Navigation Bar ── */}
        <nav className="pf-navbar">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`pf-nav-btn ${activeNav === item.id ? "active" : ""}`}
              onClick={() => navigate(item.id)}
              title={item.label}
            >
              <span className="pf-nav-pip" />
              <span className="pf-nav-icon-bg">
                <Icon name={item.icon} size={20} color="currentColor" />
              </span>
              <span className="pf-nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* ── Toast ── */}
        {toast && (
          <div className={`pf-toast ${toast.type}`}>
            {toast.type === "success" && <Icon name="check" size={16} color="#10b981" />}
            {toast.type === "error"   && <Icon name="x"     size={16} color="#ef4444" />}
            {toast.type === "info"    && <span style={{ fontSize: "0.95rem" }}>ℹ️</span>}
            {toast.msg}
          </div>
        )}

        {/* ══ Modal: Eliminar expediente ══ */}
        {modal?.type === "deleteRecord" && (
          <div className="pf-modal-bg" onClick={() => setModal(null)}>
            <div className="pf-modal" onClick={e => e.stopPropagation()}>
              <span className="pf-modal-handle" />
              <h3>🗑️ {t.deleteRecord}</h3>
              <p>
                {lang === "es"
                  ? "¿Seguro que deseas eliminar este expediente? Esta acción es permanente y no se puede deshacer."
                  : "Are you sure you want to delete this record? This action is permanent and cannot be undone."}
              </p>
              <div className="pf-modal-actions">
                <button className="pf-btn pf-btn-ghost"  onClick={() => setModal(null)}>{t.cancel}</button>
                <button className="pf-btn pf-btn-danger" onClick={() => { deleteRecord(modal.id); setModal(null); }}>{t.confirm}</button>
              </div>
            </div>
          </div>
        )}

        {/* ══ Modal: Restablecer app ══ */}
        {modal?.type === "resetApp" && (
          <div className="pf-modal-bg" onClick={() => setModal(null)}>
            <div className="pf-modal" onClick={e => e.stopPropagation()}>
              <span className="pf-modal-handle" />
              <h3>⚠️ {t.resetApp}</h3>
              <p>
                {lang === "es"
                  ? "Esto borrará todos tus expedientes, sectores y configuración. Esta acción es irreversible. Asegúrate de tener un respaldo en Google Drive antes de continuar."
                  : "This will erase all your records, sectors and settings. This action is irreversible. Make sure you have a backup in Google Drive before continuing."}
              </p>
              <div className="pf-modal-actions">
                <button className="pf-btn pf-btn-ghost"  onClick={() => setModal(null)}>{t.cancel}</button>
                <button className="pf-btn pf-btn-danger" onClick={resetApp}>{t.confirm}</button>
              </div>
            </div>
          </div>
        )}

        {/* ══ Modal: Exportar configuración ══ */}
        {modal?.type === "exportConfig" && (
          <div className="pf-modal-bg" onClick={() => setModal(null)}>
            <div className="pf-modal" onClick={e => e.stopPropagation()}>
              <span className="pf-modal-handle" />
              <h3>🔒 {t.exportConfig}</h3>
              <p>
                {lang === "es"
                  ? "Ingresa la contraseña empresarial que entregarás a tus colaboradores para que puedan importar esta configuración. Tú la defines y la compartes con quien autorice."
                  : "Enter the enterprise password your collaborators will use to import this configuration. You define it and share it with authorized users only."}
              </p>
              <input
                className="pf-input"
                type="password"
                placeholder={t.configPassword}
                onChange={e => setModal(m => ({ ...m, password: e.target.value }))}
                autoFocus
              />
              <div className="pf-modal-actions" style={{ marginTop: 16 }}>
                <button className="pf-btn pf-btn-ghost"    onClick={() => setModal(null)}>{t.cancel}</button>
                <button className="pf-btn pf-btn-primary"  onClick={exportConfig}>
                  <Icon name="download" size={15} color="inherit" /> {t.exportConfig}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ Modal: Cerrar sesión ══ */}
        {modal?.type === "logout" && (
          <div className="pf-modal-bg" onClick={() => setModal(null)}>
            <div className="pf-modal" onClick={e => e.stopPropagation()}>
              <span className="pf-modal-handle" />
              <h3>👋 {t.signOut}</h3>
              <p>{t.signOutConfirm}</p>
              <div className="pf-modal-actions">
                <button className="pf-btn pf-btn-ghost"  onClick={() => setModal(null)}>{t.cancel}</button>
                <button className="pf-btn pf-btn-danger" onClick={() => { setModal(null); logout(); }}>
                  {t.signOutYes}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
             }
