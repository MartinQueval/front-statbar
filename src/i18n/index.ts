import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr.json';
import en from './locales/en.json';
import custom from './locales/custom.json';

export const LANGUAGES = ['custom', 'fr', 'en'] as const;
export type Language = (typeof LANGUAGES)[number];

const STORAGE_KEY = 'lang';

function initialLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
  return stored && LANGUAGES.includes(stored) ? stored : 'custom';
}

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
    custom: { translation: custom },
  },
  lng: initialLanguage(),
  fallbackLng: 'fr',
  interpolation: { escapeValue: false },
});

export function changeLanguage(lng: Language) {
  localStorage.setItem(STORAGE_KEY, lng);
  i18n.changeLanguage(lng);
}

export default i18n;
