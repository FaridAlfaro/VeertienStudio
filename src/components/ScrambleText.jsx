import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

export default function ScrambleText({ i18nKey, text }) {
  const { t } = useTranslation();
  const originalText = text || t(i18nKey);
  const spanRef = useRef(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    
    // Simplificado logic for scramble just for react components to ensure it runs
    let interval = null;
    let glitchTimeout = null;
    let glitchInterval = null;
    
    const letters = "abcdemano!@#%&*<>+";
    const getRandomChar = () => letters[Math.floor(Math.random() * letters.length)];
    
    let isRevealed = false;
    el.style.display = "inline-block";
    el.style.minWidth = `${originalText.length}ch`;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !isRevealed) {
                    setTimeout(() => {
                        let iteration = 0;
                        clearInterval(interval);
                        interval = setInterval(() => {
                            el.innerText = originalText
                                .split("")
                                .map((letter, i) => {
                                    if (i < iteration) return originalText[i];
                                    return getRandomChar();
                                })
                                .join("");

                            if (iteration >= originalText.length) {
                                clearInterval(interval);
                                isRevealed = true;
                                startRandomGlitch();
                            }
                            iteration += 1 / 3;
                        }, 30);
                    }, 500);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 },
    );

    observer.observe(el);

    function startRandomGlitch() {
        const nextGlitch = () => {
            const timeToNext = Math.random() * 1000 + 2000;
            glitchTimeout = setTimeout(() => {
                const targetIndex = Math.floor(Math.random() * originalText.length);
                let glitchTicks = 0;
                const maxTicks = 20;

                glitchInterval = setInterval(() => {
                    el.innerText = originalText
                        .split("")
                        .map((char, i) => {
                            if (i === targetIndex) return getRandomChar();
                            return char;
                        })
                        .join("");

                    glitchTicks++;
                    if (glitchTicks >= maxTicks) {
                        clearInterval(glitchInterval);
                        el.innerText = originalText;
                        nextGlitch();
                    }
                }, 10);
            }, timeToNext);
        };
        nextGlitch();
    }

    return () => {
        clearInterval(interval);
        clearTimeout(glitchTimeout);
        clearInterval(glitchInterval);
        observer.disconnect();
    };
  }, [originalText]);

  return (
    <span 
      ref={spanRef} 
      className="scramble-title-react" 
      style={{ color: "var(--azul3)", fontWeight: "bold" }}
    >
      xxxxxxxx
    </span>
  );
}
