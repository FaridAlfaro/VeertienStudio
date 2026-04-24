import React from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n/config';
import ScrambleText from './ScrambleText.jsx';

export default function WordHighlighter({ i18nKey, highlightWords }) {
    const { t } = useTranslation();
    const fullText = t(i18nKey);
    
    if (!highlightWords || highlightWords.length === 0) {
        return <React.Fragment>{fullText}</React.Fragment>;
    }
    
    // Escapa caracteres especiales de regex
    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = highlightWords.map(escapeRegExp).join('|');
    const regex = new RegExp(`(${pattern})`, 'gi');
    
    const parts = fullText.split(regex);

    return (
        <React.Fragment>
            {parts.map((part, index) => {
                const isHighlight = highlightWords.some(w => w.toLowerCase() === part.toLowerCase());
                if (isHighlight) {
                    return <ScrambleText key={index} text={part} />;
                }
                return <React.Fragment key={index}>{part}</React.Fragment>;
            })}
        </React.Fragment>
    );
}
