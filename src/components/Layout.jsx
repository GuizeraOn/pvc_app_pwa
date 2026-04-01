import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Target, 
  Library as LibraryIcon, 
  User, 
  ChevronLeft,
  Settings,
  MessageCircle,
  WifiOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useConfig } from '../context/ConfigContext';

const NavItem = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <Link to={to} className="flex-1 flex flex-col items-center justify-center space-y-1 relative group">
      <div className={`p-2 rounded-2xl transition-all duration-300 ${isActive ? 'bg-emerald-500/20' : 'group-hover:bg-slate-800'}`}>
        <Icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-emerald-400 fill-emerald-400/10' : 'text-slate-500 group-hover:text-slate-400'}`} />
      </div>
      <span className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${isActive ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-500'}`}>
        {label}
      </span>
      
      {isActive && (
        <motion.div 
          layoutId="activeTab"
          className="absolute -bottom-2 w-1 h-1 bg-emerald-400 rounded-full"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </Link>
  );
};

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { isFloatingButtonHidden } = useConfig();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Back button visibility
  const showBack = location.pathname !== '/dashboard' && !['/protocolo', '/tracker', '/biblioteca', '/perfil'].includes(location.pathname);

  return (
    <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-5 glass sticky top-0 z-[50]">
        <div className="flex items-center space-x-3">
          {showBack ? (
            <button 
              onClick={() => navigate(-1)}
              className="p-2 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-300" />
            </button>
          ) : (
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
               <span className="text-emerald-400 font-black text-xs">VC</span>
            </div>
          )}
          <div className="flex flex-col">
            <h1 className="text-sm font-black text-slate-50 tracking-tighter uppercase leading-none">Visión Clara</h1>
            <p className="text-[10px] text-emerald-400/80 font-bold uppercase tracking-widest leading-normal">Acceso Premium</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {!isOnline && (
            <div className="flex items-center space-x-1 bg-amber-500/10 text-amber-500 px-2 py-1 rounded-full border border-amber-500/20">
               <WifiOff className="w-3 h-3" />
               <span className="text-[9px] font-bold uppercase tracking-tighter">Offline</span>
            </div>
          )}
          <Link to="/perfil" className="p-3 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:bg-slate-700 transition-colors">
            <Settings className="w-5 h-5 text-slate-500" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 pt-6 pb-32">
        <Outlet />
      </main>

      {/* WhatsApp Button */}
      {!isFloatingButtonHidden && (
        <a 
          href="https://wa.me/SEUNUMERO?text=Hola,%20necesito%20ayuda%20con%20el%20Protocolo%20Visión%20Clara"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-24 right-6 w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/30 active:scale-90 transition-transform z-[60]"
        >
          <MessageCircle className="w-7 h-7 text-emerald-950 fill-emerald-950/20" />
        </a>
      )}

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-slate-900/90 backdrop-blur-3xl border-t border-slate-800/50 flex items-center justify-around px-4 pb-2 pt-0 z-[70] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <NavItem to="/dashboard" icon={Home} label="Inicio" />
        <NavItem to="/protocolo" icon={BookOpen} label="Método" />
        <NavItem to="/tracker" icon={Target} label="Progreso" />
        <NavItem to="/biblioteca" icon={LibraryIcon} label="Guías" />
        <NavItem to="/perfil" icon={User} label="Perfil" />
      </nav>
    </div>
  );
};

export default Layout;
