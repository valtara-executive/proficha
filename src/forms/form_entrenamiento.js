export const formEntrenamiento = {
  id: "entrenamiento",
  titulo: "Entrenamiento Personal",
  fundamento_legal: "Conforme a: NOM-024-SSA3-2012, Ley General de Salud, ACSM, LFPDPPP.",
  secciones: [
    {
      id: "datos_cliente_ent",
      titulo: "1.1 Datos Generales del Cliente",
      campos: [
        { id: "ent_1", label: "Nombre completo", type: "text", required: true },
        { id: "ent_2", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "ent_3", label: "Edad", type: "number", required: true },
        { id: "ent_4", label: "Sexo biológico", type: "select", options: ["Hombre", "Mujer", "Otro"] },
        { id: "ent_5", label: "CURP", type: "text" },
        { id: "ent_6", label: "Domicilio", type: "textarea", required: true },
        { id: "ent_7", label: "Teléfono", type: "tel", required: true },
        { id: "ent_8", label: "Correo electrónico", type: "email" },
        { id: "ent_9", label: "Contacto de emergencia", type: "text", required: true },
        { id: "ent_10", label: "Teléfono emergencia", type: "tel", required: true }
      ]
    },
    {
      id: "objetivos_nivel_ent",
      titulo: "1.2 Objetivos y Actividad",
      campos: [
        { id: "ent_11", label: "Objetivos", type: "multiselect", options: ["Pérdida de peso", "Ganancia muscular", "Cardio", "Bienestar"] },
        { id: "ent_12", label: "Nivel de actividad", type: "select", options: ["Sedentario", "Poco activo", "Activo"] }
      ]
    },
    {
      id: "par_q_ent",
      titulo: "1.3 Cuestionario PAR-Q+",
      campos: [
        { id: "ent_13", label: "1. ¿Afección cardíaca?", type: "boolean_textarea", text_label: "Detalles" },
        { id: "ent_14", label: "2. ¿Dolor en pecho?", type: "boolean_textarea", text_label: "Detalles" },
        { id: "ent_15", label: "3. ¿Problemas óseos/articulaciones?", type: "boolean_textarea", text_label: "Detalles" }
      ]
    }
  ],
  consentimiento: {
    titulo: "EXENCIÓN DE RESPONSABILIDAD",
    texto: "Yo, [Nombre], acepto los riesgos del entrenamiento...",
    campos: [{ id: "ent_c1", label: "Firma", type: "signature", required: true }]
  }
};
