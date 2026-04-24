import React from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

export function TranslatedInput({ i18nKeyPlaceholder, ...props }) {
  const { t } = useTranslation();
  return <input placeholder={t(i18nKeyPlaceholder)} {...props} />;
}

export function TranslatedTextarea({ i18nKeyPlaceholder, ...props }) {
  const { t } = useTranslation();
  return <textarea placeholder={t(i18nKeyPlaceholder)} {...props} />;
}
