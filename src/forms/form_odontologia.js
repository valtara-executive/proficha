export const formOdontologia = {
  id: "odontologia",
  titulo: "Odontología",
  fundamento_legal: "NOM-004-SSA3-2012, NOM-013-SSA2-2015 (prevención y control de enfermedades bucales), NOM-087-SEMARNAT-SSA1-2002.",
  secciones: [
    {
      id: "ficha_identificacion_odo",
      titulo: "A. Ficha de Identificación del Paciente",
      campos: [
        { id: "odo_1", label: "Nombre(s) completo(s)", type: "text", required: true },
        { id: "odo_2", label: "Apellido paterno", type: "text", required: true },
        { id: "odo_3", label: "Apellido materno", type: "text" },
        { id: "odo_4", label: "Fecha de nacimiento", type: "date", required: true },
        { id: "odo_5", label: "Edad", type: "number_readonly" },
        { id: "odo_6", label: "Sexo", type: "select", options: ["Hombre", "Mujer"] },
        { id: "odo_7", label: "CURP", type: "text" },
        { id: "odo_8", label: "Ocupación", type: "text" },
        { id: "odo_9", label: "Domicilio completo", type: "textarea" },
        { id: "odo_10", label: "Teléfono de contacto", type: "tel", required: true },
        { id: "odo_11", label: "Correo electrónico", type: "email" },
        { id: "odo_12", label: "Nombre contacto de emergencia", type: "text", required: true },
        { id: "odo_13", label: "Teléfono del contacto de emergencia", type: "tel", required: true },
        { id: "odo_14", label: "Médico tratante (si existe)", type: "text" },
        { id: "odo_15", label: "Fecha de la primera consulta", type: "date" },
        { id: "odo_16", label: "Nombre del odontólogo(a)", type: "text", required: true },
        { id: "odo_17", label: "Cédula profesional", type: "text" },
        { id: "odo_18", label: "Fecha de la última visita dental previa", type: "date" }
      ]
    },
    {
      id: "antecedentes_odo",
      titulo: "B. Antecedentes",
      campos: [
        { id: "odo_19", label: "¿Familiar 1er grado con enf. periodontal/pérdida temprana?", type: "boolean_text", text_label: "Parentesco" },
        { id: "odo_20", label: "¿Familiar 1er grado con cáncer oral?", type: "boolean_text", text_label: "Parentesco" },
        { id: "odo_21", label: "Tabaquismo", type: "boolean_text", text_label: "Cigarrillos al día y años" },
        { id: "odo_22", label: "Consumo de alcohol", type: "select", options: ["Nunca", "Ocasional", "Frecuente", "Diario"] },
        { id: "odo_23", label: "Frecuencia de cepillado dental al día", type: "number" },
        { id: "odo_24", label: "Uso de hilo dental", type: "select", options: ["Diario", "Ocasional", "Nunca"] },
        { id: "odo_25", label: "Uso de enjuague bucal", type: "boolean_text", text_label: "Tipo" },
        { id: "odo_26", label: "Hábitos parafuncionales", type: "multiselect", options: ["Bruxismo", "Onicofagia", "Succión digital", "Respiración bucal", "Ninguno"] },
        { id: "odo_27", label: "Consumo de alimentos/bebidas cariogénicas", type: "select", options: ["Frecuente", "Ocasional", "Raro"] },
        { id: "odo_28", label: "Enfermedades sistémicas relevantes", type: "multiselect", options: ["Diabetes", "Hipertensión", "Cardiopatías", "Trastornos coagulación", "Enf. renales", "Enf. hepáticas", "Osteoporosis", "Ninguna", "Otra"] },
        { id: "odo_29", label: "¿Es portador de prótesis valvular cardiaca?", type: "radio", options: ["Sí", "No"] },
        { id: "odo_30", label: "¿Recibe tratamiento con bifosfonatos?", type: "radio", options: ["Sí", "No"] },
        { id: "odo_31", label: "¿Recibe anticoagulantes o antiagregantes?", type: "boolean_text", text_label: "Especificar" },
        { id: "odo_32", label: "Alergias a medicamentos/anestésicos/látex", type: "boolean_textarea", text_label: "Especificar" },
        { id: "odo_33", label: "Cirugías previas relevantes", type: "boolean_textarea", text_label: "Especificar" },
        { id: "odo_34", label: "Tratamientos dentales previos", type: "textarea", placeholder: "Extracciones, endodoncias, implantes..." },
        { id: "odo_35", label: "Reacciones adversas a anestesia local previa", type: "boolean_textarea", text_label: "Especificar" },
        { id: "odo_36", label: "Medicamentos de uso actual", type: "textarea" },
        { id: "odo_37", label: "Embarazo actual", type: "boolean_text", text_label: "Semanas" },
        { id: "odo_38", label: "Lactancia actual", type: "radio", options: ["Sí", "No", "No aplica"] }
      ]
    },
    {
      id: "motivo_consulta_odo",
      titulo: "C. Motivo de Consulta",
      campos: [
        { id: "odo_39", label: "Motivo principal de la consulta", type: "textarea", required: true },
        { id: "odo_40", label: "Tiempo de evolución", type: "text" },
        { id: "odo_41", label: "Presencia de dolor dental actual", type: "boolean_textarea", text_label: "Intensidad y características" },
        { id: "odo_42", label: "Sangrado de encías", type: "boolean_text", text_label: "Frecuencia" },
        { id: "odo_43", label: "Movilidad dental", type: "boolean_text", text_label: "Diente(s) afectado(s)" },
        { id: "odo_44", label: "Halitosis percibida", type: "radio", options: ["Sí", "No"] }
      ]
    },
    {
      id: "exploracion_odo",
      titulo: "D. Exploración Clínica Bucodental",
      campos: [
        { id: "odo_45", label: "Exploración extraoral (ATM, ganglios)", type: "textarea" },
        { id: "odo_46", label: "Apertura bucal máxima (mm)", type: "number" },
        { id: "odo_47", label: "Chasquidos o dolor en ATM", type: "select", options: ["No", "Derecho", "Izquierdo", "Bilateral"] },
        { id: "odo_48", label: "Exploración de tejidos blandos", type: "textarea" },
        { id: "odo_49", label: "Lesiones en mucosa oral", type: "boolean_textarea", text_label: "Descripción y tamaño" },
        { id: "odo_50", label: "Odontograma y estado dental general", type: "textarea", placeholder: "Descripción por piezas (sano, cariado, ausente...)" },
        { id: "odo_51", label: "Índice de placa dentobacteriana", type: "text" },
        { id: "odo_52", label: "Índice gingival / sangrado al sondeo", type: "text" },
        { id: "odo_53", label: "Profundidad de sondeo periodontal", type: "textarea" },
        { id: "odo_54", label: "Recesiones gingivales", type: "boolean_text", text_label: "Piezas afectadas" },
        { id: "odo_55", label: "Oclusión dental (Angle)", type: "textarea" },
        { id: "odo_56", label: "Maloclusión evidente", type: "boolean_textarea", text_label: "Descripción" }
      ]
    },
    {
      id: "diag_plan_odo",
      titulo: "E. Estudios, Diagnóstico y Plan",
      campos: [
        { id: "odo_57", label: "Radiografías solicitadas/aportadas", type: "textarea" },
        { id: "odo_58", label: "Hallazgos radiográficos", type: "textarea" },
        { id: "odo_59", label: "Diagnóstico por pieza o región", type: "textarea", required: true },
        { id: "odo_60", label: "Diagnóstico periodontal/oclusión", type: "textarea" },
        { id: "odo_61", label: "Plan de tratamiento por fases", type: "textarea", required: true },
        { id: "odo_62", label: "Procedimientos a realizar por pieza", type: "textarea" },
        { id: "odo_63", label: "Número de citas estimado", type: "number" },
        { id: "odo_64", label: "Tipo de anestesia a utilizar", type: "text" },
        { id: "odo_65", label: "Medicación prescrita", type: "textarea" },
        { id: "odo_66", label: "Indicaciones post-tratamiento", type: "textarea" },
        { id: "odo_67", label: "Presupuesto estimado", type: "number" },
        { id: "odo_68", label: "¿Requiere referencia a especialista?", type: "boolean_text", text_label: "Especialidad" }
      ]
    },
    {
      id: "nota_evolucion_odo",
      titulo: "H. Nota de Evolución (Citas subsecuentes)",
      campos: [
        { id: "odo_69", label: "Fecha de la cita", type: "date" },
        { id: "odo_70", label: "Procedimiento realizado", type: "textarea" },
        { id: "odo_71", label: "Pieza(s) tratada(s)", type: "text" },
        { id: "odo_72", label: "Material(es) utilizado(s)", type: "text" },
        { id: "odo_73", label: "Incidentes durante el procedimiento", type: "textarea" },
        { id: "odo_74", label: "Indicaciones dadas al paciente", type: "textarea" },
        { id: "odo_75", label: "Firma del odontólogo(a)", type: "signature" }
      ]
    }
  ],
  consentimiento: {
    titulo: "CARTA DE CONSENTIMIENTO INFORMADO PARA TRATAMIENTO ODONTOLÓGICO",
    fundamento: "NOM-004-SSA3-2012 y NOM-013-SSA2-2015 para la prevención y control de enfermedades bucales.",
    texto: "Declaro que el odontólogo(a) me ha explicado mi diagnóstico bucodental y el tratamiento propuesto.\n\nEntiendo que:\n1. Los procedimientos dentales (extracciones, endodoncias, implantes) conllevan riesgos como molestia, sangrado, infección o lesión a estructuras adyacentes.\n2. La anestesia local tiene riesgos infrecuentes como reacción alérgica o parestesia.\n3. Debo cumplir los cuidados posteriores para favorecer la recuperación.\n4. He informado sobre medicamentos (ej. bifosfonatos, anticoagulantes) que puedan afectar el procedimiento.\n\nOTORGO MI CONSENTIMIENTO informado para el tratamiento odontológico.",
    campos: [
      { id: "odo_c1", label: "Nombre del paciente o representante", type: "text", required: true },
      { id: "odo_c2", label: "Relación del firmante", type: "select", options: ["Paciente", "Padre", "Madre", "Tutor legal"] },
      { id: "odo_c3", label: "Procedimiento específico autorizado", type: "textarea", required: true },
      { id: "odo_c4", label: "¿Se utilizará anestesia local?", type: "radio", options: ["Sí", "No"] },
      { id: "odo_c5", label: "¿Se informaron riesgos de anticoagulantes/bifosfonatos?", type: "radio", options: ["Sí", "No", "No aplica"] },
      { id: "odo_c6", label: "Firma del paciente o representante", type: "signature", required: true },
      { id: "odo_c7", label: "Firma del odontólogo(a)", type: "signature", required: true }
    ]
  }
};
