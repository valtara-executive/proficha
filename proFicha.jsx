// ═══════════════════════════════════════════════════════════════
// PROFICHA v4.0 — PREMIUM EDITION (Apple Music/TV Inspired)
// Constructor: Qwen | Arquitecto: Angel
// Bloque 1 de 4: Estructura base, Drawer, Dashboard, Sectores
// ═══════════════════════════════════════════════════════════════

// ═══ IMPORTS Y SETUP ══════════════════════════════════════════
import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "./src/hooks/useAuth.js";

// ── Helpers de almacenamiento ──────────────────────────────────
const storage = {
  get: (k, d) => {
    try {
      const v = localStorage.getItem(`pf_${k}`);
      return v ? JSON.parse(v) : d;
    } catch {
      return d;
    }
  },
  set: (k, v) => {
    try {
      localStorage.setItem(`pf_${k}`, JSON.stringify(v));
    } catch (e) {
      console.warn("Storage error:", e);
    }
  },
};

const genId = () => Math.random().toString(36).substr(2, 9);
const today = () =>
  new Date().toLocaleDateString("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
const todayKey = () => new Date().toDateString();

// ═══ BLOQUE DE DATOS: SECTORES PROFESIONALES ══════════════════
// 32 sectores con colores sólidos vividos (no degradados simples)
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
  salud: { es: "Salud Clínica", en: "Clinical Health", color: "#ef4444", icon: "🩺" },
  terapias: { es: "Terapias y Bienestar", en: "Therapies & Wellness", color: "#8b5cf6", icon: "✨" },
  estetica: { es: "Estética y Belleza", en: "Aesthetics & Beauty", color: "#ec4899", icon: "💄" },
  arte: { es: "Arte Corporal", en: "Body Art", color: "#64748b", icon: "🎨" },
  deporte: { es: "Deporte y Movimiento", en: "Sports & Movement", color: "#f97316", icon: "🏋️" },
  otros: { es: "Otros Profesionales", en: "Other Professionals", color: "#10b981", icon: "🌟" },
};

// ═══ PALETAS PREMIUM VIVIDAS ═══════════════════════════════════
// Colores sólidos y difuminados predominantes, estilo Apple Music
const PALETTES = [
  {
    id: "midnight",
    name: { es: "Medianoche", en: "Midnight" },
    bg: "#0a0a0f",
    surface: "#13131a",
    card: "#1a1a2e",
    cardHover: "#222238",
    text: "#ffffff",
    textSub: "#94a3b8",
    accent: "#6366f1",
    accentLight: "#818cf8",
    border: "rgba(255,255,255,0.08)",
    overlay: "rgba(0,0,0,0.6)",
    glow: "rgba(99,102,241,0.3)",
    shadow: "rgba(0,0,0,0.5)",
  },
  {
    id: "ocean",
    name: { es: "Océano Profundo", en: "Deep Ocean" },
    bg: "#0c1a2e",
    surface: "#112240",
    card: "#1a3a5c",
    cardHover: "#234a6e",
    text: "#e6f1ff",
    textSub: "#8892b0",
    accent: "#64ffda",
    accentLight: "#a7f3d0",
    border: "rgba(100,255,218,0.1)",
    overlay: "rgba(12,26,46,0.7)",
    glow: "rgba(100,255,218,0.3)",
    shadow: "rgba(0,0,0,0.5)",
  },
  {
    id: "sunset",
    name: { es: "Atardecer", en: "Sunset" },
    bg: "#1a0a0a",
    surface: "#2d1010",
    card: "#4a1c1c",
    cardHover: "#5c2424",
    text: "#fff5e6",
    textSub: "#fca5a5",
    accent: "#fb923c",
    accentLight: "#fdba74",
    border: "rgba(251,146,60,0.15)",
    overlay: "rgba(26,10,10,0.7)",
    glow: "rgba(251,146,60,0.3)",
    shadow: "rgba(0,0,0,0.5)",
  },
  {
    id: "forest",
    name: { es: "Bosque", en: "Forest" },
    bg: "#0a1a0a",
    surface: "#122212",
    card: "#1a3a1a",
    cardHover: "#244a24",
    text: "#d4edda",
    textSub: "#86efac",
    accent: "#4ade80",
    accentLight: "#86efac",
    border: "rgba(74,222,128,0.12)",
    overlay: "rgba(10,26,10,0.7)",
    glow: "rgba(74,222,128,0.3)",
    shadow: "rgba(0,0,0,0.5)",
  },
  {
    id: "lavender",
    name: { es: "Lavanda", en: "Lavender" },
    bg: "#0f0a1a",
    surface: "#1e1030",
    card: "#2e1a4a",
    cardHover: "#3a2458",
    text: "#ede9fe",
    textSub: "#c4b5fd",
    accent: "#a78bfa",
    accentLight: "#c4b5fd",
    border: "rgba(167,139,250,0.12)",
    overlay: "rgba(15,10,26,0.7)",
    glow: "rgba(167,139,250,0.3)",
    shadow: "rgba(0,0,0,0.5)",
  },
  {
    id: "rose",
    name: { es: "Rosa Elegante", en: "Elegant Rose" },
    bg: "#1a0a10",
    surface: "#2d1020",
    card: "#4a1a2e",
    cardHover: "#5a243a",
    text: "#fce7f3",
    textSub: "#f9a8d4",
    accent: "#f472b6",
    accentLight: "#f9a8d4",
    border: "rgba(244,114,182,0.15)",
    overlay: "rgba(26,10,16,0.7)",
    glow: "rgba(244,114,182,0.3)",
    shadow: "rgba(0,0,0,0.5)",
  },
  {
    id: "gold",
    name: { es: "Dorado Luxury", en: "Luxury Gold" },
    bg: "#0f0e07",
    surface: "#1c1a05",
    card: "#3d3410",
    cardHover: "#4a4018",
    text: "#fefce8",
    textSub: "#ca8a04",
    accent: "#eab308",
    accentLight: "#facc15",
    border: "rgba(234,179,8,0.15)",
    overlay: "rgba(15,14,7,0.7)",
    glow: "rgba(234,179,8,0.3)",
    shadow: "rgba(0,0,0,0.5)",
  },
  {
    id: "arctic",
    name: { es: "Ártico Claro", en: "Arctic Light" },
    bg: "#f8fafc",
    surface: "#ffffff",
    card: "#ffffff",
    cardHover: "#f1f5f9",
    text: "#0f172a",
    textSub: "#64748b",
    accent: "#6366f1",
    accentLight: "#818cf8",
    border: "rgba(0,0,0,0.08)",
    overlay: "rgba(248,250,252,0.8)",
    glow: "rgba(99,102,241,0.2)",
    shadow: "rgba(0,0,0,0.08)",
  },
];

// ═══ TRADUCCIONES COMPLETAS ════════════════════════════════════
const T = {
  es: {
    appName: "ProFicha",
    tagline: "Tu expediente profesional, en tu mano",
    // Saludos dinámicos
    greetingMorning: "Buenos días",
    greetingNoon: "Buen mediodía",
    greetingAfternoon: "Buenas tardes",
    greetingEvening: "Buenas noches",
    greetingLate: "Hola",
    defaultName: "Profesional",
    // Navegación drawer
    menu: "Menú",
    dashboard: "Inicio",
    sectors: "Sectores",
    records: "Expedientes",
    calendar: "Calendario",
    storage: "Respaldo",
    scanner: "Escanear",
    settings: "Ajustes",
    accessibility: "Accesibilidad",
    help: "Ayuda",
    signOut: "Cerrar sesión",
    signOutConfirm: "¿Seguro que deseas cerrar sesión? Tus datos permanecen guardados.",
    // Dashboard
    quickActions: "Acciones Rápidas",
    newRecord: "Nuevo Expediente",
    recentRecords: "Expedientes Recientes",
    noRecords: "Sin expedientes aún",
    totalRecords: "Total",
    todayRecords: "Hoy",
    activeSectors: "Activos",
    addSector: "Agregar Sector",
    mySectors: "Mis Sectores",
    // Sectores
    allSectors: "Todos los Sectores",
    searchSector: "Buscar sector...",
    noSectors: "Aún no tienes sectores activos",
    tapToAdd: "Toca para agregar",
    sectorAdded: "Sector agregado",
    sectorRemoved: "Sector eliminado",
    // Formularios
    profile: "Perfil Profesional",
    businessName: "Nombre del Negocio",
    phone: "Teléfono",
    email: "Correo",
    whatsapp: "WhatsApp",
    address: "Dirección",
    website: "Sitio web",
    logo: "Logo",
    uploadLogo: "Subir Logo",
    removeLogo: "Quitar Logo",
    // Acciones
    save: "Guardar",
    saved: "Guardado",
    cancel: "Cancelar",
    confirm: "Confirmar",
    close: "Cerrar",
    back: "Volver",
    next: "Siguiente",
    finish: "Finalizar",
    delete: "Eliminar",
    edit: "Editar",
    view: "Ver",
    exportPDF: "Exportar PDF",
    shareWhatsapp: "Compartir WhatsApp",
    // Ayuda
    faqTitle: "Preguntas Frecuentes",
    faqSearch: "Buscar en ayuda...",
    noResults: "Sin resultados",
    contactSupport: "Contactar Soporte",
    // Accesibilidad
    fontSize: "Tamaño de Fuente",
    fontSizeDesc: "Ajusta el tamaño del texto en toda la app",
    contrast: "Alto Contraste",
    contrastDesc: "Mejora la visibilidad del texto",
    animations: "Reducir Animaciones",
    animationsDesc: "Desactiva efectos de movimiento",
    screenReader: "Lector de Pantalla",
    screenReaderDesc: "Optimiza para TalkBack",
    reduceMotion: "Reducir Movimiento",
    boldText: "Texto en Negrita",
    // Otros
    version: "ProFicha v4.0 Premium",
    madeWith: "Hecho con ❤️ para profesionales",
    resetApp: "Restablecer App",
    resetConfirm: "¿Eliminar todos los datos?",
    // Estados
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    info: "Información",
  },
  en: {
    appName: "ProFicha",
    tagline: "Your professional record, in your hand",
    greetingMorning: "Good morning",
    greetingNoon: "Good noon",
    greetingAfternoon: "Good afternoon",
    greetingEvening: "Good evening",
    greetingLate: "Hello",
    defaultName: "Professional",
    menu: "Menu",
    dashboard: "Home",
    sectors: "Sectors",
    records: "Records",
    calendar: "Calendar",
    storage: "Backup",
    scanner: "Scan",
    settings: "Settings",
    accessibility: "Accessibility",
    help: "Help",
    signOut: "Sign out",
    signOutConfirm: "Are you sure you want to sign out? Your data remains saved.",
    quickActions: "Quick Actions",
    newRecord: "New Record",
    recentRecords: "Recent Records",
    noRecords: "No records yet",
    totalRecords: "Total",
    todayRecords: "Today",
    activeSectors: "Active",
    addSector: "Add Sector",
    mySectors: "My Sectors",
    allSectors: "All Sectors",
    searchSector: "Search sector...",
    noSectors: "No active sectors yet",
    tapToAdd: "Tap to add",
    sectorAdded: "Sector added",
    sectorRemoved: "Sector removed",
    profile: "Professional Profile",
    businessName: "Business Name",
    phone: "Phone",
    email: "Email",
    whatsapp: "WhatsApp",
    address: "Address",
    website: "Website",
    logo: "Logo",
    uploadLogo: "Upload Logo",
    removeLogo: "Remove Logo",
    save: "Save",
    saved: "Saved",
    cancel: "Cancel",
    confirm: "Confirm",
    close: "Close",
    back: "Back",
    next: "Next",
    finish: "Finish",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    exportPDF: "Export PDF",
    shareWhatsapp: "Share WhatsApp",
    faqTitle: "Frequently Asked Questions",
    faqSearch: "Search help...",
    noResults: "No results",
    contactSupport: "Contact Support",
    fontSize: "Font Size",
    fontSizeDesc: "Adjust text size throughout the app",
    contrast: "High Contrast",
    contrastDesc: "Improve text visibility",
    animations: "Reduce Animations",
    animationsDesc: "Disable motion effects",
    screenReader: "Screen Reader",
    screenReaderDesc: "Optimize for TalkBack",
    reduceMotion: "Reduce Motion",
    boldText: "Bold Text",
    version: "ProFicha v4.0 Premium",
    madeWith: "Made with ❤️ for professionals",
    resetApp: "Reset App",
    resetConfirm: "Delete all data?",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    info: "Info",
  },
};

// ═══ SALUDO DINÁMICO ═══════════════════════════════════════════
const getGreeting = (name, lang) => {
  const h = new Date().getHours();
  const firstName = name ? name.split(" ")[0] : T[lang].defaultName;
  let greeting = T[lang].greetingLate;

  if (h >= 5 && h < 12) greeting = T[lang].greetingMorning;
  else if (h >= 12 && h < 14) greeting = T[lang].greetingNoon;
  else if (h >= 14 && h < 19) greeting = T[lang].greetingAfternoon;
  else if (h >= 19 && h < 22) greeting = T[lang].greetingEvening;

  return `${greeting}, ${firstName}`;
};

// ═══ ICONOS SVG ANIMADOS ═══════════════════════════════════════
// 35 iconos con animaciones de entrada y microinteracciones
const Icon = ({ name, size = 24, color = "currentColor", className = "" }) => {
  const icons = {
    home: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    sectors: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    records: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    calendar: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    storage: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    scanner: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <line x1="7" y1="12" x2="17" y2="12" />
      </svg>
    ),
    settings: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    accessibility: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
        <circle cx="12" cy="8" r="1" fill={color} />
      </svg>
    ),
    help: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    menu: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
    close: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    plus: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    minus: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    check: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    logout: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    ),
    search: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    trash: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
    pdf: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 15v-2h2a1 1 0 1 0 0-2H9v6" />
      </svg>
    ),
    whatsapp: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={`pf-icon ${className}`}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
    chevronRight: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
    chevronDown: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <polyline points="6 9 12 15 18 9" />
      </svg>
    ),
    user: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    globe: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    sparkles: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
      </svg>
    ),
    upload: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    download: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    star: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={`pf-icon ${className}`}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  };

  return icons[name] || null;
};

// ═══ COMPONENTE: BOTÓN PREMIUM ═════════════════════════════════
// Sistema de estados: normal, hover, active, disabled, loading
const PremiumButton = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
  ariaLabel,
}) => {
  const baseClass = "pf-btn";
  const variantClass = `pf-btn-${variant}`;
  const sizeClass = `pf-btn-${size}`;
  const stateClass = loading ? "pf-btn-loading" : disabled ? "pf-btn-disabled" : "";
  const widthClass = fullWidth ? "pf-btn-full" : "";

  return (
    <button
      className={`${baseClass} ${variantClass} ${sizeClass} ${stateClass} ${widthClass} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
    >
      {loading ? (
        <span className="pf-spinner" aria-hidden="true" />
      ) : (
        <>
          {icon && <span className="pf-btn-icon">{icon}</span>}
          <span className="pf-btn-text">{children}</span>
          {iconRight && <span className="pf-btn-icon-right">{iconRight}</span>}
        </>
      )}
    </button>
  );
};

// ═══ COMPONENTE: CARD PREMIUM ══════════════════════════════════
const PremiumCard = ({
  children,
  className = "",
  onClick,
  hoverable = false,
  ariaLabel,
  padding = "md",
}) => {
  const paddingClass = `pf-card-${padding}`;
  const hoverClass = hoverable ? "pf-card-hoverable" : "";

  return (
    <div
      className={`pf-card ${paddingClass} ${hoverClass} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
};

// ═══ COMPONENTE: TOAST NOTIFICATION ════════════════════════════
const Toast = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const iconMap = {
    success: <Icon name="check" size={20} color="#10b981" />,
    error: <Icon name="close" size={20} color="#ef4444" />,
    info: <Icon name="star" size={20} color="#6366f1" />,
  };

  return (
    <div className={`pf-toast pf-toast-${type}`} role="alert" aria-live="polite">
      <span className="pf-toast-icon">{iconMap[type]}</span>
      <span className="pf-toast-message">{message}</span>
    </div>
  );
};

// ═══ COMPONENTE: DRAWER LATERAL ════════════════════════════════
// Menú deslizante con gestos y foto de perfil con difuminado
const Drawer = ({
  isOpen,
  onClose,
  activeNav,
  navigate,
  profile,
  palette,
  lang,
  setLang,
  logout,
  openTutorial,
}) => {
  const t = T[lang];
  const pal = PALETTES.find((p) => p.id === palette) || PALETTES[0];
  const drawerRef = useRef(null);
  const startX = useRef(0);

  // Navegación por gestos: deslizar hacia la izquierda para cerrar
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const diff = startX.current - e.touches[0].clientX;
    if (diff > 80) {
      onClose();
    }
  };

  const drawerItems = [
    { id: "dashboard", icon: "home", label: t.dashboard, color: "#6366f1" },
    { id: "sectors", icon: "sectors", label: t.sectors, color: "#8b5cf6" },
    { id: "records", icon: "records", label: t.records, color: "#10b981" },
    { id: "calendar", icon: "calendar", label: t.calendar, color: "#f59e0b" },
    { id: "storage", icon: "storage", label: t.storage, color: "#3b82f6" },
    { id: "scanner", icon: "scanner", label: t.scanner, color: "#ec4899" },
  ];

  const bottomItems = [
    { id: "settings", icon: "settings", label: t.settings, color: "#64748b" },
    { id: "accessibility", icon: "accessibility", label: t.accessibility, color: "#06b6d4" },
    { id: "help", icon: "help", label: t.help, color: "#a855f7" },
  ];

  return (
    <>
      {/* Overlay con blur */}
      <div
        className={`pf-drawer-overlay ${isOpen ? "pf-drawer-open" : ""}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Panel del drawer */}
      <aside
        ref={drawerRef}
        className={`pf-drawer ${isOpen ? "pf-drawer-open" : ""}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        role="navigation"
        aria-label={t.menu}
      >
        {/* Header del drawer con foto y difuminado */}
        <div className="pf-drawer-header">
          <div
            className="pf-drawer-header-bg"
            style={{ background: pal.accent }}
          />
          <div className="pf-drawer-header-content">
            <div className="pf-drawer-avatar">
              {profile.logo ? (
                <img src={profile.logo} alt="Perfil" />
              ) : (
                <Icon name="user" size={32} color={pal.text} />
              )}
            </div>
            <div className="pf-drawer-user-info">
              <h2 className="pf-drawer-user-name">
                {profile.name || profile.business || t.defaultName}
              </h2>
              <p className="pf-drawer-user-role">
                {profile.business || t.appName}
              </p>
            </div>
            <button
              className="pf-drawer-close"
              onClick={onClose}
              aria-label={t.close}
            >
              <Icon name="close" size={24} color={pal.text} />
            </button>
          </div>
        </div>

        {/* Sección de navegación principal */}
        <div className="pf-drawer-section">
          {drawerItems.map((item) => (
            <button
              key={item.id}
              className={`pf-drawer-item ${activeNav === item.id ? "pf-drawer-item-active" : ""}`}
              onClick={() => {
                navigate(item.id);
                onClose();
              }}
              aria-label={item.label}
              aria-current={activeNav === item.id ? "page" : undefined}
              style={{
                "--item-color": item.color,
              }}
            >
              <span className="pf-drawer-item-icon" style={{ color: item.color }}>
                <Icon name={item.icon} size={22} />
              </span>
              <span className="pf-drawer-item-label">{item.label}</span>
              {activeNav === item.id && (
                <span className="pf-drawer-item-indicator" />
              )}
            </button>
          ))}
        </div>

        {/* Separador */}
        <div className="pf-drawer-divider" />

        {/* Sección de configuración */}
        <div className="pf-drawer-section">
          {bottomItems.map((item) => (
            <button
              key={item.id}
              className={`pf-drawer-item ${activeNav === item.id ? "pf-drawer-item-active" : ""}`}
              onClick={() => {
                navigate(item.id);
                onClose();
              }}
              aria-label={item.label}
              aria-current={activeNav === item.id ? "page" : undefined}
              style={{
                "--item-color": item.color,
              }}
            >
              <span className="pf-drawer-item-icon" style={{ color: item.color }}>
                <Icon name={item.icon} size={22} />
              </span>
              <span className="pf-drawer-item-label">{item.label}</span>
              {activeNav === item.id && (
                <span className="pf-drawer-item-indicator" />
              )}
            </button>
          ))}

          {/* Selector de idioma */}
          <button
            className="pf-drawer-item"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
          >
            <span className="pf-drawer-item-icon" style={{ color: "#06b6d4" }}>
              <Icon name="globe" size={22} />
            </span>
            <span className="pf-drawer-item-label">
              {lang === "es" ? "English" : "Español"}
            </span>
          </button>

          {/* Tutorial */}
          <button
            className="pf-drawer-item"
            onClick={() => {
              openTutorial();
              onClose();
            }}
            aria-label={t.tutorialTitle || "Tutorial"}
          >
            <span className="pf-drawer-item-icon" style={{ color: "#eab308" }}>
              <Icon name="sparkles" size={22} />
            </span>
            <span className="pf-drawer-item-label">
              {lang === "es" ? "Tutorial" : "Tutorial"}
            </span>
          </button>
        </div>

        {/* Footer con cerrar sesión */}
        <div className="pf-drawer-footer">
          <button
            className="pf-drawer-logout"
            onClick={logout}
            aria-label={t.signOut}
          >
            <Icon name="logout" size={20} color="#ef4444" />
            <span>{t.signOut}</span>
          </button>
          <div className="pf-drawer-version">{t.version}</div>
        </div>
      </aside>
    </>
  );
};

// ═══ COMPONENTE: HEADER DINÁMICO ═══════════════════════════════
// Muestra "ProFicha" al inicio, luego cambia al saludo personalizado
const DynamicHeader = ({ profile, lang, onMenuClick }) => {
  const [showAppName, setShowAppName] = useState(true);
  const t = T[lang];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAppName(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const greeting = getGreeting(profile.name, lang);

  return (
    <header className="pf-header">
      <button
        className="pf-header-menu"
        onClick={onMenuClick}
        aria-label={t.menu}
      >
        <Icon name="menu" size={24} />
      </button>

      <div className="pf-header-title">
        {showAppName ? (
          <h1 className="pf-header-appname pf-fade-in">{t.appName}</h1>
        ) : (
          <h1 className="pf-header-greeting pf-fade-in">{greeting}</h1>
        )}
      </div>

      <div className="pf-header-spacer" />
    </header>
  );
};

// ═══ COMPONENTE: DASHBOARD ═════════════════════════════════════
// Feed dinámico que se adapta a las categorías activas
const DashboardView = ({
  profile,
  records,
  mySectors,
  palette,
  lang,
  navigate,
  onNewRecord,
}) => {
  const t = T[lang];
  const pal = PALETTES.find((p) => p.id === palette) || PALETTES[0];
  const todayCount = records.filter((r) => r.dateKey === todayKey()).length;
  const recent = [...records].sort((a, b) => b.ts - a.ts).slice(0, 5);

  // Obtener categorías activas basadas en sectores seleccionados
  const activeCategories = [...new Set(mySectors.map((id) => SECTORS.find((s) => s.id === id)?.category).filter(Boolean))];

  return (
    <div className="pf-view pf-dashboard">
      {/* Estadísticas rápidas */}
      <div className="pf-stats-grid">
        <PremiumCard className="pf-stat-card" padding="sm">
          <div className="pf-stat-value">{records.length}</div>
          <div className="pf-stat-label">{t.totalRecords}</div>
        </PremiumCard>
        <PremiumCard className="pf-stat-card" padding="sm">
          <div className="pf-stat-value">{todayCount}</div>
          <div className="pf-stat-label">{t.todayRecords}</div>
        </PremiumCard>
        <PremiumCard className="pf-stat-card" padding="sm">
          <div className="pf-stat-value">{mySectors.length}</div>
          <div className="pf-stat-label">{t.activeSectors}</div>
        </PremiumCard>
      </div>

      {/* Acciones rápidas */}
      <div className="pf-section">
        <h2 className="pf-section-title">{t.quickActions}</h2>
        <div className="pf-quick-actions">
          <PremiumButton
            variant="accent"
            size="lg"
            icon={<Icon name="plus" size={20} />}
            onClick={onNewRecord}
            fullWidth
            ariaLabel={t.newRecord}
          >
            {t.newRecord}
          </PremiumButton>
        </div>
      </div>

      {/* Feed dinámico por categorías activas */}
      {activeCategories.length > 0 && (
        <div className="pf-section">
          <h2 className="pf-section-title">{t.mySectors}</h2>
          <div className="pf-category-feed">
            {activeCategories.map((catId, idx) => {
              const cat = CATEGORIES[catId];
              if (!cat) return null;
              const catSectors = mySectors
                .map((id) => SECTORS.find((s) => s.id === id))
                .filter((s) => s?.category === catId);

              return (
                <PremiumCard
                  key={catId}
                  className="pf-category-card pf-stagger-in"
                  style={{
                    "--stagger-delay": `${idx * 0.1}s`,
                    "--cat-color": cat.color,
                  }}
                  hoverable
                >
                  <div className="pf-category-header">
                    <span className="pf-category-icon">{cat.icon}</span>
                    <h3 className="pf-category-name">{cat[lang]}</h3>
                    <span className="pf-category-count">{catSectors.length}</span>
                  </div>
                  <div className="pf-category-sectors">
                    {catSectors.slice(0, 3).map((sector) => (
                      <div key={sector.id} className="pf-mini-sector">
                        <span>{sector.icon}</span>
                        <span>{lang === "es" ? sector.label : sector.label_en}</span>
                      </div>
                    ))}
                    {catSectors.length > 3 && (
                      <div className="pf-mini-sector pf-mini-more">
                        +{catSectors.length - 3}
                      </div>
                    )}
                  </div>
                </PremiumCard>
              );
            })}
          </div>
        </div>
      )}

      {/* Expedientes recientes */}
      <div className="pf-section">
        <h2 className="pf-section-title">{t.recentRecords}</h2>
        {recent.length === 0 ? (
          <PremiumCard className="pf-empty-card">
            <div className="pf-empty-icon">📋</div>
            <p className="pf-empty-text">{t.noRecords}</p>
          </PremiumCard>
        ) : (
          <div className="pf-records-list">
            {recent.map((record, idx) => {
              const sector = SECTORS.find((s) => s.id === record.sectorId);
              return (
                <PremiumCard
                  key={record.id}
                  className="pf-record-item pf-stagger-in"
                  style={{ "--stagger-delay": `${idx * 0.05}s` }}
                  hoverable
                  padding="sm"
                >
                  <div className="pf-record-icon" style={{ background: sector?.color + "22" }}>
                    {sector?.icon || "📋"}
                  </div>
                  <div className="pf-record-info">
                    <div className="pf-record-name">{record.patientName}</div>
                    <div className="pf-record-meta">
                      {sector ? (lang === "es" ? sector.label : sector.label_en) : ""} · {record.date}
                    </div>
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

// ═══ COMPONENTE: VISTA DE SECTORES ═════════════════════════════
// Con animaciones al agregar/quitar categorías
const SectorsView = ({
  mySectors,
  setMySectors,
  palette,
  lang,
  showToast,
}) => {
  const t = T[lang];
  const pal = PALETTES.find((p) => p.id === palette) || PALETTES[0];
  const [search, setSearch] = useState("");
  const [animatingSectors, setAnimatingSectors] = useState({});

  const addSector = (id) => {
    if (!mySectors.includes(id)) {
      setAnimatingSectors((prev) => ({ ...prev, [id]: "adding" }));
      setTimeout(() => {
        setMySectors((prev) => [...prev, id]);
        setAnimatingSectors((prev) => ({ ...prev, [id]: null }));
        showToast(t.sectorAdded, "success");
      }, 300);
    }
  };

  const removeSector = (id) => {
    setAnimatingSectors((prev) => ({ ...prev, [id]: "removing" }));
    setTimeout(() => {
      setMySectors((prev) => prev.filter((s) => s !== id));
      setAnimatingSectors((prev) => ({ ...prev, [id]: null }));
      showToast(t.sectorRemoved, "info");
    }, 300);
  };

  const filteredSectors = SECTORS.filter(
    (s) =>
      search === "" ||
      s.label.toLowerCase().includes(search.toLowerCase()) ||
      s.label_en.toLowerCase().includes(search.toLowerCase())
  );

  const groupedByCategory = Object.entries(CATEGORIES).map(([catId, cat]) => ({
    id: catId,
    ...cat,
    sectors: filteredSectors.filter((s) => s.category === catId),
  })).filter((g) => g.sectors.length > 0);

  return (
    <div className="pf-view pf-sectors-view">
      <div className="pf-section">
        <h2 className="pf-section-title">{t.allSectors}</h2>

        {/* Búsqueda */}
        <div className="pf-search-box">
          <Icon name="search" size={20} className="pf-search-icon" />
          <input
            type="text"
            className="pf-search-input"
            placeholder={t.searchSector}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label={t.searchSector}
          />
          {search && (
            <button
              className="pf-search-clear"
              onClick={() => setSearch("")}
              aria-label={t.close}
            >
              <Icon name="close" size={16} />
            </button>
          )}
        </div>

        {/* Mis sectores activos */}
        {mySectors.length > 0 && (
          <div className="pf-my-sectors">
            <h3 className="pf-subsection-title">{t.mySectors}</h3>
            <div className="pf-sectors-grid">
              {mySectors.map((sid) => {
                const sector = SECTORS.find((s) => s.id === sid);
                if (!sector) return null;
                const animState = animatingSectors[sid];
                return (
                  <button
                    key={sid}
                    className={`pf-sector-card pf-sector-active ${animState === "removing" ? "pf-sector-removing" : ""}`}
                    onClick={() => removeSector(sid)}
                    aria-label={`${t.delete} ${lang === "es" ? sector.label : sector.label_en}`}
                    style={{
                      "--sector-color": sector.color,
                    }}
                  >
                    <span className="pf-sector-icon">{sector.icon}</span>
                    <span className="pf-sector-label">
                      {lang === "es" ? sector.label : sector.label_en}
                    </span>
                    <span className="pf-sector-badge">
                      <Icon name="check" size={12} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Todos los sectores por categoría */}
        {groupedByCategory.map((group, groupIdx) => (
          <div key={group.id} className="pf-category-group pf-stagger-in" style={{ "--stagger-delay": `${groupIdx * 0.1}s` }}>
            <div className="pf-category-title">
              <span className="pf-category-title-icon" style={{ color: group.color }}>
                {group.icon}
              </span>
              <span>{group[lang]}</span>
            </div>
            <div className="pf-sectors-grid">
              {group.sectors.map((sector, idx) => {
                const isActive = mySectors.includes(sector.id);
                const animState = animatingSectors[sector.id];
                return (
                  <button
                    key={sector.id}
                    className={`pf-sector-card ${isActive ? "pf-sector-active" : ""} ${animState === "adding" ? "pf-sector-adding" : ""}`}
                    onClick={() => (isActive ? removeSector(sector.id) : addSector(sector.id))}
                    aria-label={`${isActive ? t.delete : t.addSector} ${lang === "es" ? sector.label : sector.label_en}`}
                    style={{
                      "--sector-color": sector.color,
                      "--stagger-delay": `${idx * 0.03}s`,
                    }}
                  >
                    <span className="pf-sector-icon">{sector.icon}</span>
                    <span className="pf-sector-label">
                      {lang === "es" ? sector.label : sector.label_en}
                    </span>
                    {isActive ? (
                      <span className="pf-sector-badge">
                        <Icon name="check" size={12} />
                      </span>
                    ) : (
                      <span className="pf-sector-add-hint">{t.tapToAdd}</span>
                    )}
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

// ═══ COMPONENTE PRINCIPAL: PROFICHA ════════════════════════════
export default function ProFicha() {
  const { user, loading: authLoading, login, logout } = useAuth();

  // Estados principales
  const [lang, setLang] = useState(() => storage.get("lang", "es"));
  const [palette, setPalette] = useState(() => storage.get("palette", "midnight"));
  const [activeNav, setActiveNav] = useState("dashboard");
  const [profile, setProfile] = useState(() =>
    storage.get("profile", {
      name: "",
      business: "",
      phone: "",
      email: "",
      whatsapp: "",
      address: "",
      website: "",
      logo: null,
      terms: "",
      pdfBg: "#050508",
    })
  );
  const [mySectors, setMySectors] = useState(() =>
    storage.get("mySectors", ["masoterapia", "medico"])
  );
  const [records, setRecords] = useState(() => storage.get("records", []));
  const [a11y, setA11y] = useState(() =>
    storage.get("a11y", {
      fontSize: "md",
      contrast: false,
      animations: true,
      screenReader: false,
      reduceMotion: false,
      boldText: false,
    })
  );

  // Estados de UI
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [tutorialOpen, setTutorialOpen] = useState(false);

  const t = T[lang];
  const pal = PALETTES.find((p) => p.id === palette) || PALETTES[0];

  // Persistencia
  useEffect(() => storage.set("lang", lang), [lang]);
  useEffect(() => storage.set("palette", palette), [palette]);
  useEffect(() => storage.set("profile", profile), [profile]);
  useEffect(() => storage.set("mySectors", mySectors), [mySectors]);
  useEffect(() => storage.set("records", records), [records]);
  useEffect(() => storage.set("a11y", a11y), [a11y]);

  // Helpers
  const showToast = (msg, type = "info") => {
    setToast({ msg, type });
  };

  const navigate = (page) => setActiveNav(page);

  const handleLogout = () => {
    if (window.confirm(t.signOutConfirm)) {
      logout();
    }
  };

  // Gesto para abrir drawer desde borde izquierdo
  useEffect(() => {
    let startX = 0;
    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      if (startX < 30 && endX - startX > 50) {
        setDrawerOpen(true);
      }
    };
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Login guard
  if (authLoading || !user) {
    return (
      <div className="pf-login">
        <style>{generateCSS(pal, a11y)}</style>
        <div className="pf-login-content">
          <h1 className="pf-login-title">{t.appName}</h1>
          <p className="pf-login-tagline">{t.tagline}</p>
          <PremiumButton
            variant="accent"
            size="lg"
            onClick={login}
            fullWidth
            ariaLabel={lang === "es" ? "Continuar con Google" : "Continue with Google"}
          >
            {lang === "es" ? "Continuar con Google" : "Continue with Google"}
          </PremiumButton>
        </div>
      </div>
    );
  }

  // Aplicación principal
  return (
    <div className="pf-app" data-palette={palette} data-animations={a11y.animations}>
      <style>{generateCSS(pal, a11y)}</style>

      {/* Header dinámico */}
      <DynamicHeader
        profile={profile}
        lang={lang}
        onMenuClick={() => setDrawerOpen(true)}
      />

      {/* Contenido principal */}
      <main className="pf-main">
        {activeNav === "dashboard" && (
          <DashboardView
            profile={profile}
            records={records}
            mySectors={mySectors}
            palette={palette}
            lang={lang}
            navigate={navigate}
            onNewRecord={() => navigate("records")}
          />
        )}
        {activeNav === "sectors" && (
          <SectorsView
            mySectors={mySectors}
            setMySectors={setMySectors}
            palette={palette}
            lang={lang}
            showToast={showToast}
          />
        )}
        {activeNav === "records" && (
          <div className="pf-view pf-placeholder">
            <p>Records view - Bloque 2</p>
          </div>
        )}
        {activeNav === "calendar" && (
          <div className="pf-view pf-placeholder">
            <p>Calendar view - Bloque 2</p>
          </div>
        )}
        {activeNav === "storage" && (
          <div className="pf-view pf-placeholder">
            <p>Storage view - Bloque 4</p>
          </div>
        )}
        {activeNav === "scanner" && (
          <div className="pf-view pf-placeholder">
            <p>Scanner view - Bloque 2</p>
          </div>
        )}
        {activeNav === "settings" && (
          <div className="pf-view pf-placeholder">
            <p>Settings view - Bloque 3</p>
          </div>
        )}
        {activeNav === "accessibility" && (
          <div className="pf-view pf-placeholder">
            <p>Accessibility view - Bloque 3</p>
          </div>
        )}
        {activeNav === "help" && (
          <div className="pf-view pf-placeholder">
            <p>Help view - Bloque 3</p>
          </div>
        )}
      </main>

      {/* Barra de navegación inferior (solo 3 botones esenciales) */}
      <nav className="pf-navbar" role="navigation" aria-label={lang === "es" ? "Navegación principal" : "Main navigation"}>
        <button
          className={`pf-navbar-item ${activeNav === "dashboard" ? "pf-navbar-active" : ""}`}
          onClick={() => navigate("dashboard")}
          aria-label={t.dashboard}
          aria-current={activeNav === "dashboard" ? "page" : undefined}
        >
          <Icon name="home" size={24} />
          <span>{t.dashboard}</span>
        </button>
        <button
          className={`pf-navbar-item ${activeNav === "records" ? "pf-navbar-active" : ""}`}
          onClick={() => navigate("records")}
          aria-label={t.records}
          aria-current={activeNav === "records" ? "page" : undefined}
        >
          <Icon name="records" size={24} />
          <span>{t.records}</span>
        </button>
        <button
          className={`pf-navbar-item ${activeNav === "sectors" ? "pf-navbar-active" : ""}`}
          onClick={() => navigate("sectors")}
          aria-label={t.sectors}
          aria-current={activeNav === "sectors" ? "page" : undefined}
        >
          <Icon name="sectors" size={24} />
          <span>{t.sectors}</span>
        </button>
      </nav>

      {/* Drawer lateral */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeNav={activeNav}
        navigate={navigate}
        profile={profile}
        palette={palette}
        lang={lang}
        setLang={setLang}
        logout={handleLogout}
        openTutorial={() => setTutorialOpen(true)}
      />

      {/* Toast notifications */}
      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

// ═══ CSS GENERATOR ═════════════════════════════════════════════
// Sistema de diseño con colores sólidos, difuminados y animaciones premium
function generateCSS(pal, a11y) {
  const transitionSpeed = a11y.animations ? "0.3s" : "0s";
  const springTransition = a11y.animations
    ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
    : "linear";

  return `
    /* ═══ VARIABLES Y RESET ═══ */
    :root {
      --bg: ${pal.bg};
      --surface: ${pal.surface};
      --card: ${pal.card};
      --card-hover: ${pal.cardHover};
      --text: ${pal.text};
      --text-sub: ${pal.textSub};
      --accent: ${pal.accent};
      --accent-light: ${pal.accentLight};
      --border: ${pal.border};
      --overlay: ${pal.overlay};
      --glow: ${pal.glow};
      --shadow: ${pal.shadow};
      --transition: ${transitionSpeed};
      --spring: ${springTransition};
      --radius: 16px;
      --radius-sm: 10px;
      --radius-lg: 24px;
      --fs: 16px;
      ${a11y.boldText ? "--font-weight: 600;" : "--font-weight: 400;"}
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      height: 100%;
      overflow: hidden;
      overscroll-behavior: none;
      -webkit-overflow-scrolling: touch;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif;
      background: var(--bg);
      color: var(--text);
      font-size: var(--fs);
      font-weight: var(--font-weight);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }

    /* ═══ APP SHELL ═══ */
    .pf-app {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--bg);
    }

    /* ═══ HEADER DINÁMICO ═══ */
    .pf-header {
      display: flex;
      align-items: center;
      padding: 16px 20px;
      gap: 16px;
      flex-shrink: 0;
    }

    .pf-header-menu {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--card);
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition) var(--spring);
      color: var(--text);
    }

    .pf-header-menu:active {
      transform: scale(0.92);
      background: var(--card-hover);
    }

    .pf-header-title {
      flex: 1;
      min-height: 44px;
      display: flex;
      align-items: center;
    }

    .pf-header-appname,
    .pf-header-greeting {
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .pf-header-spacer {
      width: 44px;
    }

    /* ═══ MAIN CONTENT ═══ */
    .pf-main {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: contain;
    }

    /* Efecto spring en scroll */
    .pf-main::-webkit-scrollbar {
      width: 4px;
    }

    .pf-main::-webkit-scrollbar-track {
      background: transparent;
    }

    .pf-main::-webkit-scrollbar-thumb {
      background: var(--accent);
      border-radius: 4px;
    }

    /* ═══ VIEWS ═══ */
    .pf-view {
      padding: 0 20px 100px;
      animation: pfViewEnter 0.4s var(--spring) both;
    }

    @keyframes pfViewEnter {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .pf-section {
      margin-bottom: 32px;
    }

    .pf-section-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 16px;
      letter-spacing: -0.01em;
    }

    .pf-subsection-title {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-sub);
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* ═══ CARDS ═══ */
    .pf-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      transition: all var(--transition) var(--spring);
    }

    .pf-card-md { padding: 20px; }
    .pf-card-sm { padding: 14px; }
    .pf-card-lg { padding: 28px; }

    .pf-card-hoverable:active {
      transform: scale(0.98);
      background: var(--card-hover);
    }

    /* ═══ BOTONES ═══ */
    .pf-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      border: none;
      border-radius: var(--radius);
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition) var(--spring);
      font-family: inherit;
    }

    .pf-btn-primary {
      background: var(--card);
      color: var(--text);
      border: 1px solid var(--border);
    }

    .pf-btn-accent {
      background: var(--accent);
      color: #fff;
      box-shadow: 0 4px 20px var(--glow);
    }

    .pf-btn-accent:active {
      transform: scale(0.96);
      box-shadow: 0 2px 10px var(--glow);
    }

    .pf-btn-ghost {
      background: transparent;
      color: var(--text);
      border: 1px solid var(--border);
    }

    .pf-btn-sm {
      padding: 10px 16px;
      font-size: 0.875rem;
    }

    .pf-btn-md {
      padding: 14px 24px;
      font-size: 1rem;
    }

    .pf-btn-lg {
      padding: 18px 32px;
      font-size: 1.1rem;
    }

    .pf-btn-full {
      width: 100%;
    }

    .pf-btn-disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .pf-btn-loading {
      opacity: 0.7;
      pointer-events: none;
    }

    .pf-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: pfSpin 0.8s linear infinite;
    }

    @keyframes pfSpin {
      to { transform: rotate(360deg); }
    }

    /* ═══ DRAWER LATERAL ═══ */
    .pf-drawer-overlay {
      position: fixed;
      inset: 0;
      background: var(--overlay);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--transition);
      z-index: 1000;
    }

    .pf-drawer-overlay.pf-drawer-open {
      opacity: 1;
      pointer-events: auto;
    }

    .pf-drawer {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: 85%;
      max-width: 340px;
      background: var(--surface);
      transform: translateX(-100%);
      transition: transform var(--transition) var(--spring);
      z-index: 1001;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      box-shadow: 4px 0 40px var(--shadow);
    }

    .pf-drawer.pf-drawer-open {
      transform: translateX(0);
    }

    .pf-drawer-header {
      position: relative;
      padding: 40px 24px 24px;
      overflow: hidden;
    }

    .pf-drawer-header-bg {
      position: absolute;
      inset: 0;
      filter: blur(60px);
      opacity: 0.4;
    }

    .pf-drawer-header-content {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .pf-drawer-avatar {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: var(--card);
      border: 3px solid var(--accent);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .pf-drawer-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .pf-drawer-user-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .pf-drawer-user-name {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--text);
    }

    .pf-drawer-user-role {
      font-size: 0.85rem;
      color: var(--text-sub);
    }

    .pf-drawer-close {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .pf-drawer-section {
      padding: 16px 12px;
    }

    .pf-drawer-divider {
      height: 1px;
      background: var(--border);
      margin: 0 24px;
    }

    .pf-drawer-item {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      padding: 14px 16px;
      border-radius: var(--radius);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all var(--transition) var(--spring);
      font-family: inherit;
      font-size: 1rem;
      color: var(--text);
      position: relative;
    }

    .pf-drawer-item:active {
      transform: scale(0.98);
      background: var(--card);
    }

    .pf-drawer-item-active {
      background: var(--card);
    }

    .pf-drawer-item-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-sm);
      background: var(--card);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .pf-drawer-item-label {
      flex: 1;
      text-align: left;
      font-weight: 500;
    }

    .pf-drawer-item-indicator {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent);
    }

    .pf-drawer-footer {
      margin-top: auto;
      padding: 20px 24px;
      border-top: 1px solid var(--border);
    }

    .pf-drawer-logout {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 14px;
      border-radius: var(--radius);
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
      color: #ef4444;
      font-family: inherit;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
    }

    .pf-drawer-version {
      text-align: center;
      font-size: 0.75rem;
      color: var(--text-sub);
      margin-top: 16px;
    }

    /* ═══ NAVBAR INFERIOR ═══ */
    .pf-navbar {
      display: flex;
      justify-content: space-around;
      padding: 8px 16px 24px;
      background: var(--surface);
      border-top: 1px solid var(--border);
      flex-shrink: 0;
    }

    .pf-navbar-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 8px 20px;
      border-radius: var(--radius);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all var(--transition) var(--spring);
      color: var(--text-sub);
      font-family: inherit;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .pf-navbar-item:active {
      transform: scale(0.9);
    }

    .pf-navbar-active {
      color: var(--accent);
    }

    .pf-navbar-active::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 24px;
      height: 3px;
      background: var(--accent);
      border-radius: 0 0 3px 3px;
    }

    /* ═══ DASHBOARD ═══ */
    .pf-stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 32px;
    }

    .pf-stat-card {
      text-align: center;
    }

    .pf-stat-value {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--accent);
    }

    .pf-stat-label {
      font-size: 0.75rem;
      color: var(--text-sub);
      margin-top: 4px;
    }

    .pf-quick-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .pf-category-feed {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .pf-category-card {
      border-left: 4px solid var(--cat-color, var(--accent));
    }

    .pf-category-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .pf-category-icon {
      font-size: 1.5rem;
    }

    .pf-category-name {
      flex: 1;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .pf-category-count {
      background: var(--card-hover);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
    }

    .pf-category-sectors {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .pf-mini-sector {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background: var(--card-hover);
      border-radius: 20px;
      font-size: 0.8rem;
    }

    .pf-mini-more {
      background: var(--accent);
      color: #fff;
    }

    /* ═══ SECTORES ═══ */
    .pf-search-box {
      position: relative;
      margin-bottom: 24px;
    }

    .pf-search-icon {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-sub);
    }

    .pf-search-input {
      width: 100%;
      padding: 14px 44px 14px 48px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      color: var(--text);
      font-family: inherit;
      font-size: 1rem;
    }

    .pf-search-input:focus {
      outline: none;
      border-color: var(--accent);
    }

    .pf-search-clear {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--card-hover);
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-sub);
    }

    .pf-my-sectors {
      margin-bottom: 32px;
    }

    .pf-sectors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 12px;
    }

    .pf-sector-card {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 20px 12px;
      background: var(--card);
      border: 2px solid var(--border);
      border-radius: var(--radius);
      cursor: pointer;
      transition: all var(--transition) var(--spring);
      font-family: inherit;
      color: var(--text);
    }

    .pf-sector-card:active {
      transform: scale(0.95);
    }

    .pf-sector-active {
      border-color: var(--sector-color, var(--accent));
      background: color-mix(in srgb, var(--sector-color, var(--accent)) 15%, var(--card));
    }

    .pf-sector-adding {
      animation: pfSectorAdd 0.3s var(--spring);
    }

    .pf-sector-removing {
      animation: pfSectorRemove 0.3s var(--spring);
    }

    @keyframes pfSectorAdd {
      0% { transform: scale(0.8); opacity: 0; }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); opacity: 1; }
    }

    @keyframes pfSectorRemove {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(0.95); }
      100% { transform: scale(0.8); opacity: 0; }
    }

    .pf-sector-icon {
      font-size: 2rem;
    }

    .pf-sector-label {
      font-size: 0.85rem;
      font-weight: 500;
      text-align: center;
    }

    .pf-sector-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--sector-color, var(--accent));
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }

    .pf-sector-add-hint {
      font-size: 0.7rem;
      color: var(--text-sub);
    }

    .pf-category-group {
      margin-bottom: 24px;
    }

    .pf-category-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border);
    }

    .pf-category-title-icon {
      font-size: 1.2rem;
    }

    /* ═══ EMPTY STATES ═══ */
    .pf-empty-card {
      text-align: center;
      padding: 40px 20px;
    }

    .pf-empty-icon {
      font-size: 3rem;
      margin-bottom: 12px;
      opacity: 0.5;
    }

    .pf-empty-text {
      color: var(--text-sub);
    }

    .pf-records-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .pf-record-item {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .pf-record-icon {
      width: 44px;
      height: 44px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      flex-shrink: 0;
    }

    .pf-record-info {
      flex: 1;
      min-width: 0;
    }

    .pf-record-name {
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .pf-record-meta {
      font-size: 0.8rem;
      color: var(--text-sub);
    }

    /* ═══ TOAST ═══ */
    .pf-toast {
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 24px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: 0 8px 32px var(--shadow);
      z-index: 2000;
      animation: pfToastIn 0.3s var(--spring);
    }

    @keyframes pfToastIn {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }

    .pf-toast-success { border-left: 4px solid #10b981; }
    .pf-toast-error { border-left: 4px solid #ef4444; }
    .pf-toast-info { border-left: 4px solid var(--accent); }

    /* ═══ LOGIN ═══ */
    .pf-login {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg);
    }

    .pf-login-content {
      text-align: center;
      padding: 40px;
      max-width: 400px;
      width: 100%;
    }

    .pf-login-title {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 8px;
    }

    .pf-login-tagline {
      color: var(--text-sub);
      margin-bottom: 40px;
    }

    /* ═══ ANIMACIONES GENERALES ═══ */
    .pf-fade-in {
      animation: pfFadeIn 0.4s ease both;
    }

    @keyframes pfFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .pf-stagger-in {
      animation: pfStaggerIn 0.4s var(--spring) both;
      animation-delay: var(--stagger-delay, 0s);
    }

    @keyframes pfStaggerIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .pf-icon {
      transition: transform var(--transition) var(--spring);
    }

    /* ═══ PLACEHOLDER ═══ */
    .pf-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      color: var(--text-sub);
    }

    /* ═══ ACCESIBILIDAD ═══ */
    ${a11y.contrast ? `
      * {
        filter: contrast(1.3);
      }
    ` : ""}

    ${a11y.reduceMotion ? `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
    ` : ""}

    /* ═══ RESPONSIVE ═══ */
    @media (min-width: 768px) {
      .pf-view {
        padding: 0 40px 100px;
        max-width: 800px;
        margin: 0 auto;
      }

      .pf-sectors-grid {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      }
    }

    /* ═══ LANDSCAPE ═══ */
    @media (orientation: landscape) and (max-height: 500px) {
      .pf-header {
        padding: 8px 20px;
      }
      .pf-navbar {
        padding: 4px 16px 12px;
      }
    }
  `;
}

// ═══ FIN DEL BLOQUE 1 ══════════════════════════════════════════
// Este bloque contiene la estructura base completamente funcional.
// Los siguientes bloques (2, 3, 4) agregarán las vistas faltantes
// y el marcador PATCH ZONE al final.
