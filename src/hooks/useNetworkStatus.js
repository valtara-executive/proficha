import { useState, useEffect } from 'react';
import { Network } from '@capacitor/network';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Revisar el estado inicial al arrancar
    const checkInitialStatus = async () => {
      const status = await Network.getStatus();
      setIsOnline(status.connected);
    };

    checkInitialStatus();

    // Dejar un espía escuchando si el usuario apaga o prende el Wi-Fi/Datos
    const networkListener = Network.addListener('networkStatusChange', (status) => {
      setIsOnline(status.connected);
    });

    // Limpieza al desmontar para no saturar memoria
    return () => {
      networkListener.then(listener => listener.remove());
    };
  }, []);

  return { isOnline };
};
