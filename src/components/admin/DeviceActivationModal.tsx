import React, { useState } from 'react';
import { ShieldCheck, Laptop, Lock, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { activateCurrentDevice } from '../../services/deviceAuth';

interface DeviceActivationModalProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const DeviceActivationModal: React.FC<DeviceActivationModalProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [deviceName, setDeviceName] = useState('Mi Computador');
  const [secretKey, setSecretKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const res = activateCurrentDevice(deviceName, secretKey);
    if (!res.success) {
      setErrorMsg(res.message || 'Clave de seguridad incorrecta.');
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      onSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-md w-full border border-[#E4D9C9] shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 relative">
        <button
          onClick={onCancel}
          className="absolute top-5 right-5 p-2 rounded-full text-[#7A7065] hover:text-[#2D2723] hover:bg-[#EAE2D5] transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="w-12 h-12 rounded-full bg-[#0D9488]/10 text-[#0D9488] inline-flex items-center justify-center mb-3">
            <ShieldCheck className="w-6 h-6" />
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#2D2723]">
            Autorizar este Dispositivo
          </h3>
          <p className="text-xs text-[#7A7065] mt-1.5 leading-relaxed font-light">
            Este proceso vinculará este navegador como equipo autorizado para gestionar la tienda Turquesa.
          </p>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 inline-flex items-center justify-center animate-in zoom-in-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#2D2723]">
              ¡Dispositivo Autorizado con Éxito!
            </h4>
            <p className="text-xs text-[#7A7065]">
              Ahora los 5 clics en la llama abrirán el panel en este equipo.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2723] mb-1.5 flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-[#0D9488]" />
                <span>Nombre del Equipo</span>
              </label>
              <input
                type="text"
                required
                maxLength={60}
                placeholder="Ej. Portátil de la Admin"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4D9C9] text-xs sm:text-sm text-[#2D2723] focus:outline-none focus:border-[#0D9488]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2723] mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#0D9488]" />
                <span>Clave Maestra de Autorización</span>
              </label>
              <input
                type="password"
                required
                placeholder="Ingresa la clave..."
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4D9C9] text-xs sm:text-sm text-[#2D2723] focus:outline-none focus:border-[#0D9488]"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-semibold shadow transition-all active:scale-95 cursor-pointer mt-2"
            >
              Activar este Dispositivo
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
