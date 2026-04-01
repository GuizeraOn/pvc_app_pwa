import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  FlaskConical, 
  Clock, 
  Sparkles, 
  Volume2, 
  VolumeX,
  Bookmark, 
  CheckCircle,
  Eye,
  BookOpen,
  Maximize2,
  Settings2,
  ArrowRight,
  Trophy,
  X,
  Download,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useConfig } from '../context/ConfigContext';

const ModuleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    bookmarks, toggleBookmark, 
    markModuleComplete, completedModules,
    setIsFloatingButtonHidden
  } = useConfig();
  
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const isCompleted = completedModules.includes(id);
  const isBookmarked = bookmarks.includes(id);

  const getModuleContent = (id) => {
    switch (id) {
      case 'INTRO': return { title: '1. Introducción al Protocolo', icon: BookOpen, summary: 'Bienvenido ao viaje hacia una visión restaurada. Conoce las bases biológicas y el compromiso necesario para el éxito.', time: 2, file: '1_Introduccion_al_Protocolo_Vision_Clara.pdf' };
      case 'ROOT': return { title: '2. Causa Raíz: Obstrucción', icon: Eye, summary: 'Por qué tu visión ha fallado y cómo este protocolo lo resuelve.', time: 5, file: '2_La_Causa_Raiz_Obstruccion_Ocular.pdf' };
      case 'COMP': return { title: '3. Compuestos Esenciales', icon: FlaskConical, summary: 'La lista exacta y pura de los ingredientes naturales que tu retina necesita para regenerarse.', time: 10, file: '3_Compuestos_Esenciales_para_la_Vision.pdf' };
      case 'DOSIS': return { title: '4. Dosis y Preparación', icon: Sparkles, summary: 'La precisión es vital. Aprende cómo y cuándo combinar los compuestos para máxima absorción.', time: 6, file: '4_Dosis_Exactas_y_Preparacion_Biologica.pdf' };
      case 'RUTINA': return { title: '5. Ritual de 7 Segundos', icon: Clock, summary: 'El paso final y más importante. El ritual nocturno que sella el proceso de restauración diaria.', time: 4, file: '5_El_Ritual_Nocturno_de_7_Segundos.pdf' };
      case 'ERROR': return { title: '6. Errores Comunes', icon: AlertTriangle, summary: 'Lo que debes evitar para no bloquear el proceso de restauración de tu visión.', time: 4, file: '6_Errores_Comunes_que_Bloquean_la_Restauracion.pdf' };
      case 'WEEK': return { title: '7. Cronograma Semanal', icon: Trophy, summary: 'Qué esperar en los próximos 30 días del protocolo y cómo medir tus resultados.', time: 3, file: '7_Cronograma_Semana_a_Semana_30_Dias.pdf' };
      case 'TRUST': return { title: '8. Aviso de Seguridad', icon: Info, summary: 'Recomendaciones importantes para un uso seguro y responsable del protocolo.', time: 2, file: '8_Aviso_Importante_y_Recomendaciones_de_Seguridad.pdf' };
      default: return { title: 'Contenido do Protocolo', icon: BookOpen, summary: 'Explora la guía detallada para tu saúde ocular.', time: 5, file: '1_Introduccion_al_Protocolo_Vision_Clara.pdf' };
    }
  };

  const content = getModuleContent(id);

  useEffect(() => {
    setIsFloatingButtonHidden(true);
    if (isFullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollPercentage(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      setIsFloatingButtonHidden(false);
      document.body.style.overflow = 'auto';
    };
  }, [id, isFullScreen, setIsFloatingButtonHidden]);

  const handleReadAloud = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const text = `${content.title}. ${content.summary}. Comienza la lectura del protocolo detallado a continuación.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const nextModules = {
    'INTRO': 'ROOT',
    'ROOT': 'COMP',
    'COMP': 'DOSIS',
    'DOSIS': 'RUTINA',
    'RUTINA': 'ERROR',
    'ERROR': 'WEEK',
    'WEEK': 'TRUST'
  };

  return (
    <div className="relative pb-20">
      <AnimatePresence>
        {isFullScreen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest truncate max-w-[200px]">{content.title}</span>
              </div>
              <button 
                onClick={() => setIsFullScreen(false)}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 active:scale-90 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 w-full bg-slate-900 overflow-hidden">
               <object 
                data={`/pdfs/${content.file}#view=FitH`}
                type="application/pdf"
                className="w-full h-full border-0"
              >
                <div className="flex flex-col items-center justify-center h-full p-10 text-center space-y-4">
                  <p className="text-slate-100 text-sm font-bold uppercase tracking-widest">Vista previa no disponible</p>
                  <a href={`/pdfs/${content.file}`} download className="bg-emerald-500 text-slate-950 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20">Descargar para leer</a>
                </div>
              </object>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed top-[72px] left-0 right-0 h-1 z-50 max-w-md mx-auto">
        <div className="h-full bg-slate-800/50 w-full overflow-hidden">
          <motion.div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${scrollPercentage}%` }} />
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
        <div className="flex items-center justify-between">
          <Link to="/protocolo" className="flex items-center text-slate-500 uppercase text-[10px] font-black tracking-widest pl-1 hover:text-emerald-400 transition-all group">
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mr-2 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all">
               <ChevronLeft className="w-4 h-4" />
            </div>
            <span>Volver al índice</span>
          </Link>
          <div className="flex items-center space-x-2">
            <button onClick={() => setShowControls(!showControls)} className={`p-3 rounded-2xl border border-slate-800 bg-slate-950 transition-all ${showControls ? 'text-emerald-400 border-emerald-500/30 ring-4 ring-emerald-500/5' : 'text-slate-500'}`}>
              <Settings2 className="w-5 h-5" />
            </button>
            <button onClick={() => toggleBookmark(id)} className={`p-3 rounded-2xl border transition-all ${isBookmarked ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-emerald-400' : ''}`} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showControls && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="glass-card p-6 rounded-[2rem] border-emerald-500/20 flex flex-col space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Lectura</span>
                  <button onClick={() => { setIsFullScreen(true); setShowControls(false); }} className="w-full h-12 flex items-center justify-center space-x-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 active:bg-emerald-500 active:text-slate-950 transition-all">
                    <Maximize2 className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Pantalla Completa</span>
                  </button>
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Audio guía</span>
                  <button onClick={handleReadAloud} className={`w-full h-12 flex items-center justify-center space-x-2 rounded-xl border transition-all ${isSpeaking ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                    {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span className="text-[10px] font-black uppercase tracking-widest">{isSpeaking ? 'Detener' : 'Escuchar'}</span>
                  </button>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800/50">
                <a href={`/pdfs/${content.file}`} download className="w-full h-12 flex items-center justify-center space-x-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 active:scale-95 transition-all text-[10px] font-black uppercase tracking-widest">
                  <Download className="w-4 h-4" />
                  <span>Descargar PDF offline</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-emerald-400">
             <div className="bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20">
                <content.icon className="w-4 h-4" />
             </div>
             <span className="text-[11px] font-black uppercase tracking-[0.2em]">{id}</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-50 leading-[1] uppercase">{content.title}</h2>
          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                <Clock className="w-4 h-4 text-emerald-500/50" />
                <span>{content.time} minutos de lectura</span>
             </div>
          </div>
          <div className="p-6 bg-slate-900/30 border-l-4 border-emerald-500 rounded-r-3xl italic">
             <p className="text-slate-400 leading-relaxed text-sm">"{content.summary}"</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-900">
          <div className="relative min-h-[75vh] rounded-[2.5rem] overflow-hidden bg-slate-900/20 border border-slate-800/50 shadow-2xl group">
            <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800/50 pointer-events-none">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Lector Premium</span>
            </div>
            <button onClick={() => setIsFullScreen(true)} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg active:scale-90 transition-all opacity-0 group-hover:opacity-100 md:opacity-100">
              <Maximize2 className="w-5 h-5" />
            </button>
            <object data={`/pdfs/${content.file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} type="application/pdf" className="w-full h-[75vh] border-0" title="Protocolo Visión Clara">
              <div className="flex flex-col items-center justify-center h-full p-10 text-center space-y-6">
                <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-emerald-500" />
                </div>
                <div className="space-y-4">
                  <p className="text-slate-300 text-sm font-black uppercase tracking-widest">Visualización en curso...</p>
                  <button onClick={() => setIsFullScreen(true)} className="bg-emerald-500 text-slate-950 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20">
                    Abrir Lector Completo
                  </button>
                </div>
              </div>
            </object>
            <div className="p-8 pb-12 space-y-10 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
              <div className="flex flex-col items-center space-y-4">
                 <div className="w-12 h-1 bg-slate-800 rounded-full" />
                 <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Fin de la sección principal</p>
              </div>
              <div className="glass-card p-10 rounded-[3rem] text-center space-y-8 relative overflow-hidden bg-slate-900/40">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 blur-[60px] -z-10 translate-x-1/2 -translate-y-1/2" />
                <div className="w-20 h-20 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center mx-auto border border-emerald-500/20">
                   <Trophy className="w-10 h-10 text-emerald-500 drop-shadow-lg" />
                </div>
                <div className="space-y-2">
                   <h4 className="text-xl font-black text-slate-50 uppercase tracking-tight">¡Lección Finalizada!</h4>
                   <p className="text-slate-500 text-xs font-bold leading-relaxed uppercase tracking-wider">Has completado el {content.title}</p>
                </div>
                {!isCompleted ? (
                   <button onClick={() => markModuleComplete(id)} className="w-full bg-emerald-500 text-slate-950 font-black py-6 rounded-2xl shadow-2xl shadow-emerald-500/20 active:scale-95 transition-all text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-3">
                    <CheckCircle className="w-5 h-5 fill-slate-950/20" />
                    <span>Marcar Módulo Completado</span>
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="w-full bg-slate-800/50 text-emerald-400 font-black py-5 rounded-2xl border border-emerald-500/20 flex items-center justify-center space-x-3 text-xs uppercase tracking-widest shadow-inner">
                      <CheckCircle className="w-5 h-5 fill-emerald-500/10" />
                      <span>Certificado como leído</span>
                    </div>
                    {nextModules[id] && (
                       <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); navigate(`/modulo/${nextModules[id]}`); }} className="w-full bg-slate-50 text-slate-950 font-black py-6 rounded-2xl shadow-xl active:scale-95 transition-all text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-3 group">
                        <span>Siguiente Lección</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                )}
                <div className="pt-4">
                   <Link to="/protocolo" className="text-[10px] text-slate-600 font-black uppercase tracking-widest hover:text-slate-400 transition-colors">Volver al índice do método</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModuleDetail;
