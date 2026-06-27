export const formVeterinaria = {
  id: "veterinaria",
  titulo: "Medicina Veterinaria",
  fundamento_legal: "Ley Federal de Sanidad Animal.",
  secciones: [
    {
      id: "datos_propietario_vet",
      titulo: "4.1 Datos del Propietario",
      campos: [
        { id: "vet_1", label: "Nombre completo", type: "text", required: true },
        { id: "vet_2", label: "Mascota (Nombre)", type: "text", required: true }
      ]
    },
    {
      id: "historial_medico_vet",
      titulo: "4.4 Historial Médico",
      campos: [
        { id: "vet_3", label: "Vacuna Rabia", type: "date" }
      ]
    }
  ],
  consentimiento: {
    titulo: "CONSENTIMIENTO VETERINARIO",
    texto: "Autorizo los procedimientos médicos...",
    campos: [{ id: "vet_c1", label: "Firma", type: "signature", required: true }]
  }
};
