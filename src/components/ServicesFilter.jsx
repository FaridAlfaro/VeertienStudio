import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

export default function ServicesFilter() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
      id: "pymes",
      titleKey: "page_services.cat_pymes",
      services: ["page_services.pymes_service1", "page_services.pymes_service2"],
      img: "https://images.unsplash.com/photo-1602052793312-b99c2a92b5c7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gastro",
      titleKey: "page_services.cat_gastro",
      services: ["page_services.gastro_service1", "page_services.gastro_service2"],
      img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ecommerce",
      titleKey: "page_services.cat_ecommerce",
      services: ["page_services.ecommerce_service1", "page_services.ecommerce_service2"],
      img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="services-filter-container" style={{ margin: '5vh 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '8vh' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', marginBottom: '1.5rem', color: 'var(--contrast)' }}>{t('page_services.filter_title')}</h2>
        <p style={{ fontSize: 'clamp(1.2rem, 1.5vw, 1.5rem)', color: 'var(--gris2)', maxWidth: '600px', margin: '0 auto' }}>{t('page_services.filter_subtitle')}</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '4vh' }}>
        {categories.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              borderRadius: '50px',
              border: `2px solid ${activeCategory === cat.id ? 'var(--azul3)' : 'var(--gris1)'}`,
              background: activeCategory === cat.id ? 'var(--azul3)' : 'transparent',
              color: activeCategory === cat.id ? '#fff' : 'var(--contrast)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {t(cat.titleKey)}
          </button>
        ))}
      </div>

      <div style={{
          display: 'grid',
          gridTemplateRows: activeCategory ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
      }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem',
            padding: activeCategory ? '4vh 0 8vh' : '0',
            opacity: activeCategory ? 1 : 0,
            transform: activeCategory ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease'
          }}>
            {activeCategory && categories.filter(c => c.id === activeCategory).map((cat, idx) => (
             <div key={idx} className="service-cat-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
               <div className="cat-img-wrapper" style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                   <img src={cat.img} alt={t(cat.titleKey)} className="cat-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                   <div className="cat-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', zIndex: 1 }}></div>
                   <h2 className="cat-title" style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', color: '#fff', fontSize: 'clamp(1.5rem, 2vw, 2.5rem)', zIndex: 2, margin: 0 }}>{t(cat.titleKey)}</h2>
               </div>
               <ul className="cat-services-list" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                   {cat.services.map(i18nKey => (
                       <li key={i18nKey} style={{ fontSize: 'clamp(1.1rem, 1.2vw, 1.3rem)', lineHeight: 1.5, color: 'var(--contrast)', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                           <span className="bullet" style={{ color: 'var(--azul3)', fontWeight: 'bold' }}>&rarr;</span>
                           {t(i18nKey)}
                       </li>
                   ))}
               </ul>
             </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
