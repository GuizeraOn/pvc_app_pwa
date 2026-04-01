import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Smartphone, 
  Share, 
  PlusSquare, 
  MoreVertical, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  Info,
  ShieldCheck,
  Zap,
  Layout
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const PwaInstallPrompt = () => {
  const { isInstallModalOpen, closeInstallModal } = useConfig();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState({
    isIos: false,
    isSafari: false,
    isStandalone: false,
    canPrompt: false
  });
  const [showHelp, setShowHelp] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(userAgent);
    const isSafari = /safari/.test(userAgent) && !/chrome|crios|fxios/.test(userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    
    setDeviceInfo({ isIos, isSafari, isStandalone, canPrompt: false });
    
    if (isStandalone) setInstalled(true);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setDeviceInfo(prev => ({ ...prev, canPrompt: true }));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      setShowHelp(true);
      return;
    }
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setInstalled(true);
      setDeferredPrompt(null);
    }
  };

  const toggleAudio = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    let text = "";
    if (deviceInfo.isIos) {
      text = "Para guardar esta app en tu pantalla de inicio: Paso 1. Toca el botón de compartir, es el cuadrito con una flecha hacia arriba. Paso 2. Busca la opción 'Agregar a pantalla de inicio'. Paso 3. Toca agregar arriba a la derecha. Listo.";
    } else {
      text = "Para guardar esta app: Paso 1. Toca los tres puntos en la esquina superior. Paso 2. Elige instalar aplicación o agregar a pantalla de inicio. Paso 3. Confirma la instalación. Listo.";
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!isInstallModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] flex items-end justify-center">
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
          className="w-full max-w-md bg-slate-900 border-t border-slate-800 rounded-t-[3rem] p-8 pb-12 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar"
        >
          {/* Top Notch/Drag Handle for Sheet Feel */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-slate-800 rounded-full" />

          {/* Close button - larger for seniors */}
          <button 
            onClick={closeInstallModal}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-slate-800/50 rounded-full text-slate-500 hover:text-slate-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {!installed ? (
            <div className="space-y-8 pt-4">
              {/* Header section */}
              <div className="space-y-3 pr-8">
                <div className="flex items-center space-x-2 text-emerald-400">
                   <Smartphone className="w-4 h-4" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em]">Acceso Directo</span>
                </div>
                <h3 className="text-2xl font-black text-slate-50 leading-tight uppercase tracking-tight">
                  Cómo guardar esta app en tu pantalla de inicio
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-bold">
                  No necesitas descargar nada desde App Store o Play Store.
                </p>
              </div>

              {/* Benefits Pills */}
              <div className="flex flex-wrap gap-2">
                 <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full flex items-center space-x-2">
                    <Zap className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Abre más rápido</span>
                 </div>
                 <div className="bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Siempre a la vista</span>
                 </div>
              </div>

              {/* Step By Step Guide */}
              <div className="space-y-4">
                {deviceInfo.isIos ? (
                  /* iOS / Safari Mode */
                  <>
                    <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Pasos para iPhone:</h4>
                    <StepCard 
                      number="1" 
                      title="Toca el botón de compartir" 
                      desc="Es el botón con un cuadrito y una flecha arriba." 
                      icon={Share}
                      iconColor="blue-400"
                    />
                    <StepCard 
                      number="2" 
                      title="Toca 'Agregar a pantalla de inicio'" 
                      desc="Si no lo ves de inmediato, desliza hacia abajo." 
                      icon={PlusSquare}
                      iconColor="slate-300"
                    />
                    <StepCard 
                      number="3" 
                      title="Toca 'Agregar'" 
                      desc="Listo. La app aparecerá junto a tus otras aplicaciones." 
                      icon={CheckCircle2}
                      iconColor="emerald-400"
                    />
                  </>
                ) : deviceInfo.canPrompt ? (
                  /* Native Android Prompt */
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-[2rem] text-center space-y-6">
                     <div className="w-16 h-16 bg-emerald-500 rounded-[1.5rem] mx-auto flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                        <Smartphone className="w-8 h-8 text-slate-950" />
                     </div>
                     <p className="text-sm font-bold text-slate-300 leading-relaxed px-4">
                        Tu celular permite la instalación directa. Toca el botón de abajo para empezar.
                     </p>
                     <button 
                       onClick={handleInstallClick}
                       className="w-full bg-emerald-500 text-slate-950 font-black py-5 rounded-2xl shadow-xl shadow-emerald-500/20 active:scale-95 transition-all text-sm uppercase tracking-widest"
                     >
                       Instalar ahora
                     </button>
                  </div>
                ) : (
                  /* Manual Android Fallback */
                  <>
                    <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Pasos para Android:</h4>
                    <StepCard 
                      number="1" 
                      title="Toca el menú del navegador" 
                      desc="Normalmente son 3 puntos en la esquina derecha." 
                      icon={MoreVertical}
                      iconColor="slate-300"
                    />
                    <StepCard 
                      number="2" 
                      title="Busca 'Instalar aplicación'" 
                      desc="O también 'Agregar a pantalla de inicio'." 
                      icon={PlusSquare}
                      iconColor="blue-400"
                    />
                    <StepCard 
                      number="3" 
                      title="Confirma el proceso" 
                      desc="La app aparecerá en tu pantalla principal en segundos." 
                      icon={CheckCircle2}
                      iconColor="emerald-400"
                    />
                  </>
                )}
              </div>

              {/* Reassurance Block */}
              <div className="bg-slate-950/40 p-5 rounded-3xl border border-slate-800/50 flex items-start space-x-3">
                 <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                 <p className="text-[11px] text-slate-500 font-bold leading-relaxed tracking-tight">
                   Esta es una forma segura de guardar la guía. No ocupa espacio significativo y no tiene costo adicional.
                 </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-2">
                {!deviceInfo.canPrompt && (
                   <button 
                    onClick={closeInstallModal}
                    className="w-full bg-slate-50 text-slate-950 font-black py-5 rounded-2xl shadow-2xl active:scale-95 transition-all text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2"
                  >
                    <span>Entendido, lo haré ahora</span>
                  </button>
                )}

                <div className="flex flex-col space-y-3">
                   <button 
                    onClick={toggleAudio}
                    className="flex items-center justify-center space-x-2 py-2 text-slate-500 hover:text-emerald-400 transition-colors group"
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 group-hover:animate-bounce" />}
                    <span className="text-[10px] font-black uppercase tracking-widest">{isSpeaking ? 'Detener lectura' : 'Escuchar instrucciones'}</span>
                  </button>

                  <button 
                    onClick={() => setShowHelp(!showHelp)}
                    className="flex items-center justify-center space-x-2 py-1 text-slate-700 hover:text-slate-500 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-center">No encuentro la opción</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Already Installed State */
            <div className="flex flex-col items-center text-center space-y-6 pt-10 pb-4">
               <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center border-4 border-emerald-500 shadow-2xl shadow-emerald-500/20 relative">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-emerald-500 text-slate-950 px-2 py-1 rounded-full text-[10px] font-black"
                  >
                    LISTO
                  </motion.div>
               </div>
               <div className="space-y-2">
                 <h3 className="text-xl font-black text-slate-50 uppercase tracking-tight leading-none">¡App Instalada!</h3>
                 <p className="text-slate-400 text-[13px] font-bold leading-relaxed max-w-[240px]">
                   Ya puedes abrir Visión Clara desde tu pantalla de inicio como cualquier otra app.
                 </p>
               </div>
               <button 
                onClick={closeInstallModal}
                className="w-full bg-emerald-500 text-slate-950 font-black py-4 rounded-2xl active:scale-95 transition-all text-xs uppercase tracking-widest"
               >
                 Continuar
               </button>
            </div>
          )}

          {/* Help Panel Overlay */}
          <AnimatePresence>
            {showHelp && (
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="absolute inset-0 bg-slate-900 z-50 p-10 flex flex-col items-center text-center space-y-8"
              >
                <div className="w-16 h-16 bg-blue-500/10 rounded-[1.5rem] flex items-center justify-center">
                   <Info className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="text-xl font-black text-slate-50 uppercase leading-tight">¿No ves la opción?</h4>
                <div className="space-y-4 text-left w-full">
                   <HelpBullet text="Asegúrate de estar usando el navegador principal (Safari en iPhone, Chrome en Android)." />
                   <HelpBullet text="Abre esta página directamente, no desde redes sociales como Facebook o Instagram." />
                   <HelpBullet text="A veces necesitas deslizar hacia abajo en el menú para encontrar la opción." />
                   <HelpBullet text="Si ya la instalaste, búscala en tu pantalla principal." />
                </div>
                <button 
                  onClick={() => setShowHelp(false)}
                  className="w-full bg-slate-800 text-slate-50 font-black py-5 rounded-2xl transition-all active:scale-95 text-xs uppercase tracking-widest"
                >
                  Volver a los pasos
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const StepCard = ({ number, title, desc, icon: Icon, iconColor }) => (
  <div className="flex items-start space-x-5 bg-slate-950/20 p-5 rounded-[2rem] border border-slate-800 transition-all hover:border-slate-700 group">
    <div className="w-10 h-10 shrink-0 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center relative shadow-xl overflow-hidden">
       <span className="text-[10px] font-black text-slate-700 absolute -bottom-1 -right-1 group-hover:scale-110 transition-transform">#{number}</span>
       <div className={`p-2 rounded-lg bg-${iconColor}/5`}>
          <Icon className={`w-5 h-5 text-${iconColor}`} />
       </div>
    </div>
    <div className="flex flex-col space-y-1">
      <span className="text-xs font-black text-slate-50 uppercase tracking-tight leading-none">{title}</span>
      <p className="text-[10px] text-slate-500 font-bold leading-snug tracking-tight">{desc}</p>
    </div>
  </div>
);

const HelpBullet = ({ text }) => (
  <div className="flex items-start space-x-3">
     <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
     <p className="text-xs text-slate-400 font-bold leading-relaxed">{text}</p>
  </div>
);
