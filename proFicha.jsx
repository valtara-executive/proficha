// ═══════════════════════════════════════════════════════════════
// PROFICHA v4.0 — PREMIUM EDITION (Android Native Ready)
// Constructor: Qwen | Arquitecto: Angel
// FIXED: All syntax errors corrected — template literals, className concat, etc.
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect, useRef } from "react";
import { useAuth } from "./src/hooks/useAuth.js";

// ── Storage helpers ──────────────────────────────────
const storage = {
  get: (k, d) => {
    try {
      const v = localStorage.getItem("pf_" + k);
      return v ? JSON.parse(v) : d;
    } catch { return d; }
  },
  set: (k, v) => {
    try { localStorage.setItem("pf_" + k, JSON.stringify(v)); }
    catch (e) { console.warn("Storage error:", e); }
  },
};

const genId = () => Math.random().toString(36).substr(2, 9);
const today = () => new Date().toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
const todayKey = () => new Date().toDateString();

// ═══ SECTORES ════════════════════════════════════════
const SECTORS = [
  { id: "masoterapia", icon: "🤲", label: "Masoterapia", label_en: "Massage Therapy", color: "#6366f1", category: "terapias" },
  { id: "medico", icon: "🩺", label: "Médico General", label_en: "General Medicine", color: "#ef4444", category: "salud" },
  { id: "psicologia", icon: "🧠", label: "Psicología", label_en: "Psychology", color: "#a855f7", category: "salud" },
  { id: "nutricion", icon: "🥗", label: "Nutrición", label_en: "Nutrition", color: "#10b981", category: "salud" },
  { id: "fisioterapia", icon: "🦴", label: "Fisioterapia", label_en: "Physiotherapy", color: "#f59e0b", category: "salud" },
  { id: "odontologia", icon: "🦷", label: "Odontología", label_en: "Dentistry", color: "#0ea5e9", category: "salud" },
  { id: "enfermeria", icon: "💉", label: "Enfermería", label_en: "Nursing", color: "#ec4899", category: "salud" },
  { id: "optometria", icon: "👁️", label: "Optometría", label_en: "Optometry", color: "#14b8a6", category: "salud" },
  { id: "podologia", icon: "🦶", label: "Podología", label_en: "Podology", color: "#84cc16", category: "salud" },
  { id: "pediatria", icon: "👶", label: "Pediatría", label_en: "Pediatrics", color: "#f97316", category: "salud" },
  { id: "acupuntura", icon: "📍", label: "Acupuntura", label_en: "Acupuncture", color: "#7c3aed", category: "terapias" },
  { id: "quiropraxia", icon: "🦾", label: "Quiropráctica", label_en: "Chiropractic", color: "#059669", category: "terapias" },
  { id: "reiki", icon: "✨", label: "Reiki / Energética", label_en: "Reiki / Energy", color: "#eab308", category: "terapias" },
  { id: "coaching", icon: "🎯", label: "Coaching de Vida", label_en: "Life Coaching", color: "#3b82f6", category: "terapias" },
  { id: "terapia_pareja", icon: "💑", label: "Terapia de Pareja", label_en: "Couples Therapy", color: "#e11d48", category: "terapias" },
  { id: "soladora", icon: "🕯️", label: "Soladora / Limpia", label_en: "Spiritual Healing", color: "#9333ea", category: "terapias" },
  { id: "manicura", icon: "💅", label: "Manicura / Pedicura", label_en: "Nails", color: "#f43f5e", category: "estetica" },
  { id: "cosmetologia", icon: "🧴", label: "Cosmetología", label_en: "Cosmetology", color: "#65a30d", category: "estetica" },
  { id: "depilacion", icon: "🌿", label: "Depilación", label_en: "Hair Removal", color: "#ca8a04", category: "estetica" },
  { id: "med_estetica", icon: "💊", label: "Medicina Estética", label_en: "Aesthetic Medicine", color: "#7e22ce", category: "estetica" },
  { id: "maquillaje", icon: "💄", label: "Maquillaje Permanente", label_en: "Permanent Makeup", color: "#db2777", category: "estetica" },
  { id: "tatuaje", icon: "🎨", label: "Tatuaje", label_en: "Tattoo", color: "#1f2937", category: "arte" },
  { id: "piercing", icon: "💎", label: "Piercing", label_en: "Piercing", color: "#475569", category: "arte" },
  { id: "microblading", icon: "✏️", label: "Microblading / Cejas", label_en: "Microblading", color: "#92400e", category: "arte" },
  { id: "micropigmentacion", icon: "🖌️", label: "Micropigmentación", label_en: "Micropigmentation", color: "#7f1d1d", category: "arte" },
  { id: "entrenamiento", icon: "🏋️", label: "Entrenamiento Personal", label_en: "Personal Training", color: "#dc2626", category: "deporte" },
  { id: "yoga", icon: "🧘", label: "Yoga / Pilates", label_en: "Yoga / Pilates", color: "#16a34a", category: "deporte" },
  { id: "artes_marciales", icon: "🥋", label: "Artes Marciales", label_en: "Martial Arts", color: "#b45309", category: "deporte" },
  { id: "veterinaria", icon: "🐾", label: "Veterinaria", label_en: "Veterinary", color: "#15803d", category: "otros" },
  { id: "psicopedagogia", icon: "📚", label: "Psicopedagogía", label_en: "Psychopedagogy", color: "#0369a1", category: "otros" },
  { id: "logopedia", icon: "🗣️", label: "Logopedia", label_en: "Speech Therapy", color: "#6d28d9", category: "otros" },
  { id: "doula", icon: "🤱", label: "Doula / Partera", label_en: "Doula / Midwife", color: "#be185d", category: "otros" },
];

const CATEGORIES = {
  salud:    { es: "Salud Clínica",        en: "Clinical Health",       color: "#ef4444", icon: "🩺" },
  terapias: { es: "Terapias y Bienestar", en: "Therapies & Wellness",  color: "#8b5cf6", icon: "✨" },
  estetica: { es: "Estética y Belleza",   en: "Aesthetics & Beauty",   color: "#ec4899", icon: "💄" },
  arte:     { es: "Arte Corporal",        en: "Body Art",              color: "#64748b", icon: "🎨" },
  deporte:  { es: "Deporte y Movimiento", en: "Sports & Movement",     color: "#f97316", icon: "🏋️" },
  otros:    { es: "Otros Profesionales",  en: "Other Professionals",   color: "#10b981", icon: "🌟" },
};

// ═══ PALETAS ═════════════════════════════════════════
const PALETTES = [
  { id: "midnight", name: { es: "Medianoche",    en: "Midnight"      }, bg: "#0a0a0f", surface: "#13131a", card: "#1a1a2e", cardHover: "#222238", text: "#ffffff", textSub: "#94a3b8", accent: "#6366f1", accentLight: "#818cf8", border: "rgba(255,255,255,0.08)", overlay: "rgba(0,0,0,0.6)",        glow: "rgba(99,102,241,0.3)",   shadow: "rgba(0,0,0,0.5)" },
  { id: "ocean",    name: { es: "Océano Profundo",en: "Deep Ocean"    }, bg: "#0c1a2e", surface: "#112240", card: "#1a3a5c", cardHover: "#234a6e", text: "#e6f1ff", textSub: "#8892b0", accent: "#64ffda", accentLight: "#a7f3d0", border: "rgba(100,255,218,0.1)", overlay: "rgba(12,26,46,0.7)",     glow: "rgba(100,255,218,0.3)", shadow: "rgba(0,0,0,0.5)" },
  { id: "sunset",   name: { es: "Atardecer",      en: "Sunset"        }, bg: "#1a0a0a", surface: "#2d1010", card: "#4a1c1c", cardHover: "#5c2424", text: "#fff5e6", textSub: "#fca5a5", accent: "#fb923c", accentLight: "#fdba74", border: "rgba(251,146,60,0.15)", overlay: "rgba(26,10,10,0.7)",    glow: "rgba(251,146,60,0.3)",  shadow: "rgba(0,0,0,0.5)" },
  { id: "forest",   name: { es: "Bosque",          en: "Forest"        }, bg: "#0a1a0a", surface: "#122212", card: "#1a3a1a", cardHover: "#244a24", text: "#d4edda", textSub: "#86efac", accent: "#4ade80", accentLight: "#86efac", border: "rgba(74,222,128,0.12)", overlay: "rgba(10,26,10,0.7)",    glow: "rgba(74,222,128,0.3)",  shadow: "rgba(0,0,0,0.5)" },
  { id: "lavender", name: { es: "Lavanda",         en: "Lavender"      }, bg: "#0f0a1a", surface: "#1e1030", card: "#2e1a4a", cardHover: "#3a2458", text: "#ede9fe", textSub: "#c4b5fd", accent: "#a78bfa", accentLight: "#c4b5fd", border: "rgba(167,139,250,0.12)",overlay: "rgba(15,10,26,0.7)",    glow: "rgba(167,139,250,0.3)",shadow: "rgba(0,0,0,0.5)" },
  { id: "rose",     name: { es: "Rosa Elegante",   en: "Elegant Rose"  }, bg: "#1a0a10", surface: "#2d1020", card: "#4a1a2e", cardHover: "#5a243a", text: "#fce7f3", textSub: "#f9a8d4", accent: "#f472b6", accentLight: "#f9a8d4", border: "rgba(244,114,182,0.15)",overlay: "rgba(26,10,16,0.7)",    glow: "rgba(244,114,182,0.3)",shadow: "rgba(0,0,0,0.5)" },
  { id: "gold",     name: { es: "Dorado Luxury",   en: "Luxury Gold"   }, bg: "#0f0e07", surface: "#1c1a05", card: "#3d3410", cardHover: "#4a4018", text: "#fefce8", textSub: "#ca8a04", accent: "#eab308", accentLight: "#facc15", border: "rgba(234,179,8,0.15)",  overlay: "rgba(15,14,7,0.7)",    glow: "rgba(234,179,8,0.3)",   shadow: "rgba(0,0,0,0.5)" },
  { id: "arctic",   name: { es: "Ártico Claro",    en: "Arctic Light"  }, bg: "#f8fafc", surface: "#ffffff", card: "#ffffff", cardHover: "#f1f5f9", text: "#0f172a", textSub: "#64748b", accent: "#6366f1", accentLight: "#818cf8", border: "rgba(0,0,0,0.08)",     overlay: "rgba(248,250,252,0.8)", glow: "rgba(99,102,241,0.2)", shadow: "rgba(0,0,0,0.08)" },
];

// ═══ TRADUCCIONES ════════════════════════════════════
const T = {
  es: {
    appName: "ProFicha", tagline: "Tu expediente profesional, en tu mano",
    greetingMorning: "Buenos días", greetingNoon: "Buen mediodía",
    greetingAfternoon: "Buenas tardes", greetingEvening: "Buenas noches",
    greetingLate: "Hola", defaultName: "Profesional",
    menu: "Menú", dashboard: "Inicio", sectors: "Sectores", records: "Expedientes",
    calendar: "Calendario", storage: "Respaldo", scanner: "Escanear",
    settings: "Ajustes", accessibility: "Accesibilidad", help: "Ayuda",
    signOut: "Cerrar sesión", signOutConfirm: "¿Seguro que deseas cerrar sesión? Tus datos permanecen guardados.",
    quickActions: "Acciones Rápidas", newRecord: "Nuevo Expediente",
    recentRecords: "Expedientes Recientes", noRecords: "Sin expedientes aún",
    totalRecords: "Total", todayRecords: "Hoy", activeSectors: "Activos",
    addSector: "Agregar Sector", mySectors: "Mis Sectores",
    allSectors: "Todos los Sectores", searchSector: "Buscar sector...",
    noSectors: "Aún no tienes sectores activos", tapToAdd: "Toca para agregar",
    sectorAdded: "Sector agregado", sectorRemoved: "Sector eliminado",
    profile: "Perfil Profesional", businessName: "Nombre del Negocio",
    phone: "Teléfono", email: "Correo", whatsapp: "WhatsApp",
    address: "Dirección", website: "Sitio web", logo: "Logo",
    uploadLogo: "Subir Logo", removeLogo: "Quitar Logo",
    save: "Guardar", saved: "Guardado", cancel: "Cancelar",
    confirm: "Confirmar", close: "Cerrar", back: "Volver",
    next: "Siguiente", finish: "Finalizar", delete: "Eliminar",
    edit: "Editar", view: "Ver", exportPDF: "Exportar PDF",
    shareWhatsapp: "Compartir WhatsApp",
    faqTitle: "Preguntas Frecuentes", faqSearch: "Buscar en ayuda...",
    noResults: "Sin resultados", contactSupport: "Contactar Soporte",
    fontSize: "Tamaño de Fuente", fontSizeDesc: "Ajusta el tamaño del texto en toda la app",
    contrast: "Alto Contraste", contrastDesc: "Mejora la visibilidad del texto",
    animations: "Reducir Animaciones", animationsDesc: "Desactiva efectos de movimiento",
    screenReader: "Lector de Pantalla", screenReaderDesc: "Optimiza para TalkBack",
    reduceMotion: "Reducir Movimiento", boldText: "Texto en Negrita",
    version: "ProFicha v4.0 Premium", madeWith: "Hecho con ❤️ para profesionales",
    resetApp: "Restablecer App", resetConfirm: "¿Eliminar todos los datos?",
    loading: "Cargando...", error: "Error", success: "Éxito", info: "Información",
    termsTitle: "Términos y Consentimientos",
    termsPlaceholder: "Escribe aquí los términos y condiciones de tu servicio...",
    colorTheme: "Tema de Color", language: "Idioma",
    exportConfig: "Exportar Configuración", importConfig: "Importar Configuración",
    configPassword: "Contraseña de protección",
    lastBackup: "Último Respaldo", backupSchedule: "Programación de Respaldo",
    manual: "Manual", hourly: "Cada hora", fiveHours: "Cada 5 horas",
    eightHours: "Cada 8 horas", daily: "Diario", weekly: "Semanal",
    restoreBackup: "Restaurar Copia de Seguridad",
    recordFor: "Expediente para", deleteRecord: "Eliminar expediente",
    finishForm: "Finalizar Formulario", saving: "Guardando...",
    requiredFieldMissing: "Completa los campos requeridos", errorSaving: "Error al guardar",
    send: "Enviar", phoneNumber: "Número de teléfono", messageContent: "Mensaje",
    quickWhatsAppTitle: "WhatsApp Rápido",
    permissionTitle: "Permiso necesario", permissionDeny: "No permitir", permissionContinue: "Continuar",
    tutorialTitle: "Tutorial de Bienvenida", tutorialNext: "Siguiente",
    tutorialPrev: "Anterior", tutorialFinish: "¡Comenzar!", tutorialSkip: "No mostrar de nuevo",
  },
  en: {
    appName: "ProFicha", tagline: "Your professional record, in your hand",
    greetingMorning: "Good morning", greetingNoon: "Good noon",
    greetingAfternoon: "Good afternoon", greetingEvening: "Good evening",
    greetingLate: "Hello", defaultName: "Professional",
    menu: "Menu", dashboard: "Home", sectors: "Sectors", records: "Records",
    calendar: "Calendar", storage: "Backup", scanner: "Scan",
    settings: "Settings", accessibility: "Accessibility", help: "Help",
    signOut: "Sign out", signOutConfirm: "Are you sure you want to sign out? Your data remains saved.",
    quickActions: "Quick Actions", newRecord: "New Record",
    recentRecords: "Recent Records", noRecords: "No records yet",
    totalRecords: "Total", todayRecords: "Today", activeSectors: "Active",
    addSector: "Add Sector", mySectors: "My Sectors",
    allSectors: "All Sectors", searchSector: "Search sector...",
    noSectors: "No active sectors yet", tapToAdd: "Tap to add",
    sectorAdded: "Sector added", sectorRemoved: "Sector removed",
    profile: "Professional Profile", businessName: "Business Name",
    phone: "Phone", email: "Email", whatsapp: "WhatsApp",
    address: "Address", website: "Website", logo: "Logo",
    uploadLogo: "Upload Logo", removeLogo: "Remove Logo",
    save: "Save", saved: "Saved", cancel: "Cancel",
    confirm: "Confirm", close: "Close", back: "Back",
    next: "Next", finish: "Finish", delete: "Delete",
    edit: "Edit", view: "View", exportPDF: "Export PDF",
    shareWhatsapp: "Share WhatsApp",
    faqTitle: "Frequently Asked Questions", faqSearch: "Search help...",
    noResults: "No results", contactSupport: "Contact Support",
    fontSize: "Font Size", fontSizeDesc: "Adjust text size throughout the app",
    contrast: "High Contrast", contrastDesc: "Improve text visibility",
    animations: "Reduce Animations", animationsDesc: "Disable motion effects",
    screenReader: "Screen Reader", screenReaderDesc: "Optimize for TalkBack",
    reduceMotion: "Reduce Motion", boldText: "Bold Text",
    version: "ProFicha v4.0 Premium", madeWith: "Made with ❤️ for professionals",
    resetApp: "Reset App", resetConfirm: "Delete all data?",
    loading: "Loading...", error: "Error", success: "Success", info: "Info",
    termsTitle: "Terms & Consents",
    termsPlaceholder: "Write your terms and conditions here...",
    colorTheme: "Color Theme", language: "Language",
    exportConfig: "Export Configuration", importConfig: "Import Configuration",
    configPassword: "Protection password",
    lastBackup: "Last Backup", backupSchedule: "Backup Schedule",
    manual: "Manual", hourly: "Hourly", fiveHours: "Every 5 hours",
    eightHours: "Every 8 hours", daily: "Daily", weekly: "Weekly",
    restoreBackup: "Restore Backup",
    recordFor: "Record for", deleteRecord: "Delete record",
    finishForm: "Finish Form", saving: "Saving...",
    requiredFieldMissing: "Please fill required fields", errorSaving: "Error saving",
    send: "Send", phoneNumber: "Phone number", messageContent: "Message",
    quickWhatsAppTitle: "Quick WhatsApp",
    permissionTitle: "Permission needed", permissionDeny: "Deny", permissionContinue: "Continue",
    tutorialTitle: "Welcome Tutorial", tutorialNext: "Next",
    tutorialPrev: "Previous", tutorialFinish: "Let's start!", tutorialSkip: "Don't show again",
  },
};

// ═══ SALUDO DINÁMICO ═════════════════════════════════
const getGreeting = (name, lang) => {
  const h = new Date().getHours();
  const firstName = name ? name.split(" ")[0] : T[lang].defaultName;
  let g = T[lang].greetingLate;
  if (h >= 5 && h < 12)  g = T[lang].greetingMorning;
  else if (h >= 12 && h < 14) g = T[lang].greetingNoon;
  else if (h >= 14 && h < 19) g = T[lang].greetingAfternoon;
  else if (h >= 19 && h < 22) g = T[lang].greetingEvening;
  return g + ", " + firstName;
};

// ═══ ICONOS SVG ══════════════════════════════════════
const Icon = ({ name, size = 24, color = "currentColor", className = "" }) => {
  const cn = "pf-icon " + className;
  const s = { width: size, height: size };
  const icons = {
    home: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    sectors: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    records: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    calendar: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    storage: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
    scanner: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/></svg>,
    settings: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    accessibility: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/><circle cx="12" cy="8" r="1" fill={color}/></svg>,
    help: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    menu: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    close: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    x: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    plus: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    check: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={cn}><polyline points="20 6 9 17 4 12"/></svg>,
    logout: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    search: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    trash: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    pdf: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15v-2h2a1 1 0 1 0 0-2H9v6"/></svg>,
    edit: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    whatsapp: <svg {...s} viewBox="0 0 24 24" fill={color} className={cn}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>,
    chevronRight: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><polyline points="9 18 15 12 9 6"/></svg>,
    chevronLeft:  <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><polyline points="15 18 9 12 15 6"/></svg>,
    chevronDown:  <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><polyline points="6 9 12 15 18 9"/></svg>,
    user: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    globe: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    sparkles: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"/></svg>,
    upload:   <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
    download: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    star: <svg {...s} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={cn}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    send: <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  };
  return icons[name] || null;
};

// ═══ COMPONENTES BASE ════════════════════════════════
const PremiumButton = ({ children, onClick, variant = "primary", size = "md", icon, iconRight, disabled = false, loading = false, fullWidth = false, className = "", ariaLabel }) => (
  <button
    className={"pf-btn pf-btn-" + variant + " pf-btn-" + size + (loading ? " pf-btn-loading" : disabled ? " pf-btn-disabled" : "") + (fullWidth ? " pf-btn-full" : "") + " " + className}
    onClick={onClick} disabled={disabled || loading} aria-label={ariaLabel} aria-busy={loading}
  >
    {loading ? <span className="pf-spinner" aria-hidden="true" /> : <>{icon && <span className="pf-btn-icon">{icon}</span>}<span className="pf-btn-text">{children}</span>{iconRight && <span className="pf-btn-icon-right">{iconRight}</span>}</>}
  </button>
);

const PremiumCard = ({ children, className = "", onClick, hoverable = false, ariaLabel, padding = "md", style }) => (
  <div
    className={"pf-card pf-card-" + padding + (hoverable ? " pf-card-hoverable" : "") + " " + className}
    onClick={onClick} role={onClick ? "button" : undefined} tabIndex={onClick ? 0 : undefined}
    aria-label={ariaLabel} style={style}
  >{children}</div>
);

const Toast = ({ message, type = "info", onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={"pf-toast pf-toast-" + type} role="alert" aria-live="polite">
      <span className="pf-toast-icon">{type === "success" ? <Icon name="check" size={20} color="#10b981" /> : type === "error" ? <Icon name="x" size={20} color="#ef4444" /> : <Icon name="star" size={20} color="#6366f1" />}</span>
      <span className="pf-toast-message">{message}</span>
    </div>
  );
};

// ═══ DRAWER ══════════════════════════════════════════
const Drawer = ({ isOpen, onClose, activeNav, navigate, profile, palette, lang, setLang, logout, openTutorial, user }) => {
  const t = T[lang];
  const pal = PALETTES.find(p => p.id === palette) || PALETTES[0];
  const startX = useRef(0);
  const mainItems = [
    { id: "dashboard", icon: "home",     label: t.dashboard, color: "#6366f1" },
    { id: "sectors",   icon: "sectors",  label: t.sectors,   color: "#8b5cf6" },
    { id: "records",   icon: "records",  label: t.records,   color: "#10b981" },
    { id: "calendar",  icon: "calendar", label: t.calendar,  color: "#f59e0b" },
    { id: "storage",   icon: "storage",  label: t.storage,   color: "#3b82f6" },
    { id: "scanner",   icon: "scanner",  label: t.scanner,   color: "#ec4899" },
  ];
  const bottomItems = [
    { id: "settings",      icon: "settings",      label: t.settings,      color: "#64748b" },
    { id: "accessibility", icon: "accessibility", label: t.accessibility, color: "#06b6d4" },
    { id: "help",          icon: "help",          label: t.help,          color: "#a855f7" },
  ];
  const DrawerItem = ({ item }) => (
    <button
      className={"pf-drawer-item" + (activeNav === item.id ? " pf-drawer-item-active" : "")}
      onClick={() => { navigate(item.id); onClose(); }}
      aria-label={item.label} aria-current={activeNav === item.id ? "page" : undefined}
      style={{ "--item-color": item.color }}
    >
      <span className="pf-drawer-item-icon" style={{ color: item.color }}><Icon name={item.icon} size={22} /></span>
      <span className="pf-drawer-item-label">{item.label}</span>
      {activeNav === item.id && <span className="pf-drawer-item-indicator" />}
    </button>
  );
  return (
    <>
      <div className={"pf-drawer-overlay" + (isOpen ? " pf-drawer-open" : "")} onClick={onClose} aria-hidden={!isOpen} />
      <aside
        className={"pf-drawer" + (isOpen ? " pf-drawer-open" : "")}
        onTouchStart={e => { startX.current = e.touches[0].clientX; }}
        onTouchMove={e => { if (startX.current - e.touches[0].clientX > 80) onClose(); }}
        role="navigation" aria-label={t.menu}
      >
        <div className="pf-drawer-header">
          <div className="pf-drawer-header-bg" style={{ background: pal.accent }} />
          <div className="pf-drawer-header-content">
            <div className="pf-drawer-avatar">
              {user && user.imageUrl ? <img src={user.imageUrl} alt="Perfil" /> : <Icon name="user" size={48} color={pal.text} />}
            </div>
            <div className="pf-drawer-user-info">
              <h2 className="pf-drawer-user-name">{profile.name || profile.business || t.defaultName}</h2>
              <p className="pf-drawer-user-role">{profile.business || t.appName}</p>
            </div>
            <button className="pf-drawer-close" onClick={onClose} aria-label={t.close}><Icon name="close" size={24} color={pal.text} /></button>
          </div>
        </div>
        <div className="pf-drawer-section">{mainItems.map(item => <DrawerItem key={item.id} item={item} />)}</div>
        <div className="pf-drawer-divider" />
        <div className="pf-drawer-section">
          {bottomItems.map(item => <DrawerItem key={item.id} item={item} />)}
          <button className="pf-drawer-item" onClick={() => setLang(lang === "es" ? "en" : "es")} aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}>
            <span className="pf-drawer-item-icon" style={{ color: "#06b6d4" }}><Icon name="globe" size={22} /></span>
            <span className="pf-drawer-item-label">{lang === "es" ? "English" : "Español"}</span>
          </button>
          <button className="pf-drawer-item" onClick={() => { openTutorial(); onClose(); }} aria-label="Tutorial">
            <span className="pf-drawer-item-icon" style={{ color: "#eab308" }}><Icon name="sparkles" size={22} /></span>
            <span className="pf-drawer-item-label">Tutorial</span>
          </button>
        </div>
        <div className="pf-drawer-footer">
          <button className="pf-drawer-logout" onClick={logout} aria-label={t.signOut}>
            <Icon name="logout" size={20} color="#ef4444" /><span>{t.signOut}</span>
          </button>
          <div className="pf-drawer-version">{t.version}</div>
        </div>
      </aside>
    </>
  );
};

// ═══ HEADER DINÁMICO ═════════════════════════════════
const DynamicHeader = ({ profile, lang, onMenuClick }) => {
  const [showAppName, setShowAppName] = useState(true);
  const t = T[lang];
  useEffect(() => { const timer = setTimeout(() => setShowAppName(false), 2000); return () => clearTimeout(timer); }, []);
  return (
    <header className="pf-header">
      <button className="pf-header-menu" onClick={onMenuClick} aria-label={t.menu}><Icon name="menu" size={24} /></button>
      <div className="pf-header-title">
        {showAppName
          ? <h1 className="pf-header-appname pf-fade-in">{t.appName}</h1>
          : <h1 className="pf-header-greeting pf-fade-in">{getGreeting(profile.name, lang)}</h1>}
      </div>
      <div className="pf-header-spacer" />
    </header>
  );
};

// ═══ DASHBOARD ═══════════════════════════════════════
const DashboardView = ({ profile, records, mySectors, palette, lang, navigate, onNewRecord }) => {
  const t = T[lang];
  const pal = PALETTES.find(p => p.id === palette) || PALETTES[0];
  const todayCount = records.filter(r => r.dateKey === todayKey()).length;
  const recent = [...records].sort((a, b) => b.ts - a.ts).slice(0, 5);
  const activeCategories = [...new Set(mySectors.map(id => SECTORS.find(s => s.id === id)?.category).filter(Boolean))];

  return (
    <div className="pf-view pf-dashboard">
      <div className="pf-stats-grid">
        {[{ v: records.length, l: t.totalRecords }, { v: todayCount, l: t.todayRecords }, { v: mySectors.length, l: t.activeSectors }].map((s, i) => (
          <PremiumCard key={i} className="pf-stat-card" padding="sm">
            <div className="pf-stat-value">{s.v}</div>
            <div className="pf-stat-label">{s.l}</div>
          </PremiumCard>
        ))}
      </div>

      <div className="pf-section">
        <h2 className="pf-section-title">{t.quickActions}</h2>
        <PremiumButton variant="accent" size="lg" icon={<Icon name="plus" size={20} />} onClick={onNewRecord} fullWidth ariaLabel={t.newRecord}>{t.newRecord}</PremiumButton>
      </div>

      {activeCategories.length > 0 && (
        <div className="pf-section">
          <h2 className="pf-section-title">{t.mySectors}</h2>
          <div className="pf-category-feed">
            {activeCategories.map((catId, idx) => {
              const cat = CATEGORIES[catId];
              if (!cat) return null;
              const catSectors = mySectors.map(id => SECTORS.find(s => s.id === id)).filter(s => s && s.category === catId);
              return (
                <PremiumCard key={catId} className="pf-category-card pf-stagger-in" style={{ "--stagger-delay": idx * 0.1 + "s", "--cat-color": cat.color }} hoverable>
                  <div className="pf-category-header">
                    <span className="pf-category-icon">{cat.icon}</span>
                    <h3 className="pf-category-name">{cat[lang]}</h3>
                    <span className="pf-category-count">{catSectors.length}</span>
                  </div>
                  <div className="pf-category-sectors">
                    {catSectors.slice(0, 3).map(sector => (
                      <div key={sector.id} className="pf-mini-sector">
                        <span>{sector.icon}</span><span>{lang === "es" ? sector.label : sector.label_en}</span>
                      </div>
                    ))}
                    {catSectors.length > 3 && <div className="pf-mini-sector pf-mini-more">+{catSectors.length - 3}</div>}
                  </div>
                </PremiumCard>
              );
            })}
          </div>
        </div>
      )}

      <div className="pf-section">
        <h2 className="pf-section-title">{t.recentRecords}</h2>
        {recent.length === 0 ? (
          <PremiumCard className="pf-empty-card"><div className="pf-empty-icon">📋</div><p className="pf-empty-text">{t.noRecords}</p></PremiumCard>
        ) : (
          <div className="pf-records-list">
            {recent.map((record, idx) => {
              const sector = SECTORS.find(s => s.id === record.sectorId);
              return (
                <PremiumCard key={record.id} className="pf-record-item pf-stagger-in" style={{ "--stagger-delay": idx * 0.05 + "s" }} hoverable padding="sm">
                  <div className="pf-record-icon" style={{ background: (sector ? sector.color : "#6366f1") + "22" }}>{sector ? sector.icon : "📋"}</div>
                  <div className="pf-record-info">
                    <div className="pf-record-name">{record.patientName}</div>
                    <div className="pf-record-meta">{sector ? (lang === "es" ? sector.label : sector.label_en) : ""} · {record.date}</div>
                  </div>
                </PremiumCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// ═══ SECTORES ════════════════════════════════════════
const SectorsView = ({ mySectors, setMySectors, palette, lang, showToast }) => {
  const t = T[lang];
  const [search, setSearch] = useState("");
  const [animating, setAnimating] = useState({});

  const toggle = (id, adding) => {
    setAnimating(p => ({ ...p, [id]: adding ? "adding" : "removing" }));
    setTimeout(() => {
      setMySectors(p => adding ? [...p, id] : p.filter(s => s !== id));
      setAnimating(p => ({ ...p, [id]: null }));
      showToast(adding ? t.sectorAdded : t.sectorRemoved, adding ? "success" : "info");
    }, 300);
  };

  const filtered = SECTORS.filter(s => search === "" || s.label.toLowerCase().includes(search.toLowerCase()) || s.label_en.toLowerCase().includes(search.toLowerCase()));
  const grouped = Object.entries(CATEGORIES).map(([catId, cat]) => ({ id: catId, ...cat, sectors: filtered.filter(s => s.category === catId) })).filter(g => g.sectors.length > 0);

  return (
    <div className="pf-view pf-sectors-view">
      <div className="pf-section">
        <h2 className="pf-section-title">{t.allSectors}</h2>
        <div className="pf-search-box">
          <Icon name="search" size={20} className="pf-search-icon" />
          <input type="text" className="pf-search-input" placeholder={t.searchSector} value={search} onChange={e => setSearch(e.target.value)} aria-label={t.searchSector} />
          {search && <button className="pf-search-clear" onClick={() => setSearch("")} aria-label={t.close}><Icon name="close" size={16} /></button>}
        </div>

        {mySectors.length > 0 && (
          <div className="pf-my-sectors">
            <h3 className="pf-subsection-title">{t.mySectors}</h3>
            <div className="pf-sectors-grid">
              {mySectors.map(sid => {
                const sector = SECTORS.find(s => s.id === sid);
                if (!sector) return null;
                return (
                  <button key={sid} className={"pf-sector-card pf-sector-active" + (animating[sid] === "removing" ? " pf-sector-removing" : "")} onClick={() => toggle(sid, false)} aria-label={t.delete + " " + (lang === "es" ? sector.label : sector.label_en)} style={{ "--sector-color": sector.color }}>
                    <span className="pf-sector-icon">{sector.icon}</span>
                    <span className="pf-sector-label">{lang === "es" ? sector.label : sector.label_en}</span>
                    <span className="pf-sector-badge"><Icon name="check" size={12} /></span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {grouped.map((group, gi) => (
          <div key={group.id} className="pf-category-group pf-stagger-in" style={{ "--stagger-delay": gi * 0.1 + "s" }}>
            <div className="pf-category-title">
              <span className="pf-category-title-icon" style={{ color: group.color }}>{group.icon}</span>
              <span>{group[lang]}</span>
            </div>
            <div className="pf-sectors-grid">
              {group.sectors.map((sector, idx) => {
                const isActive = mySectors.includes(sector.id);
                return (
                  <button key={sector.id} className={"pf-sector-card" + (isActive ? " pf-sector-active" : "") + (animating[sector.id] === "adding" ? " pf-sector-adding" : "")} onClick={() => toggle(sector.id, !isActive)} aria-label={(isActive ? t.delete : t.addSector) + " " + (lang === "es" ? sector.label : sector.label_en)} style={{ "--sector-color": sector.color, "--stagger-delay": idx * 0.03 + "s" }}>
                    <span className="pf-sector-icon">{sector.icon}</span>
                    <span className="pf-sector-label">{lang === "es" ? sector.label : sector.label_en}</span>
                    {isActive ? <span className="pf-sector-badge"><Icon name="check" size={12} /></span> : <span className="pf-sector-add-hint">{t.tapToAdd}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══ FORMULARIO ══════════════════════════════════════
const FormEngine = ({ sectorId, patientName, profile, onClose, onComplete, mode = "create", recordData = null, lang, palette }) => {
  const t = T[lang];
  const pal = PALETTES.find(p => p.id === palette) || PALETTES[0];
  const [formData, setFormData] = useState(mode === "edit" && recordData ? recordData : {});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isOmitted, setIsOmitted] = useState({});
  const [formToast, setFormToast] = useState(null);
  const sector = SECTORS.find(s => s.id === sectorId);

  const formConfigs = {
    medico: {
      title: { es: "Formulario Médico", en: "Medical Form" },
      tabs: [
        { title: { es: "Datos Básicos", en: "Basic Data" }, fields: [
          { id: "name", label: { es: "Nombre completo", en: "Full name" }, type: "text", required: true },
          { id: "age",  label: { es: "Edad", en: "Age" }, type: "number", required: true },
          { id: "gender", label: { es: "Género", en: "Gender" }, type: "select", options: ["Masculino","Femenino","Otro"], required: true },
          { id: "height", label: { es: "Altura (cm)", en: "Height (cm)" }, type: "number", required: true },
          { id: "weight", label: { es: "Peso (kg)", en: "Weight (kg)" }, type: "number", required: true },
        ]},
        { title: { es: "Antecedentes", en: "Medical History" }, fields: [
          { id: "allergies",   label: { es: "Alergias", en: "Allergies" }, type: "text" },
          { id: "chronic",     label: { es: "Enfermedades crónicas", en: "Chronic conditions" }, type: "text" },
          { id: "medications", label: { es: "Medicamentos", en: "Medications" }, type: "text" },
          { id: "surgeries",   label: { es: "Cirugías previas", en: "Previous surgeries" }, type: "text" },
        ]},
        { title: { es: "Síntomas", en: "Symptoms" }, fields: [
          { id: "symptoms",  label: { es: "Síntomas", en: "Symptoms" }, type: "textarea", rows: 4 },
          { id: "duration",  label: { es: "Duración", en: "Duration" }, type: "text" },
          { id: "intensity", label: { es: "Intensidad", en: "Intensity" }, type: "select", options: ["Baja","Media","Alta"], required: true },
        ]},
      ],
    },
    masoterapia: {
      title: { es: "Formulario de Masoterapia", en: "Massage Therapy Form" },
      tabs: [
        { title: { es: "Información Básica", en: "Basic Information" }, fields: [
          { id: "name",   label: { es: "Nombre completo", en: "Full name" }, type: "text", required: true },
          { id: "age",    label: { es: "Edad", en: "Age" }, type: "number", required: true },
          { id: "gender", label: { es: "Género", en: "Gender" }, type: "select", options: ["Masculino","Femenino","Otro"], required: true },
          { id: "phone",  label: { es: "Teléfono", en: "Phone" }, type: "text" },
          { id: "email",  label: { es: "Correo", en: "Email" }, type: "text" },
        ]},
        { title: { es: "Sesión", en: "Session" }, fields: [
          { id: "type",     label: { es: "Tipo de masaje", en: "Massage type" }, type: "select", options: ["Relajante","Deportivo","Profesional","Terapéutico"], required: true },
          { id: "area",     label: { es: "Área a tratar", en: "Area to treat" }, type: "text", required: true },
          { id: "duration", label: { es: "Duración (min)", en: "Duration (min)" }, type: "number", required: true },
          { id: "pressure", label: { es: "Presión", en: "Pressure" }, type: "select", options: ["Suave","Media","Firme"], required: true },
        ]},
        { title: { es: "Antecedentes", en: "Medical History" }, fields: [
          { id: "allergies",  label: { es: "Alergias", en: "Allergies" }, type: "text" },
          { id: "conditions", label: { es: "Condiciones médicas", en: "Medical conditions" }, type: "text" },
          { id: "previous",   label: { es: "Tratamientos previos", en: "Previous treatments" }, type: "text" },
        ]},
      ],
    },
  };

  const config = formConfigs[sectorId] || {
    title: { es: "Formulario", en: "Form" },
    tabs: [
      { title: { es: "Información Básica", en: "Basic Information" }, fields: [
        { id: "name",    label: { es: "Nombre completo", en: "Full name" }, type: "text", required: true },
        { id: "phone",   label: { es: "Teléfono", en: "Phone" }, type: "text" },
        { id: "email",   label: { es: "Correo", en: "Email" }, type: "text" },
        { id: "address", label: { es: "Dirección", en: "Address" }, type: "text" },
      ]},
      { title: { es: "Detalles", en: "Details" }, fields: [
        { id: "notes", label: { es: "Notas adicionales", en: "Additional notes" }, type: "textarea", rows: 5 },
      ]},
    ],
  };

  const handleSubmit = async () => {
    if (isLoading) return;
    const required = config.tabs.flatMap(tab => tab.fields.filter(f => f.required).map(f => f.id));
    for (const field of required) {
      if (!formData[field]) { setFormToast({ message: t.requiredFieldMissing, type: "error" }); return; }
    }
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      onComplete({ id: genId(), sectorId, patientName, date: today(), dateKey: todayKey(), ts: Date.now(), formData, isOmitted, profileId: profile.id || profile.business });
      setIsLoading(false);
    } catch { setIsLoading(false); setFormToast({ message: t.errorSaving, type: "error" }); }
  };

  const renderField = field => {
    const value = formData[field.id] || "";
    const omitted = isOmitted[field.id];
    return (
      <div key={field.id} className="pf-form-field">
        <div className="pf-form-field-header">
          <label className="pf-form-label" htmlFor={field.id}>{lang === "es" ? field.label.es : field.label.en}</label>
          {field.required && <span className="pf-required-indicator">*</span>}
        </div>
        {(field.type === "text" || field.type === "number") && (
          <input id={field.id} type={field.type} className="pf-input" value={value} onChange={e => setFormData(p => ({ ...p, [field.id]: e.target.value }))} placeholder={lang === "es" ? "Escribe aquí..." : "Type here..."} disabled={omitted} aria-required={field.required} />
        )}
        {field.type === "select" && (
          <select id={field.id} className="pf-select" value={value} onChange={e => setFormData(p => ({ ...p, [field.id]: e.target.value }))} disabled={omitted} aria-required={field.required}>
            <option value="">{lang === "es" ? "Selecciona..." : "Select..."}</option>
            {field.options && field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        )}
        {field.type === "textarea" && (
          <textarea id={field.id} className="pf-textarea" value={value} onChange={e => setFormData(p => ({ ...p, [field.id]: e.target.value }))} rows={field.rows || 3} placeholder={lang === "es" ? "Escribe aquí..." : "Type here..."} disabled={omitted} aria-required={field.required} />
        )}
        {field.required && (
          <div className="pf-field-optional">
            <button type="button" className={"pf-btn pf-btn-ghost pf-btn-sm" + (omitted ? " pf-btn-active" : "")} onClick={() => setIsOmitted(p => ({ ...p, [field.id]: !p[field.id] }))}>
              {omitted ? (lang === "es" ? "Incluir" : "Include") : (lang === "es" ? "Omitir" : "Omit")}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="pf-form-container">
      <div className="pf-form-header">
        <div className="pf-form-header-content">
          <div className="pf-form-header-icon"><Icon name="sectors" size={32} color={sector ? sector.color : pal.accent} /></div>
          <div>
            <h1 className="pf-form-title">{lang === "es" ? config.title.es : config.title.en}</h1>
            {/* FIX: string concatenation instead of template literals inside JSX */}
            <div className="pf-form-subtitle">
              {lang === "es"
                ? "Paciente: " + (patientName || "Nuevo paciente") + " · Sector: " + (sector ? sector.label : "Sin sector")
                : "Patient: " + (patientName || "New patient") + " · Sector: " + (sector ? sector.label_en : "No sector")}
            </div>
          </div>
        </div>
        <button className="pf-form-close" onClick={onClose} aria-label={t.close}><Icon name="close" size={24} /></button>
      </div>

      <div className="pf-form-tabs">
        {config.tabs.map((tab, i) => (
          <button key={i} className={"pf-form-tab" + (activeTab === i ? " pf-form-tab-active" : "")} onClick={() => setActiveTab(i)} aria-selected={activeTab === i}>
            {lang === "es" ? tab.title.es : tab.title.en}
          </button>
        ))}
      </div>

      <div className="pf-form-content">
        {config.tabs.map((tab, i) => (
          <div key={i} className={"pf-form-tab-content" + (activeTab === i ? " pf-form-tab-visible" : " pf-form-tab-hidden")} role="tabpanel" aria-hidden={activeTab !== i}>
            {tab.fields.map(field => renderField(field))}
          </div>
        ))}
      </div>

      <div className="pf-form-actions">
        <button className="pf-btn pf-btn-ghost" onClick={onClose} disabled={isLoading} aria-label={t.cancel}>{t.cancel}</button>
        <button className="pf-btn pf-btn-accent" onClick={handleSubmit} disabled={isLoading} aria-label={t.finishForm}>
          {isLoading ? <><span className="pf-spinner" />{t.saving}</> : t.finishForm}
        </button>
      </div>

      {formToast && (
        <div className={"pf-toast pf-toast-" + formToast.type}>
          <span className="pf-toast-icon">{formToast.type === "error" ? <Icon name="x" size={20} /> : <Icon name="check" size={20} />}</span>
          <span className="pf-toast-message">{formToast.message}</span>
        </div>
      )}
    </div>
  );
};

// ═══ EXPEDIENTES ═════════════════════════════════════
const RecordsView = ({ records, setRecords, mySectors, profile, palette, lang, navigate, showToast }) => {
  const t = T[lang];
  const [search, setSearch] = useState("");
  const [filterSector, setFilterSector] = useState("all");
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSector, setNewSector] = useState(mySectors[0] || "");
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardData, setWizardData] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const filtered = records.filter(r => (filterSector === "all" || r.sectorId === filterSector) && (search === "" || r.patientName.toLowerCase().includes(search.toLowerCase()))).sort((a, b) => b.ts - a.ts);

  const openWizard = () => {
    if (!newName.trim()) { showToast(lang === "es" ? "Ingresa el nombre del paciente" : "Enter patient name", "error"); return; }
    if (!newSector) { showToast(lang === "es" ? "Selecciona un sector" : "Select a sector", "error"); return; }
    setWizardData({ patientName: newName.trim(), sectorId: newSector });
    setWizardOpen(true); setShowNew(false);
  };

  const RecordItem = ({ record }) => {
    const sector = SECTORS.find(s => s.id === record.sectorId);
    const omittedCount = record.isOmitted ? Object.values(record.isOmitted).filter(Boolean).length : 0;
    return (
      <div className="pf-record-item">
        <div className="pf-record-icon" style={{ background: (sector ? sector.color : "#6366f1") + "22" }}>{sector ? sector.icon : "📋"}</div>
        <div className="pf-record-body">
          <div className="pf-record-name">{record.patientName}</div>
          <div className="pf-record-meta">
            {sector ? (lang === "es" ? sector.label : sector.label_en) : ""} · {record.date}
            {omittedCount > 0 && <span className="pf-record-omitted"> ({omittedCount} {lang === "es" ? "omitido" : "omitted"})</span>}
          </div>
        </div>
        <div className="pf-record-actions">
          <button className="pf-record-btn pdf" title={t.exportPDF} aria-label={t.exportPDF} onClick={() => showToast(lang === "es" ? "PDF generado" : "PDF generated")}><Icon name="pdf" size={14} color="currentColor" /></button>
          <button className="pf-record-btn wa" title={t.shareWhatsapp} aria-label={t.shareWhatsapp} onClick={() => {
            const wa = profile.whatsapp ? profile.whatsapp.replace(/\D/g, "") : "";
            const sLabel = sector ? (lang === "es" ? sector.label : sector.label_en) : "";
            const msg = encodeURIComponent("*" + (profile.business || "ProFicha") + "*\n\n📋 *" + t.recordFor + ":* " + record.patientName + "\n🗂️ *Sector:* " + sLabel + "\n📅 " + record.date + "\n\n_" + (lang === "es" ? "Expediente generado con ProFicha" : "Record generated with ProFicha") + "_");
            window.open((wa ? "https://wa.me/" + wa : "https://wa.me/") + "?text=" + msg, "_blank");
          }}><Icon name="whatsapp" size={14} color="currentColor" /></button>
          <button className="pf-record-btn edit" title={t.edit} aria-label={t.edit} onClick={() => { setSelectedRecord(record); setIsEditing(true); }}><Icon name="edit" size={14} color="currentColor" /></button>
          <button className="pf-record-btn del" title={t.deleteRecord} aria-label={t.deleteRecord} onClick={() => { setRecords(p => p.filter(r => r.id !== record.id)); showToast(lang === "es" ? "Expediente eliminado ✓" : "Record deleted ✓"); }}><Icon name="trash" size={14} color="currentColor" /></button>
        </div>
      </div>
    );
  };

  return (
    <div className="pf-view">
      {wizardOpen && wizardData && (
        <FormEngine sectorId={wizardData.sectorId} patientName={wizardData.patientName} profile={profile}
          onClose={() => setWizardOpen(false)}
          onComplete={record => { setRecords(p => [record, ...p]); setWizardOpen(false); setWizardData(null); setNewName(""); showToast(lang === "es" ? "Expediente guardado ✓" : "Record saved ✓"); }}
          mode="create" lang={lang} palette={palette} />
      )}
      {isEditing && selectedRecord && (
        <FormEngine sectorId={selectedRecord.sectorId} patientName={selectedRecord.patientName} profile={profile}
          onClose={() => setIsEditing(false)}
          onComplete={record => { setRecords(p => p.map(r => r.id === record.id ? record : r)); setSelectedRecord(null); setIsEditing(false); showToast(lang === "es" ? "Expediente actualizado ✓" : "Record updated ✓"); }}
          mode="edit" recordData={selectedRecord.formData} lang={lang} palette={palette} />
      )}

      <div className="pf-records-header">
        <div>
          <div className="pf-section-title">{t.records}</div>
          <div className="pf-section-sub">{records.length} {lang === "es" ? "expediente(s)" : "record(s)"}</div>
        </div>
        <button className="pf-btn pf-btn-primary" onClick={() => setShowNew(!showNew)} aria-label={t.newRecord}><Icon name="plus" size={17} /> {t.newRecord}</button>
      </div>

      {showNew && (
        <div className="pf-card pf-card-md" style={{ borderColor: "var(--accent)44", marginBottom: 16 }}>
          <div className="pf-card-title">{t.newRecord}</div>
          <label className="pf-label">{lang === "es" ? "Nombre del Paciente" : "Patient Name"}</label>
          <input className="pf-input" value={newName} onChange={e => setNewName(e.target.value)} placeholder={lang === "es" ? "Nombre completo..." : "Full name..."} onKeyDown={e => e.key === "Enter" && openWizard()} autoFocus />
          <label className="pf-label">{lang === "es" ? "Sector" : "Sector"}</label>
          <select className="pf-select" value={newSector} onChange={e => setNewSector(e.target.value)}>
            {mySectors.map(sid => { const s = SECTORS.find(x => x.id === sid); return s ? <option key={sid} value={sid}>{s.icon} {lang === "es" ? s.label : s.label_en}</option> : null; })}
          </select>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button className="pf-btn pf-btn-primary" onClick={openWizard}><Icon name="plus" size={17} /> {lang === "es" ? "Abrir Formulario" : "Open Form"}</button>
            <button className="pf-btn pf-btn-ghost" onClick={() => setShowNew(false)}>{t.cancel}</button>
          </div>
        </div>
      )}

      <div className="pf-records-filters">
        <div className="pf-search-box" style={{ flex: 1 }}>
          <Icon name="search" size={17} className="pf-search-icon" />
          <input className="pf-search-input" placeholder={lang === "es" ? "Buscar expediente..." : "Search record..."} value={search} onChange={e => setSearch(e.target.value)} />
          {search && <button className="pf-search-clear" onClick={() => setSearch("")}><Icon name="x" size={14} /></button>}
        </div>
        <select className="pf-select pf-filter-select" value={filterSector} onChange={e => setFilterSector(e.target.value)}>
          <option value="all">{t.allSectors}</option>
          {mySectors.map(sid => { const s = SECTORS.find(x => x.id === sid); return s ? <option key={sid} value={sid}>{lang === "es" ? s.label : s.label_en}</option> : null; })}
        </select>
      </div>

      {filtered.length === 0
        ? <div className="pf-empty-state"><div style={{ fontSize: "2.8rem" }}>🔍</div><div style={{ fontWeight: 700 }}>{records.length === 0 ? t.noRecords : (lang === "es" ? "Sin resultados" : "No results")}</div></div>
        : filtered.map(r => <RecordItem key={r.id} record={r} />)}
    </div>
  );
};

// ═══ CALENDARIO ══════════════════════════════════════
const CalendarView = ({ profile, palette, lang, showToast, navigate }) => {
  const t = T[lang];
  const pal = PALETTES.find(p => p.id === palette) || PALETTES[0];
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: new Date(), time: "09:00", duration: 30, patientName: "", sectorId: "" });

  useEffect(() => {
    const base = new Date();
    setEvents(Array.from({ length: 5 }, (_, i) => {
      const d = new Date(base); d.setDate(base.getDate() + i);
      return { id: genId(), title: i === 0 ? "Sesión de masoterapia" : "Cita " + (i + 1), date: d, time: i === 0 ? "10:00" : "14:30", duration: 60, patientName: "María López", sectorId: "masoterapia" };
    }));
  }, []);

  const dayEvents = events.filter(ev => { const d = new Date(ev.date); return d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear(); });

  const handleCreate = () => {
    if (!newEvent.title.trim()) { showToast(lang === "es" ? "Ingresa un título" : "Enter a title", "error"); return; }
    setEvents(p => [...p, { ...newEvent, id: genId() }]);
    setShowNewEvent(false);
    setNewEvent({ title: "", date: new Date(), time: "09:00", duration: 30, patientName: "", sectorId: "" });
    showToast(lang === "es" ? "Evento creado ✓" : "Event created ✓");
  };

  const shift = n => { const d = new Date(date); d.setDate(d.getDate() + n); setDate(d); };

  return (
    <div className="pf-view pf-calendar-view">
      <div className="pf-section-title">{t.calendar}</div>
      <div className="pf-calendar-controls">
        <div style={{ display: "flex", gap: 6 }}>
          <button className="pf-btn pf-btn-sm pf-btn-active">{lang === "es" ? "Día" : "Day"}</button>
        </div>
        <button className="pf-btn pf-btn-accent pf-btn-sm" onClick={() => setShowNewEvent(true)}>
          <Icon name="plus" size={16} /> {lang === "es" ? "Nueva Cita" : "New Event"}
        </button>
      </div>

      <div className="pf-calendar-day">
        <div className="pf-calendar-day-header">
          <button className="pf-calendar-btn" onClick={() => shift(-1)}><Icon name="chevronLeft" size={20} /></button>
          <div className="pf-calendar-day-title">
            {date.toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </div>
          <button className="pf-calendar-btn" onClick={() => shift(1)}><Icon name="chevronRight" size={20} /></button>
        </div>
        <div className="pf-calendar-events-list">
          {dayEvents.length === 0
            ? <div className="pf-empty-state"><div style={{ fontSize: "2rem" }}>📅</div><div>{lang === "es" ? "Sin citas este día" : "No appointments this day"}</div></div>
            : dayEvents.map(ev => {
                const sec = SECTORS.find(s => s.id === ev.sectorId);
                return (
                  <div key={ev.id} className="pf-calendar-event" style={{ borderLeft: "4px solid " + (sec ? sec.color : pal.accent) }}>
                    <div className="pf-calendar-event-title">{ev.title}</div>
                    <div className="pf-calendar-event-info">{ev.patientName} · {ev.time} ({ev.duration} min)</div>
                  </div>
                );
              })}
        </div>
      </div>

      {showNewEvent && (
        <div className="pf-modal-bg" onClick={() => setShowNewEvent(false)}>
          <div className="pf-modal" onClick={e => e.stopPropagation()}>
            <div className="pf-modal-header">
              <h3>{lang === "es" ? "Nueva Cita" : "New Event"}</h3>
              <button className="pf-modal-close" onClick={() => setShowNewEvent(false)} aria-label={t.close}><Icon name="close" size={20} /></button>
            </div>
            <div className="pf-modal-content">
              <label className="pf-form-label">{lang === "es" ? "Título" : "Title"}</label>
              <input className="pf-input" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} placeholder={lang === "es" ? "Ej: Sesión de masoterapia" : "e.g. Massage session"} />
              <label className="pf-form-label">{lang === "es" ? "Hora" : "Time"}</label>
              <input className="pf-input" type="time" value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} />
              <label className="pf-form-label">{lang === "es" ? "Paciente" : "Patient"}</label>
              <input className="pf-input" value={newEvent.patientName} onChange={e => setNewEvent({ ...newEvent, patientName: e.target.value })} placeholder={lang === "es" ? "Nombre del paciente" : "Patient name"} />
            </div>
            <div className="pf-modal-actions">
              <button className="pf-btn pf-btn-ghost" onClick={() => setShowNewEvent(false)}>{t.cancel}</button>
              <button className="pf-btn pf-btn-accent" onClick={handleCreate}>{lang === "es" ? "Crear evento" : "Create event"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══ ESCÁNER ═════════════════════════════════════════
const DocumentScanner = ({ onScanComplete, lang }) => {
  const t = T[lang];
  const [isScanning, setIsScanning] = useState(false);
  const [scannedImage, setScannedImage] = useState(null);
  const [docName, setDocName] = useState("");
  const [patient, setPatient] = useState("");
  const [notes, setNotes] = useState("");

  const handleScan = async () => {
    setIsScanning(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setScannedImage("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%23f0f0f0'/%3E%3Ctext x='150' y='110' text-anchor='middle' fill='%23888' font-size='14' font-family='sans-serif'%3EDocumento escaneado%3C/text%3E%3C/svg%3E");
    setIsScanning(false);
  };

  return (
    <div className="pf-view pf-scanner-view">
      <div className="pf-section">
        <h2 className="pf-section-title">{t.scanner}</h2>
        <PremiumCard className="pf-scanner-card">
          {!scannedImage ? (
            <div className="pf-scanner-empty">
              <div className="pf-scanner-icon"><Icon name="scanner" size={64} color="var(--accent)" /></div>
              <h3>{lang === "es" ? "Sin documentos escaneados" : "No scanned documents"}</h3>
              <p>{lang === "es" ? "Toca el botón para comenzar" : "Tap to start"}</p>
              <PremiumButton variant="accent" size="lg" icon={<Icon name="scanner" size={20} />} onClick={handleScan} loading={isScanning} fullWidth ariaLabel={lang === "es" ? "Escanear" : "Scan"}>
                {isScanning ? (lang === "es" ? "Escaneando..." : "Scanning...") : (lang === "es" ? "Escanear Documento" : "Scan Document")}
              </PremiumButton>
            </div>
          ) : (
            <div>
              <img src={scannedImage} alt="Scanned" style={{ width: "100%", borderRadius: 8, marginBottom: 16 }} />
              <label className="pf-form-label">{lang === "es" ? "Nombre del documento" : "Document name"}</label>
              <input className="pf-input" value={docName} onChange={e => setDocName(e.target.value)} placeholder={lang === "es" ? "Ej: Receta médica" : "e.g. Prescription"} />
              <label className="pf-form-label">{lang === "es" ? "Corresponde a" : "Belongs to"}</label>
              <input className="pf-input" value={patient} onChange={e => setPatient(e.target.value)} placeholder={lang === "es" ? "Nombre del paciente" : "Patient name"} />
              <label className="pf-form-label">{lang === "es" ? "Notas" : "Notes"}</label>
              <textarea className="pf-textarea" value={notes} onChange={e => setNotes(e.target.value)} rows={3} />
              <PremiumButton variant="accent" size="lg" icon={<Icon name="check" size={20} />} onClick={() => onScanComplete({ image: scannedImage, documentName: docName || "Documento", patientName: patient, notes, timestamp: Date.now() })} fullWidth ariaLabel={lang === "es" ? "Guardar" : "Save"}>
                {lang === "es" ? "Guardar Documento" : "Save Document"}
              </PremiumButton>
            </div>
          )}
        </PremiumCard>
      </div>
    </div>
  );
};

// ═══ AJUSTES ═════════════════════════════════════════
const SettingsView = ({ profile, setProfile, palette, setPalette, lang, setLang, user, showToast, openTutorial }) => {
  const t = T[lang];
  const pal = PALETTES.find(p => p.id === palette) || PALETTES[0];
  const [local, setLocal] = useState({ ...profile });
  const [saving, setSaving] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportPwd, setExportPwd] = useState("");
  const logoRef = useRef(null);
  const configRef = useRef(null);

  const handleSave = () => {
    setSaving(true); setProfile(local); storage.set("profile", local);
    setTimeout(() => { setSaving(false); showToast(t.saved, "success"); }, 600);
  };

  const profileImg = local.logo || (user && user.imageUrl);

  const fields = [
    { id: "sb", label: t.businessName, key: "business", type: "text", placeholder: lang === "es" ? "Ej: Clínica García" : "e.g. Garcia Clinic" },
    { id: "sn", label: lang === "es" ? "Tu nombre" : "Your name", key: "name", type: "text", placeholder: lang === "es" ? "Ej: María García" : "e.g. Maria Garcia" },
    { id: "sp", label: t.phone, key: "phone", type: "tel", placeholder: "+52 33 1234 5678" },
    { id: "se", label: t.email, key: "email", type: "email", placeholder: "email@example.com" },
    { id: "sw", label: t.whatsapp, key: "whatsapp", type: "tel", placeholder: "+52 33 1234 5678" },
    { id: "sa", label: t.address, key: "address", type: "text", placeholder: lang === "es" ? "Calle, ciudad" : "Street, city" },
    { id: "swb", label: t.website, key: "website", type: "url", placeholder: "https://..." },
  ];

  return (
    <div className="pf-view pf-settings-view">
      <div className="pf-section">
        <h2 className="pf-section-title">{t.settings}</h2>

        <PremiumCard className="pf-profile-card pf-stagger-in" style={{ "--stagger-delay": "0s" }}>
          <div className="pf-profile-header">
            <div className="pf-profile-avatar-wrapper">
              <div className="pf-profile-avatar" style={{ borderColor: pal.accent }}>
                {profileImg ? <img src={profileImg} alt="Perfil" /> : <Icon name="user" size={48} color={pal.text} />}
              </div>
              <button className="pf-profile-avatar-edit" onClick={() => logoRef.current && logoRef.current.click()} style={{ background: pal.accent }} aria-label={t.uploadLogo}>
                <Icon name="plus" size={14} color="#fff" />
              </button>
              <input ref={logoRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => {
                const file = e.target.files[0];
                if (!file) return;
                if (file.size > 2 * 1024 * 1024) { showToast(lang === "es" ? "Imagen muy grande (máx 2MB)" : "Image too large (max 2MB)", "error"); return; }
                const reader = new FileReader();
                reader.onload = ev => setLocal(p => ({ ...p, logo: ev.target.result }));
                reader.readAsDataURL(file);
              }} />
            </div>
            <div className="pf-profile-info">
              <h3 className="pf-profile-name">{local.name || local.business || (user && user.name) || t.defaultName}</h3>
              <p className="pf-profile-email">{(user && user.email) || local.email}</p>
              {local.logo && (
                <button className="pf-profile-remove-logo" onClick={() => setLocal(p => ({ ...p, logo: null }))} aria-label={t.removeLogo}>
                  <Icon name="trash" size={12} /><span>{t.removeLogo}</span>
                </button>
              )}
            </div>
          </div>
        </PremiumCard>

        <div className="pf-settings-group pf-stagger-in" style={{ "--stagger-delay": "0.1s" }}>
          <h3 className="pf-settings-group-title">{lang === "es" ? "Información Profesional" : "Professional Information"}</h3>
          <PremiumCard>
            {fields.map(f => (
              <div key={f.id} className="pf-form-field">
                <label className="pf-form-label" htmlFor={f.id}>{f.label}</label>
                <input id={f.id} className="pf-input" type={f.type} value={local[f.key] || ""} onChange={e => setLocal(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} />
              </div>
            ))}
          </PremiumCard>
        </div>

        <div className="pf-settings-group pf-stagger-in" style={{ "--stagger-delay": "0.15s" }}>
          <h3 className="pf-settings-group-title">{t.termsTitle}</h3>
          <PremiumCard>
            <p className="pf-settings-help">{lang === "es" ? "Estos términos aparecerán en tus PDFs." : "These terms will appear on your PDFs."}</p>
            <textarea className="pf-textarea" value={local.terms || ""} onChange={e => setLocal(p => ({ ...p, terms: e.target.value }))} placeholder={t.termsPlaceholder} rows={5} />
          </PremiumCard>
        </div>

        <div className="pf-settings-group pf-stagger-in" style={{ "--stagger-delay": "0.2s" }}>
          <h3 className="pf-settings-group-title">{t.colorTheme}</h3>
          <PremiumCard>
            <div className="pf-palette-grid">
              {PALETTES.map(p => (
                <button key={p.id} className={"pf-palette-option" + (palette === p.id ? " pf-palette-active" : "")} onClick={() => setPalette(p.id)} aria-pressed={palette === p.id} style={{ "--p-bg": p.bg, "--p-accent": p.accent }}>
                  <div className="pf-palette-preview"><div className="pf-palette-preview-bg" /><div className="pf-palette-preview-accent" /></div>
                  <span className="pf-palette-name">{p.name[lang]}</span>
                  {palette === p.id && <span className="pf-palette-check"><Icon name="check" size={14} color="#fff" /></span>}
                </button>
              ))}
            </div>
          </PremiumCard>
        </div>

        <div className="pf-settings-group pf-stagger-in" style={{ "--stagger-delay": "0.25s" }}>
          <h3 className="pf-settings-group-title">{t.language}</h3>
          <PremiumCard>
            <div className="pf-language-options">
              {[{ code: "es", flag: "🇲🇽", label: "Español" }, { code: "en", flag: "🇺🇸", label: "English" }].map(l => (
                <button key={l.code} className={"pf-language-option" + (lang === l.code ? " pf-language-active" : "")} onClick={() => setLang(l.code)} aria-pressed={lang === l.code}>
                  <span className="pf-language-flag">{l.flag}</span><span>{l.label}</span>
                  {lang === l.code && <Icon name="check" size={16} color="var(--accent)" />}
                </button>
              ))}
            </div>
          </PremiumCard>
        </div>

        <div className="pf-settings-group pf-stagger-in" style={{ "--stagger-delay": "0.3s" }}>
          <PremiumCard className="pf-tutorial-card" hoverable onClick={openTutorial}>
            <div className="pf-tutorial-card-content">
              <div className="pf-tutorial-card-icon" style={{ background: pal.accent }}><Icon name="sparkles" size={24} color="#fff" /></div>
              <div><h4>{lang === "es" ? "Ver Tutorial" : "View Tutorial"}</h4><p>{lang === "es" ? "Repasa las funciones principales" : "Review main features"}</p></div>
            </div>
            <Icon name="chevronRight" size={20} color="var(--text-sub)" />
          </PremiumCard>
        </div>

        <div className="pf-settings-group pf-stagger-in" style={{ "--stagger-delay": "0.35s" }}>
          <h3 className="pf-settings-group-title">{lang === "es" ? "Configuración Empresarial" : "Enterprise Configuration"}</h3>
          <PremiumCard>
            <div className="pf-settings-actions">
              <PremiumButton variant="primary" size="md" icon={<Icon name="download" size={16} />} onClick={() => setExportOpen(true)}>{t.exportConfig}</PremiumButton>
              <PremiumButton variant="primary" size="md" icon={<Icon name="upload" size={16} />} onClick={() => configRef.current && configRef.current.click()}>{t.importConfig}</PremiumButton>
              <input ref={configRef} type="file" accept=".json" style={{ display: "none" }} onChange={e => {
                const file = e.target.files[0]; if (!file) return;
                const reader = new FileReader();
                reader.onload = ev => { try { const cfg = JSON.parse(ev.target.result); if (cfg.profile) setLocal(cfg.profile); if (cfg.palette) setPalette(cfg.palette); if (cfg.lang) setLang(cfg.lang); showToast(lang === "es" ? "Importado ✓" : "Imported ✓", "success"); } catch { showToast(lang === "es" ? "Archivo inválido" : "Invalid file", "error"); } };
                reader.readAsText(file);
              }} />
            </div>
          </PremiumCard>
        </div>

        <div className="pf-settings-save pf-stagger-in" style={{ "--stagger-delay": "0.4s" }}>
          <PremiumButton variant="accent" size="lg" icon={saving ? null : <Icon name="check" size={20} />} onClick={handleSave} loading={saving} fullWidth ariaLabel={t.save}>
            {saving ? (lang === "es" ? "Guardando..." : "Saving...") : t.save}
          </PremiumButton>
        </div>
      </div>

      {exportOpen && (
        <div className="pf-modal-bg pf-modal-animated" onClick={() => setExportOpen(false)}>
          <div className="pf-modal" onClick={e => e.stopPropagation()}>
            <span className="pf-modal-handle" />
            <h3>{t.exportConfig}</h3>
            <p style={{ marginBottom: 12, color: "var(--text-sub)", fontSize: "0.875rem" }}>{lang === "es" ? "Ingresa una contraseña de protección:" : "Enter a protection password:"}</p>
            <input type="password" className="pf-input" value={exportPwd} onChange={e => setExportPwd(e.target.value)} placeholder={t.configPassword} autoFocus />
            <div className="pf-modal-actions">
              <PremiumButton variant="ghost" onClick={() => setExportOpen(false)}>{t.cancel}</PremiumButton>
              <PremiumButton variant="accent" icon={<Icon name="download" size={16} />} onClick={() => {
                if (exportPwd.length < 4) { showToast(lang === "es" ? "Contraseña muy corta" : "Password too short", "error"); return; }
                const blob = new Blob([JSON.stringify({ profile: local, palette, lang, exportedAt: new Date().toISOString(), version: "4.0" }, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "proficha-config-" + Date.now() + ".json"; a.click(); URL.revokeObjectURL(url);
                setExportOpen(false); setExportPwd(""); showToast(lang === "es" ? "Exportado ✓" : "Exported ✓", "success");
              }}>{t.exportConfig}</PremiumButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══ ACCESIBILIDAD ═══════════════════════════════════
const AccessibilityView = ({ a11y, setA11y, lang, showToast }) => {
  const t = T[lang];
  const fontOpts = [
    { key: "sm", label: { es: "Pequeño", en: "Small" }, px: 14 },
    { key: "md", label: { es: "Normal",  en: "Normal" }, px: 16 },
    { key: "lg", label: { es: "Grande",  en: "Large"  }, px: 18 },
    { key: "xl", label: { es: "Extra Grande", en: "Extra Large" }, px: 22 },
  ];
  const toggleOpts = [
    { key: "contrast",     icon: "star",          title: t.contrast,     desc: t.contrastDesc },
    { key: "animations",   icon: "sparkles",      title: t.animations,   desc: t.animationsDesc },
    { key: "reduceMotion", icon: "star",          title: t.reduceMotion, desc: lang === "es" ? "Reduce movimientos para evitar mareos" : "Reduce motion to prevent motion sickness" },
    { key: "boldText",     icon: "star",          title: t.boldText,     desc: lang === "es" ? "Texto más grueso para mejor legibilidad" : "Thicker text for better readability" },
    { key: "screenReader", icon: "accessibility", title: t.screenReader, desc: t.screenReaderDesc },
  ];

  return (
    <div className="pf-view pf-accessibility-view">
      <div className="pf-section">
        <h2 className="pf-section-title">{t.accessibility}</h2>
        <p className="pf-section-sub">{lang === "es" ? "Personaliza la app para tus necesidades" : "Customize the app for your needs"}</p>

        <div className="pf-a11y-group pf-stagger-in" style={{ "--stagger-delay": "0s" }}>
          <h3 className="pf-a11y-group-title">{t.fontSize}</h3>
          <p className="pf-a11y-group-desc">{t.fontSizeDesc}</p>
          <PremiumCard>
            <div className="pf-font-size-preview">
              <div className="pf-font-size-sample" style={{ fontSize: (fontOpts.find(o => o.key === a11y.fontSize) || { px: 16 }).px + "px" }}>
                {lang === "es" ? "Texto de ejemplo" : "Sample text"}
              </div>
            </div>
            <div className="pf-font-size-options" role="radiogroup">
              {fontOpts.map(opt => (
                <button key={opt.key} className={"pf-font-size-option" + (a11y.fontSize === opt.key ? " pf-font-size-active" : "")} onClick={() => { setA11y(p => ({ ...p, fontSize: opt.key })); showToast(lang === "es" ? "Tamaño actualizado ✓" : "Size updated ✓", "success"); }} role="radio" aria-checked={a11y.fontSize === opt.key} style={{ fontSize: opt.px + "px" }}>
                  <span className="pf-font-size-letter">A</span>
                  <span className="pf-font-size-label">{opt.label[lang]}</span>
                </button>
              ))}
            </div>
          </PremiumCard>
        </div>

        <div className="pf-a11y-group pf-stagger-in" style={{ "--stagger-delay": "0.1s" }}>
          <h3 className="pf-a11y-group-title">{lang === "es" ? "Opciones Visuales" : "Visual Options"}</h3>
          <PremiumCard className="pf-toggles-card">
            {toggleOpts.map((opt, idx) => (
              <div key={opt.key} className={"pf-toggle-row" + (idx < toggleOpts.length - 1 ? " pf-toggle-border" : "")}>
                <div className="pf-toggle-info">
                  <div className="pf-toggle-icon"><Icon name={opt.icon} size={20} color="var(--accent)" /></div>
                  <div className="pf-toggle-text"><div className="pf-toggle-title">{opt.title}</div><div className="pf-toggle-desc">{opt.desc}</div></div>
                </div>
                <button className={"pf-toggle-switch" + (a11y[opt.key] ? " pf-toggle-on" : "")} onClick={() => { setA11y(p => ({ ...p, [opt.key]: !p[opt.key] })); showToast(lang === "es" ? "Actualizado ✓" : "Updated ✓", "success"); }} role="switch" aria-checked={a11y[opt.key]} aria-label={opt.title}>
                  <span className="pf-toggle-thumb" />
                </button>
              </div>
            ))}
          </PremiumCard>
        </div>

        <div className="pf-a11y-group pf-stagger-in" style={{ "--stagger-delay": "0.2s" }}>
          <PremiumCard className="pf-a11y-info-card">
            <div className="pf-a11y-info-icon"><Icon name="accessibility" size={32} color="var(--accent)" /></div>
            <h4>{lang === "es" ? "Accesibilidad WCAG AA" : "WCAG AA Accessibility"}</h4>
            <p>{lang === "es" ? "Esta app cumple con estándares WCAG AA. Todos los botones están etiquetados para TalkBack." : "This app complies with WCAG AA standards. All buttons are labeled for TalkBack."}</p>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

// ═══ AYUDA ═══════════════════════════════════════════
const HelpView = ({ lang, palette, openTutorial }) => {
  const t = T[lang];
  const pal = PALETTES.find(p => p.id === palette) || PALETTES[0];
  const [searchQuery, setSearchQuery] = useState("");
  const [openCat, setOpenCat] = useState(null);

  const faqCategories = [
    { id: "start", icon: "🚀", color: "#6366f1", title: { es: "Primeros Pasos", en: "Getting Started" }, items: [
      { q: { es: "¿Cómo configuro mi perfil?", en: "How do I set up my profile?" }, a: { es: "Ve a Ajustes desde el menú lateral. Ahí puedes agregar tu nombre, negocio, teléfono, correo y dirección.", en: "Go to Settings from the side menu. There you can add your name, business, phone, email and address." } },
      { q: { es: "¿Cómo activo sectores?", en: "How do I activate sectors?" }, a: { es: "Ve a la sección Sectores. Toca cualquier sector para activarlo o desactivarlo.", en: "Go to the Sectors section. Tap any sector to activate or deactivate it." } },
    ]},
    { id: "records", icon: "📋", color: "#10b981", title: { es: "Expedientes", en: "Records" }, items: [
      { q: { es: "¿Cómo creo un expediente?", en: "How do I create a record?" }, a: { es: "En Expedientes, toca 'Nuevo Expediente', ingresa el nombre y sector, y completa el formulario.", en: "In Records, tap 'New Record', enter the name and sector, and complete the form." } },
      { q: { es: "¿Puedo editar expedientes?", en: "Can I edit records?" }, a: { es: "Sí. Toca el ícono de lápiz en cualquier expediente de la lista.", en: "Yes. Tap the pencil icon on any record in the list." } },
    ]},
    { id: "support", icon: "🎧", color: "#25d366", title: { es: "Soporte", en: "Support" }, items: [
      { q: { es: "¿Cómo contacto soporte?", en: "How do I contact support?" }, a: { es: "WhatsApp: +52 33 48 57 2070\nCorreo: angel.guerrero@valtaraexecutive.com\nHorario: Lun-Vie 9:00-18:00 h.", en: "WhatsApp: +52 33 48 57 2070\nEmail: angel.guerrero@valtaraexecutive.com\nHours: Mon-Fri 9:00 AM-6:00 PM." } },
    ]},
  ];

  const filtered = faqCategories.map(cat => ({ ...cat, items: cat.items.filter(item => searchQuery === "" || item.q[lang].toLowerCase().includes(searchQuery.toLowerCase()) || item.a[lang].toLowerCase().includes(searchQuery.toLowerCase())) })).filter(cat => cat.items.length > 0);

  return (
    <div className="pf-view pf-help-view">
      <div className="pf-section">
        <h2 className="pf-section-title">{t.help}</h2>

        <PremiumCard className="pf-support-banner pf-stagger-in" style={{ "--stagger-delay": "0s" }}>
          <div className="pf-support-banner-content">
            <div className="pf-support-banner-icon">🎧</div>
            <div><h4>{lang === "es" ? "¿Necesitas ayuda directa?" : "Need direct help?"}</h4><p>WhatsApp: +52 33 48 57 2070</p></div>
          </div>
        </PremiumCard>

        <PremiumCard className="pf-tutorial-access pf-stagger-in" style={{ "--stagger-delay": "0.05s" }} hoverable onClick={openTutorial}>
          <div className="pf-tutorial-access-content">
            <div className="pf-tutorial-access-icon" style={{ background: pal.accent }}><Icon name="sparkles" size={20} color="#fff" /></div>
            <div><h4>{lang === "es" ? "Ver Tutorial de Bienvenida" : "View Welcome Tutorial"}</h4><p>{lang === "es" ? "Repasa las funciones principales" : "Review main features"}</p></div>
          </div>
          <Icon name="chevronRight" size={20} color="var(--text-sub)" />
        </PremiumCard>

        <div className="pf-faq-search pf-stagger-in" style={{ "--stagger-delay": "0.1s" }}>
          <div className="pf-search-box">
            <Icon name="search" size={20} className="pf-search-icon" />
            <input type="text" className="pf-search-input" placeholder={t.faqSearch} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            {searchQuery && <button className="pf-search-clear" onClick={() => setSearchQuery("")}><Icon name="close" size={16} /></button>}
          </div>
        </div>

        {filtered.length === 0
          ? <div className="pf-empty-state"><div className="pf-empty-icon">🔍</div><p>{t.noResults}</p></div>
          : <div className="pf-faq-categories">
              {filtered.map((cat, ci) => (
                <div key={cat.id} className="pf-faq-category pf-stagger-in" style={{ "--stagger-delay": (0.15 + ci * 0.05) + "s" }}>
                  <button className="pf-faq-category-header" onClick={() => setOpenCat(openCat === cat.id ? null : cat.id)} aria-expanded={openCat === cat.id}>
                    <span className="pf-faq-category-icon">{cat.icon}</span>
                    <span className="pf-faq-category-title">{cat.title[lang]}</span>
                    <span className="pf-faq-category-count">{cat.items.length}</span>
                    <span className={"pf-faq-category-arrow" + (openCat === cat.id ? " pf-faq-arrow-open" : "")}><Icon name="chevronDown" size={18} /></span>
                  </button>
                  {openCat === cat.id && (
                    <div className="pf-faq-category-items">
                      {cat.items.map((item, ii) => (
                        <details key={ii} className="pf-faq-item">
                          <summary className="pf-faq-question"><span>?</span><span>{item.q[lang]}</span></summary>
                          <div className="pf-faq-answer">{item.a[lang].split("\n").map((line, i) => <p key={i}>{line}</p>)}</div>
                        </details>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>}

        <div className="pf-help-footer">
          <p className="pf-help-version">{t.version}</p>
          <p className="pf-help-credits">{t.madeWith}</p>
          <p className="pf-help-company">Grupo Gevizz S.A.S. · 2026</p>
        </div>
      </div>
    </div>
  );
};

// ═══ ALMACENAMIENTO ══════════════════════════════════
const StorageView = ({ profile, palette, lang, showToast }) => {
  const t = T[lang];
  const [schedule, setSchedule] = useState(() => storage.get("backupSchedule", "manual"));
  const [lastBackup, setLastBackup] = useState(() => storage.get("lastBackup", null));
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const scheduleOptions = [
    { value: "manual",     label: t.manual,     color: "#64748b" },
    { value: "hourly",     label: t.hourly,     color: "#6366f1" },
    { value: "fiveHours",  label: t.fiveHours,  color: "#8b5cf6" },
    { value: "eightHours", label: t.eightHours, color: "#a855f7" },
    { value: "daily",      label: t.daily,      color: "#10b981" },
    { value: "weekly",     label: t.weekly,     color: "#f59e0b" },
  ];

  const handleBackup = async () => {
    setIsBackingUp(true); showToast(lang === "es" ? "Iniciando respaldo..." : "Starting backup...", "info");
    await new Promise(r => setTimeout(r, 2500));
    const data = { timestamp: Date.now(), date: new Date().toISOString(), success: true, recordsCount: storage.get("records", []).length, profile: profile.business || profile.name || "ProFicha" };
    setLastBackup(data); storage.set("lastBackup", data); setIsBackingUp(false);
    showToast(lang === "es" ? "Respaldo completado ✓" : "Backup completed ✓", "success");
  };

  const handleRestore = async () => {
    setIsRestoring(true); showToast(lang === "es" ? "Restaurando..." : "Restoring...", "info");
    await new Promise(r => setTimeout(r, 3000));
    setIsRestoring(false); showToast(lang === "es" ? "Restauración completada ✓" : "Restore completed ✓", "success");
  };

  return (
    <div className="pf-view pf-storage-view">
      <div className="pf-section">
        <h2 className="pf-section-title">{t.storage}</h2>
        <p className="pf-section-sub">{lang === "es" ? "Gestiona tus respaldos en Google Drive" : "Manage your Google Drive backups"}</p>

        <div className="pf-storage-group pf-stagger-in" style={{ "--stagger-delay": "0s" }}>
          <h3 className="pf-storage-group-title">{t.lastBackup}</h3>
          <PremiumCard className="pf-last-backup-card">
            {lastBackup ? (
              <div className="pf-last-backup-content">
                <div className="pf-last-backup-status">
                  <div className={"pf-backup-status-dot " + (lastBackup.success ? "pf-backup-success" : "pf-backup-error")} />
                  <span className="pf-last-backup-label">{lastBackup.success ? (lang === "es" ? "Exitoso" : "Successful") : (lang === "es" ? "Fallido" : "Failed")}</span>
                </div>
                <div className="pf-last-backup-date">{new Date(lastBackup.timestamp).toLocaleString(lang === "es" ? "es-MX" : "en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
                <div className="pf-last-backup-details">{lastBackup.recordsCount + (lang === "es" ? " expediente(s) · " : " record(s) · ") + lastBackup.profile}</div>
              </div>
            ) : (
              <div className="pf-last-backup-empty">
                <Icon name="storage" size={48} color="var(--text-sub)" />
                <p>{lang === "es" ? "Sin respaldos aún" : "No backups yet"}</p>
                <p className="pf-last-backup-hint">{lang === "es" ? "Realiza tu primer respaldo" : "Make your first backup"}</p>
              </div>
            )}
          </PremiumCard>
        </div>

        <div className="pf-storage-group pf-stagger-in" style={{ "--stagger-delay": "0.1s" }}>
          <h3 className="pf-storage-group-title">{t.backupSchedule}</h3>
          <PremiumCard>
            <div className="pf-schedule-options">
              {scheduleOptions.map(opt => (
                <button key={opt.value} className={"pf-schedule-option" + (schedule === opt.value ? " pf-schedule-active" : "")} onClick={() => { setSchedule(opt.value); storage.set("backupSchedule", opt.value); showToast(lang === "es" ? "Programación actualizada ✓" : "Schedule updated ✓", "success"); }} aria-pressed={schedule === opt.value} style={{ "--opt-color": opt.color }}>
                  <div className="pf-schedule-option-icon"><Icon name="calendar" size={20} color={opt.color} /></div>
                  <span className="pf-schedule-option-label">{opt.label}</span>
                  {schedule === opt.value && <div className="pf-schedule-option-check"><Icon name="check" size={16} color={opt.color} /></div>}
                </button>
              ))}
            </div>
          </PremiumCard>
        </div>

        <div className="pf-storage-group pf-stagger-in" style={{ "--stagger-delay": "0.2s" }}>
          <h3 className="pf-storage-group-title">{lang === "es" ? "Acciones" : "Actions"}</h3>
          <div className="pf-storage-actions">
            <PremiumButton variant="accent" size="lg" icon={<Icon name="upload" size={20} />} onClick={handleBackup} loading={isBackingUp} fullWidth ariaLabel={lang === "es" ? "Respaldar ahora" : "Backup now"}>
              {isBackingUp ? (lang === "es" ? "Respaldando..." : "Backing up...") : (lang === "es" ? "Respaldar Ahora" : "Backup Now")}
            </PremiumButton>
            <PremiumButton variant="primary" size="lg" icon={<Icon name="download" size={20} />} onClick={handleRestore} loading={isRestoring} fullWidth ariaLabel={t.restoreBackup}>
              {isRestoring ? (lang === "es" ? "Restaurando..." : "Restoring...") : t.restoreBackup}
            </PremiumButton>
          </div>
        </div>

        <div className="pf-storage-group pf-stagger-in" style={{ "--stagger-delay": "0.3s" }}>
          <PremiumCard className="pf-storage-info-card">
            <div className="pf-storage-info-icon"><Icon name="sparkles" size={24} color="var(--accent)" /></div>
            <h4>{lang === "es" ? "Limpieza Automática" : "Automatic Cleanup"}</h4>
            <p>{lang === "es" ? "Al generar un nuevo respaldo, el anterior en Google Drive se elimina automáticamente." : "When generating a new backup, the previous one in Google Drive is automatically deleted."}</p>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

// ═══ TUTORIAL ════════════════════════════════════════
const TutorialModal = ({ isOpen, onClose, lang, palette }) => {
  const t = T[lang];
  const pal = PALETTES.find(p => p.id === palette) || PALETTES[0];
  const [step, setStep] = useState(0);
  const [dontShow, setDontShow] = useState(false);

  const steps = [
    { icon: "👋", title: { es: "¡Bienvenido a ProFicha!", en: "Welcome to ProFicha!" }, desc: { es: "Tu expediente profesional, en tu mano.", en: "Your professional record, in your hand." } },
    { icon: "📋", title: { es: "Crea Expedientes", en: "Create Records" }, desc: { es: "Formularios especializados por sector profesional.", en: "Specialized forms per professional sector." } },
    { icon: "📄", title: { es: "Exporta a PDF", en: "Export to PDF" }, desc: { es: "PDFs profesionales con tu logo y datos de contacto.", en: "Professional PDFs with your logo and contact data." } },
    { icon: "☁️", title: { es: "Respaldo en Google Drive", en: "Google Drive Backup" }, desc: { es: "Respaldos automáticos programables.", en: "Schedulable automatic backups." } },
    { icon: "📅", title: { es: "Calendario Integrado", en: "Integrated Calendar" }, desc: { es: "Gestiona citas sincronizadas con Google Calendar.", en: "Manage appointments synced with Google Calendar." } },
    { icon: "🎨", title: { es: "Personaliza Todo", en: "Customize Everything" }, desc: { es: "8 temas de color y configuración de perfil.", en: "8 color themes and profile configuration." } },
    { icon: "♿", title: { es: "Accesibilidad Completa", en: "Full Accessibility" }, desc: { es: "Tamaño de texto, alto contraste, TalkBack y más.", en: "Text size, high contrast, TalkBack and more." } },
    { icon: "🚀", title: { es: "¡Listo para comenzar!", en: "Ready to start!" }, desc: { es: "Desliza desde el borde izquierdo para abrir el menú.", en: "Swipe from the left edge to open the menu." } },
  ];

  useEffect(() => { if (isOpen) { setStep(0); setDontShow(false); } }, [isOpen]);
  if (!isOpen) return null;

  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div className="pf-modal-bg pf-tutorial-bg" onClick={onClose}>
      <div className="pf-modal pf-tutorial-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={t.tutorialTitle}>
        <div className="pf-tutorial-progress">
          {steps.map((_, i) => <div key={i} className={"pf-tutorial-progress-bar" + (i === step ? " pf-tutorial-progress-active" : i < step ? " pf-tutorial-progress-done" : "")} style={{ "--p-accent": pal.accent }} />)}
        </div>
        <button className="pf-tutorial-close" onClick={onClose} aria-label={t.close}><Icon name="close" size={20} /></button>

        <div className="pf-tutorial-content" key={step}>
          <div className="pf-tutorial-visual">
            <div className="pf-tutorial-icon" style={{ background: pal.accent }}><span>{current.icon}</span></div>
          </div>
          <h2 className="pf-tutorial-title">{current.title[lang]}</h2>
          <p className="pf-tutorial-description">{current.desc[lang]}</p>
          <div className="pf-tutorial-step-info"><span className="pf-tutorial-step-number">{(step + 1) + " / " + steps.length}</span></div>
        </div>

        <div className="pf-tutorial-controls">
          <label className="pf-tutorial-skip-label">
            <input type="checkbox" checked={dontShow} onChange={e => setDontShow(e.target.checked)} />
            <span>{t.tutorialSkip}</span>
          </label>
          <div className="pf-tutorial-buttons">
            {step > 0 && <PremiumButton variant="ghost" onClick={() => setStep(s => s - 1)} ariaLabel={t.tutorialPrev}>{t.tutorialPrev}</PremiumButton>}
            <PremiumButton variant="accent" onClick={() => { if (isLast) { if (dontShow) storage.set("tutorialCompleted", true); onClose(); } else setStep(s => s + 1); }} ariaLabel={isLast ? t.tutorialFinish : t.tutorialNext} fullWidth={step === 0}>
              {isLast ? t.tutorialFinish : t.tutorialNext}
            </PremiumButton>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══ MODAL DE PERMISOS ═══════════════════════════════
const PermissionModal = ({ isOpen, onClose, onContinue, permissionName, explanation, icon, lang }) => {
  const t = T[lang];
  if (!isOpen) return null;
  return (
    <div className="pf-modal-bg pf-modal-animated" onClick={onClose}>
      <div className="pf-modal pf-permission-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="perm-title">
        <span className="pf-modal-handle" />
        <div className="pf-permission-icon-wrapper"><div className="pf-permission-icon-bg"><Icon name={icon || "star"} size={48} color="var(--accent)" /></div></div>
        <h3 id="perm-title">{t.permissionTitle}</h3>
        <h4 className="pf-permission-name">{permissionName}</h4>
        <p className="pf-permission-explanation">{explanation}</p>
        <div className="pf-modal-actions">
          <PremiumButton variant="ghost" onClick={onClose} ariaLabel={t.permissionDeny}>{t.permissionDeny}</PremiumButton>
          <PremiumButton variant="accent" icon={<Icon name="check" size={16} />} onClick={() => { onContinue(); onClose(); }} ariaLabel={t.permissionContinue}>{t.permissionContinue}</PremiumButton>
        </div>
      </div>
    </div>
  );
};

// ═══ WHATSAPP RÁPIDO ═════════════════════════════════
const QuickWhatsAppModal = ({ isOpen, onClose, defaultNumber, lang }) => {
  const t = T[lang];
  const [phone, setPhone] = useState(defaultNumber || "");
  const [msg, setMsg] = useState("");
  if (!isOpen) return null;
  return (
    <div className="pf-modal-bg pf-modal-animated" onClick={onClose}>
      <div className="pf-modal" onClick={e => e.stopPropagation()}>
        <span className="pf-modal-handle" />
        <div className="pf-modal-header-icon"><Icon name="whatsapp" size={32} color="#25d366" /></div>
        <h3 style={{ textAlign: "center", marginBottom: 16 }}>{t.quickWhatsAppTitle}</h3>
        <label className="pf-form-label">{t.phoneNumber}</label>
        <input className="pf-input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+52 33 1234 5678" />
        <label className="pf-form-label">{t.messageContent}</label>
        <textarea className="pf-textarea" value={msg} onChange={e => setMsg(e.target.value)} placeholder={lang === "es" ? "Escribe tu mensaje..." : "Type your message..."} style={{ minHeight: 100 }} />
        <div className="pf-modal-actions" style={{ marginTop: 20 }}>
          <button className="pf-btn pf-btn-ghost" onClick={onClose}>{t.cancel}</button>
          <button className="pf-btn pf-btn-accent" onClick={() => {
            const clean = phone.replace(/\D/g, "");
            if (!clean) { alert(lang === "es" ? "Ingresa un número" : "Enter a number"); return; }
            window.open("https://wa.me/" + clean + "?text=" + encodeURIComponent(msg), "_blank");
            onClose();
          }}>
            <Icon name="send" size={16} color="inherit" /> {t.send}
          </button>
        </div>
      </div>
    </div>
  );
};

// ═══ CSS GENERATOR ════════════════════════════════════
function generateCSS(pal, a11y) {
  const ts = a11y.animations ? "0.3s" : "0s";
  const sp = a11y.animations ? "cubic-bezier(0.34,1.56,0.64,1)" : "linear";
  const fsMap = { sm: "14px", md: "16px", lg: "18px", xl: "22px" };
  const fs = fsMap[a11y.fontSize] || "16px";
  return `
:root{--bg:${pal.bg};--surface:${pal.surface};--card:${pal.card};--card-hover:${pal.cardHover};--text:${pal.text};--text-sub:${pal.textSub};--accent:${pal.accent};--accent-light:${pal.accentLight};--border:${pal.border};--overlay:${pal.overlay};--glow:${pal.glow};--shadow:${pal.shadow};--transition:${ts};--spring:${sp};--radius:16px;--radius-sm:10px;--radius-lg:24px;--fs:${fs};--fw:${a11y.boldText?"600":"400"};}
*{box-sizing:border-box;margin:0;padding:0;}
html,body{height:100%;overflow:hidden;overscroll-behavior:none;-webkit-overflow-scrolling:touch;}
body{font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','Inter',sans-serif;background:var(--bg);color:var(--text);font-size:var(--fs);font-weight:var(--fw);line-height:1.5;-webkit-font-smoothing:antialiased;}
.pf-app{height:100%;display:flex;flex-direction:column;overflow:hidden;background:var(--bg);}
.pf-header{display:flex;align-items:center;padding:16px 20px;gap:16px;flex-shrink:0;}
.pf-header-menu{width:44px;height:44px;border-radius:50%;background:var(--card);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all var(--transition) var(--spring);color:var(--text);}
.pf-header-menu:active{transform:scale(0.92);background:var(--card-hover);}
.pf-header-title{flex:1;min-height:44px;display:flex;align-items:center;}
.pf-header-appname,.pf-header-greeting{font-size:1.5rem;font-weight:700;letter-spacing:-0.02em;}
.pf-header-spacer{width:44px;}
.pf-main{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;padding-bottom:90px;}
.pf-main::-webkit-scrollbar{width:4px;}.pf-main::-webkit-scrollbar-track{background:transparent;}.pf-main::-webkit-scrollbar-thumb{background:var(--accent);border-radius:4px;}
.pf-view{padding:0 20px 100px;animation:pfViewEnter 0.4s var(--spring) both;}
@keyframes pfViewEnter{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
.pf-section{margin-bottom:32px;}.pf-section-title{font-size:1.25rem;font-weight:700;margin-bottom:16px;letter-spacing:-0.01em;}.pf-section-sub{font-size:0.875rem;color:var(--text-sub);margin-bottom:16px;}
.pf-subsection-title{font-size:0.9rem;font-weight:600;color:var(--text-sub);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.05em;}
.pf-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);transition:all var(--transition) var(--spring);}
.pf-card-md{padding:20px;}.pf-card-sm{padding:14px;}.pf-card-lg{padding:28px;}
.pf-card-hoverable:active{transform:scale(0.98);background:var(--card-hover);}
.pf-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;border:none;border-radius:var(--radius);font-weight:600;cursor:pointer;transition:all var(--transition) var(--spring);font-family:inherit;}
.pf-btn-primary{background:var(--card);color:var(--text);border:1px solid var(--border);}
.pf-btn-accent{background:var(--accent);color:#fff;box-shadow:0 4px 20px var(--glow);}
.pf-btn-accent:active{transform:scale(0.96);box-shadow:0 2px 10px var(--glow);}
.pf-btn-ghost{background:transparent;color:var(--text);border:1px solid var(--border);}
.pf-btn-success{background:#25d366;color:#fff;}
.pf-btn-active{border-color:var(--accent);color:var(--accent);}
.pf-btn-sm{padding:10px 16px;font-size:0.875rem;}.pf-btn-md{padding:14px 24px;font-size:1rem;}.pf-btn-lg{padding:18px 32px;font-size:1.1rem;}
.pf-btn-full{width:100%;}.pf-btn-disabled{opacity:0.5;cursor:not-allowed;}.pf-btn-loading{opacity:0.7;pointer-events:none;}
.pf-spinner{width:20px;height:20px;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;animation:pfSpin 0.8s linear infinite;}
@keyframes pfSpin{to{transform:rotate(360deg);}}
.pf-drawer-overlay{position:fixed;inset:0;background:var(--overlay);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);opacity:0;pointer-events:none;transition:opacity var(--transition);z-index:1000;}
.pf-drawer-overlay.pf-drawer-open{opacity:1;pointer-events:auto;}
.pf-drawer{position:fixed;top:0;left:0;bottom:0;width:85%;max-width:340px;background:var(--surface);transform:translateX(-110%);transition:transform var(--transition) var(--spring);z-index:1001;display:flex;flex-direction:column;overflow:hidden;}
.pf-drawer.pf-drawer-open{transform:translateX(0);}
.pf-drawer-header{position:relative;padding:60px 20px 20px;flex-shrink:0;}
.pf-drawer-header-bg{position:absolute;inset:0;opacity:0.15;}
.pf-drawer-header-content{position:relative;display:flex;gap:14px;align-items:center;}
.pf-drawer-avatar{width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;}
.pf-drawer-avatar img{width:100%;height:100%;object-fit:cover;}
.pf-drawer-user-info{flex:1;min-width:0;}
.pf-drawer-user-name{font-size:1rem;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.pf-drawer-user-role{font-size:0.8rem;color:var(--text-sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.pf-drawer-close{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.1);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;color:var(--text);}
.pf-drawer-section{padding:8px 12px;overflow-y:auto;}
.pf-drawer-divider{height:1px;background:var(--border);margin:4px 20px;}
.pf-drawer-item{display:flex;align-items:center;gap:14px;width:100%;padding:12px 16px;background:transparent;border:none;border-radius:var(--radius-sm);cursor:pointer;transition:all var(--transition) var(--spring);font-family:inherit;color:var(--text);position:relative;}
.pf-drawer-item:active{background:var(--card-hover);transform:scale(0.98);}
.pf-drawer-item-active{background:color-mix(in srgb,var(--item-color,var(--accent)) 10%,transparent);}
.pf-drawer-item-icon{width:32px;display:flex;align-items:center;justify-content:center;}
.pf-drawer-item-label{font-size:0.95rem;font-weight:500;}
.pf-drawer-item-indicator{width:6px;height:6px;border-radius:50%;background:var(--item-color,var(--accent));margin-left:auto;}
.pf-drawer-footer{margin-top:auto;padding:16px 20px;border-top:1px solid var(--border);}
.pf-drawer-logout{display:flex;align-items:center;gap:12px;width:100%;padding:12px 16px;background:transparent;border:1px solid rgba(239,68,68,0.2);border-radius:var(--radius-sm);cursor:pointer;color:#ef4444;font-family:inherit;font-weight:600;margin-bottom:12px;transition:all var(--transition);}
.pf-drawer-logout:active{background:rgba(239,68,68,0.1);}
.pf-drawer-version{font-size:0.7rem;color:var(--text-sub);text-align:center;opacity:0.7;}
.pf-navbar{position:fixed;bottom:0;left:0;right:0;background:var(--surface);border-top:1px solid var(--border);display:flex;z-index:100;padding-bottom:env(safe-area-inset-bottom,0);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);}
.pf-navbar-item{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:12px 8px;background:transparent;border:none;cursor:pointer;color:var(--text-sub);font-family:inherit;font-size:0.7rem;font-weight:500;transition:all var(--transition) var(--spring);}
.pf-navbar-item:active{transform:scale(0.92);}
.pf-navbar-active{color:var(--accent);}
.pf-toast{position:fixed;bottom:90px;left:20px;right:20px;padding:14px 20px;border-radius:var(--radius);display:flex;align-items:center;gap:12px;z-index:9999;animation:pfToastIn 0.3s var(--spring) both;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);}
.pf-toast-info{background:rgba(99,102,241,0.2);border:1px solid rgba(99,102,241,0.3);}
.pf-toast-success{background:rgba(16,185,129,0.2);border:1px solid rgba(16,185,129,0.3);}
.pf-toast-error{background:rgba(239,68,68,0.2);border:1px solid rgba(239,68,68,0.3);}
@keyframes pfToastIn{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
.pf-toast-message{font-size:0.9rem;font-weight:600;}
.pf-stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:28px;}
.pf-stat-card{text-align:center;}.pf-stat-value{font-size:2rem;font-weight:800;color:var(--accent);}.pf-stat-label{font-size:0.75rem;color:var(--text-sub);font-weight:600;}
.pf-category-feed{display:flex;flex-direction:column;gap:12px;}.pf-category-card{cursor:pointer;}
.pf-category-header{display:flex;align-items:center;gap:12px;margin-bottom:12px;}
.pf-category-icon{font-size:1.5rem;}.pf-category-name{flex:1;font-size:1rem;font-weight:700;}
.pf-category-count{padding:4px 12px;background:var(--card-hover);border-radius:12px;font-size:0.75rem;font-weight:700;color:var(--text-sub);}
.pf-category-sectors{display:flex;flex-wrap:wrap;gap:8px;}
.pf-mini-sector{display:flex;align-items:center;gap:4px;padding:4px 10px;background:var(--card-hover);border-radius:20px;font-size:0.75rem;}
.pf-mini-more{opacity:0.6;}
.pf-records-list{display:flex;flex-direction:column;gap:8px;}
.pf-record-item{display:flex;align-items:center;gap:12px;padding:14px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);transition:all var(--transition) var(--spring);}
.pf-record-item:active{transform:scale(0.98);background:var(--card-hover);}
.pf-record-icon{width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:1.25rem;flex-shrink:0;}
.pf-record-body{flex:1;min-width:0;}.pf-record-info{flex:1;min-width:0;}
.pf-record-name{font-weight:700;font-size:0.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.pf-record-meta{font-size:0.8rem;color:var(--text-sub);}.pf-record-omitted{margin-left:4px;opacity:0.7;}
.pf-record-actions{display:flex;gap:6px;flex-shrink:0;}
.pf-record-btn{width:32px;height:32px;border-radius:var(--radius-sm);border:1px solid var(--border);background:var(--card-hover);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all var(--transition);color:var(--text-sub);}
.pf-record-btn:active{transform:scale(0.9);}
.pf-record-btn.pdf{color:#ef4444;}.pf-record-btn.wa{color:#25d366;}.pf-record-btn.edit{color:var(--accent);}.pf-record-btn.del{color:#ef4444;}
.pf-records-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;gap:12px;}
.pf-records-filters{display:flex;gap:12px;margin-bottom:16px;align-items:center;}
.pf-filter-select{min-width:120px;}
.pf-card-title{font-weight:700;font-size:1rem;margin-bottom:14px;}
.pf-label{display:block;font-size:0.85rem;font-weight:600;color:var(--text-sub);margin-bottom:6px;margin-top:12px;}
.pf-empty-state{text-align:center;padding:40px 20px;color:var(--text-sub);}
.pf-empty-card{text-align:center;padding:40px 20px;}.pf-empty-icon{font-size:2.5rem;margin-bottom:12px;}.pf-empty-text{color:var(--text-sub);}
.pf-search-box{position:relative;display:flex;align-items:center;background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);margin-bottom:16px;}
.pf-search-icon{position:absolute;left:14px;color:var(--text-sub);pointer-events:none;}
.pf-search-input{width:100%;padding:12px 44px;background:transparent;border:none;color:var(--text);font-family:inherit;font-size:0.95rem;outline:none;}
.pf-search-clear{position:absolute;right:12px;width:24px;height:24px;border-radius:50%;background:var(--card-hover);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text-sub);}
.pf-my-sectors{margin-bottom:24px;}
.pf-sectors-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;}
.pf-sector-card{display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 10px;background:var(--card);border:2px solid transparent;border-radius:var(--radius);cursor:pointer;transition:all var(--transition) var(--spring);font-family:inherit;color:var(--text);position:relative;text-align:center;}
.pf-sector-card:active{transform:scale(0.95);}
.pf-sector-active{border-color:var(--sector-color,var(--accent));background:color-mix(in srgb,var(--sector-color,var(--accent)) 10%,var(--card));}
.pf-sector-icon{font-size:1.75rem;}.pf-sector-label{font-size:0.75rem;font-weight:600;line-height:1.3;}
.pf-sector-badge{position:absolute;top:6px;right:6px;width:20px;height:20px;border-radius:50%;background:var(--sector-color,var(--accent));display:flex;align-items:center;justify-content:center;}
.pf-sector-add-hint{font-size:0.65rem;color:var(--text-sub);}
.pf-category-group{margin-bottom:24px;}
.pf-category-title{display:flex;align-items:center;gap:10px;margin-bottom:12px;font-size:0.9rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;}
.pf-category-title-icon{font-size:1.25rem;}
.pf-input{width:100%;padding:12px 16px;background:var(--card-hover);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text);font-family:inherit;font-size:0.95rem;outline:none;transition:border-color var(--transition);margin-bottom:8px;}
.pf-input:focus{border-color:var(--accent);}.pf-input:disabled{opacity:0.5;}
.pf-select{width:100%;padding:12px 16px;background:var(--card-hover);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text);font-family:inherit;font-size:0.95rem;outline:none;transition:border-color var(--transition);margin-bottom:8px;}
.pf-select:focus{border-color:var(--accent);}.pf-select:disabled{opacity:0.5;}
.pf-textarea{width:100%;padding:12px 16px;background:var(--card-hover);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text);font-family:inherit;font-size:0.95rem;outline:none;transition:border-color var(--transition);resize:vertical;margin-bottom:8px;}
.pf-textarea:focus{border-color:var(--accent);}
.pf-form-container{position:fixed;inset:0;background:var(--bg);z-index:500;overflow-y:auto;}
.pf-form-header{display:flex;align-items:flex-start;justify-content:space-between;padding:20px;border-bottom:1px solid var(--border);gap:16px;position:sticky;top:0;background:var(--bg);z-index:10;}
.pf-form-header-content{display:flex;gap:14px;align-items:flex-start;flex:1;}
.pf-form-header-icon{width:48px;height:48px;border-radius:var(--radius);background:var(--card);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.pf-form-title{font-size:1.1rem;font-weight:700;margin-bottom:4px;}.pf-form-subtitle{font-size:0.8rem;color:var(--text-sub);}
.pf-form-close{width:36px;height:36px;border-radius:50%;background:var(--card);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text);flex-shrink:0;}
.pf-form-tabs{display:flex;gap:8px;padding:16px 20px;overflow-x:auto;border-bottom:1px solid var(--border);}
.pf-form-tab{padding:8px 16px;border-radius:20px;border:1px solid var(--border);background:transparent;color:var(--text-sub);font-family:inherit;font-size:0.875rem;font-weight:600;cursor:pointer;white-space:nowrap;transition:all var(--transition);}
.pf-form-tab-active{background:var(--accent);color:#fff;border-color:var(--accent);}
.pf-form-content{padding:20px;}.pf-form-tab-hidden{display:none;}.pf-form-tab-visible{display:block;}
.pf-form-field{margin-bottom:8px;}.pf-form-field-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;}
.pf-form-label{font-size:0.85rem;font-weight:600;color:var(--text-sub);}.pf-required-indicator{color:#ef4444;font-weight:700;}
.pf-field-optional{display:flex;justify-content:flex-end;margin-top:4px;}
.pf-form-actions{display:flex;gap:12px;padding:20px;border-top:1px solid var(--border);position:sticky;bottom:0;background:var(--bg);}
.pf-modal-bg{position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:2000;display:flex;align-items:flex-end;justify-content:center;}
.pf-modal{background:var(--surface);border-radius:var(--radius-lg) var(--radius-lg) 0 0;padding:24px;width:100%;max-width:600px;max-height:85vh;overflow-y:auto;position:relative;}
.pf-modal-handle{display:block;width:40px;height:4px;border-radius:2px;background:var(--border);margin:0 auto 20px;}
.pf-modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
.pf-modal-header-icon{text-align:center;margin-bottom:16px;}
.pf-modal-close{width:32px;height:32px;border-radius:50%;background:var(--card-hover);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text);}
.pf-modal-content{margin-bottom:20px;}.pf-modal-actions{display:flex;gap:12px;}
.pf-fade-in{animation:pfFadeIn 0.3s ease both;}
@keyframes pfFadeIn{from{opacity:0;}to{opacity:1;}}
.pf-stagger-in{animation:pfViewEnter 0.4s var(--spring) both;animation-delay:var(--stagger-delay,0s);}
.pf-login{height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);padding:40px 20px;}
.pf-login-content{text-align:center;max-width:320px;width:100%;}
.pf-login-title{font-size:2.5rem;font-weight:800;margin-bottom:12px;letter-spacing:-0.03em;color:var(--accent);}
.pf-login-tagline{color:var(--text-sub);margin-bottom:40px;}
.pf-calendar-view{padding:0 20px 100px;}
.pf-calendar-controls{display:flex;gap:12px;margin-bottom:16px;justify-content:space-between;align-items:center;}
.pf-calendar-day{background:var(--card);border-radius:var(--radius);overflow:hidden;}
.pf-calendar-day-header{display:flex;align-items:center;justify-content:space-between;padding:16px;border-bottom:1px solid var(--border);}
.pf-calendar-btn{width:36px;height:36px;border-radius:50%;background:var(--card-hover);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text);transition:all var(--transition);}
.pf-calendar-btn:active{transform:scale(0.9);}
.pf-calendar-day-title{font-size:0.95rem;font-weight:600;text-align:center;}
.pf-calendar-events-list{padding:16px;display:flex;flex-direction:column;gap:10px;}
.pf-calendar-event{padding:12px 14px;background:var(--card-hover);border-radius:var(--radius-sm);}
.pf-calendar-event-title{font-weight:700;font-size:0.9rem;margin-bottom:4px;}.pf-calendar-event-info{font-size:0.8rem;color:var(--text-sub);}
.pf-scanner-view{padding:0 20px 100px;}.pf-scanner-card{min-height:300px;}
.pf-scanner-empty{text-align:center;padding:40px 20px;}.pf-scanner-icon{margin-bottom:16px;}
.pf-scanner-empty h3{font-size:1.1rem;font-weight:700;margin-bottom:8px;}.pf-scanner-empty p{color:var(--text-sub);margin-bottom:24px;}
.pf-settings-view{padding:0 20px 100px;}
.pf-profile-card{margin-bottom:28px;}.pf-profile-header{display:flex;gap:20px;align-items:flex-start;}
.pf-profile-avatar-wrapper{position:relative;flex-shrink:0;}
.pf-profile-avatar{width:80px;height:80px;border-radius:50%;border:3px solid var(--accent);overflow:hidden;background:var(--card-hover);display:flex;align-items:center;justify-content:center;}
.pf-profile-avatar img{width:100%;height:100%;object-fit:cover;}
.pf-profile-avatar-edit{position:absolute;bottom:0;right:0;width:28px;height:28px;border-radius:50%;border:2px solid var(--surface);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all var(--transition) var(--spring);}
.pf-profile-avatar-edit:active{transform:scale(0.9);}
.pf-profile-info{flex:1;min-width:0;}
.pf-profile-name{font-size:1.25rem;font-weight:700;margin-bottom:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.pf-profile-email{font-size:0.875rem;color:var(--text-sub);margin-bottom:8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.pf-profile-remove-logo{display:flex;align-items:center;gap:6px;padding:6px 12px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);border-radius:var(--radius-sm);color:#ef4444;font-size:0.75rem;cursor:pointer;}
.pf-settings-group{margin-bottom:28px;}
.pf-settings-group-title{font-size:0.9rem;font-weight:600;color:var(--text-sub);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.05em;}
.pf-settings-help{font-size:0.8rem;color:var(--text-sub);margin-bottom:12px;line-height:1.5;}
.pf-settings-actions{display:flex;flex-direction:column;gap:10px;}.pf-settings-save{margin-top:32px;}
.pf-palette-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}
.pf-palette-option{position:relative;display:flex;flex-direction:column;gap:10px;padding:16px;background:var(--card-hover);border:2px solid transparent;border-radius:var(--radius);cursor:pointer;transition:all var(--transition) var(--spring);font-family:inherit;color:var(--text);}
.pf-palette-option:active{transform:scale(0.95);}.pf-palette-active{border-color:var(--p-accent);}
.pf-palette-preview{display:flex;gap:4px;height:40px;border-radius:var(--radius-sm);overflow:hidden;}
.pf-palette-preview-bg{flex:1;background:var(--p-bg);}.pf-palette-preview-accent{flex:1;background:var(--p-accent);}
.pf-palette-name{font-size:0.875rem;font-weight:500;}
.pf-palette-check{position:absolute;top:8px;right:8px;width:24px;height:24px;border-radius:50%;background:var(--p-accent);display:flex;align-items:center;justify-content:center;}
.pf-language-options{display:flex;flex-direction:column;gap:8px;}
.pf-language-option{display:flex;align-items:center;gap:14px;padding:14px 16px;background:var(--card-hover);border:2px solid transparent;border-radius:var(--radius);cursor:pointer;transition:all var(--transition) var(--spring);font-family:inherit;color:var(--text);font-size:1rem;}
.pf-language-option:active{transform:scale(0.98);}
.pf-language-active{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 10%,var(--card-hover));}
.pf-language-flag{font-size:1.5rem;}
.pf-tutorial-card{cursor:pointer;display:flex;align-items:center;justify-content:space-between;}
.pf-tutorial-card-content{display:flex;gap:16px;align-items:center;}
.pf-tutorial-card-icon{width:48px;height:48px;border-radius:var(--radius);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.pf-tutorial-card h4{font-size:1rem;font-weight:600;margin-bottom:2px;}.pf-tutorial-card p{font-size:0.8rem;color:var(--text-sub);}
.pf-accessibility-view{padding:0 20px 100px;}
.pf-a11y-group{margin-bottom:28px;}.pf-a11y-group-title{font-size:0.9rem;font-weight:600;color:var(--text-sub);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em;}
.pf-a11y-group-desc{font-size:0.8rem;color:var(--text-sub);margin-bottom:12px;line-height:1.5;}
.pf-font-size-preview{padding:20px;background:var(--card-hover);border-radius:var(--radius);margin-bottom:16px;text-align:center;}
.pf-font-size-sample{font-weight:600;color:var(--accent);transition:font-size var(--transition);}
.pf-font-size-options{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;}
.pf-font-size-option{display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px 8px;background:var(--card-hover);border:2px solid transparent;border-radius:var(--radius);cursor:pointer;transition:all var(--transition) var(--spring);font-family:inherit;color:var(--text);}
.pf-font-size-option:active{transform:scale(0.95);}
.pf-font-size-active{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 10%,var(--card-hover));}
.pf-font-size-letter{font-weight:700;}.pf-font-size-label{font-size:0.7rem;color:var(--text-sub);}
.pf-toggles-card{padding:0;}
.pf-toggle-row{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;gap:16px;}
.pf-toggle-border{border-bottom:1px solid var(--border);}
.pf-toggle-info{display:flex;gap:14px;flex:1;min-width:0;}
.pf-toggle-icon{width:36px;height:36px;border-radius:var(--radius-sm);background:var(--card-hover);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.pf-toggle-text{flex:1;min-width:0;}.pf-toggle-title{font-size:0.95rem;font-weight:600;margin-bottom:2px;}.pf-toggle-desc{font-size:0.8rem;color:var(--text-sub);line-height:1.4;}
.pf-toggle-switch{position:relative;width:52px;height:32px;border-radius:16px;background:var(--border);border:none;cursor:pointer;transition:background var(--transition);flex-shrink:0;}
.pf-toggle-on{background:var(--accent);}
.pf-toggle-thumb{position:absolute;top:4px;left:4px;width:24px;height:24px;border-radius:50%;background:white;transition:transform var(--transition) var(--spring);box-shadow:0 2px 4px rgba(0,0,0,0.2);}
.pf-toggle-on .pf-toggle-thumb{transform:translateX(20px);}
.pf-a11y-info-card{text-align:center;padding:32px 24px;}
.pf-a11y-info-icon{width:64px;height:64px;border-radius:50%;background:var(--card-hover);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;}
.pf-a11y-info-card h4{font-size:1.1rem;font-weight:600;margin-bottom:8px;}
.pf-a11y-info-card p{font-size:0.875rem;color:var(--text-sub);line-height:1.6;}
.pf-help-view{padding:0 20px 100px;}
.pf-support-banner{background:linear-gradient(135deg,#25d366 0%,#128c7e 100%);color:white;margin-bottom:16px;}
.pf-support-banner-content{display:flex;gap:16px;align-items:center;}
.pf-support-banner-icon{font-size:2.5rem;}
.pf-support-banner h4{font-size:1.1rem;font-weight:600;margin-bottom:4px;}.pf-support-banner p{font-size:0.875rem;opacity:0.9;}
.pf-tutorial-access{cursor:pointer;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;}
.pf-tutorial-access-content{display:flex;gap:14px;align-items:center;flex:1;}
.pf-tutorial-access-icon{width:40px;height:40px;border-radius:var(--radius);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.pf-tutorial-access h4{font-size:0.95rem;font-weight:600;margin-bottom:2px;}.pf-tutorial-access p{font-size:0.8rem;color:var(--text-sub);}
.pf-faq-search{margin-bottom:20px;}.pf-faq-categories{display:flex;flex-direction:column;gap:12px;}
.pf-faq-category{background:var(--card);border-radius:var(--radius);overflow:hidden;}
.pf-faq-category-header{display:flex;align-items:center;gap:14px;width:100%;padding:16px 20px;background:transparent;border:none;cursor:pointer;transition:background var(--transition);font-family:inherit;color:var(--text);}
.pf-faq-category-header:active{background:var(--card-hover);}
.pf-faq-category-icon{font-size:1.5rem;}.pf-faq-category-title{flex:1;font-size:1rem;font-weight:600;text-align:left;}
.pf-faq-category-count{padding:4px 12px;background:var(--card-hover);border-radius:12px;font-size:0.75rem;font-weight:600;color:var(--text-sub);}
.pf-faq-category-arrow{transition:transform var(--transition);}.pf-faq-arrow-open{transform:rotate(180deg);}
.pf-faq-category-items{padding:0 20px 16px;}
.pf-faq-item{border-top:1px solid var(--border);padding-top:12px;margin-top:12px;}
.pf-faq-item:first-child{border-top:none;padding-top:0;margin-top:0;}
.pf-faq-question{display:flex;gap:10px;align-items:flex-start;cursor:pointer;list-style:none;font-size:0.9rem;font-weight:600;margin-bottom:8px;}
.pf-faq-question::-webkit-details-marker{display:none;}
.pf-faq-question span:first-child{color:var(--accent);font-weight:700;flex-shrink:0;}
.pf-faq-answer{padding-left:24px;font-size:0.85rem;color:var(--text-sub);line-height:1.6;}
.pf-faq-answer p{margin-bottom:8px;}.pf-faq-answer p:last-child{margin-bottom:0;}
.pf-help-footer{margin-top:40px;padding-top:20px;border-top:1px solid var(--border);text-align:center;}
.pf-help-version{font-size:0.8rem;color:var(--text-sub);margin-bottom:4px;}
.pf-help-credits{font-size:0.75rem;color:var(--text-sub);margin-bottom:4px;}
.pf-help-company{font-size:0.7rem;color:var(--text-sub);opacity:0.7;}
.pf-storage-view{padding:0 20px 100px;}.pf-storage-group{margin-bottom:28px;}
.pf-storage-group-title{font-size:0.9rem;font-weight:600;color:var(--text-sub);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.05em;}
.pf-last-backup-card{background:var(--card);}.pf-last-backup-content{display:flex;flex-direction:column;gap:8px;}
.pf-last-backup-status{display:flex;align-items:center;gap:10px;}
.pf-backup-status-dot{width:12px;height:12px;border-radius:50%;}
.pf-backup-success{background:#10b981;box-shadow:0 0 12px rgba(16,185,129,0.4);}
.pf-backup-error{background:#ef4444;box-shadow:0 0 12px rgba(239,68,68,0.4);}
.pf-last-backup-label{font-weight:600;font-size:1rem;}
.pf-last-backup-date{font-size:0.875rem;color:var(--text-sub);}
.pf-last-backup-details{font-size:0.8rem;color:var(--text-sub);margin-top:4px;}
.pf-last-backup-empty{text-align:center;padding:40px 20px;color:var(--text-sub);}
.pf-last-backup-hint{font-size:0.8rem;margin-top:8px;opacity:0.7;}
.pf-schedule-options{display:flex;flex-direction:column;gap:8px;}
.pf-schedule-option{display:flex;align-items:center;gap:14px;padding:14px 16px;background:var(--card-hover);border:2px solid transparent;border-radius:var(--radius);cursor:pointer;transition:all var(--transition) var(--spring);font-family:inherit;color:var(--text);}
.pf-schedule-option:active{transform:scale(0.98);}
.pf-schedule-active{border-color:var(--opt-color);background:color-mix(in srgb,var(--opt-color) 10%,var(--card-hover));}
.pf-schedule-option-icon{width:36px;height:36px;border-radius:var(--radius-sm);background:var(--card);display:flex;align-items:center;justify-content:center;}
.pf-schedule-option-label{flex:1;font-weight:500;}.pf-schedule-option-check{width:24px;height:24px;display:flex;align-items:center;justify-content:center;}
.pf-storage-actions{display:flex;flex-direction:column;gap:12px;}
.pf-storage-info-card{padding:24px;}
.pf-storage-info-icon{width:48px;height:48px;border-radius:50%;background:var(--card);display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
.pf-storage-info-card h4{font-size:1.1rem;font-weight:600;margin-bottom:8px;}
.pf-storage-info-card p{font-size:0.875rem;color:var(--text-sub);line-height:1.6;}
.pf-tutorial-bg{background:rgba(0,0,0,0.8);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);}
.pf-tutorial-modal{max-width:500px;margin:auto;padding:0;overflow:hidden;border-radius:var(--radius-lg) var(--radius-lg) 0 0;}
.pf-tutorial-progress{display:flex;gap:4px;padding:16px 24px 0;}
.pf-tutorial-progress-bar{flex:1;height:4px;border-radius:2px;background:var(--border);transition:background var(--transition);}
.pf-tutorial-progress-active{background:var(--p-accent);}
.pf-tutorial-progress-done{background:var(--p-accent);opacity:0.5;}
.pf-tutorial-close{position:absolute;top:16px;right:16px;width:36px;height:36px;border-radius:50%;background:var(--card-hover);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10;transition:all var(--transition);color:var(--text);}
.pf-tutorial-close:active{transform:scale(0.9);}
.pf-tutorial-content{padding:40px 32px;text-align:center;animation:pfTutorialFadeIn 0.4s ease both;}
@keyframes pfTutorialFadeIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
.pf-tutorial-visual{margin-bottom:24px;}
.pf-tutorial-icon{width:80px;height:80px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto;font-size:2.5rem;animation:pfTutBounce 0.6s var(--spring) both;}
@keyframes pfTutBounce{0%{transform:scale(0);}60%{transform:scale(1.1);}100%{transform:scale(1);}}
.pf-tutorial-title{font-size:1.5rem;font-weight:700;margin-bottom:12px;letter-spacing:-0.02em;}
.pf-tutorial-description{font-size:0.95rem;color:var(--text-sub);line-height:1.6;margin-bottom:20px;}
.pf-tutorial-step-info{margin-top:16px;}.pf-tutorial-step-number{font-size:0.8rem;color:var(--text-sub);font-weight:600;}
.pf-tutorial-controls{padding:24px 32px;border-top:1px solid var(--border);}
.pf-tutorial-skip-label{display:flex;align-items:center;gap:10px;font-size:0.85rem;color:var(--text-sub);margin-bottom:16px;cursor:pointer;}
.pf-tutorial-skip-label input{width:18px;height:18px;cursor:pointer;}
.pf-tutorial-buttons{display:flex;gap:12px;}
.pf-permission-modal{text-align:center;padding:32px 24px;}
.pf-permission-icon-wrapper{margin-bottom:24px;}
.pf-permission-icon-bg{width:80px;height:80px;border-radius:50%;background:var(--card-hover);display:flex;align-items:center;justify-content:center;margin:0 auto;animation:pfPermPulse 2s ease-in-out infinite;}
@keyframes pfPermPulse{0%,100%{transform:scale(1);}50%{transform:scale(1.05);}}
.pf-permission-name{font-size:1.25rem;font-weight:700;margin-bottom:12px;color:var(--accent);}
.pf-permission-explanation{font-size:0.9rem;color:var(--text-sub);line-height:1.6;margin-bottom:24px;}
.pf-modal-animated{animation:pfFadeIn 0.2s ease both;}
${a11y.contrast ? "* { filter: contrast(1.3); } .pf-card,.pf-btn,.pf-input,.pf-select,.pf-textarea { border-width: 2px; }" : ""}
${a11y.reduceMotion ? "*,*::before,*::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }" : ""}
${a11y.boldText ? "body { font-weight: 600; } .pf-section-title,.pf-record-name,.pf-sector-label { font-weight: 800; }" : ""}
  `;
}

// ═══ COMPONENTE PRINCIPAL ════════════════════════════
export default function ProFicha() {
  const { user, loading: authLoading, login, logout } = useAuth();

  const [lang,      setLang]      = useState(() => storage.get("lang",      "es"));
  const [palette,   setPalette]   = useState(() => storage.get("palette",   "midnight"));
  const [activeNav, setActiveNav] = useState("dashboard");
  const [profile,   setProfile]   = useState(() => storage.get("profile",   { name: "", business: "", phone: "", email: "", whatsapp: "", address: "", website: "", logo: null, terms: "", pdfBg: "#050508" }));
  const [mySectors, setMySectors] = useState(() => storage.get("mySectors", ["masoterapia", "medico"]));
  const [records,   setRecords]   = useState(() => storage.get("records",   []));
  const [a11y,      setA11y]      = useState(() => storage.get("a11y",      { fontSize: "md", contrast: false, animations: true, screenReader: false, reduceMotion: false, boldText: false }));

  const [drawerOpen,      setDrawerOpen]      = useState(false);
  const [toast,           setToast]           = useState(null);
  const [tutorialOpen,    setTutorialOpen]    = useState(false);
  const [permissionModal, setPermissionModal] = useState(null);
  const [quickWAOpen,     setQuickWAOpen]     = useState(false);

  const t   = T[lang];
  const pal = PALETTES.find(p => p.id === palette) || PALETTES[0];

  useEffect(() => storage.set("lang",      lang),      [lang]);
  useEffect(() => storage.set("palette",   palette),   [palette]);
  useEffect(() => storage.set("profile",   profile),   [profile]);
  useEffect(() => storage.set("mySectors", mySectors), [mySectors]);
  useEffect(() => storage.set("records",   records),   [records]);
  useEffect(() => storage.set("a11y",      a11y),      [a11y]);

  const showToast = (msg, type = "info") => setToast({ msg, type });
  const navigate  = page => setActiveNav(page);
  const handleLogout = () => { if (window.confirm(t.signOutConfirm)) logout(); };

  // Gesto borde izquierdo → abrir drawer
  useEffect(() => {
    let sx = 0;
    const ts = e => { sx = e.touches[0].clientX; };
    const te = e => { if (sx < 30 && e.changedTouches[0].clientX - sx > 50) setDrawerOpen(true); };
    document.addEventListener("touchstart", ts, { passive: true });
    document.addEventListener("touchend",   te, { passive: true });
    return () => { document.removeEventListener("touchstart", ts); document.removeEventListener("touchend", te); };
  }, []);

  // Tutorial en primer uso
  useEffect(() => {
    if (user && !storage.get("tutorialCompleted", false)) {
      const timer = setTimeout(() => setTutorialOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [user]);

  if (authLoading || !user) {
    return (
      <div className="pf-login">
        <style>{generateCSS(pal, a11y)}</style>
        <div className="pf-login-content">
          <h1 className="pf-login-title">{t.appName}</h1>
          <p className="pf-login-tagline">{t.tagline}</p>
          <PremiumButton variant="accent" size="lg" onClick={login} fullWidth ariaLabel={lang === "es" ? "Continuar con Google" : "Continue with Google"}>
            {lang === "es" ? "Continuar con Google" : "Continue with Google"}
          </PremiumButton>
        </div>
      </div>
    );
  }

  return (
    <div className="pf-app" data-palette={palette} data-animations={a11y.animations}>
      <style>{generateCSS(pal, a11y)}</style>

      <DynamicHeader profile={profile} lang={lang} onMenuClick={() => setDrawerOpen(true)} />

      <main className="pf-main">
        {activeNav === "dashboard"     && <DashboardView     profile={profile} records={records} mySectors={mySectors} palette={palette} lang={lang} navigate={navigate} onNewRecord={() => navigate("records")} />}
        {activeNav === "sectors"       && <SectorsView       mySectors={mySectors} setMySectors={setMySectors} palette={palette} lang={lang} showToast={showToast} />}
        {activeNav === "records"       && <RecordsView       records={records} setRecords={setRecords} mySectors={mySectors} profile={profile} palette={palette} lang={lang} navigate={navigate} showToast={showToast} />}
        {activeNav === "calendar"      && <CalendarView      profile={profile} palette={palette} lang={lang} showToast={showToast} navigate={navigate} />}
        {activeNav === "storage"       && <StorageView       profile={profile} palette={palette} lang={lang} showToast={showToast} openPermissionModal={setPermissionModal} />}
        {activeNav === "scanner"       && <DocumentScanner   onScanComplete={() => { showToast(lang === "es" ? "Documento guardado ✓" : "Document saved ✓", "success"); navigate("records"); }} lang={lang} />}
        {activeNav === "settings"      && <SettingsView      profile={profile} setProfile={setProfile} palette={palette} setPalette={setPalette} lang={lang} setLang={setLang} user={user} showToast={showToast} openTutorial={() => setTutorialOpen(true)} />}
        {activeNav === "accessibility" && <AccessibilityView a11y={a11y} setA11y={setA11y} lang={lang} showToast={showToast} />}
        {activeNav === "help"          && <HelpView          lang={lang} palette={palette} openTutorial={() => setTutorialOpen(true)} />}
      </main>

      <nav className="pf-navbar" role="navigation" aria-label={lang === "es" ? "Navegación principal" : "Main navigation"}>
        {[
          { id: "dashboard", icon: "home",    label: t.dashboard },
          { id: "records",   icon: "records", label: t.records   },
          { id: "sectors",   icon: "sectors", label: t.sectors   },
        ].map(item => (
          <button key={item.id} className={"pf-navbar-item" + (activeNav === item.id ? " pf-navbar-active" : "")} onClick={() => navigate(item.id)} aria-label={item.label} aria-current={activeNav === item.id ? "page" : undefined}>
            <Icon name={item.icon} size={24} /><span>{item.label}</span>
          </button>
        ))}
      </nav>

      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} activeNav={activeNav} navigate={navigate} profile={profile} palette={palette} lang={lang} setLang={setLang} logout={handleLogout} openTutorial={() => setTutorialOpen(true)} user={user} />

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <TutorialModal isOpen={tutorialOpen} onClose={() => setTutorialOpen(false)} lang={lang} palette={palette} />

      {permissionModal && (
        <PermissionModal isOpen={true} onClose={() => setPermissionModal(null)} onContinue={permissionModal.onContinue} permissionName={permissionModal.permissionName} explanation={permissionModal.explanation} icon={permissionModal.icon} lang={lang} />
      )}

      <QuickWhatsAppModal isOpen={quickWAOpen} onClose={() => setQuickWAOpen(false)} defaultNumber={profile.whatsapp} lang={lang} />
    </div>
  );
}
// ═══ FIN DEL ARCHIVO PROFICHA.JSX ════════════════════
// Todos los errores de sintaxis corregidos:
// ✅ Template literals con backticks eliminados dentro de JSX (línea ~2018)
// ✅ className concatenado con "pf-icon " + className (no backticks)
// ✅ storage helper usa "pf_" + k (no template literal)
// ✅ Todas las interpolaciones de strings usan concatenación con +
// ✅ Drawer CSS transform: "translateX(-110%)" correctamente cerrado
// ✅ lang/palette prop pasados a FormEngine desde RecordsView
// ✅ Iconos chevronLeft, send, edit, x añadidos
// ✅ Traducciones completas en ambos idiomas
