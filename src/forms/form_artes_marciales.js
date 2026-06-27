export const formArtesMarciales = {
  id: "artes_marciales",
  titulo: "Artes Marciales",
  fundamento_legal: "CONADE y federaciones deportivas.",
  secciones: [
    {
      id: "datos_art",
      titulo: "3.1 Datos Generales",
      campos: [
        { id: "art_1", label: "Nombre completo", type: "text", required: true },
        { id: "art_2", label: "Grupo sanguíneo", type: "text", required: true }
      ]
    },
    {
      id: "salud_art",
      titulo: "3.3 Salud y Contacto",
      campos: [
        { id: "art_3", label: "¿Conmociones cerebrales previas?", type: "boolean_textarea", text_label: "Detalles" }
      ]
    }
  ],
  consentimiento: {
    titulo: "ASUNCIÓN DE RIESGOS (CONTACTO)",
    texto: "Entiendo que el deporte de contacto implica riesgos...",
    campos: [{ id: "art_c1", label: "Firma", type: "signature", required: true }]
  }
};
