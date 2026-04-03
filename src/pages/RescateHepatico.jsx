import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Moon,
  Sun,
  Eye,
  Heart,
  X,
  Maximize2,
  BookOpen,
  AlertTriangle,
  Book
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

const PremiumCard = ({ title, description, file, icon: Icon, color, onOpen }) => (
  <button 
    onClick={() => onOpen({ title, file })}
    className="group relative block w-full text-left"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-[2.5rem] opacity-20 group-hover:opacity-40 transition duration-500 blur-sm" />
    <div className="relative flex flex-col p-6 glass-card rounded-[2.5rem] bg-slate-900/80 border-slate-700/50 hover:bg-slate-950 transition-all duration-500 overflow-hidden h-full">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/5 blur-[40px] -z-10`} />
      
      <div className="flex items-start justify-between mb-6">
        <div className={`w-14 h-14 bg-${color}-500/10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3`}>
          <Icon className={`w-7 h-7 text-${color}-400 group-hover:scale-110 active:rotate-12 transition-all duration-500`} />
        </div>
        <div className="flex items-center space-x-1 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Premium</span>
        </div>
      </div>

      <div className="space-y-2 flex-grow">
        <h3 className="text-lg font-black text-slate-50 uppercase tracking-tight leading-tight group-hover:text-emerald-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">
          {description}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Abrir Guía</span>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-700 group-hover:translate-x-1 group-hover:text-emerald-500 transition-all" />
      </div>
    </div>
  </button>
);

const RescateHepatico = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const { setIsFloatingButtonHidden } = useConfig();

  useEffect(() => {
    if (selectedPdf) {
      setIsFloatingButtonHidden(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsFloatingButtonHidden(false);
      document.body.style.overflow = 'auto';
    }
    return () => {
      setIsFloatingButtonHidden(false);
      document.body.style.overflow = 'auto';
    };
  }, [selectedPdf, setIsFloatingButtonHidden]);

  const materials = [
    {
      title: "Despierta Renovado",
      description: "Tu guía nocturna para el bienestar pasivo. Optimiza tu descanso y regeneración hepática mientras duermes.",
      file: "Despierta-Renovado-Tu-Guia-Nocturna-para-el-Bienestar-Pasivo.pdf",
      icon: Moon,
      color: "blue"
    },
    {
      title: "Vitalidad Matutina",
      description: "Guía de tónicos matutinos para una salud radiante. Activa tu metabolismo desde el primer segundo del día.",
      file: "Despierta-Tu-Vitalidad-Guia-de-Tonicos-Matutinos-para-una-Salud-Radiante.pdf",
      icon: Sun,
      color: "amber"
    },
    {
      title: "Advertencia Dietética",
      description: "Recupera tu vitalidad evitando los enemigos ocultos de tu hígado. Lo que nunca debes comer si quieres sanar.",
      file: "Guia-de-Advertencia-Dietetica-para-la-Salud-Hepatica-Recupera-tu-Vitalidad.pdf",
      icon: ShieldCheck,
      color: "red"
    },
    {
      title: "Salud Hepática y Visual",
      description: "La conexión olvidada entre tu hígado y tus ojos. Potencia ambos de forma 100% natural y efectiva.",
      file: "Potenciando-su-Salud-Hepatica-y-Visual-de-Forma-Natural.pdf",
      icon: Eye,
      color: "emerald"
    }
  ];

  return (
    <div className="relative">
      <AnimatePresence>
        {selectedPdf && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest truncate max-w-[200px]">{selectedPdf.title}</span>
              </div>
              <button 
                onClick={() => setSelectedPdf(null)}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 active:scale-90 transition-all font-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 w-full bg-slate-900 overflow-hidden relative">
               <object 
                data={`/pdfs/${selectedPdf.file}#view=FitH`}
                type="application/pdf"
                className="w-full h-full border-0"
              >
                <div className="flex flex-col items-center justify-center h-full p-10 text-center space-y-6">
                  <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center">
                     <AlertTriangle className="w-10 h-10 text-amber-500" />
                  </div>
                  <div className="space-y-4">
                    <p className="text-slate-100 text-sm font-bold uppercase tracking-widest leading-relaxed">Tu dispositivo no permite la vista previa directa</p>
                    <a href={`/pdfs/${selectedPdf.file}`} download className="bg-emerald-500 text-slate-950 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 inline-block">Descargar para leer</a>
                  </div>
                </div>
              </object>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-10"
      >
        <div className="flex flex-col space-y-3 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 blur-[60px] -z-10" />
          
          <div className="flex items-center space-x-2 text-emerald-400">
             <Zap className="w-5 h-5 fill-emerald-400/20 animate-pulse" />
             <p className="text-[11px] font-black uppercase tracking-[0.2em] leading-none">Contenido Exclusivo</p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tighter text-slate-50 uppercase leading-[0.9]">
              Rescate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">Hepático</span> <br />
              Acelerado
            </h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full" />
          </div>

          <p className="text-slate-400 text-[15px] leading-relaxed max-w-[320px] font-medium italic">
            "El secreto de una visión perfecta comienza con un hígado limpio y revitalizado."
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {materials.map((doc, i) => (
            <PremiumCard 
              key={i}
              title={doc.title}
              description={doc.description}
              file={doc.file}
              icon={doc.icon}
              color={doc.color}
              onOpen={setSelectedPdf}
            />
          ))}
        </div>

        <div className="glass-card p-8 rounded-[3rem] border-slate-800 bg-slate-900/30 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
          <div className="relative flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-800 group-hover:border-emerald-500/30 transition-colors">
              <Heart className="w-8 h-8 text-emerald-500 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-black text-slate-100 uppercase tracking-widest">¿Necesitas ajuda?</h4>
              <p className="text-[12px] text-slate-500 leading-relaxed px-4">
                Nuestro equipo de soporte está disponible 24/7 para ayudarte con tu proceso de desintoxicación.
              </p>
            </div>
            <button className="px-8 py-3 bg-slate-50 text-slate-950 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 hover:text-emerald-950 transition-all duration-300">
              Contactar Soporte
            </button>
          </div>
        </div>

        <div className="pt-2 flex flex-col items-center space-y-4 opacity-30 pb-10">
           <div className="w-12 h-[1px] bg-slate-800" />
           <span className="text-[8px] font-bold uppercase tracking-[0.3em]">Protocolo Visión Clara © 2024</span>
        </div>
      </motion.div>
    </div>
  );
};

export default RescateHepatico;
