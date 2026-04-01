import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Settings, 
  Trash2, 
  RotateCcw, 
  LogOut, 
  Smartphone, 
  Monitor, 
  Sun, 
  Moon, 
  Maximize2,
  Minimize2,
  Type,
  ShieldCheck,
  ChevronRight,
  Eye,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';

const ProfileAction = ({ icon: Icon, title, description, onClick, danger, value }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-6 glass-card rounded-3xl border-slate-800/50 hover:bg-slate-900 transition-all group"
  >
    <div className="flex items-center space-x-5">
      <div className={`p-4 rounded-2xl transition-all ${danger ? 'bg-red-500/10 text-red-400 group-hover:bg-red-500 group-hover:text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-emerald-500 group-hover:text-slate-950'}`}>
        <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
      </div>
      <div className="flex flex-col text-left">
        <span className={`text-xs font-black uppercase tracking-widest ${danger ? 'text-red-400 group-hover:text-red-50' : 'text-slate-50 group-hover:text-emerald-400'} transition-colors`}>{title}</span>
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{description}</span>
      </div>
    </div>
    {value ? (
      <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-[0.1em]">{value}</span>
    ) : (
      <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-emerald-500 transition-colors" />
    )}
  </button>
);

const Profile = () => {
  const email = localStorage.getItem('vc_user_email');
  const navigate = useNavigate();
  const { fontSize, setFontSize, highContrast, setHighContrast, setOnboardingDone } = useConfig();
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsStandalone(true);
    }
  }, []);

  const handleLogout = () => {
    if (confirm('¿Cerrar sesión? Se borrará tu acceso en este dispositivo.')) {
      localStorage.removeItem('vc_user_email');
      navigate('/login');
    }
  };

  const resetProgress = () => {
    if (confirm('¿Reiniciar todo tu progreso? No podrás deshacer esta acción.')) {
      localStorage.removeItem('vc_tracker_days');
      localStorage.removeItem('vc_completed_modules');
      localStorage.removeItem('vc_bookmarks');
      window.location.reload();
    }
  };

  const resetOnboarding = () => {
    setOnboardingDone(false);
    navigate('/onboarding');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-10"
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2 text-emerald-400 px-1">
           <User className="w-4 h-4 fill-emerald-400/20" />
           <p className="text-[11px] font-black uppercase tracking-widest leading-none">Perfil & Ajustes</p>
        </div>
        
        {/* User Card */}
        <div className="glass-card p-6 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-950 border-slate-700/30 flex items-center space-x-5 relative overflow-hidden shadow-2xl">
          <div className="w-16 h-16 bg-emerald-500 rounded-[2rem] flex items-center justify-center text-slate-950 text-2xl font-black shadow-xl shadow-emerald-500/20 z-10 select-none">
            {email ? email.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="flex flex-col z-10 overflow-hidden">
            <span className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-1">Mi Cuenta</span>
            <span className="text-sm font-black text-slate-50 uppercase tracking-tighter truncate max-w-[180px] leading-none mb-2">{email}</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Premium Activo</span>
              </div>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] -z-10 translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Reading Experience */}
      <div className="space-y-4">
        <h3 className="text-xs font-black text-slate-50 uppercase tracking-widest pl-2 flex items-center space-x-2">
           <Type className="w-4 h-4 text-emerald-500" />
           <span>Experiencia de Lectura</span>
        </h3>
        
        <div className="glass-card p-2 rounded-[2.5rem] space-y-2">
          <div className="flex items-center justify-between p-4 px-6 bg-slate-950/20 rounded-3xl">
             <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-50">Tamaño del Texto</span>
                <span className="text-[9px] uppercase tracking-widest text-slate-600 font-bold">Ajustar para mayor claridad</span>
             </div>
             <div className="flex items-center bg-slate-900/50 p-1 rounded-xl border border-slate-800">
                <button onClick={() => setFontSize('normal')} className={`p-2 rounded-lg text-xs font-black transition-all ${fontSize === 'normal' ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-500'}`}>A</button>
                <button onClick={() => setFontSize('large')} className={`p-2 px-3 rounded-lg text-sm font-black transition-all ${fontSize === 'large' ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-500'}`}>A+</button>
                <button onClick={() => setFontSize('xl')} className={`p-2 px-4 rounded-lg text-base font-black transition-all ${fontSize === 'xl' ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-500'}`}>A++</button>
             </div>
          </div>
          
          <div className="flex items-center justify-between p-4 px-6 bg-slate-950/20 rounded-3xl group">
             <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-50">Alto Contraste</span>
                <span className="text-[9px] uppercase tracking-widest text-slate-600 font-bold">Brillo máximo para lectura</span>
             </div>
             <button 
               onClick={() => setHighContrast(!highContrast)}
               className={`w-14 h-8 rounded-full p-1 relative transition-all duration-300 ${highContrast ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-800 border border-slate-700'}`}
             >
                <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 flex items-center justify-center ${highContrast ? 'translate-x-6' : 'translate-x-0'}`}>
                   {highContrast ? <Eye className="w-3.5 h-3.5 text-emerald-500" /> : <Info className="w-3.5 h-3.5 text-slate-400" />}
                </div>
             </button>
          </div>
        </div>
      </div>

      {/* App & Actions */}
      <div className="space-y-4">
        <h3 className="text-xs font-black text-slate-50 uppercase tracking-widest pl-2 flex items-center space-x-2">
           <Smartphone className="w-4 h-4 text-emerald-500" />
           <span>Estado de Aplicación</span>
        </h3>
        <div className="space-y-3">
          <ProfileAction 
            icon={isStandalone ? Smartphone : Monitor} 
            title={isStandalone ? "Aplicación Instalada" : "Modo Sitio Web"} 
            description={isStandalone ? "Estás usando la versión nativa" : "Usa Safari/Chrome para instalar"}
            value={isStandalone ? "OK" : "MANUAL"}
          />
          <ProfileAction 
            icon={RotateCcw} 
            title="Repetir Onboarding" 
            description="Ver tutorial de bienvenida"
            onClick={resetOnboarding}
          />
          <ProfileAction 
            icon={Trash2} 
            title="Borrar Progreso" 
            description="Reiniciar reto de 30 días"
            onClick={resetProgress}
            danger
          />
          <ProfileAction 
            icon={LogOut} 
            title="Cerrar Sesión" 
            description="Salir de tu acceso premium"
            onClick={handleLogout}
            danger
          />
        </div>
      </div>

      <div className="pt-4 flex flex-col items-center space-y-4 opacity-50 pb-8 text-center">
         <div className="w-12 h-[1px] bg-slate-800" />
         <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-600 max-w-[200px]">Protección de datos local garantizada por cifrado SSL.</p>
      </div>
    </motion.div>
  );
};

export default Profile;
