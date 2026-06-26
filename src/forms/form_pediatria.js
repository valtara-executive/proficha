export const formPediatria = {
  id: "pediatria",
  titulo: "Pediatría",
  fundamento_legal: "NOM-004-SSA3-2012, NOM-031-SSA2-1999 (Salud del niño), NOM-047-SSA2-2015, Ley de Derechos de Niñas, Niños y Adolescentes.",
  secciones: [
    {
      id: "ficha_identificacion_ped",
      titulo: "A. Ficha de Identificación del Paciente Pediátrico",
      campos: [
        { id: "ped_1", label: "Nombre(s) del paciente", type: "text", required: true },
        { id: "ped_2", label: "Apellido paterno", type: "text", required: true },
        { id: "ped_3", label: "Apellido materno", type: "text" },
        { id: "ped_4", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "ped_5", label: "Edad (Años/Meses)", type: "number_readonly" },
        { id: "ped_6", label: "Sexo", type: "select", options: ["Hombre", "Mujer"], required: true },
        { id: "ped_7", label: "CURP del menor", type: "text" },
        { id: "ped_8", label: "Nombre de la madre", type: "text", required: true },
        { id: "ped_9", label: "Edad materna", type: "number" },
        { id: "ped_10", label: "Ocupación materna", type: "text" },
        { id: "ped_11", label: "Nombre del padre", type: "text" },
        { id: "ped_12", label: "Edad paterna", type: "number" },
        { id: "ped_14", label: "Tutor legal (si distinto)", type: "text" },
        { id: "ped_15", label: "Domicilio completo", type: "textarea" },
        { id: "ped_16", label: "Teléfono de los padres", type: "tel", required: true },
        { id: "ped_20", label: "Escuela y grado", type: "text" },
        { id: "ped_23", label: "Nombre del pediatra", type: "text", required: true },
        { id: "ped_24", label: "Cédula profesional", type: "text" }
      ]
    },
    {
      id: "antecedentes_ped",
      titulo: "B. Antecedentes Heredofamiliares y Perinatales",
      campos: [
        { id: "ped_25", label: "Enf. Genéticas/Cardiopatías en familia", type: "boolean_textarea", text_label: "Especificar" },
        { id: "ped_26", label: "Alergias/Asma familiar", type: "boolean_textarea", text_label: "Especificar" },
        { id: "ped_27", label: "Trastornos neurodesarrollo (Autismo/TDAH)", type: "boolean_text", text_label: "Parentesco" },
        { id: "ped_28", label: "Consanguinidad padres", type: "radio", options: ["Sí", "No"] },
        { id: "ped_29", label: "Número de embarazo (Gesta)", type: "number" },
        { id: "ped_30", label: "Control prenatal", type: "boolean_text", text_label: "Consultas" },
        { id: "ped_31", label: "Complicaciones del embarazo", type: "boolean_textarea", text_label: "Especificar" },
        { id: "ped_32", label: "Tipo de parto", type: "select", options: ["Vaginal", "Cesárea"] },
        { id: "ped_33", label: "Semanas de gestación al nacer", type: "number" },
        { id: "ped_34", label: "Peso al nacer (g)", type: "number" },
        { id: "ped_35", label: "Talla al nacer (cm)", type: "number" },
        { id: "ped_36", label: "Apgar 1 y 5 min", type: "text" },
        { id: "ped_38", label: "Reanimación/UCIN neonatal", type: "boolean_textarea", text_label: "Motivo" },
        { id: "ped_39", label: "Tamiz metabólico neonatal", type: "text", placeholder: "Normal/Alterado" },
        { id: "ped_40", label: "Tamiz auditivo", type: "text" },
        { id: "ped_41", label: "Lactancia (Exclusiva/Fórmula/Mixta)", type: "text" },
        { id: "ped_42", label: "Inicio ablactación (meses)", type: "number" },
        { id: "ped_43", label: "Sostén cefálico (meses)", type: "number" },
        { id: "ped_44", label: "Sedestación sin apoyo (meses)", type: "number" },
        { id: "ped_45", label: "Deambulación (meses)", type: "number" },
        { id: "ped_46", label: "Primeras palabras (meses)", type: "number" },
        { id: "ped_47", label: "Control esfínteres (meses)", type: "number" },
        { id: "ped_50", label: "Esquema vacunación completo", type: "boolean_textarea", text_label: "Pendientes" },
        { id: "ped_53", label: "Hospitalizaciones/Cirugías previas", type: "boolean_textarea", text_label: "Detalles" },
        { id: "ped_56", label: "Alergias", type: "boolean_textarea", text_label: "Especificar" }
      ]
    },
    {
      id: "exploracion_ped",
      titulo: "C. Interrogatorio y Exploración Pediátrica",
      campos: [
        { id: "ped_60", label: "Motivo de consulta (Padres)", type: "textarea", required: true },
        { id: "ped_61", label: "Motivo de consulta (Menor)", type: "textarea" },
        { id: "ped_62", label: "Tiempo de evolución", type: "text" },
        { id: "ped_65", label: "Patrón de alimentación / sueño", type: "textarea" },
        { id: "ped_68", label: "Síntomas respiratorios / digestivos", type: "textarea" },
        { id: "ped_72", label: "Peso (kg)", type: "number" },
        { id: "ped_73", label: "Talla (cm)", type: "number" },
        { id: "ped_74", label: "Percentil Peso/Edad", type: "text" },
        { id: "ped_75", label: "Percentil Talla/Edad", type: "text" },
        { id: "ped_77", label: "Perímetro Cefálico (cm)", type: "number" },
        { id: "ped_78", label: "Frec. Cardiaca (lpm)", type: "number" },
        { id: "ped_79", label: "Frec. Respiratoria (rpm)", type: "number" },
        { id: "ped_80", label: "Temperatura (°C)", type: "number" },
        { id: "ped_81", label: "Saturación O2 (%)", type: "number" },
        { id: "ped_83", label: "Aspecto e hidratación", type: "textarea" },
        { id: "ped_85", label: "Exploración ORL (Oídos, nariz, garganta)", type: "textarea" },
        { id: "ped_87", label: "Tórax y Cardiopulmonar", type: "textarea" },
        { id: "ped_89", label: "Abdomen", type: "textarea" },
        { id: "ped_94", label: "Desarrollo psicomotor para la edad", type: "textarea" }
      ]
    },
    {
      id: "diag_plan_ped",
      titulo: "D. Diagnóstico y Tratamiento",
      campos: [
        { id: "ped_97", label: "Diagnóstico principal", type: "text", required: true },
        { id: "ped_99", label: "Estado Nutricional", type: "select", options: ["Eutrófico", "Riesgo desnutrición", "Desnutrición", "Sobrepeso", "Obesidad"] },
        { id: "ped_101", label: "Tratamiento Farmacológico (Dosis por peso)", type: "textarea" },
        { id: "ped_103", label: "Indicaciones alimentación", type: "textarea" },
        { id: "ped_105", label: "Signos de alarma (urgencias)", type: "textarea" },
        { id: "ped_108", label: "Próxima consulta/Control sano", type: "date" },
        { id: "ped_110", label: "Nota de evolución actual", type: "textarea" },
        { id: "ped_114", label: "Firma Pediatra", type: "signature" }
      ]
    }
  ],
  consentimiento: {
    titulo: "CARTA DE CONSENTIMIENTO INFORMADO PARA ATENCIÓN PEDIÁTRICA",
    fundamento: "NOM-004-SSA3-2012, NOM-031-SSA2-1999, Ley de Derechos de Niñas, Niños y Adolescentes.",
    texto: "Declaro que el pediatra me ha explicado el estado de salud de mi hijo/a o pupilo(a) y el tratamiento.\n\nEntiendo que:\n1. Conozco los riesgos de los procedimientos o medicamentos prescritos.\n2. En urgencias vitales, el médico actuará privilegiando la vida del menor.\n3. En la medida que su madurez lo permita (generalmente >10 años), el médico escuchará al menor y buscará su asentimiento, en respeto a sus derechos.\n\nOTORGO MI CONSENTIMIENTO como representante legal.",
    campos: [
      { id: "ped_c1", label: "Nombre del Padre/Madre/Tutor", type: "text", required: true },
      { id: "ped_c2", label: "Relación con el menor", type: "select", options: ["Madre", "Padre", "Tutor legal"] },
      { id: "ped_c3", label: "Procedimiento autorizado", type: "textarea", required: true },
      { id: "ped_c4", label: "¿Se buscó asentimiento del menor (si aplica por edad)?", type: "boolean_text", text_label: "Edad" },
      { id: "ped_c5", label: "Firma del Padre/Madre/Tutor", type: "signature", required: true },
      { id: "ped_c6", label: "Firma/Marca del Menor (Asentimiento)", type: "signature" },
      { id: "ped_c7", label: "Firma del Pediatra", type: "signature", required: true }
    ]
  }
};
