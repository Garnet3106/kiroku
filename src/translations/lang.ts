import { getLocales } from 'expo-localization';

export enum Language {
  English = 'en',
  Japanese = 'ja',
}

export namespace Language {
  export function enumerate(): Language[] {
    return Object.values(Language).filter((v) => typeof v === 'string').map((v) => v as Language);
  }

  export function getInitial(): Language {
    const lang = getLocales()[0].languageCode;
    return Language.enumerate().map((v) => String(v)).includes(lang) ? lang as Language : Language.English;
  }
}
