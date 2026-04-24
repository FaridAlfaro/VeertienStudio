import React from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

export default function Text({ i18nKey }) {
  const { t } = useTranslation();
  return <>{t(i18nKey)}</>;
}
