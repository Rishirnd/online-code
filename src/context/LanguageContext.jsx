import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [preferredLanguage, setPreferredLanguage] = useState(
    localStorage.getItem('preferred_language') || 'python'
  );

  useEffect(() => {
    localStorage.setItem('preferred_language', preferredLanguage);
  }, [preferredLanguage]);

  return (
    <LanguageContext.Provider value={{ preferredLanguage, setPreferredLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
