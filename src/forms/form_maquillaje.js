export const formMaquillaje = {
  id: "maquillaje",
  titulo: "Maquillaje Permanente (Micropigmentación rotativa)",
  fundamento_legal: "Servicio Nivel 2. Riesgo inherente de cicatrización y reacciones granulomatosas a largo plazo.",
  secciones: [
    {
      id: "datos_generales_maq",
      titulo: "A. Datos Generales",
      campos: [
        { id: "maq_1", label: "Nombre completo", type: "text", required: true },
        { id: "maq_2", label: "Fecha de nacimiento", type: "date" },
        { id: "maq_3", label: "Edad (Mínimo 18)", type: "number", required: true },
        { id: "maq_4", label: "Teléfono", type: "tel", required: true },
        { id: "maq_5", label: "Fecha de sesión", type: "date" }
      ]
    },
    {
      id: "perfil_dermico_maq",
      titulo: "B. Perfil Dérmico Específico",
      campos: [
        { id: "maq_6", label: "Tipo de piel (influye en retención)", type: "select", options: ["Normal", "Seca", "Grasa", "Combinada"] },
        { id: "maq_7", label: "Tono de piel (Fitzpatrick)", type: "select", options: ["I", "II", "III", "IV", "V", "VI"] },
        { id: "maq_8", label: "Cicatrices en la zona a pigmentar", type: "radio", options: ["Sí", "No"] },
        { id: "maq_9", label: "¿Maquillaje permanente o tatuaje previo en la zona?", type: "boolean_textarea", text_label: "CRÍTICO: Especificar color y tiempo" }
      ]
    },
    {
      id: "queloides_maq",
      titulo: "C. Queloides y Reacciones (OBLIGATORIO)",
      campos: [
        { id: "maq_10", label: "¿Ha formado QUELOIDES (cicatriz abultada)?", type: "boolean_textarea", text_label: "Indicar zona y origen", required: true },
        { id: "maq_11", label: "¿Propensión a hiperpigmentación posinflamatoria?", type: "radio", options: ["Sí", "No"] },
        { id: "maq_12", label: "¿Reacciones previas (granulomas) a tintas o pigmentos?", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "alergias_maq",
      titulo: "D. Alergias y Antecedentes",
      campos: [
        { id: "maq_13", label: "Alergias a colorantes, níquel, metales", type: "boolean_text", text_label: "Especificar" },
        { id: "maq_14", label: "Alergia a anestésicos tópicos (Lidocaína, EMLA)", type: "radio", options: ["Sí", "No"] },
        { id: "maq_15", label: "Reacción a tintes de cabello o cejas", type: "radio", options: ["Sí", "No"] },
        { id: "maq_16", label: "Uso de retinoides o isotretinoína (CONTRAINDICADO)", type: "boolean_text", text_label: "Meses desde suspensión" },
        { id: "maq_17", label: "Embarazo o lactancia (CONTRAINDICADO)", type: "radio", options: ["Sí", "No"] },
        { id: "maq_18", label: "Diabetes o Coagulopatías", type: "boolean_text", text_label: "Especificar" },
        { id: "maq_19", label: "Herpes labial recurrente (Si es en labios, requiere profilaxis)", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "zona_diseno_maq",
      titulo: "E. Zona y Diseño",
      campos: [
        { id: "maq_20", label: "Zona a tratar", type: "select", options: ["Cejas", "Labios", "Delineado superior", "Delineado inferior"] },
        { id: "maq_21", label: "Técnica", type: "text", placeholder: "Ej. Ombré, pelo a pelo, acuarela" },
        { id: "maq_22", label: "Color o gama solicitada", type: "text" },
        { id: "maq_23", label: "¿Es retoque o sesión inicial?", type: "radio", options: ["Inicial", "Retoque"] },
        { id: "maq_24", label: "¿Cliente aprobó el diseño previo?", type: "radio", options: ["Sí", "No"] }
      ]
    }
  ],
  consentimiento: {
    titulo: "ACUERDO DE SERVICIO DE ARTE CORPORAL SEMI-INVASIVO Y EXENCIÓN CIVIL",
    fundamento: "Servicio: Maquillaje Permanente",
    texto: "Yo, [Nombre del Cliente], mayor de edad, manifiesto:\n\n1. COMPRENSIÓN\nEntiendo que es un procedimiento semi-invasivo (agujas) de carácter permanente a largo plazo. Puede requerir retoques.\n\n2. DECLARACIÓN DE QUELOIDES\nHe declarado mi historial de queloides y alergias. Si tengo propensión, asumo el riesgo EXPRESO de deformación desfigurante, sin responsabilidad para el artista.\n\n3. RIESGOS ACEPTADOS\nEnrojecimiento, descamación, pérdida parcial de pigmento, cambio de tono (oxidación), alergia tardía, reactivación de herpes (labios), hiperpigmentación.\n\n4. APROBACIÓN DEL DISEÑO\nRevisé y aprobé el diseño y color. Una vez aplicado, la inconformidad estética no genera responsabilidad civil.\n\n5. CUIDADOS POSTERIORES — DESLINDE\nACEPTO: a) Usar el cicatrizante indicado. b) NO arrancar la costra (esto arranca el pigmento y deja cicatriz). c) Evitar sol directo y agua estancada. d) No maquillar la zona mientras cicatriza.\nDESLINDE: Cualquier pérdida de pigmento, infección o mancha por no seguir los cuidados es mi responsabilidad EXCLUSIVA. Libero al artista.\n\n6. EXENCIÓN DE RESPONSABILIDAD\nLibero al artista por alergias no informadas, queloides advertidos, cambios de tono por sol o tiempo, y pérdida de pigmento por mala higiene o descuidos en casa.",
    campos: [
      { id: "maq_c1", label: "Nombre completo del cliente", type: "text", required: true },
      { id: "maq_c2", label: "Zona y técnica aprobada", type: "text", required: true },
      { id: "maq_c3", label: "Firma autógrafa del cliente", type: "signature", required: true },
      { id: "maq_c4", label: "Fecha de autorización", type: "date", required: true },
      { id: "maq_c5", label: "Artista responsable", type: "text", required: true },
      { id: "maq_c6", label: "Firma del artista", type: "signature", required: true }
    ]
  }
};
