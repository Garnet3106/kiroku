import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

enum TranslationKey {
  AppSlogan = 'appSlogan',
  GetStarted = 'getStarted',
  Login = 'login',
  PrivacyPolicy = 'privacyPolicy',
  TOS = 'tos',
}

type TranslationValues = {
  [key in string]: {
    [key in TranslationKey]: string
  }
};

const translations: TranslationValues = {
  en: {
    [TranslationKey.AppSlogan]: 'Slogan Here',
    [TranslationKey.GetStarted]: 'Get Started',
    [TranslationKey.Login]: 'Login',
    [TranslationKey.PrivacyPolicy]: 'Privacy policy',
    [TranslationKey.TOS]: 'Terms of service',
  },
  ja: {
    [TranslationKey.AppSlogan]: 'キャッチコピーが入ります',
    [TranslationKey.GetStarted]: '初めての方はこちら',
    [TranslationKey.Login]: 'ログイン',
    [TranslationKey.PrivacyPolicy]: 'プライバシーポリシー',
    [TranslationKey.TOS]: '利用規約',
  },
};

const i18n = new I18n(translations);
i18n.locale = getLocales()[0].languageCode;

function translate(key: TranslationKey): string {
  return i18n.t(key)
}

export {
  TranslationKey as TK,
  translate as t,
};
