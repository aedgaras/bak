import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import trasnlationEn from './locales/en.json';
import trasnlationlt from './locales/lt.json';

const resources = {
    en: {
        translation: trasnlationEn,
    },
    lt: {
        translation: trasnlationlt,
    },
};

i18next.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('languageMode') ?? 'en',
    debug: true,
});

export default i18next;
