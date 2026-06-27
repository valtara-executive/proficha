export const formYoga = {
  id: "yoga",
  titulo: "Yoga / Pilates",
  fundamento_legal: "Tratamiento confidencial conforme a la LFPDPPP.",
  secciones: [
    {
      id: "datos_alumno_yog",
      titulo: "2.1 Datos Generales",
      campos: [
        { id: "yog_1", label: "Nombre completo", type: "text", required: true },
        { id: "yog_2", label: "Edad", type: "number", required: true },
        { id: "yog_3", label: "Teléfono", type: "tel", required: true }
      ]
    },
    {
      id: "salud_yog",
      titulo: "2.3 Cuestionario de Salud",
      campos: [
        { id: "yog_4", label: "¿Restricciones médicas?", type: "boolean_textarea", text_label: "Detalles" },
        { id: "yog_5", label: "¿Lesiones articulares?", type: "boolean_textarea", text_label: "Detalles" }
      ]
    }
  ],
  consentimiento: {
    titulo: "EXENCIÓN DE RESPONSABILIDAD (YOGA)",
    texto: "Yo, [Nombre], declaro estar apto para la práctica...",
    campos: [{ id: "yog_c1", label: "Firma", type: "signature", required: true }]
  }
};
