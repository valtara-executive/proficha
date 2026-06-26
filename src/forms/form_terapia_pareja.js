export const formTerapiaPareja = {
  id: "terapia_pareja",
  titulo: "Terapia / Acompañamiento de Pareja",
  fundamento_legal: "Servicio de facilitación de diálogo y fortalecimiento vincular. NO sustituye la atención psicológica clínica individual. (Versión 2026).",
  secciones: [
    {
      id: "datos_integrantes_tpa",
      titulo: "A. Datos de los Integrantes",
      campos: [
        { id: "tpa_1", label: "Nombre completo Integrante 1", type: "text", required: true },
        { id: "tpa_2", label: "Edad Integrante 1", type: "number", required: true },
        { id: "tpa_3", label: "Teléfono Integrante 1", type: "tel", required: true },
        { id: "tpa_4", label: "Ocupación Integrante 1", type: "text" },
        { id: "tpa_5", label: "Nombre completo Integrante 2", type: "text", required: true },
        { id: "tpa_6", label: "Edad Integrante 2", type: "number", required: true },
        { id: "tpa_7", label: "Teléfono Integrante 2", type: "tel", required: true },
        { id: "tpa_8", label: "Ocupación Integrante 2", type: "text" }
      ]
    },
    {
      id: "datos_relacion_tpa",
      titulo: "B. Datos de la Relación",
      campos: [
        { id: "tpa_9", label: "Tiempo de relación", type: "text", required: true },
        { id: "tpa_10", label: "Tipo de vínculo", type: "select", options: ["Matrimonio", "Unión libre", "Noviazgo", "Separados (Co-parentalidad)", "Otro"] },
        { id: "tpa_11", label: "Hijos en común (Edades)", type: "text", placeholder: "Ej. Sí, 2 hijos (5 y 8 años) / No" },
        { id: "tpa_12", label: "Modalidad de sesión preferida", type: "select", options: ["Presencial", "En línea"] },
        { id: "tpa_13", label: "¿Han tenido procesos de pareja anteriores?", type: "boolean_textarea", text_label: "¿Resultado?" },
        { id: "tpa_14", label: "¿Alguno tiene proceso psicológico individual activo?", type: "radio", options: ["Ambos", "Solo Integrante 1", "Solo Integrante 2", "Ninguno"] }
      ]
    },
    {
      id: "motivo_consulta_tpa",
      titulo: "C. Motivo de Consulta",
      campos: [
        { id: "tpa_15", label: "Motivo principal expresado por la pareja", type: "textarea", required: true },
        { id: "tpa_16", label: "Tiempo de evolución de esta situación", type: "text" },
        { id: "tpa_17", label: "Nivel de compromiso Integrante 1 (1-10)", type: "scale", min: 1, max: 10 },
        { id: "tpa_18", label: "Nivel de compromiso Integrante 2 (1-10)", type: "scale", min: 1, max: 10 },
        { id: "tpa_19", label: "Objetivo conjunto que desean alcanzar", type: "textarea", required: true }
      ]
    },
    {
      id: "entrevista_tpa",
      titulo: "D. Entrevista Inicial",
      campos: [
        { id: "tpa_20", label: "¿Cómo describirían el estado actual de su relación en una frase?", type: "textarea" },
        { id: "tpa_21", label: "¿Han intentado resolver esto solos? ¿Qué pasó?", type: "textarea" },
        { id: "tpa_22", label: "¿Qué es lo que más valoran de la relación?", type: "textarea" },
        { id: "tpa_23", label: "¿Existen o han existido episodios de violencia? (Confidencial)", type: "boolean_textarea", text_label: "Describir brevemente (Aplicar protocolo si es afirmativo)" },
        { id: "tpa_24", label: "¿Existe consumo de sustancias que afecte la dinámica?", type: "radio", options: ["Sí", "No"] }
      ]
    }
  ],
  consentimiento: {
    titulo: "ACUERDO DE SERVICIO DE ACOMPAÑAMIENTO DE PAREJA Y EXENCIÓN DE RESPONSABILIDAD CIVIL",
    fundamento: "Servicio: Terapia / Acompañamiento de Pareja (Versión 2026)",
    texto: "Nosotros, [Integrante 1] e [Integrante 2], mayores de edad, manifestamos:\n\n1. NATURALEZA DEL SERVICIO\nEntendemos que el acompañamiento de pareja es un proceso de facilitación del diálogo, la comprensión mutua y el fortalecimiento del vínculo. El terapeuta actúa como guía neutral y NO toma partido. Este servicio NO sustituye la atención psicológica clínica individual.\n\n2. PARTICIPACIÓN VOLUNTARIA\nAmbos participamos de manera libre y voluntaria. Entendemos que el proceso requiere disposición genuina de ambas partes.\n\n3. CONFIDENCIALIDAD\nLa información compartida en sesiones conjuntas es confidencial entre los tres. En caso de sesiones individuales dentro del proceso, el terapeuta mantendrá la confidencialidad de cada persona, salvo que haya acuerdo explícito de compartir información con la otra parte.\n\n4. PROTOCOLO DE SEGURIDAD\nSi el terapeuta detecta indicios de violencia activa o riesgo de daño, se aplicará un protocolo de orientación hacia recursos especializados, y el proceso de pareja podrá suspenderse.\n\n5. EXENCIÓN DE RESPONSABILIDAD CIVIL\nLiberamos al terapeuta y al centro de responsabilidad civil por las decisiones individuales o conjuntas que tomemos como resultado del proceso, incluidas decisiones sobre la continuidad o término de la relación. Dichas decisiones son de exclusiva responsabilidad de cada integrante.\n\n6. RESULTADOS NO GARANTIZADOS\nEntendemos que el proceso no garantiza un resultado específico y que los avances dependen de nosotros.",
    campos: [
      { id: "tpa_c1", label: "Nombre Integrante 1", type: "text", required: true },
      { id: "tpa_c2", label: "Firma Integrante 1", type: "signature", required: true },
      { id: "tpa_c3", label: "Nombre Integrante 2", type: "text", required: true },
      { id: "tpa_c4", label: "Firma Integrante 2", type: "signature", required: true },
      { id: "tpa_c5", label: "Fecha de autorización", type: "date", required: true },
      { id: "tpa_c6", label: "Firma del Terapeuta / Facilitador", type: "signature", required: true }
    ]
  }
};
