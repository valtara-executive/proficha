import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.valtara.proficha',
  appName: 'ProFicha',
  webDir: 'dist',
  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      iosIsEncryption: false,
      androidIsEncryption: false,
      androidBiometric: {
        biometricAuth: false,
        biometricTitle : "Verificación de acceso",
        biometricSubTitle : "Inicie sesión para continuar"
      }
    },
    GoogleAuth: {
      scopes: ["profile", "email", "https://www.googleapis.com/auth/drive.file"],
      serverClientId: "1099016850057-v232nk1h4nvnhtu01cf0j5kfan3t0884.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
