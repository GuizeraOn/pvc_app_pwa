import { createContext, useContext, useState, useEffect } from 'react';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('vc_font_size') || 'normal');
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('vc_high_contrast') === 'true');
  const [bookmarks, setBookmarks] = useState(() => JSON.parse(localStorage.getItem('vc_bookmarks')) || []);
  const [completedModules, setCompletedModules] = useState(() => JSON.parse(localStorage.getItem('vc_completed_modules')) || []);
  const [scrollPositions, setScrollPositions] = useState(() => JSON.parse(localStorage.getItem('vc_scroll_positions')) || {});
  const [onboardingDone, setOnboardingDone] = useState(() => localStorage.getItem('vc_onboarding_done') === 'true');
  const [isFloatingButtonHidden, setIsFloatingButtonHidden] = useState(false);

  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('vc_font_size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('vc_high_contrast', highContrast);
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('vc_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('vc_onboarding_done', onboardingDone);
  }, [onboardingDone]);

  useEffect(() => {
    localStorage.setItem('vc_completed_modules', JSON.stringify(completedModules));
  }, [completedModules]);

  useEffect(() => {
    localStorage.setItem('vc_scroll_positions', JSON.stringify(scrollPositions));
  }, [scrollPositions]);

  const toggleBookmark = (id) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const markModuleComplete = (id) => {
    setCompletedModules(prev => Array.from(new Set([...prev, id])));
  };

  const saveScrollPosition = (id, pos) => {
    setScrollPositions(prev => ({ ...prev, [id]: pos }));
  };

  const getFontSizeClass = () => {
    if (fontSize === 'large') return 'text-lg';
    if (fontSize === 'xl') return 'text-xl';
    return 'text-base';
  };

  const getTitleSizeClass = () => {
    if (fontSize === 'large') return 'text-2xl';
    if (fontSize === 'xl') return 'text-3xl';
    return 'text-xl';
  };

  const openInstallModal = () => setIsInstallModalOpen(true);
  const closeInstallModal = () => setIsInstallModalOpen(false);

  return (
    <ConfigContext.Provider value={{ 
      fontSize, setFontSize, 
      highContrast, setHighContrast, 
      bookmarks, toggleBookmark,
      onboardingDone, setOnboardingDone,
      completedModules, markModuleComplete,
      scrollPositions, saveScrollPosition,
      isFloatingButtonHidden, setIsFloatingButtonHidden,
      getFontSizeClass, getTitleSizeClass,
      isInstallModalOpen, openInstallModal, closeInstallModal
    }}>
      <div className={highContrast ? 'high-contrast' : ''}>
        {children}
      </div>
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
