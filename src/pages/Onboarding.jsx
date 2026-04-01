import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';
import { 
  Smartphone, 
  CheckCircle2, 
  BookOpen, 
  Wifi, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { setOnboardingDone } = useConfig();
  const navigate = useNavigate();

  const steps = [
    {
      icon: BookOpen,
      title: 'Tu Guía Paso a Paso',
      description: 'Accede a todo el contenido del Protocolo Visión Clara de forma estructurada y fácil de leer. Sin distracciones.',
      color: 'emerald'
    },
    {
      icon: Smartphone,
      title: 'Instala la App',
      description: 'Guarda este acceso directo en tu pantalla de inicio para abrirlo como una aplicación nativa, incluso sin internet.',
      color: 'blue'
    },
    {
      icon: CheckCircle2,
      title: 'Registra tu Avance',
      description: 'Marca cada día completado en el Reto de 30 Días para asegurar que estás siguiendo el ritmo correcto.',
      color: 'purple'
    },
    {
      icon: ShieldCheck,
      title: 'Privacidad Total',
      description: 'Tu progreso y datos se guardan únicamente en este dispositivo. Nadie más tiene acceso a tu información privada.',
      color: 'emerald'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setOnboardingDone(true);
      navigate('/dashboard');
    }
  };

  const current = steps[currentStep];
  const Icon = current.icon;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="flex-1 flex flex-col items-center justify-center space-y-10 text-center max-w-sm"
        >
          <div className="w-32 h-32 bg-emerald-500/10 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-emerald-500/5 relative group">
             <div className="absolute inset-0 bg-emerald-500/10 rounded-[3rem] animate-pulse" />
             <Icon className="w-16 h-16 text-emerald-400 z-10 transition-transform group-hover:scale-110" />
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-black text-slate-50 tracking-tight leading-tight uppercase">
              {current.title}
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              {current.description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="w-full space-y-8 pt-10">
        {/* Progress dots */}
        <div className="flex items-center justify-center space-x-2">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${i === currentStep ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-800'}`} 
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="w-full bg-emerald-500 text-slate-950 font-black py-5 rounded-2xl shadow-2xl shadow-emerald-500/20 active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center justify-center space-x-3 group"
        >
          <span>{currentStep === steps.length - 1 ? 'Empezar ahora' : 'Siguiente'}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {currentStep < steps.length - 1 && (
          <button 
            onClick={() => { setOnboardingDone(true); navigate('/dashboard'); }}
            className="w-full py-2 text-slate-500 hover:text-slate-400 text-xs font-bold uppercase tracking-widest transition-colors"
          >
            Omitir introducción
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
