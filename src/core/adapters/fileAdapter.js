import { Filesystem, Directory } from '@capacitor/filesystem';
import { v4 as uuidv4 } from 'uuid';

class FileAdapter {
  async saveBase64File(base64Data, extension) {
    const fileName = `proficha_adjunto_${uuidv4()}_2026.${extension}`;
    
    try {
      const result = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data,
        recursive: true
      });
      return result.uri; // Devuelve la ruta física en el dispositivo
    } catch (error) {
      console.error('Error guardando archivo localmente:', error);
      throw error;
    }
  }

  async deleteFileByUri(uri) {
    try {
      await Filesystem.deleteFile({
        path: uri
      });
      return true;
    } catch (error) {
      console.error('Error eliminando archivo:', error);
      return false;
    }
  }
}

export const fileAdapter = new FileAdapter();
