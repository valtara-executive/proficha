import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

class AuthService {
  constructor() {
    this.initialized = false;
    this.USER_KEY = 'proficha_user_profile_2026';
  }

  init() {
    if (!this.initialized && Capacitor.getPlatform() !== 'web') {
      GoogleAuth.initialize({
        clientId: '1099016850057-v232nk1h4nvnhtu01cf0j5kfan3t0884.apps.googleusercontent.com',
        scopes: ['profile', 'email', 'https://www.googleapis.com/auth/drive.file'],
        grantOfflineAccess: true,
      });
      this.initialized = true;
    }
  }

  async login() {
    this.init();
    try {
      const googleUser = await GoogleAuth.signIn();
      
      const userProfile = {
        id: googleUser.id,
        email: googleUser.email,
        name: googleUser.name,
        imageUrl: googleUser.imageUrl,
        accessToken: googleUser.authentication.accessToken,
        refreshToken: googleUser.authentication.refreshToken
      };

      await Preferences.set({
        key: this.USER_KEY,
        value: JSON.stringify(userProfile)
      });

      return userProfile;
    } catch (error) {
      console.error('Error en el inicio de sesión con Google:', error);
      throw error;
    }
  }

  async logout() {
    this.init();
    try {
      await GoogleAuth.signOut();
      await Preferences.remove({ key: this.USER_KEY });
      return true;
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      return false;
    }
  }

  async getCurrentUser() {
    const { value } = await Preferences.get({ key: this.USER_KEY });
    return value ? JSON.parse(value) : null;
  }
}

export const authService = new AuthService();
