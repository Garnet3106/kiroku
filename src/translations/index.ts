import { getLocales } from 'expo-localization';
import { I18n, Scope } from 'i18n-js';
import en from './en';
import ja from './ja';
import { TaskCategory, TaskSortStyle } from '../task';

export enum Language {
  English = 'en',
  Japanese = 'ja',
}

export type TranslationDictionary = { [lang in Language]: TranslationDictionaryData };

export type TranslationDictionaryData = {
  app: {
    name: string,
    slogan: string,
  },
  task: {
    categories: { [category in TaskCategory]: string },
    sortStyles: { [sortStyle in TaskSortStyle]: string },
  },
  menuBar: {
    home: string,
    perf: string,
    mgmt: string,
    settings: string,
  },
  init: {
    back: string,
    next: string,
    top: {
      getStarted: string,
      login: string,
      tos: string,
      privacyPolicy: string,
    },
    nickname: {
      nickname: string,
      nicknameExample: string,
    },
    serviceLinking: {
      chooseLinkingService: string,
      caption: string,
      google: string,
      emailAddress: string,
    },
    registrationEmail: {
      emailAddress: string,
      emailAddressExample: string
    },
    finish: {
      completed: string,
      letsGetStarted: string,
      continueToTop: string,
    },
  },
  home: {
    home: string,
    todaysPerf: string,
    todaysTasks: string,
    done: string,
    taskItem: {
      minutesLeft: string,
      startTask: string,
      dialog: {
        doYouReallyTackle: string,
        start: string,
        cancel: string,
      },
      toast: {
        taskStarted: string,
      },
    },
  },
  taskPerf: {
    taskPerf: string,
  },
  taskMgmt: {
    taskMgmt: string,
    newTask: string,
  },
  taskEdit: {
    whatKindOfTask: string,
    category: string,
    title: string,
    titleExample: string,
    intervalOfWorkingDate: string,
    delete: string,
    save: string,
    dialog: {
      taskMgmt: string,
      doYouReallyDeleteTask: string,
      delete: string,
      cancel: string,
    },
    toast: {
      taskWasDeleted: string,
      taskWasSaved: string,
    },
  },
  taskInProgress: {
    taskInProgress: string,
    working: string,
    minutesLeft: string,
    operation: {
      minimize: string,
      stop: string,
      finish: string,
    },
    dialog: {
      doYouReallyStopWorking: string,
      doYouReallyFinishWorking: string,
      stop: string,
      finish: string,
      cancel: string,
    },
    toast: {
      stoppedWorking: string,
      finishedWorking: string,
    },
  },
  taskFinish: {
    taskFinish: string,
    wellDone: string,
    properties: {
      workingTime: string,
      recessTime: string,
      currentLevel: string,
      plusPt: string,
      mins: string,
    },
    letsRecordYourConcentrationLevel: string,
    close: string,
  },
  appSettings: {
    appSettings: string,
  },
};

export const translations: TranslationDictionary = { en, ja };

const i18n = new I18n(translations);
i18n.locale = getLocales()[0].languageCode;

function translate(key: Scope, options?: object): string {
  return i18n.t(key, options);
}

export { translate as t };
