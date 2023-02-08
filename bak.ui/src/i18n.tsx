import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import trasnlationEn from './locales/en/translations.json';
import trasnlationlt from './locales/lt/translations.json';

const resources = {
    en: {
        translation: trasnlationEn,
    },
    lt: {
        trasnlation: trasnlationlt,
    },
};

i18next.use(initReactI18next).init({
    resources,
    lng: 'en',
});

export default i18next;
