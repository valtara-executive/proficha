export const formEnfermeria = {
  id: "enfermeria",
  titulo: "Enfermería",
  fundamento_legal: "NOM-004-SSA3-2012, NOM-019-SSA3-2013 (práctica de enfermería), NOM-022-SSA3-2012 (accesos vasculares).",
  secciones: [
    {
      id: "ficha_identificacion_enf",
      titulo: "A. Ficha de Identificación",
      campos: [
        { id: "enf_1", label: "Nombre(s) completo(s)", type: "text", required: true },
        { id: "enf_2", label: "Apellido paterno", type: "text", required: true },
        { id: "enf_3", label: "Apellido materno", type: "text" },
        { id: "enf_4", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "enf_5", label: "Edad", type: "number_readonly" },
        { id: "enf_6", label: "Sexo", type: "select", options: ["Hombre", "Mujer"] },
        { id: "enf_7", label: "CURP", type: "text" },
        { id: "enf_8", label: "Domicilio completo", type: "textarea" },
        { id: "enf_9", label: "Teléfono de contacto", type: "tel", required: true },
        { id: "enf_10", label: "Nombre contacto de emergencia", type: "text", required: true },
        { id: "enf_11", label: "Teléfono de emergencia", type: "tel", required: true },
        { id: "enf_12", label: "Médico tratante (referencia o indicación)", type: "text" },
        { id: "enf_13", label: "Motivo del servicio", type: "select", options: ["Curación", "Administración de medicamento", "Toma de signos vitales", "Cuidado de paciente encamado", "Aplicación de vacuna", "Otro"] },
        { id: "enf_14", label: "Fecha del servicio", type: "date" },
        { id: "enf_15", label: "Nombre del profesional de enfermería", type: "text", required: true },
        { id: "enf_16", label: "Cédula profesional", type: "text" },
        { id: "enf_17", label: "Tipo de servicio", type: "select", options: ["Consulta en domicilio", "Consulta en consultorio", "Atención en institución"] }
      ]
    },
    {
      id: "antecedentes_enf",
      titulo: "B. Antecedentes para el Cuidado",
      campos: [
        { id: "enf_18", label: "Enfermedades crónicas", type: "multiselect", options: ["Diabetes", "Hipertensión", "Cardiopatías", "Enf. Renal", "EPOC", "Ninguna", "Otra"] },
        { id: "enf_19", label: "Alergias (medicamentos, látex, yodo)", type: "boolean_textarea", text_label: "Especificar alergias" },
        { id: "enf_20", label: "Medicamentos de uso actual (dosis/horario)", type: "textarea" },
        { id: "enf_21", label: "Independencia funcional", type: "select", options: ["Independiente", "Requiere ayuda parcial", "Dependiente total"] },
        { id: "enf_22", label: "Movilidad", type: "select", options: ["Ambulatorio", "Requiere apoyo para deambular", "Encamado"] },
        { id: "enf_23", label: "Heridas, úlceras o sondas", type: "boolean_textarea", text_label: "Especificar tipo y ubicación" },
        { id: "enf_24", label: "Antecedente de caídas recientes", type: "boolean_textarea", text_label: "Fecha y circunstancias" },
        { id: "enf_25", label: "Estado de vacunación relevante", type: "textarea" },
        { id: "enf_26", label: "Antecedentes psicosociales (vive solo, cuidador)", type: "textarea" }
      ]
    },
    {
      id: "valoracion_enf",
      titulo: "C. Valoración de Enfermería al Momento",
      campos: [
        { id: "enf_27", label: "Motivo específico de la atención", type: "textarea", required: true },
        { id: "enf_28", label: "Indicación médica (si aplica)", type: "textarea" },
        { id: "enf_29", label: "Estado general del paciente", type: "textarea" },
        { id: "enf_30", label: "Estado de conciencia", type: "select", options: ["Alerta", "Somnoliento", "Confuso", "Inconsciente"] },
        { id: "enf_31", label: "Presión arterial (mmHg)", type: "text" },
        { id: "enf_32", label: "Frecuencia cardiaca (lpm)", type: "number" },
        { id: "enf_33", label: "Frecuencia respiratoria (rpm)", type: "number" },
        { id: "enf_34", label: "Temperatura (°C)", type: "number" },
        { id: "enf_35", label: "Saturación de oxígeno (%)", type: "number" },
        { id: "enf_36", label: "Glucosa capilar (mg/dL)", type: "number" },
        { id: "enf_37", label: "Escala de dolor (0-10)", type: "scale", min: 0, max: 10 },
        { id: "enf_38", label: "Peso (kg)", type: "number" },
        { id: "enf_39", label: "Estado de piel y mucosas", type: "textarea" },
        { id: "enf_40", label: "Riesgo de caídas (Escala de Downton/otra)", type: "text" },
        { id: "enf_41", label: "Riesgo de úlceras (Norton/Braden)", type: "text" }
      ]
    },
    {
      id: "procedimiento_enf",
      titulo: "D. Procedimiento Realizado y Diagnósticos NANDA",
      campos: [
        { id: "enf_42", label: "Tipo de procedimiento", type: "select", options: ["Adm. medicamento", "Curación", "Toma muestra lab.", "Sonda", "Vacuna", "Canalización vía periférica", "Higiene", "Educación salud", "Otro"] },
        { id: "enf_43", label: "Medicamento administrado (Nombre/dosis/hora)", type: "textarea" },
        { id: "enf_44", label: "Vía de administración", type: "select", options: ["Oral", "IM", "IV", "Subcutánea", "Tópica", "Inhalada", "Rectal", "N/A"] },
        { id: "enf_45", label: "Sitio de punción/aplicación", type: "text" },
        { id: "enf_46", label: "Lote y caducidad de material/medicamento", type: "text" },
        { id: "enf_47", label: "Material utilizado en curaciones", type: "textarea" },
        { id: "enf_48", label: "Características de la herida", type: "textarea", placeholder: "Tamaño, exudado, signos de infección..." },
        { id: "enf_49", label: "Reacciones durante el procedimiento", type: "boolean_textarea", text_label: "Describir" },
        { id: "enf_50", label: "Diagnóstico(s) NANDA", type: "textarea" },
        { id: "enf_51", label: "Intervenciones planeadas (NIC)", type: "textarea" }
      ]
    },
    {
      id: "plan_cuidados_enf",
      titulo: "E. Plan de Cuidados y Evolución",
      campos: [
        { id: "enf_52", label: "Educación brindada a paciente/cuidador", type: "textarea" },
        { id: "enf_53", label: "Recomendaciones de cuidado en casa", type: "textarea" },
        { id: "enf_54", label: "Signos de alarma (contactar a urgencias)", type: "textarea" },
        { id: "enf_55", label: "Próxima visita o seguimiento", type: "date" },
        { id: "enf_56", label: "Nota de evolución / visita actual", type: "textarea", placeholder: "Resumen de la atención brindada hoy" },
        { id: "enf_57", label: "Firma del profesional de enfermería", type: "signature" }
      ]
    }
  ],
  consentimiento: {
    titulo: "CARTA DE CONSENTIMIENTO INFORMADO PARA PROCEDIMIENTOS DE ENFERMERÍA",
    fundamento: "NOM-004-SSA3-2012 y NOM-019-SSA3-2013 para la práctica de enfermería.",
    texto: "Declaro que el profesional de enfermería me ha explicado de manera clara el procedimiento a realizar (curación, administración de medicamentos, canalización, toma de muestras, etc.).\n\nEntiendo que:\n1. Los procedimientos invasivos conllevan riesgos menores (dolor, hematoma, reacción local).\n2. El profesional actúa conforme a indicación médica vigente cuando esto aplique.\n3. He informado verazmente sobre mis alergias (medicamentos, látex, yodo).\n4. Debo notificar a urgencias si presento fiebre, inflamación extrema o reacciones adversas en casa.\n\nOTORGO MI CONSENTIMIENTO informado para recibir la atención de enfermería.",
    campos: [
      { id: "enf_c1", label: "Nombre del paciente o representante", type: "text", required: true },
      { id: "enf_c2", label: "Relación del firmante", type: "select", options: ["Paciente", "Padre", "Madre", "Tutor", "Representante legal"] },
      { id: "enf_c3", label: "Procedimiento específico autorizado", type: "textarea", required: true },
      { id: "enf_c4", label: "¿Se verificó indicación médica previa?", type: "radio", options: ["Sí", "No", "No aplica"] },
      { id: "enf_c5", label: "¿Se confirmó ausencia de alergias previo al acto?", type: "radio", options: ["Sí", "No"] },
      { id: "enf_c6", label: "Firma del paciente o representante", type: "signature", required: true },
      { id: "enf_c7", label: "Firma de Enfermería", type: "signature", required: true }
    ]
  }
};
