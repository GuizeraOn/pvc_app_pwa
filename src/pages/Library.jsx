import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  HelpCircle, 
  Download, 
  Bookmark, 
  ChevronDown, 
  FlaskConical, 
  Smartphone, 
  BookOpen,
  ArrowRight,
  Eye,
  Library as LibraryIcon,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-800 last:border-0 group transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left hover:text-emerald-400 transition-colors"
      >
        <span className="text-xs font-black uppercase tracking-widest leading-relaxed pr-8">{question}</span>
        <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-500 text-slate-700 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-slate-900/10 rounded-2xl mb-4 px-2"
          >
            <p className="pb-6 text-[13px] text-slate-500 leading-relaxed max-w-[280px]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ResourceCard = ({ title, icon: Icon, color, to, onClick }) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-6 glass-card rounded-[2.5rem] bg-slate-900/50 border-slate-800/50 hover:bg-slate-950 hover:border-emerald-500/20 transition-all transition-transform duration-500 relative group overflow-hidden h-full">
      <div className={`absolute top-0 right-0 w-16 h-16 bg-${color}-500/5 blur-[30px] -z-10`} />
      <div className={`w-14 h-14 bg-${color}-500/10 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
        <Icon className={`w-7 h-7 text-${color}-400 group-hover:scale-110 active:rotate-12 transition-all transition-transform`} />
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-50 text-center leading-[1.2]">{title}</span>
      <ChevronRight className="w-4 h-4 mt-2 text-slate-700 group-hover:text-emerald-500 transition-colors" />
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full h-full text-left">
        {content}
      </button>
    );
  }

  return (
    <Link to={to} className="w-full h-full">
      {content}
    </Link>
  );
};

const BookmarkItem = ({ id, title, category }) => (
  <Link to={`/modulo/${id}`} className="block glass-card p-5 rounded-[2.2rem] hover:bg-slate-950 transition-all border border-slate-700/30 group">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <Bookmark className="w-5 h-5 text-emerald-500 fill-emerald-500" />
        </div>
        <div className="space-y-0.5">
          <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.2em]">{category}</span>
          <p className="text-sm font-black text-slate-50 uppercase tracking-tight">{title}</p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-emerald-500" />
    </div>
  </Link>
);

const Library = () => {
  const [search, setSearch] = useState('');
  const { bookmarks, openInstallModal } = useConfig();

  const getModuleTitle = (id) => {
    switch (id) {
      case 'INTRO': return '1. Introducción al Método';
      case 'ROOT': return '2. Causa Raíz Re-descubierta';
      case 'COMP': return '3. Los 7 Compuestos Maestros';
      case 'DOSIS': return '4. Dosis y Tiempos de Oro';
      case 'RUTINA': return '5. Ritual de 7 Segundos';
      case 'ERROR': return '6. Errores Comunes';
      case 'WEEK': return '7. Cronograma Semanal';
      case 'TRUST': return '8. Aviso Importante';
      default: return 'Módulo sin título';
    }
  };

  const faqs = [
    { question: '¿Cómo usar esta guía desde mi celular?', answer: 'Esta es una aplicación móvil progresiva (PWA). Para la mejor experiencia, agrégala a tu pantalla de inicio siguiendo los pasos en la sección "Instalar App".' },
    { question: '¿Cuándo debo empezar la rutina?', answer: 'El protocolo está diseñado para realizarse preferiblemente por la noche, antes de dormir. La rutina solo toma 7 segundos.' },
    { question: '¿Qué hacer si me pierdo un día?', answer: 'No te preocupes. Simplemente continúa al día siguiente. La persistencia es más importante que la perfección absoluta.' },
    { question: '¿Cómo recuperar mi progreso?', answer: 'Tu progreso se guarda automáticamente en este dispositivo. No necesitas cuenta. Sin embargo, si borras los datos de navegación, podrías perderlo.' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-10"
    >
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-emerald-400">
           <LibraryIcon className="w-4 h-4 fill-emerald-400/20" />
           <p className="text-[11px] font-black uppercase tracking-widest leading-none">Centro de Recursos</p>
        </div>
        <h2 className="text-3xl font-black tracking-tight text-slate-50 uppercase leading-none">Guías & Biblioteca</h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-[320px]">
          Todo lo que necesitas para tu salud ocular en un solo lugar.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
        <input 
          type="text" 
          placeholder="Buscar guía o ingrediente..."
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4.5 pl-12 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all placeholder:text-slate-700 text-sm font-bold tracking-tight"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-2 gap-4">
        <ResourceCard title="Ingredientes" icon={FlaskConical} color="emerald" to="/modulo/COMP" />
        <ResourceCard title="Instalar App" icon={Smartphone} color="blue" onClick={openInstallModal} />
        <ResourceCard title="Guía Completa" icon={Download} color="amber" to="/modulo/INTRO" />
        <ResourceCard title="Aviso Legal" icon={Info} color="slate" to="/modulo/TRUST" />
      </div>

      {/* PDF Downloads Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 px-1">
           <Download className="w-4 h-4 text-amber-500" />
           <h3 className="text-xs font-black text-slate-50 uppercase tracking-widest leading-none">Descargar Materiales</h3>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {[
            { id: 'INTRO', file: '1_Introduccion_al_Protocolo_Vision_Clara.pdf' },
            { id: 'ROOT', file: '2_La_Causa_Raiz_Obstruccion_Ocular.pdf' },
            { id: 'COMP', file: '3_Compuestos_Esenciales_para_la_Vision.pdf' },
          ].map((doc) => (
            <a 
              key={doc.id}
              href={`/pdfs/${doc.file}`} 
              download 
              className="flex items-center justify-between p-4 glass-card rounded-2xl hover:bg-amber-500/10 hover:border-amber-500/20 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Download className="w-4 h-4 text-amber-500" />
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{getModuleTitle(doc.id)}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </a>
          ))}
        </div>
      </div>

      {/* Bookmarks Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 px-1">
           <Bookmark className="w-4 h-4 text-emerald-400 fill-emerald-400/10" />
           <h3 className="text-xs font-black text-slate-50 uppercase tracking-widest leading-none">Favoritos Guardados</h3>
        </div>
        <div className="space-y-3">
          {bookmarks.length > 0 ? (
            bookmarks.map(id => (
              <BookmarkItem key={id} id={id} title={getModuleTitle(id)} category="Protocolo" />
            ))
          ) : (
            <div className="glass-card p-8 rounded-[2.5rem] border-dashed border-slate-800 flex flex-col items-center justify-center space-y-4 opacity-70">
               <Bookmark className="w-10 h-10 text-slate-800" />
               <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest text-center leading-relaxed">No has guardado nada aún. Toca el ícono de favorito en cualquier página.</p>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 px-1">
           <HelpCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/10" />
           <h3 className="text-xs font-black text-slate-50 uppercase tracking-widest leading-none">Preguntas Frecuentes</h3>
        </div>
        <div className="glass-card p-2 px-6 rounded-[2.5rem]">
           {faqs.map((faq, i) => (
             <FAQItem key={i} question={faq.question} answer={faq.answer} />
           ))}
        </div>
      </div>

      <div className="pt-2 flex flex-col items-center space-y-4 opacity-50 pb-4">
         <div className="w-12 h-[1px] bg-slate-800" />
      </div>
    </motion.div>
  );
};

export default Library;
