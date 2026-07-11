import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fr from './locales/fr';
import ar from './locales/ar';
import en from './locales/en';

const LANGUAGE_KEY = '@deveduforge_language';

const resources = {
  fr,
  ar,
  en,
};

const initI18n = async () => {
  let lng: string | null = null;
  try {
    lng = await AsyncStorage.getItem(LANGUAGE_KEY);
  } catch {
    // fallback to default
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: lng || 'fr',
    fallbackLng: 'fr',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v4',
  });
};

export const changeLanguage = async (lang: string) => {
  await i18n.changeLanguage(lang);
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  } catch {
    // silently fail
  }
};

export const getCurrentLanguage = () => i18n.language;

export { LANGUAGE_KEY };

export default initI18n;
