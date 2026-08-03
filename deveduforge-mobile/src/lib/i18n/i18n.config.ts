import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fr from './locales/fr';
import ar from './locales/ar';
import en from './locales/en';

const LANGUAGE_KEY = '@deveduforge_language';

const RTL_LOCALES = ['ar'];

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
  }

  if (Platform.OS !== 'web') {
    const isRTL = RTL_LOCALES.includes(lang);
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
    }
  }
};

export const getCurrentLanguage = () => i18n.language;

export { LANGUAGE_KEY };

export default initI18n;
