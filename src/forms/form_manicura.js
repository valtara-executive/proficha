export const formManicura = {
  id: "manicura",
  titulo: "Manicura / Pedicura",
  fundamento_legal: "Servicio de Nivel 1 (No invasivo / semi-invasivo). Exención de responsabilidad civil aplicable conforme al Código Civil Federal.",
  secciones: [
    {
      id: "datos_generales_man",
      titulo: "A. Datos Generales",
      campos: [
        { id: "man_1", label: "Nombre completo", type: "text", required: true },
        { id: "man_2", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "man_3", label: "Edad", type: "number_readonly" },
        { id: "man_4", label: "Sexo / Género", type: "select", options: ["Mujer", "Hombre", "No binario", "Prefiero no decir"] },
        { id: "man_5", label: "Teléfono de contacto", type: "tel", required: true },
        { id: "man_6", label: "Correo electrónico", type: "email" },
        { id: "man_7", label: "Fecha de la visita", type: "date" },
        { id: "man_8", label: "Técnico(a) asignado(a)", type: "text" }
      ]
    },
    {
      id: "perfil_dermico_man",
      titulo: "B. Perfil Dérmico y de Salud",
      campos: [
        { id: "man_9", label: "Tipo de piel en manos y pies", type: "select", options: ["Normal", "Seca", "Mixta", "Sensible"] },
        { id: "man_10", label: "Condición actual de uñas", type: "multiselect", options: ["Sanas", "Frágiles", "Laminadas", "Hongos previos", "Uña encarnada", "Engrosamiento", "Decoloración"] },
        { id: "man_11", label: "¿Ha padecido micosis (hongos) en los últimos 6 meses?", type: "radio", options: ["Sí", "No"] },
        { id: "man_12", label: "¿Tiene dermatitis, psoriasis o eccema activo en manos o pies?", type: "radio", options: ["Sí", "No"] },
        { id: "man_13", label: "¿Tiene heridas abiertas, grietas profundas o lesiones activas?", type: "radio", options: ["Sí", "No"] },
        { id: "man_14", label: "¿Padece diabetes? (Relevante para corte y trabajo en pies)", type: "radio", options: ["Sí", "No"] },
        { id: "man_15", label: "Trastornos circulatorios", type: "multiselect", options: ["Varices", "Neuropatía", "Edema", "Ninguno"] },
        { id: "man_16", label: "Uso de anticoagulantes o medicamentos que afecten la piel", type: "boolean_text", text_label: "Especificar" }
      ]
    },
    {
      id: "perfil_alergias_man",
      titulo: "C. Perfil de Alergias y Reacciones",
      campos: [
        { id: "man_17", label: "¿Alergia a esmaltes o removedores (con/sin acetona)?", type: "radio", options: ["Sí", "No"] },
        { id: "man_18", label: "¿Alergia a acrílicos, gel UV, monómeros o polímeros?", type: "radio", options: ["Sí", "No"] },
        { id: "man_19", label: "¿Alergia a fragancias, lanolina, parabenos o conservadores?", type: "radio", options: ["Sí", "No"] },
        { id: "man_20", label: "¿Alergia al látex (guantes)?", type: "radio", options: ["Sí", "No"] },
        { id: "man_21", label: "¿Reacciones previas (ardor, descamación) a servicios de uñas?", type: "boolean_textarea", text_label: "Describir producto y tipo de reacción" }
      ]
    },
    {
      id: "servicio_solicitado_man",
      titulo: "D. Servicio Solicitado",
      campos: [
        { id: "man_22", label: "Tipo de servicio", type: "select", options: ["Manicura clásica", "Semipermanente", "Acrílico", "Gel", "Pedicura clásica", "Spa", "Medicinal", "Remoción", "Mantenimiento"] },
        { id: "man_23", label: "Zona con uña encarnada (si aplica)", type: "text", placeholder: "Ej. Dedo gordo pie derecho" },
        { id: "man_24", label: "¿Diseño o referencia visual?", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "entrevista_man",
      titulo: "E. Entrevista de Confirmación",
      campos: [
        { id: "man_25", label: "¿Tienes actualmente hongos, heridas o lesiones en manos o pies?", type: "textarea" },
        { id: "man_26", label: "¿Cuándo fue tu último servicio y qué técnica usaste?", type: "text" },
        { id: "man_27", label: "¿Alguna preferencia o restricción de productos hoy?", type: "textarea" }
      ]
    }
  ],
  consentimiento: {
    titulo: "ACUERDO DE SERVICIO ESTÉTICO Y EXENCIÓN DE RESPONSABILIDAD CIVIL",
    fundamento: "Servicio: Manicura / Pedicura (Nivel 1)",
    texto: "Yo, [Nombre del Cliente], mayor de edad, manifiesto:\n\n1. DECLARACIÓN DE SALUD Y ALERGIAS\nDeclaro haber informado verazmente sobre mis condiciones de salud relevantes para este servicio, incluyendo: diabetes, trastornos circulatorios, afecciones dérmicas activas, presencia de hongos o infecciones, uso de medicamentos anticoagulantes y alergias conocidas a productos cosméticos, acrílicos, gel, removedores y látex. Entiendo que la omisión de esta información puede derivar en reacciones adversas cuya responsabilidad recaerá exclusivamente sobre mí.\n\n2. RIESGOS CONOCIDOS Y ACEPTADOS\nReconozco que los servicios de manicura y pedicura pueden conllevar, en casos excepcionales: irritación dérmica por productos, sensibilidad transitoria en cutículas tratadas, y en técnicas con herramientas (torno, cortacutículas), la posibilidad de micro-abrasión. En personas con diabetes o neuropatía, el umbral de sensación puede estar alterado, por lo que asumo el riesgo adicional de haber optado por este servicio con dicha condición.\n\n3. CUIDADOS POSTERIORES Y RESPONSABILIDAD DEL CLIENTE\nHe sido informado(a) sobre los cuidados posteriores aplicables al servicio recibido. Me comprometo a seguirlos al pie de la letra.\nDESLINDE EXPRESO: Si presento una reacción adversa, infección o daño derivado de no seguir las instrucciones de cuidado posterior (exponer el área a productos irritantes, rascar, retirar el producto sin asistencia profesional, etc.), libero al establecimiento y al técnico(a) de toda responsabilidad civil al respecto.\n\n4. PRODUCTO Y HERRAMIENTAS\nConfirmo que se me informó sobre los productos y herramientas que se utilizarán. Las herramientas de corte son desinfectadas o esterilizadas conforme a las buenas prácticas del establecimiento.\n\n5. EXENCIÓN DE RESPONSABILIDAD CIVIL\nLibero al establecimiento y al técnico(a) de responsabilidad civil por reacciones alérgicas o dérmicas derivadas de condiciones o alergias no informadas por mí, por complicaciones derivadas de padecimientos preexistentes no declarados, y por el resultado estético cuando este se deba a las condiciones naturales de mis uñas o piel.",
    campos: [
      { id: "man_c1", label: "Nombre completo del cliente", type: "text", required: true },
      { id: "man_c2", label: "Firma del cliente", type: "signature", required: true },
      { id: "man_c3", label: "Fecha de autorización", type: "date", required: true },
      { id: "man_c4", label: "Técnico(a) responsable", type: "text", required: true },
      { id: "man_c5", label: "Firma del técnico(a)", type: "signature", required: true }
    ]
  }
};
