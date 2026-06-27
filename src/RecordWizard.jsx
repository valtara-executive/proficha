/**
 * ProFicha — RecordWizard.jsx
 * Puente entre el dashboard principal y el motor de formularios.
 * Se invoca desde la vista de Expedientes cuando se crea uno nuevo.
 *
 * USO en ProFicha.jsx:
 *   import { RecordWizard } from './src/RecordWizard.jsx';
 *   {wizardOpen && (
 *     <RecordWizard
 *       sectorId={wizardSector}
 *       patientName={wizardPatient}
 *       profile={profile}
 *       onClose={() => setWizardOpen(false)}
 *       onComplete={(record) => {
 *         setRecords(prev => [record, ...prev]);
 *         setWizardOpen(false);
 *         showToast("Expediente guardado ✓");
 *       }}
 *     />
 *   )}
 */

export { FormEngine as RecordWizard } from './FormEngine.jsx';
