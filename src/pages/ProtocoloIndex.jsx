import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, ChevronRight, Clock, Eye, FlaskConical, AlertTriangle, HelpCircle, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';

const ModuleItem = ({ id, title, summary, icon: Icon, readTime, isFeatured }) => {
  const { completedModules } = useConfig();
  const isCompleted = completedModules.includes(id);

  return (
    <Link to={`/modulo/${id}`} className="block group">
      <motion.div 
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
        className={`glass-card p-5 rounded-3xl relative overflow-hidden transition-all duration-500 border border-slate-700/50 hover:bg-slate-800/80 hover:border-emerald-500/30 ${isFeatured ? 'bg-emerald-500/5' : ''}`}
      >
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${isFeatured ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex flex-col items-end space-y-1">
            {isCompleted && (
              <div className="flex items-center space-x-1 bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Completado</span>
              </div>
            )}
            <div className="flex items-center space-x-1 text-slate-500 text-[10px] uppercase font-black tracking-widest pl-2">
              <Clock className="w-3 h-3" />
              <span>{readTime} min</span>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-black text-slate-50 mb-1 leading-tight group-hover:text-emerald-400 transition-colors uppercase tracking-tight">
          {title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {summary}
        </p>

        <div className="flex items-center text-[11px] font-black text-slate-400 uppercase tracking-widest transition-colors group-hover:text-slate-50">
          <span>{isCompleted ? 'Volver a leer' : 'Comenzar lectura'}</span>
          <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </div>

        {isFeatured && (
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-[30px] -z-10 translate-x-1/2 -translate-y-1/2" />
        )}
      </motion.div>
    </Link>
  );
};

const ProtocoloIndex = () => {
  const modules = [
    { id: 'INTRO', title: '1. Introducción', summary: 'Bienvenido al viaje hacia una visión restaurada. Conoce las bases del método.', icon: BookOpen, readTime: 2, isFeatured: true },
    { id: 'ROOT', title: '2. Causa Raíz', summary: 'Por qué tu visión ha fallado y cómo este protocolo ataca el problema real.', icon: Eye, readTime: 5 },
    { id: 'COMP', title: '3. Compuestos Esenciales', summary: 'La lista exacta de ingredientes naturales purificados para tu salud ocular.', icon: FlaskConical, readTime: 10, isFeatured: true },
    { id: 'DOSIS', title: '4. Dosis y Preparación', summary: 'Cómo combinar los elementos para maximizar la absorción biológica.', icon: Sparkles, readTime: 6 },
    { id: 'RUTINA', title: '5. Ritual de 7 Segundos', summary: 'El ritual exacto que debes seguir cada noche para ver resultados reales.', icon: Clock, readTime: 4, isFeatured: true },
    { id: 'ERROR', title: '6. Errores Comunes', summary: 'Lo que debes evitar para no bloquear el proceso de restauración.', icon: AlertTriangle, readTime: 4 },
    { id: 'WEEK', title: '7. Cronograma Semanal', summary: 'Qué esperar en los próximos 30 días del protocolo y cómo medir resultados.', icon: Star, readTime: 3 },
    { id: 'TRUST', title: '8. Aviso Importante', summary: 'Recomendaciones de seguridad e uso responsable del método.', icon: HelpCircle, readTime: 2 }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-emerald-400">
           <BookOpen className="w-4 h-4 fill-emerald-400/20" />
           <p className="text-[11px] font-black uppercase tracking-widest">Contenido Maestro</p>
        </div>
        <h2 className="text-3xl font-black tracking-tight text-slate-50 uppercase leading-none">Tu Protocolo</h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-[320px]">
          Sigue el orden sugerido para obtener los mejores resultados en tu visión.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {modules.map((m) => (
          <ModuleItem key={m.id} {...m} />
        ))}
      </div>

      <div className="pt-10 flex flex-col items-center space-y-4">
        <div className="w-12 h-[1px] bg-slate-800" />
        <p className="text-slate-600 text-[10px] uppercase font-bold tracking-widest italic text-center">
          "La constancia es la clave de la restauración"
        </p>
      </div>
    </motion.div>
  );
};

export default ProtocoloIndex;
