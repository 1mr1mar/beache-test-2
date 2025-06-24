import React, { useState } from 'react';
import { useLanguage } from '../../Context/LanguageContext';

export default function LanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border bg-[rgb(var(--color-background-secondary))] text-[rgb(var(--color-text))] border-[rgb(var(--color-border))]"
        title={currentLang?.name}
      >
        <span className="text-lg">{currentLang?.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 rounded-lg shadow-lg border z-50 bg-[rgb(var(--color-background-secondary))] border-[rgb(var(--color-border))]">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                changeLanguage(language.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:opacity-80 transition-colors duration-150 ${
                currentLanguage === language.code ? 'opacity-100' : 'opacity-70'
              } ${language.code === 'ar' ? 'text-right' : ''}`}
              style={{
                color: 'rgb(var(--color-text))',
                backgroundColor: currentLanguage === language.code ? 'rgb(var(--color-background))' : 'transparent'
              }}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm font-medium">{language.name}</span>
              {currentLanguage === language.code && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 
