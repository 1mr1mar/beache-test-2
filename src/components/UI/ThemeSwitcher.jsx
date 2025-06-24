import React, { useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';

export default function ThemeSwitcher() {
  const { currentTheme, changeTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeOptions = [
    { key: 'light', icon: '🏖️', label: 'Beach Day' },
    { key: 'dark', icon: '🌅', label: 'Sunset Night' },
    { key: 'icecream', icon: '🍦', label: 'Ice Cream' },
    { key: 'ocean', icon: '🌊', label: 'Ocean Wave' }
  ];

  const currentThemeOption = themeOptions.find(option => option.key === currentTheme);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border bg-[rgb(var(--color-background-secondary))] text-[rgb(var(--color-text))] border-[rgb(var(--color-border))]"
        title={currentThemeOption?.label}
      >
        <span className="text-lg">{currentThemeOption?.icon}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-56 rounded-lg shadow-lg border z-50 bg-[rgb(var(--color-background-secondary))] border-[rgb(var(--color-border))]">
          {themeOptions.map((theme) => (
            <button
              key={theme.key}
              onClick={() => {
                changeTheme(theme.key);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:opacity-80 transition-all duration-150 ${
                currentTheme === theme.key ? 'opacity-100' : 'opacity-70'
              }`}
              style={{
                color: 'rgb(var(--color-text))',
                backgroundColor: currentTheme === theme.key ? 'rgb(var(--color-background))' : 'transparent'
              }}
            >
              <span className="text-lg">{theme.icon}</span>
              <span className="text-sm font-medium">{theme.label}</span>
              {/* Theme preview */}
              <div className="ml-auto flex gap-1">
                <div
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: `rgb(${themes[theme.key]?.colors.background})` }}
                ></div>
                <div
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: `rgb(${themes[theme.key]?.colors['background-secondary']})` }}
                ></div>
                <div
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: `rgb(${themes[theme.key]?.colors.primary})` }}
                ></div>
              </div>
              {currentTheme === theme.key && (
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
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