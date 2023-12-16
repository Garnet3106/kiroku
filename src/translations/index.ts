import { I18n, Scope } from 'i18n-js';
import en from './en';
import ja from './ja';
import { DayOfWeek, TaskCategory, TaskSortStyle } from '../task';
import env from '../env';
import { Language } from './lang';

export type TranslationDictionary = { [lang in Language]: TranslationDictionaryData };

export type TranslationDictionaryData = {
  lang: { [lang in Language]: string },
  app: {
    name: string,
    slogan: string,
  },
  task: {
    categories: { [category in TaskCategory]: string },
    dayOfWeek: { [day in DayOfWeek]: string },
    sortStyles: { [sortStyle in TaskSortStyle]: string },
  },
  menuBar: {
    home: string,
    perf: string,
    mgmt: string,
    settings: string,
  },
  serviceLinking: {
    google: string,
    emailAddress: string,
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
    login: {
      chooseServiceToLogin: string,
      toast: {
        failedToLogin: string,
        loggedIn: string,
      },
    },
    emailLogin: {
      emailAddress: string,
      emailAddressExample: string,
      sendLoginLink: string,
      resendLoginLink: string,
      dialog: {
        confirmEmail: string,
        areYouSureToSendAuthLink: string,
        send: string,
        cancel: string,
      },
      toast: {
        sentAuthMail: string,
        loggedIn: string,
        invalidAuthLink: string,
        failedToAuthWithEmail: string,
      },
    },
    nickname: {
      nickname: string,
      nicknameExample: string,
    },
    serviceLinking: {
      chooseLinkingService: string,
      caption: string,
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
      completed: string,
      startTask: string,
      dialog: {
        doYouReallyTackle: string,
        start: string,
        cancel: string,
      },
      toast: {
        taskStarted: string,
        finishCurrentTask: string,
      },
    },
  },
  taskPerf: {
    taskPerf: string,
  },
  taskMgmt: {
    taskMgmt: string,
    newTask: string,
    taskItem: {
      mins: string,
      everyWeeksOn: string,
      daily: string,
      everyDays: string,
      remindRecess: string,
    },
  },
  taskEdit: {
    taskReg: string,
    taskEdit: string,
    whatKindOfTask: string,
    category: string,
    title: string,
    titleExample: string,
    targetTime: string,
    custom: string,
    min: string,
    intervalOfWorkingDate: string,
    day: string,
    week: string,
    every: string,
    delete: string,
    save: string,
    dialog: {
      taskMgmt: string,
      doYouReallyDeleteTask: string,
      doYouWantToArchive: string,
      delete: string,
      archive: string,
      cancel: string,
    },
    toast: {
      taskWasDeleted: string,
      taskWasSaved: string,
      failedToSaveTask: string,
      failedToDeleteTask: string,
    },
  },
  taskInProgress: {
    taskInProgress: string,
    working: string,
    onBreak: string,
    minutesLeft: string,
    ranOverMinutes: string,
    operation: {
      minimize: string,
      stop: string,
      resume: string,
      finish: string,
    },
    dialog: {
      doYouReallyStopWorking: string,
      doYouReallyResumeWorking: string,
      doYouReallyFinishWorking: string,
      stop: string,
      resume: string,
      finish: string,
      cancel: string,
    },
    toast: {
      stoppedWorking: string,
      resumedWorking: string,
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
    save: string,
    toast: {
      workLogWasSaved: string,
      failedToSaveWorkLog: string,
    },
  },
  appSettings: {
    appSettings: string,
    yourProfile: string,
    nickname: string,
    logout: string,
    display: string,
    lang: string,
    dialog: {
      doYouReallyLogout: string,
      logout: string,
      cancel: string,
    },
    toast: {
      langWasChanged: string,
      failedToChangeLang: string,
      loggedOut: string,
      failedToLogout: string,
    },
  },
};

export const translations: TranslationDictionary = { en, ja };

const i18n = new I18n(translations);

export function setLanguage(lang: Language) {
  i18n.locale = env.languageCode ?? lang;
}

function translate(key: Scope, options?: object): string {
  return i18n.t(key, options);
}

export { Language, translate as t };
