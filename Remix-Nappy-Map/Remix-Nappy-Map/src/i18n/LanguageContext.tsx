import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, TranslationKey, LANGUAGES } from './translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('babyadvisor_lang');
    if (saved && (saved in translations)) {
      return saved as Language;
    }
    // Auto-detect browser language if available
    const browserLang = navigator.language?.slice(0, 2).toLowerCase();
    if (browserLang && (browserLang in translations)) {
      return browserLang as Language;
    }
    return 'it';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('babyadvisor_lang', newLang);
  };

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const currentDict = translations[lang] || translations.it;
    let text: string = currentDict[key] || translations.it[key] || key;

    if (params) {
      Object.entries(params).forEach(([paramKey, paramVal]) => {
        text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
      });
    }

    return text;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
