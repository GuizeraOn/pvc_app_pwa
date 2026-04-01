import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check, Play, Award, Zap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Tracker = () => {
  const [days, setDays] = useState(() => {
    const saved = localStorage.getItem('vc_tracker_days');
    return saved ? JSON.parse(saved) : Array(30).fill(false);
  });
  
  const [showConfetti, setShowConfetti] = useState(false);

  const completedCount = days.filter(Boolean).length;
  
  const getMotivationalMessage = () => {
    if (completedCount === 0) return "El primer paso es el más importante. ¡Comienza hoy!";
    if (completedCount < 7) return "¡Excelente inicio! La consistencia es la clave.";
    if (completedCount < 15) return "¡Ya estás a la mitad del camino! Sigue así.";
    if (completedCount < 30) return "¡Casi lo logras! Tu visión te lo agradecerá.";
    return "¡Increíble! Has completado el protocolo de 30 días.";
  };

  const handleCompleteDay = () => {
    const nextUncompletedIndex = days.findIndex(day => !day);
    if (nextUncompletedIndex === -1) return;

    const newDays = [...days];
    newDays[nextUncompletedIndex] = true;
    setDays(newDays);
    localStorage.setItem('vc_tracker_days', JSON.stringify(newDays));
    
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  useEffect(() => {
    localStorage.setItem('vc_tracker_days', JSON.stringify(days));
  }, [days]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-amber-500">
           <Zap className="w-4 h-4 fill-amber-500/20" />
           <p className="text-[11px] font-black uppercase tracking-widest leading-none">Mi Progreso Personal</p>
        </div>
        <h2 className="text-3xl font-black tracking-tight text-slate-50 uppercase leading-none">Reto de 30 Días</h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-[300px]">
          Marca cada día que completes tu rutina nocturna de 7 segundos.
        </p>
      </div>

      <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden backdrop-blur-3xl shadow-amber-500/5">
        <div className="flex items-center justify-between mb-10">
           <div className="flex flex-col">
              <span className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-1">Días Completados</span>
              <div className="flex items-end space-x-2">
                 <span className="text-5xl font-black text-amber-500 tracking-tighter tabular-nums leading-none">{completedCount}</span>
                 <span className="text-slate-500 font-black mb-1 uppercase text-lg">/ 30</span>
              </div>
           </div>
           <div className="w-20 h-20 bg-amber-500/10 rounded-[2rem] flex items-center justify-center border border-amber-500/20 relative">
              <div className="absolute inset-0 bg-amber-500/5 rounded-[2rem] animate-pulse" />
              <Award className="w-10 h-10 text-amber-500 drop-shadow-lg" />
           </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-4 mb-10 border border-slate-800 overflow-hidden relative shadow-inner">
           <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / 30) * 100}%` }}
              className="h-full bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)] relative"
           >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-[shimmer_2s_linear_infinite]" />
           </motion.div>
        </div>

        {/* Grid Circles */}
        <div className="grid grid-cols-5 gap-3">
          {days.map((completed, index) => (
            <motion.div 
              key={index}
              initial={completed ? { scale: 1 } : { scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.01 }}
              className={`w-full aspect-square rounded-[1.2rem] flex items-center justify-center border-2 transition-all duration-700 relative group ${completed ? 'bg-amber-500 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]' : 'bg-slate-950/50 border-slate-800 text-slate-700'}`}
            >
              {completed ? (
                <Check className="w-6 h-6 text-slate-950 stroke-[3px]" />
              ) : (
                <span className="text-[11px] font-black tracking-tighter opacity-40">{index + 1}</span>
              )}
              {index === days.findIndex(d => !d) && !completed && (
                <div className="absolute inset-0 bg-amber-500/10 rounded-[1.2rem] animate-pulse pointer-events-none ring-2 ring-amber-500/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-4 pt-2">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2.2rem] flex items-center space-x-5 relative overflow-hidden group">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Heart className="w-7 h-7 text-emerald-500 fill-emerald-500/10" />
          </div>
          <div className="space-y-1">
             <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest leading-none">Reflexión Diaria</span>
             <p className="text-[11px] font-bold text-slate-300 italic leading-relaxed">
               "{getMotivationalMessage()}"
             </p>
          </div>
        </div>

        <button 
          onClick={handleCompleteDay}
          disabled={completedCount === 30}
          className="w-full bg-slate-50 text-slate-950 font-black py-6 rounded-2xl shadow-2xl active:scale-95 transition-all text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-3 group disabled:grayscale disabled:opacity-50"
        >
          <Play className="w-5 h-5 fill-slate-950 group-hover:scale-110 transition-transform" />
          <span>Completé mi rutina de hoy</span>
        </button>
      </div>

      <AnimatePresence>
        {showConfetti && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: 1, scale: 1.5, y: -100 }}
            exit={{ opacity: 0, scale: 2, y: -200 }}
            className="fixed bottom-1/4 left-1/2 -translate-x-1/2 text-5xl z-[100] pointer-events-none"
          >
            🌟✨🎊
          </motion.div>
        )}
      </AnimatePresence>
      <div className="pb-10" />
    </motion.div>
  );
};

export default Tracker;
