import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const ConfigContext = createContext();

const DEFAULTS = {
  username: 'Explorer',
  themeColor: '#3b82f6',
  notifications: true,
  language: 'python',
  isDark: true,
  fontSize: 14,
  layout: 'split' // 'split' or 'focused'
};

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('app_config');
      return saved ? { ...DEFAULTS, ...JSON.parse(saved) } : DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });

  // Performance: Memoize the update function to prevent down-stream re-renders
  const updateConfig = useCallback((key, value) => {
    setConfig(prev => {
      const next = { ...prev, [key]: value };
      return next;
    });
  }, []);

  const resetToDefaults = useCallback(() => {
    setConfig(DEFAULTS);
  }, []);

  // Advanced: Export for portability
  const exportSettings = useCallback(() => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gravitas-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [config]);

  useEffect(() => {
    localStorage.setItem('app_config', JSON.stringify(config));
    
    // Inject Theme Variables
    document.documentElement.style.setProperty('--accent-primary', config.themeColor);
    document.documentElement.setAttribute('data-theme', config.isDark ? 'dark' : 'light');
    document.documentElement.style.setProperty('--base-font-size', `${config.fontSize}px`);
  }, [config]);

  // Performance: Memoize context value
  const contextValue = useMemo(() => ({
    config,
    updateConfig,
    resetToDefaults,
    exportSettings
  }), [config, updateConfig, resetToDefaults, exportSettings]);

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
