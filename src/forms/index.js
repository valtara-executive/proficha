import { formEntrenamiento } from './form_entrenamiento';
import { formYoga } from './form_yoga';
import { formArtesMarciales } from './form_artes_marciales';
import { formVeterinaria } from './form_veterinaria';
// ... Aquí importarás todos los demás conforme los vayas creando

export const allForms = {
  entrenamiento: formEntrenamiento,
  yoga: formYoga,
  artes_marciales: formArtesMarciales,
  veterinaria: formVeterinaria,
  // ... Aquí agregarás las llaves de los otros
};
