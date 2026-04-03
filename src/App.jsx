import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ConfigProvider, useConfig } from './context/ConfigContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ModuleDetail from './pages/ModuleDetail';
import ProtocoloIndex from './pages/ProtocoloIndex';
import Tracker from './pages/Tracker';
import Library from './pages/Library';
import RescateHepatico from './pages/RescateHepatico';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import Layout from './components/Layout';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';

const ProtectedRoute = ({ children }) => {
  const email = localStorage.getItem('vc_user_email');
  if (!email) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const OnboardingGuard = ({ children }) => {
  const { onboardingDone } = useConfig();
  if (!onboardingDone) {
    return <Navigate to="/onboarding" replace />;
  }
  return children;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        } />
        
        <Route path="/" element={
          <ProtectedRoute>
            <OnboardingGuard>
              <Layout />
            </OnboardingGuard>
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="protocolo" element={<ProtocoloIndex />} />
          <Route path="modulo/:id" element={<ModuleDetail />} />
          <Route path="tracker" element={<Tracker />} />
          <Route path="biblioteca" element={<Library />} />
          <Route path="premium" element={<RescateHepatico />} />
          <Route path="perfil" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ConfigProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden selection:bg-emerald-500/30">
          <div className="max-w-md mx-auto min-h-screen flex flex-col relative">
            <AnimatedRoutes />
            <PwaInstallPrompt />
          </div>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
