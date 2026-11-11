const DEVICE_STORAGE_KEY = 'turquesa_trusted_device_v1';
const ADMIN_MASTER_KEY = '@Gio787*';

export interface DeviceInfo {
  token: string;
  deviceName: string;
  activatedAt: string;
}

export const isDeviceAuthorized = (): boolean => {
  try {
    const raw = localStorage.getItem(DEVICE_STORAGE_KEY);
    if (!raw) return false;
    const data: DeviceInfo = JSON.parse(raw);
    return Boolean(data && data.token && data.token.length >= 16);
  } catch {
    return false;
  }
};

export const getDeviceInfo = (): DeviceInfo | null => {
  try {
    const raw = localStorage.getItem(DEVICE_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const activateCurrentDevice = (
  deviceName: string,
  secretKey: string
): { success: boolean; message?: string } => {
  if (secretKey.trim() !== ADMIN_MASTER_KEY) {
    return { success: false, message: 'Clave de seguridad incorrecta.' };
  }

  const name = deviceName.trim() || 'Computador Administrador';
  const token = `turq_dev_${Date.now()}_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`;

  const info: DeviceInfo = {
    token,
    deviceName: name,
    activatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(DEVICE_STORAGE_KEY, JSON.stringify(info));
    return { success: true };
  } catch {
    return { success: false, message: 'No se pudo guardar la autorización en este navegador.' };
  }
};

export const revokeCurrentDevice = (): void => {
  try {
    localStorage.removeItem(DEVICE_STORAGE_KEY);
    sessionStorage.removeItem('turquesa_admin_logged');
  } catch (e) {
    console.error('Error revoking device', e);
  }
};
