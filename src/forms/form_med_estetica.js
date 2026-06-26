export const formMedEstetica = {
  id: "med_estetica",
  titulo: "Medicina Estética (Inyectables)",
  fundamento_legal: "Servicio Nivel 2-3 (Invasivo). Exclusivo para Médico Cirujano o Especialista. Consentimiento con alertas severas por oclusión vascular y granulomas.",
  secciones: [
    {
      id: "datos_generales_mes",
      titulo: "A. Datos Generales",
      campos: [
        { id: "mes_1", label: "Nombre completo", type: "text", required: true },
        { id: "mes_2", label: "Fecha de nacimiento", type: "date" },
        { id: "mes_3", label: "Edad", type: "number", required: true },
        { id: "mes_4", label: "Teléfono", type: "tel", required: true },
        { id: "mes_5", label: "CURP", type: "text" },
        { id: "mes_6", label: "Contacto de emergencia", type: "text" },
        { id: "mes_7", label: "Médico de cabecera", type: "text" }
      ]
    },
    {
      id: "perfil_medico_mes",
      titulo: "B. Perfil Médico General (CRÍTICO)",
      campos: [
        { id: "mes_8", label: "Alergias a medicamentos (CRÍTICO)", type: "boolean_textarea", text_label: "Fármaco y reacción" },
        { id: "mes_9", label: "Alergia a anestésicos (lidocaína, benzocaína)", type: "radio", options: ["Sí", "No"] },
        { id: "mes_10", label: "Alergia a proteína huevo/leche (para toxina botulínica)", type: "radio", options: ["Sí", "No"] },
        { id: "mes_11", label: "Padecimientos sistémicos (Diabetes, Autoinmunes, Coagulopatías)", type: "textarea" },
        { id: "mes_12", label: "Uso de anticoagulantes, AINEs, Omegas, Vitamina E", type: "boolean_textarea", text_label: "Especificar" },
        { id: "mes_13", label: "Embarazo o lactancia (CONTRAINDICADO)", type: "radio", options: ["Sí", "No"] },
        { id: "mes_14", label: "Infecciones activas o herpes facial frecuente", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "antecedentes_esteticos_mes",
      titulo: "C. Tratamientos Estéticos Previos",
      campos: [
        { id: "mes_15", label: "Inyectables previos en la zona (Toxina, Ácido Hialurónico)", type: "boolean_textarea", text_label: "Producto y fecha" },
        { id: "mes_16", label: "Reacciones tardías a rellenos (nódulos, granulomas)", type: "boolean_textarea", text_label: "Especificar" },
        { id: "mes_17", label: "CRÍTICO: ¿Uso de BIOPOLÍMEROS o rellenos permanentes?", type: "radio", options: ["Sí, lo declaro", "No, nunca"], required: true }
      ]
    },
    {
      id: "perfil_dermico_mes",
      titulo: "D. Perfil Dérmico",
      campos: [
        { id: "mes_18", label: "Propensión a queloides o cicatrices hipertróficas", type: "radio", options: ["Sí", "No"] },
        { id: "mes_19", label: "Propensión a formar hematomas (moretones) fácilmente", type: "radio", options: ["Sí", "No"] },
        { id: "mes_20", label: "Propensión a manchas posinflamatorias", type: "radio", options: ["Sí", "No"] },
        { id: "mes_21", label: "Objetivo estético del tratamiento hoy", type: "textarea" }
      ]
    }
  ],
  consentimiento: {
    titulo: "CONSENTIMIENTO INFORMADO MÉDICO Y EXENCIÓN DE RESPONSABILIDAD CIVIL",
    fundamento: "Servicio: Medicina Estética (Inyectables)",
    texto: "Yo, [Nombre del Paciente], mayor de edad, con plena capacidad jurídica, manifiesto:\n\n1. INFORMACIÓN RECIBIDA\nEl médico me explicó técnica, productos, riesgos, cuidados y que los efectos no son permanentes (si aplica). Mis dudas fueron resueltas.\n\n2. DECLARACIÓN VERAZ\nInformé todas mis alergias (medicamentos, anestésicos), biopolímeros previos, enfermedades y uso de anticoagulantes. ASUMO RESPONSABILIDAD TOTAL por consecuencias de información oculta.\n\n3. RIESGOS ACEPTADOS\nMenores: Enrojecimiento, hinchazón, hematomas (moretones), asimetría transitoria.\nModerados: Infección, nódulos, alergia.\nSeveros: Necrosis tisular por oclusión vascular, embolia vascular (afectación visual), anafilaxia, migración de toxina, granulomas tardíos. Acepto estos riesgos voluntariamente.\n\n4. CUIDADOS POSTERIORES — DESLINDE TOTAL\nME COMPROMETO A: No masajear la zona. No aplicar calor. No ejercicio en 24h. No alcohol. Avisar urgencias ante piel blanca/morada o dolor agudo. Si ocurre complicación por no seguir estas indicaciones, libero al médico de toda responsabilidad.\n\n5. RESULTADO ESTÉTICO\nLos resultados son individuales y no garantizados. La insatisfacción subjetiva no constituye negligencia médica.\n\n6. EXENCIÓN DE RESPONSABILIDAD\nLibero al médico por complicaciones de condiciones no informadas, riesgos inherentes aceptados, incumplimiento de cuidados y expectativas subjetivas.",
    campos: [
      { id: "mes_c1", label: "Nombre completo del paciente", type: "text", required: true },
      { id: "mes_c2", label: "Procedimiento específico y producto", type: "text", required: true },
      { id: "mes_c3", label: "Firma autógrafa del paciente", type: "signature", required: true },
      { id: "mes_c4", label: "Fecha y hora", type: "date", required: true },
      { id: "mes_c5", label: "Firma Testigo (Opcional)", type: "signature" },
      { id: "mes_c6", label: "Médico tratante (Nombre y Cédula)", type: "text", required: true },
      { id: "mes_c7", label: "Firma del médico", type: "signature", required: true }
    ]
  }
};
