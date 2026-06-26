export const formPsicologia = {
  id: "psicologia",
  titulo: "Psicología",
  fundamento_legal: "NOM-004-SSA3-2012, Ley General de Salud Arts. 77-83, NOM-025-SSA2-2014.",
  secciones: [
    {
      id: "ficha_identificacion_psi",
      titulo: "A. Ficha de Identificación del Paciente",
      campos: [
        { id: "psi_1", label: "Nombre(s) completo(s)", type: "text", required: true },
        { id: "psi_2", label: "Apellido paterno", type: "text", required: true },
        { id: "psi_3", label: "Apellido materno", type: "text" },
        { id: "psi_4", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "psi_5", label: "Edad", type: "number_readonly" },
        { id: "psi_6", label: "Sexo", type: "select", options: ["Hombre", "Mujer"] },
        { id: "psi_7", label: "CURP", type: "text" },
        { id: "psi_8", label: "Estado civil", type: "select", options: ["Soltero(a)", "Casado(a)", "Unión libre", "Divorciado(a)", "Viudo(a)"] },
        { id: "psi_9", label: "Ocupación actual", type: "text" },
        { id: "psi_10", label: "Escolaridad", type: "select", options: ["Sin escolaridad", "Primaria", "Secundaria", "Bachillerato", "Técnico", "Licenciatura", "Posgrado"] },
        { id: "psi_11", label: "Domicilio completo", type: "textarea" },
        { id: "psi_12", label: "Teléfono de contacto", type: "tel", required: true },
        { id: "psi_13", label: "Correo electrónico", type: "email" },
        { id: "psi_14", label: "Nombre contacto de emergencia", type: "text", required: true },
        { id: "psi_15", label: "Parentesco del contacto de emergencia", type: "text" },
        { id: "psi_16", label: "Teléfono de emergencia", type: "tel", required: true },
        { id: "psi_17", label: "¿Quién acompaña al paciente a la consulta?", type: "text" },
        { id: "psi_18", label: "¿Quién refirió al paciente?", type: "select", options: ["Iniciativa propia", "Médico", "Familiar", "Escuela", "Trabajo", "Orden judicial", "Otro"] },
        { id: "psi_19", label: "Fecha de la primera consulta", type: "date" },
        { id: "psi_20", label: "Nombre del psicólogo(a)", type: "text", required: true },
        { id: "psi_21", label: "Cédula profesional", type: "text" },
        { id: "psi_22", label: "Con quién vive actualmente", type: "textarea" },
        { id: "psi_23", label: "Red de apoyo (familiares, amigos)", type: "textarea" }
      ]
    },
    {
      id: "antecedentes_psi",
      titulo: "B. Antecedentes en Salud Mental",
      campos: [
        { id: "psi_24", label: "¿Familiar de 1er grado con depresión?", type: "boolean_text", text_label: "Parentesco" },
        { id: "psi_25", label: "¿Familiar con trastorno de ansiedad?", type: "boolean_text", text_label: "Parentesco" },
        { id: "psi_26", label: "¿Familiar con trastorno bipolar o psicosis?", type: "boolean_text", text_label: "Parentesco" },
        { id: "psi_27", label: "¿Familiar con intento de suicidio?", type: "boolean_text", text_label: "Parentesco" },
        { id: "psi_28", label: "¿Familiar con adicciones?", type: "boolean_textarea", text_label: "Sustancia y parentesco" },
        { id: "psi_29", label: "¿Familiar con TDAH o Autismo?", type: "boolean_text", text_label: "Parentesco" },
        { id: "psi_30", label: "Estructura familiar de origen", type: "textarea" },
        { id: "psi_31", label: "Relación percibida con figura materna", type: "select", options: ["Muy buena", "Buena", "Regular", "Mala", "Muy mala", "No aplica"] },
        { id: "psi_32", label: "Relación percibida con figura paterna", type: "select", options: ["Muy buena", "Buena", "Regular", "Mala", "Muy mala", "No aplica"] },
        { id: "psi_33", label: "Eventos adversos en infancia (manejo sensible)", type: "boolean_textarea", text_label: "Descripción opcional" },
        { id: "psi_34", label: "Historia académica", type: "textarea" },
        { id: "psi_35", label: "Historia laboral", type: "textarea" },
        { id: "psi_36", label: "Historia de relaciones de pareja", type: "textarea" },
        { id: "psi_37", label: "Consumo de alcohol", type: "select", options: ["Nunca", "Ocasional", "Frecuente", "Diario"] },
        { id: "psi_38", label: "Consumo de tabaco", type: "radio", options: ["Sí", "No"] },
        { id: "psi_39", label: "Consumo de otras sustancias psicoactivas", type: "boolean_textarea", text_label: "Especificar" },
        { id: "psi_40", label: "Calidad de relaciones sociales", type: "select", options: ["Satisfactorias", "Limitadas", "Aisladas"] },
        { id: "psi_41", label: "Actividades de esparcimiento", type: "textarea" },
        { id: "psi_42", label: "Diagnósticos psiquiátricos/psicológicos previos", type: "boolean_textarea", text_label: "Especificar" },
        { id: "psi_43", label: "Tratamientos psicológicos previos", type: "boolean_textarea", text_label: "Enfoque y duración" },
        { id: "psi_44", label: "Tratamiento psiquiátrico actual (medicación)", type: "boolean_textarea", text_label: "Medicamentos" },
        { id: "psi_45", label: "Hospitalizaciones psiquiátricas", type: "boolean_textarea", text_label: "Motivo y año" },
        { id: "psi_46", label: "Antecedente de intentos de suicidio", type: "boolean_textarea", text_label: "Detalles y fecha (Manejo crítico)" },
        { id: "psi_47", label: "Antecedente de autolesiones no suicidas", type: "boolean_textarea", text_label: "Detalles" },
        { id: "psi_48", label: "Enfermedades médicas crónicas", type: "textarea" },
        { id: "psi_49", label: "Traumatismo craneoencefálico previo", type: "boolean_textarea", text_label: "Detalles" }
      ]
    },
    {
      id: "padecimiento_psi",
      titulo: "C. Motivo de Consulta",
      campos: [
        { id: "psi_50", label: "Motivo de consulta (palabras del paciente)", type: "textarea", required: true },
        { id: "psi_51", label: "¿Desde cuándo presenta esta situación?", type: "text" },
        { id: "psi_52", label: "¿Hubo algún evento desencadenante?", type: "boolean_textarea", text_label: "Descripción" },
        { id: "psi_53", label: "Afectación en la vida diaria", type: "textarea" },
        { id: "psi_54", label: "Expectativas de la terapia", type: "textarea" },
        { id: "psi_55", label: "Nivel de malestar percibido (0-10)", type: "scale", min: 0, max: 10 }
      ]
    },
    {
      id: "estado_mental",
      titulo: "D. Evaluación del Estado Mental Actual",
      campos: [
        { id: "psi_56", label: "Apariencia y arreglo personal", type: "textarea" },
        { id: "psi_57", label: "Actitud durante entrevista", type: "select", options: ["Cooperador(a)", "Reticente", "Hostil", "Indiferente"] },
        { id: "psi_58", label: "Orientación (Persona, tiempo, espacio)", type: "multiselect", options: ["Persona", "Tiempo", "Espacio"] },
        { id: "psi_59", label: "Estado de ánimo reportado", type: "text" },
        { id: "psi_60", label: "Afecto observado", type: "select", options: ["Congruente", "Incongruente", "Embotado", "Lábil"] },
        { id: "psi_61", label: "Curso y contenido del pensamiento", type: "textarea" },
        { id: "psi_62", label: "Ideación suicida actual", type: "boolean_textarea", text_label: "¿Plan? ¿Intención? (PROTOCOLO DE SEGURIDAD)" },
        { id: "psi_63", label: "Ideación homicida / daño a terceros", type: "radio", options: ["Sí", "No"] },
        { id: "psi_64", label: "Alucinaciones o alteraciones perceptuales", type: "boolean_textarea", text_label: "Descripción" },
        { id: "psi_65", label: "Juicio e introspección", type: "select", options: ["Conservado", "Parcialmente conservado", "Alterado"] },
        { id: "psi_66", label: "Calidad del sueño", type: "select", options: ["Buena", "Regular", "Mala"] },
        { id: "psi_67", label: "Apetito", type: "select", options: ["Aumentado", "Sin cambios", "Disminuido"] },
        { id: "psi_68", label: "Nivel de energía", type: "select", options: ["Alto", "Normal", "Bajo"] },
        { id: "psi_69", label: "Nivel de concentración", type: "select", options: ["Normal", "Disminuido"] }
      ]
    },
    {
      id: "diagnostico_plan_psi",
      titulo: "E. Diagnóstico y Plan",
      campos: [
        { id: "psi_70", label: "Instrumentos aplicados (Beck, GAD-7, etc.)", type: "textarea" },
        { id: "psi_71", label: "Puntaje obtenido", type: "text" },
        { id: "psi_72", label: "Interpretación", type: "textarea" },
        { id: "psi_75", label: "Impresión diagnóstica (DSM-5/CIE-11)", type: "textarea" },
        { id: "psi_76", label: "Código diagnóstico", type: "text" },
        { id: "psi_78", label: "Nivel de riesgo actual", type: "select", options: ["Bajo", "Moderado", "Alto", "Crítico"], required: true },
        { id: "psi_79", label: "Enfoque terapéutico", type: "select", options: ["Cognitivo conductual", "Psicodinámico", "Humanista", "Sistémico", "Gestalt", "Integrativo", "Otro"] },
        { id: "psi_80", label: "Objetivos a corto plazo", type: "textarea" },
        { id: "psi_81", label: "Objetivos a largo plazo", type: "textarea" },
        { id: "psi_82", label: "Frecuencia de sesiones", type: "select", options: ["Semanal", "Quincenal", "Mensual", "Según necesidad"] },
        { id: "psi_83", label: "¿Requiere referencia a psiquiatría?", type: "boolean_textarea", text_label: "Motivo" },
        { id: "psi_84", label: "Involucrar a familia en tratamiento", type: "boolean_text", text_label: "Modalidad" },
        { id: "psi_85", label: "Plan de seguridad (si hay riesgo suicida)", type: "textarea" }
      ]
    },
    {
      id: "nota_evolucion_psi",
      titulo: "F. Nota de Evolución (Sesiones)",
      campos: [
        { id: "psi_86", label: "Número de sesión", type: "number" },
        { id: "psi_87", label: "Fecha de la sesión", type: "date" },
        { id: "psi_88", label: "Temas abordados", type: "textarea" },
        { id: "psi_89", label: "Estado de ánimo inicio/cierre", type: "text" },
        { id: "psi_91", label: "Tareas asignadas para casa", type: "textarea" },
        { id: "psi_93", label: "Evaluación de riesgo actual", type: "select", options: ["Sin riesgo", "Riesgo bajo", "Riesgo moderado", "Riesgo alto"] },
        { id: "psi_94", label: "Observaciones del clínico", type: "textarea" },
        { id: "psi_95", label: "Firma del psicólogo(a)", type: "signature" }
      ]
    }
  ],
  consentimiento: {
    titulo: "CARTA DE CONSENTIMIENTO INFORMADO PARA TRATAMIENTO PSICOLÓGICO",
    fundamento: "NOM-004-SSA3-2012, Ley General de Salud Arts. 77-83.",
    texto: "Yo, [Paciente/Tutor], declaro haber sido informado(a) sobre el proceso de evaluación y/o intervención psicológica. \n\nEntiendo que: 1. Es un proceso colaborativo sin garantía absoluta de resultados. 2. Pueden surgir emociones incómodas. 3. La confidencialidad es estricta, SALVO riesgo inminente de vida (propia o terceros), abuso a menores/vulnerables, o mandato judicial. 4. Mi expediente es confidencial. 5. Puedo suspender la terapia cuando lo desee.\n\nEn caso de menores de edad, otorgo el consentimiento buscando su interés superior, entendiendo que ciertos contenidos se mantendrán en confidencialidad terapéutica con el menor salvo que exista riesgo.\n\nOTORGO MI CONSENTIMIENTO voluntario e informado.",
    campos: [
      { id: "psi_c1", label: "Nombre del paciente o representante", type: "text", required: true },
      { id: "psi_c2", label: "Relación del firmante", type: "select", options: ["Paciente", "Padre", "Madre", "Tutor legal"] },
      { id: "psi_c3", label: "¿Se explicaron los límites de la confidencialidad?", type: "radio", options: ["Sí", "No"], required: true },
      { id: "psi_c4", label: "Firma del paciente o representante", type: "signature", required: true },
      { id: "psi_c5", label: "Firma del psicólogo(a)", type: "signature", required: true }
    ]
  }
};
