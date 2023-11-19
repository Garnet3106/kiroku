import { getLocales } from 'expo-localization';
import { I18n, Scope } from 'i18n-js';

const translations = {
  en: {
    app: {
      slogan: 'Slogan Here',
    },
    init: {
      getStarted: 'Get Started',
      login: 'Login',
      tos: 'Terms of service',
      privacyPolicy: 'Privacy policy',
    },
  },
  ja: {
    app: {
      slogan: 'キャッチコピーが入ります',
    },
    init: {
      getStarted: '初めての方はこちら',
      login: 'ログイン',
      tos: '利用規約',
      privacyPolicy: 'プライバシーポリシー',
    },
  },
};

const i18n = new I18n(translations);
i18n.locale = getLocales()[0].languageCode;

function translate(key: Scope): string {
  return i18n.t(key)
}

export { translate as t };
