import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

const LANGUAGES = [
  { code: 'es', label: 'ES', flagCode: 'ar' },
  { code: 'en', label: 'EN', flagCode: 'us' },
  { code: 'pt', label: 'PT', flagCode: 'br' }
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [i18n]);

  const changeLanguage = (lng) => {
    const currentCode = i18n.language ? i18n.language.split('-')[0] : 'es';
    if (currentCode !== lng) {
      localStorage.setItem('language', lng);
      // Se recarga la página para forzar a Astro/Anime.js a recalcular todos los layouts y textos
      window.location.reload();
    } else {
      setIsOpen(false);
    }
  };

  if (!mounted) return null; // Avoid hydration mismatch

  // Fallback to "es" if language string is somewhat missing or complex
  const currentLanguageCode = i18n.language ? i18n.language.split('-')[0] : 'es';
  const currentLang = LANGUAGES.find(l => l.code === currentLanguageCode) || LANGUAGES[0];

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'transparent',
          color: 'inherit',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 6px',
          fontFamily: 'inherit',
          fontSize: '1.4rem',
          fontWeight: '500',
          cursor: 'pointer',
          outline: 'none',
          transition: 'opacity 0.2s',
          opacity: isOpen ? 0.7 : 1
        }}
        title="Cambiar idioma"
      >
        <img 
          src={`https://flagcdn.com/${currentLang.flagCode}.svg`} 
          alt={currentLang.label} 
          style={{ width: '1.4em', height: '1.05em', objectFit: 'cover', borderRadius: '2px', boxShadow: '0 0 1px rgba(0,0,0,0.5)' }}
        />
        <span>{currentLang.label}</span>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '120%',
          right: '0',
          background: 'var(--background, #fff)',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          minWidth: '100px'
        }}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              style={{
                background: currentLang.code === lang.code ? 'rgba(128, 128, 128, 0.1)' : 'transparent',
                color: 'var(--contrast, #050505)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                fontFamily: 'inherit',
                fontSize: '1.2rem',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'background 0.2s ease, color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(128, 128, 128, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = currentLang.code === lang.code ? 'rgba(128, 128, 128, 0.1)' : 'transparent';
              }}
            >
              <img 
                src={`https://flagcdn.com/${lang.flagCode}.svg`} 
                alt={lang.label} 
                style={{ width: '1.4em', height: '1.05em', objectFit: 'cover', borderRadius: '2px', boxShadow: '0 0 1px rgba(0,0,0,0.5)' }}
              />
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
