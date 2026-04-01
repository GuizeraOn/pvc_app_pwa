import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, ShieldCheck, Mail, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate server check for 1.5s as per spec
    setTimeout(() => {
      localStorage.setItem('vc_user_email', email);
      localStorage.setItem('vc_first_login', new Date().toISOString());
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center p-6 space-y-8"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-2">
          <ShieldCheck className="w-10 h-10 text-emerald-400" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-50 uppercase tracking-widest">
          Acceso Exclusivo
        </h1>
        <p className="text-slate-400 text-sm max-w-[280px]">
          Ingresa el correo electrónico con el que realizaste tu compra para acceder a tu protocolo.
        </p>
      </div>

      <form onSubmit={handleLogin} className="w-full space-y-4">
        <div className="space-y-1">
          <label className="text-xs text-slate-500 uppercase tracking-widest pl-1">Correo Electrónico</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
            <input 
              type="email" 
              placeholder="tu-correo@email.com"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all placeholder:text-slate-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button 
          disabled={isLoading}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-3 disabled:opacity-70 disabled:grayscale disabled:scale-100"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Acceder a mi Protocolo</span>
            </>
          )}
        </button>
      </form>

      <div className="pt-4 flex items-center space-x-2 text-slate-500 text-xs uppercase tracking-tighter">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        <span>Servidor Seguro SSL v3.0</span>
      </div>
    </motion.div>
  );
};

export default Login;
