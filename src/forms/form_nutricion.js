export const formNutricion = {
  id: "nutricion",
  titulo: "Nutrición",
  fundamento_legal: "NOM-004-SSA3-2012, NOM-043-SSA2-2012, NOM-015-SSA2-2010, NOM-008-SSA3-2017.",
  secciones: [
    {
      id: "ficha_identificacion_nut",
      titulo: "A. Ficha de Identificación del Paciente",
      campos: [
        { id: "nut_1", label: "Nombre(s) completo(s)", type: "text", required: true },
        { id: "nut_2", label: "Apellido paterno", type: "text", required: true },
        { id: "nut_3", label: "Apellido materno", type: "text" },
        { id: "nut_4", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "nut_5", label: "Edad", type: "number_readonly" },
        { id: "nut_6", label: "Sexo", type: "select", options: ["Hombre", "Mujer"], required: true },
        { id: "nut_7", label: "CURP", type: "text" },
        { id: "nut_8", label: "Ocupación", type: "text" },
        { id: "nut_9", label: "Nivel de actividad física laboral", type: "select", options: ["Sedentario", "Ligero", "Moderado", "Pesado"] },
        { id: "nut_10", label: "Domicilio completo", type: "textarea" },
        { id: "nut_11", label: "Teléfono de contacto", type: "tel", required: true },
        { id: "nut_12", label: "Correo electrónico", type: "email" },
        { id: "nut_13", label: "Nombre contacto de emergencia", type: "text" },
        { id: "nut_14", label: "Teléfono del contacto de emergencia", type: "tel" },
        { id: "nut_15", label: "Médico tratante (si existe)", type: "text" },
        { id: "nut_16", label: "Fecha de la primera consulta", type: "date" },
        { id: "nut_17", label: "Nombre del nutriólogo(a)", type: "text", required: true },
        { id: "nut_18", label: "Cédula profesional", type: "text" }
      ]
    },
    {
      id: "antecedentes_nut",
      titulo: "B. Antecedentes Heredofamiliares y Patológicos",
      campos: [
        { id: "nut_19", label: "¿Familiar 1er grado con obesidad?", type: "boolean_text", text_label: "Parentesco" },
        { id: "nut_20", label: "¿Familiar 1er grado con diabetes mellitus?", type: "boolean_text", text_label: "Parentesco" },
        { id: "nut_21", label: "¿Familiar 1er grado con dislipidemias?", type: "boolean_text", text_label: "Parentesco" },
        { id: "nut_22", label: "¿Familiar 1er grado con hipertensión?", type: "boolean_text", text_label: "Parentesco" },
        { id: "nut_23", label: "¿Familiar con TCA?", type: "boolean_text", text_label: "Parentesco" },
        { id: "nut_24", label: "¿Familiar con enfermedad renal o hepática?", type: "boolean_text", text_label: "Parentesco" },
        { id: "nut_25", label: "Tabaquismo", type: "radio", options: ["Sí", "No"] },
        { id: "nut_26", label: "Consumo de alcohol", type: "select", options: ["Nunca", "Ocasional", "Frecuente", "Diario"] },
        { id: "nut_27", label: "Horas de sueño promedio", type: "number" },
        { id: "nut_28", label: "Nivel de estrés percibido (0-10)", type: "scale", min: 0, max: 10 },
        { id: "nut_29", label: "Actividad física estructurada", type: "boolean_textarea", text_label: "Frecuencia y duración" },
        { id: "nut_30", label: "Embarazo actual (Mujeres)", type: "boolean_text", text_label: "Semanas de gestación" },
        { id: "nut_31", label: "Lactancia actual (Mujeres)", type: "radio", options: ["Sí", "No", "No aplica"] },
        { id: "nut_32", label: "Enfermedades diagnosticadas", type: "multiselect", options: ["Diabetes 1", "Diabetes 2", "Hipertensión", "Dislipidemia", "Hipotiroidismo", "Hipertiroidismo", "Enfermedad renal", "Enfermedad hepática", "SOP", "Cáncer", "Ninguna", "Otra"] },
        { id: "nut_33", label: "Cirugías de aparato digestivo/bariátrica", type: "boolean_textarea", text_label: "Especificar" },
        { id: "nut_34", label: "Alergias e intolerancias alimentarias", type: "boolean_textarea", text_label: "Especificar" },
        { id: "nut_35", label: "Diagnóstico previo de TCA", type: "boolean_textarea", text_label: "Especificar" },
        { id: "nut_36", label: "Medicamentos de uso actual", type: "textarea" },
        { id: "nut_37", label: "Suplementos de uso actual", type: "textarea" }
      ]
    },
    {
      id: "historia_dietetica",
      titulo: "C. Historia Dietética y Hábitos",
      campos: [
        { id: "nut_38", label: "Motivo principal de consulta", type: "select", options: ["Pérdida de peso", "Ganancia de peso", "Control metabólico", "Rendimiento deportivo", "Embarazo/Lactancia", "TCA", "General", "Otro"] },
        { id: "nut_39", label: "Peso objetivo/meta (kg)", type: "number" },
        { id: "nut_40", label: "Tiempo deseado", type: "text" },
        { id: "nut_41", label: "Intentos previos (dietas)", type: "textarea" },
        { id: "nut_42", label: "Número de comidas al día", type: "number" },
        { id: "nut_43", label: "Horario habitual", type: "textarea" },
        { id: "nut_44", label: "Recordatorio de 24 horas", type: "textarea" },
        { id: "nut_45", label: "Porciones frutas/verduras al día", type: "number" },
        { id: "nut_46", label: "Consumo ultraprocesados (semana)", type: "number" },
        { id: "nut_47", label: "Bebidas azucaradas (semana)", type: "number" },
        { id: "nut_48", label: "Agua simple al día (Litros)", type: "number" },
        { id: "nut_49", label: "¿Quién prepara los alimentos?", type: "text" },
        { id: "nut_50", label: "Comidas fuera de casa (semana)", type: "number" },
        { id: "nut_51", label: "Preferencias y aversiones", type: "textarea" },
        { id: "nut_52", label: "Restricciones culturales/éticas", type: "textarea" },
        { id: "nut_54", label: "Conductas de riesgo", type: "boolean_text", text_label: "Atracones/Restricciones (Manejo sensible)" }
      ]
    },
    {
      id: "antropometria",
      titulo: "D. Evaluación Antropométrica",
      campos: [
        { id: "nut_55", label: "Peso actual (kg)", type: "number", required: true },
        { id: "nut_56", label: "Talla (cm)", type: "number", required: true },
        { id: "nut_57", label: "IMC", type: "number_readonly" },
        { id: "nut_58", label: "Circunferencia cintura (cm)", type: "number" },
        { id: "nut_59", label: "Circunferencia cadera (cm)", type: "number" },
        { id: "nut_61", label: "Porcentaje grasa (%)", type: "number" },
        { id: "nut_62", label: "Porcentaje músculo (%)", type: "number" },
        { id: "nut_63", label: "Pliegues cutáneos (mm)", type: "textarea" },
        { id: "nut_64", label: "Peso habitual previo", type: "number" },
        { id: "nut_67", label: "Resultados de laboratorio", type: "textarea" },
        { id: "nut_70", label: "Presión arterial", type: "text" }
      ]
    },
    {
      id: "diagnostico_plan_nut",
      titulo: "E. Diagnóstico y Plan Nutricional",
      campos: [
        { id: "nut_71", label: "Diagnóstico nutricional", type: "textarea", required: true },
        { id: "nut_72", label: "Clasificación IMC", type: "select", options: ["Bajo peso", "Normal", "Sobrepeso", "Obesidad I", "Obesidad II", "Obesidad III"] },
        { id: "nut_73", label: "Requerimiento energético (kcal)", type: "number" },
        { id: "nut_74", label: "Distribución macronutrientes", type: "text" },
        { id: "nut_75", label: "Tipo de plan alimentario", type: "textarea", required: true },
        { id: "nut_77", label: "Suplementación indicada", type: "textarea" },
        { id: "nut_79", label: "Metas a corto plazo", type: "textarea" },
        { id: "nut_82", label: "¿Requiere referencia?", type: "boolean_text", text_label: "Motivo" }
      ]
    }
  ],
  consentimiento: {
    titulo: "CARTA DE CONSENTIMIENTO INFORMADO PARA VALORACIÓN NUTRICIONAL",
    fundamento: "NOM-004-SSA3-2012, NOM-043-SSA2-2012, Ley General de Salud Arts. 77-83.",
    texto: "Yo, [Nombre], declaro que el nutriólogo(a) me ha explicado el propósito y limitaciones del plan de alimentación.\n\nEntiendo que: 1. El servicio no sustituye la atención médica. 2. Los resultados dependen de mi constancia y factores biológicos. 3. Mi información es confidencial. 4. Si se identifican signos médicos, seré referido a un doctor.\n\nOTORGO MI CONSENTIMIENTO informado.",
    campos: [
      { id: "nut_c1", label: "Nombre del paciente o representante", type: "text", required: true },
      { id: "nut_c2", label: "Relación del firmante", type: "select", options: ["Paciente", "Padre", "Madre", "Tutor"] },
      { id: "nut_c3", label: "Firma del paciente o representante", type: "signature", required: true },
      { id: "nut_c4", label: "Firma del nutriólogo(a)", type: "signature", required: true }
    ]
  }
};
