import { motion } from 'framer-motion';
import { 
  Eye, 
  Gift, 
  CheckCircle2, 
  ChevronRight, 
  Play, 
  Clock, 
  Zap, 
  Trophy, 
  Smartphone,
  BookOpen,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';
import { useState, useEffect } from 'react';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="flex-1 glass-card p-4 rounded-3xl flex flex-col items-center justify-center space-y-1 relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-12 h-12 bg-${color}-500/5 blur-[20px] -z-10`} />
    <Icon className={`w-5 h-5 text-${color}-400 mb-1 group-hover:scale-110 transition-transform`} />
    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">{label}</span>
    <span className={`text-xl font-black text-slate-50 tracking-tighter leading-none`}>{value}</span>
  </div>
);

const Dashboard = () => {
  const email = localStorage.getItem('vc_user_email');
  const firstName = email ? email.split('@')[0] : 'Usuario';
  const { completedModules, openInstallModal } = useConfig();
  const [showInstallTip, setShowInstallTip] = useState(!localStorage.getItem('vc_install_tip_dismissed'));

  const trackerDays = JSON.parse(localStorage.getItem('vc_tracker_days') || '[]');
  const streakCount = trackerDays.filter(Boolean).length;

  const handleDismissInstall = (e) => {
    e.stopPropagation();
    setShowInstallTip(false);
    localStorage.setItem('vc_install_tip_dismissed', 'true');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col space-y-1">
        <p className="text-emerald-400 text-xs font-black uppercase tracking-widest pl-1 leading-none shadow-emerald-500 drop-shadow-md">Hola, {firstName}</p>
        <h2 className="text-3xl font-black tracking-tight text-slate-50 uppercase leading-none">¡Tu Protocolo está listo!</h2>
      </div>

      {/* Persistence/Continue Card */}
      <Link to="/modulo/INTRO" className="block group">
        <div className="bg-emerald-500 p-[1px] rounded-[2.5rem] shadow-2xl shadow-emerald-500/20 active:scale-[0.98] transition-all">
          <div className="bg-slate-950 p-6 rounded-[2.5rem] relative overflow-hidden flex items-center justify-between group-hover:bg-slate-900 transition-colors">
            <div className="space-y-4 z-10 flex-1">
               <div className="flex flex-col">
                  <span className="text-emerald-400 text-[10px] uppercase font-black tracking-widest mb-1">Continúa donde te quedaste</span>
                  <h3 className="text-xl font-black text-slate-50 uppercase tracking-tighter leading-[1.1]">1. INTRODUCCIÓN AL MÉTODO</h3>
               </div>
               <div className="flex items-center text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                  <span>Reanudar ahora</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
               </div>
            </div>
            <div className="w-16 h-16 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center border border-emerald-500/20 shadow-inner group-hover:scale-110 transition-transform">
               <Play className="w-6 h-6 text-emerald-500 fill-emerald-500/20 ml-1" />
            </div>

            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] -z-10 translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </Link>

      {/* Quick Stats Grid */}
      <div className="flex space-x-3 h-28">
        <StatCard icon={BookOpen} label="Módulos" value={`${completedModules.length}/8`} color="emerald" />
        <StatCard icon={Zap} label="Racha" value={`${streakCount} Días`} color="amber" />
        <StatCard icon={Trophy} label="Inscrito" value="PREMIUM" color="blue" />
      </div>


      {/* Install Tip Banner */}
      {showInstallTip && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={openInstallModal}
          className="bg-slate-900 border border-slate-800 p-5 rounded-[2.2rem] relative flex items-center space-x-5 shadow-2xl cursor-pointer hover:bg-slate-800 transition-colors"
        >
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center shrink-0">
            <Smartphone className="w-7 h-7 text-blue-400" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-xs font-black text-slate-50 uppercase tracking-widest leading-none">Úsala como una App</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed max-w-[180px]">Guárdala en tu pantalla de inicio para acceso instantáneo.</p>
          </div>
          <button 
            onClick={handleDismissInstall}
            className="absolute top-4 right-4 p-1 hover:bg-slate-800 rounded-full text-slate-700 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Routine Quick Shortcut */}
      <div className="space-y-4">
        <h3 className="text-xs font-black text-slate-50 uppercase tracking-widest pl-1 leading-none">Mi Rutina Diaria</h3>
        <Link to="/tracker" className="block glass-card p-5 rounded-[2.2rem] hover:bg-slate-950 transition-all border border-slate-700/30 group hover:border-amber-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">7 Segundos</span>
                <p className="text-sm font-black text-slate-50 uppercase tracking-tight">Marcar ritual de hoy</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </div>

      {/* Premium Content Shortcut */}
      <div className="space-y-4">
        <h3 className="text-xs font-black text-slate-50 uppercase tracking-widest pl-1 leading-none text-emerald-400">Contenido Premium</h3>
        <Link to="/premium" className="group relative block">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-[2.2rem] opacity-20 group-hover:opacity-40 transition blur-sm" />
          <div className="relative glass-card p-5 rounded-[2.2rem] bg-slate-900 transition-all border border-slate-700/30 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-emerald-500 fill-emerald-500/10" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Rescate Hepático</span>
                <p className="text-sm font-black text-slate-50 uppercase tracking-tight">Acelerado</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </div>

      <footer className="pt-10 flex flex-col items-center space-y-4 opacity-50 pb-4">
        <div className="flex items-center space-x-6">
           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
           <p className="text-[9px] uppercase font-black tracking-[0.2em] text-slate-600">Protocolo Visión Clara v1.0 Premium</p>
           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
        </div>
      </footer>
    </motion.div>
  );
};

const ArrowRight = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default Dashboard;
