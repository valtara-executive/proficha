export const formDepilacion = {
  id: "depilacion",
  titulo: "Depilación (Láser, Cera, Hilo)",
  fundamento_legal: "Servicio de Nivel 1 (manuales) / Nivel 2 (láser/IPL). Especial atención a quemaduras, queloides y contraindicaciones de retinoides.",
  secciones: [
    {
      id: "datos_generales_dep",
      titulo: "A. Datos Generales",
      campos: [
        { id: "dep_1", label: "Nombre completo", type: "text", required: true },
        { id: "dep_2", label: "Fecha de nacimiento", type: "date" },
        { id: "dep_3", label: "Sexo / Género", type: "select", options: ["Mujer", "Hombre", "Otro"] },
        { id: "dep_4", label: "Teléfono", type: "tel", required: true },
        { id: "dep_5", label: "Fecha de sesión", type: "date" }
      ]
    },
    {
      id: "perfil_dermico_dep",
      titulo: "B. Perfil Dérmico y Capilar",
      campos: [
        { id: "dep_6", label: "Tipo de piel (Fitzpatrick) - CRÍTICO IPL/Láser", type: "select", options: ["I (Muy clara)", "II (Clara)", "III (Media clara)", "IV (Media oscura)", "V (Oscura)", "VI (Muy oscura)"] },
        { id: "dep_7", label: "Sensibilidad de la piel", type: "select", options: ["Baja", "Media", "Alta", "Muy alta"] },
        { id: "dep_8", label: "Color y grosor del vello", type: "select", options: ["Claro/Fino", "Oscuro/Grueso", "Canoso", "Rojizo"] },
        { id: "dep_9", label: "Zona(s) a depilar", type: "text", required: true },
        { id: "dep_10", label: "Estado de la piel en la zona (irritada, heridas, tatuajes, bronceado)", type: "textarea" },
        { id: "dep_11", label: "Método previo y frecuencia", type: "text" }
      ]
    },
    {
      id: "antecedentes_dep",
      titulo: "C. Antecedentes Médicos y Dérmicos",
      campos: [
        { id: "dep_12", label: "Uso activo de retinoides/ácidos (CONTRAINDICADO en cera)", type: "boolean_text", text_label: "¿Última aplicación?" },
        { id: "dep_13", label: "Uso isotretinoína últimos 12 meses (CONTRAINDICADO)", type: "radio", options: ["Sí", "No"] },
        { id: "dep_14", label: "Exposición solar fuerte últimos 14 días", type: "radio", options: ["Sí", "No"] },
        { id: "dep_15", label: "Embarazo actual (Contraindicado para láser)", type: "radio", options: ["Sí", "No"] },
        { id: "dep_16", label: "Enfermedades piel (psoriasis, eccema, rosácea)", type: "boolean_text", text_label: "Especificar" },
        { id: "dep_17", label: "Diabetes o neuropatía (Menor sensibilidad calor)", type: "radio", options: ["Sí", "No"] },
        { id: "dep_18", label: "Uso de fotosensibilizantes (antibióticos, etc)", type: "boolean_text", text_label: "Especificar" },
        { id: "dep_19", label: "Implantes metálicos cerca (para láser)", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "alergias_dep",
      titulo: "D. Alergias y Propensión a Queloides",
      campos: [
        { id: "dep_20", label: "¿Alergia a cera (resinas, colofonia) o azúcar?", type: "radio", options: ["Sí", "No"] },
        { id: "dep_21", label: "¿Reacciones previas severas (foliculitis, quemaduras, urticaria)?", type: "boolean_textarea", text_label: "Describir" },
        { id: "dep_22", label: "CRÍTICO: ¿Propensión a QUELOIDES (cicatriz abultada)?", type: "radio", options: ["Sí, he tenido", "No, nunca"], required: true },
        { id: "dep_23", label: "¿Tendencia a hiperpigmentación (manchas tras irritación)?", type: "radio", options: ["Sí", "No"] }
      ]
    }
  ],
  consentimiento: {
    titulo: "ACUERDO DE SERVICIO ESTÉTICO Y EXENCIÓN DE RESPONSABILIDAD CIVIL",
    fundamento: "Servicio: Depilación",
    texto: "Yo, [Nombre del Cliente], manifiesto:\n\n1. DECLARACIÓN VERAZ Y COMPLETA\nDeclaro haber informado con veracidad sobre: mi tipo de piel, uso de retinoides o isotretinoína, exposición solar, tatuajes, embarazo, diabetes, alergias a ceras y propensión a queloides o manchas. ASUMO RESPONSABILIDAD TOTAL por cualquier consecuencia derivada de información omitida o falsa.\n\n2. PROPENSIÓN A QUELOIDES\nHe declarado mi historial de queloides. Entiendo que la depilación puede desencadenar reacción queloide en pieles con esta propensión, y acepto el riesgo EXPRESAMENTE.\n\n3. RIESGOS ACEPTADOS\nCera/Sugar: eritema, foliculitis, encarnaduras, quemadura por retinoides no informados.\nLáser/IPL: eritema, manchas en pieles oscuras o bronceadas, ineficacia en vello canoso. Acepto estos riesgos.\n\n4. CUIDADOS POSTERIORES — DESLINDE TOTAL\nACEPTO: a) Evitar sol directo y usar SPF 50+. b) No aplicar perfume/alcohol en 24-48h. c) No rascar la zona. d) No generar sudoración intensa.\nDESLINDE: Cualquier quemadura, queloide, mancha o infección por no seguir los cuidados es responsabilidad EXCLUSIVA del cliente. Libero al establecimiento.\n\n5. EXENCIÓN DE RESPONSABILIDAD\nLibero al establecimiento de responsabilidad civil por reacciones de condiciones no declaradas, queloides consentidos, ineficacia en vello claro y complicaciones por omitir restricciones de sol/retinoides.",
    campos: [
      { id: "dep_c1", label: "Nombre completo del cliente", type: "text", required: true },
      { id: "dep_c2", label: "Método de depilación autorizado", type: "text", required: true },
      { id: "dep_c3", label: "Firma del cliente", type: "signature", required: true },
      { id: "dep_c4", label: "Fecha de autorización", type: "date", required: true },
      { id: "dep_c5", label: "Especialista responsable", type: "text", required: true },
      { id: "dep_c6", label: "Firma responsable", type: "signature", required: true }
    ]
  }
};
