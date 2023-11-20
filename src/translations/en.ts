import { TranslationDictionaryData } from '.';
import { TaskCategory, TaskSortStyle } from '../task';

const en: TranslationDictionaryData = {
  app: {
    name: 'kiroku',
    slogan: 'Slogan Here',
  },
  task: {
    categories: {
      [TaskCategory.Uncategorized]: 'Uncategorized',
      [TaskCategory.Reading]: 'Reading',
      [TaskCategory.Study]: 'Study',
    },
    sortStyles: {
      [TaskSortStyle.Name]: 'Sort by name',
      [TaskSortStyle.WorkingDay]: 'Sort by working date',
    },
  },
  menuBar: {
    home: 'Home',
    perf: 'Perf.',
    mgmt: 'Manage',
    settings: 'Settings',
  },
  init: {
    back: 'Back',
    next: 'Go to next',
    top: {
      getStarted: 'Get Started',
      login: 'Login',
      tos: 'Terms of service',
      privacyPolicy: 'Privacy policy',
    },
    nickname: {
      nickname: 'Nickname',
      nicknameExample: 'e.g.) John',
    },
    serviceLinking: {
      chooseLinkingService: 'Which service do you wish to link to your account?',
      caption: 'It is required for the next login.',
      google: 'Google',
      emailAddress: 'Email address',
    },
    registrationEmail: {
      emailAddress: 'Email address',
      emailAddressExample: 'e.g.) ...@gmail.com'
    },
    finish: {
      completed: 'Preparation Completed',
      letsGetStarted: 'Let\'s just start to use kiroku!',
      continueToTop: 'Continue to top',
    },
  },
  home: {
    home: 'Home',
    todaysPerf: 'Today\'s Performance',
    todaysTasks: 'Today\'s Tasks',
    done: '%{progress} done',
    taskItem: {
      minutesLeft: '%{min} mins left',
      startTask: 'Task Start',
      dialog: {
        doYouReallyTackle: 'Do you really tackle "%{taskTitle}" now?',
        start: 'START',
        cancel: 'CANCEL',
      },
      toast: {
        taskStarted: 'Task started.',
      },
    },
  },
  taskPerf: {
    taskPerf: 'Task Performance',
  },
  taskMgmt: {
    taskMgmt: 'Task Management',
    newTask: 'New Task',
  },
  taskEdit: {
    whatKindOfTask: 'What kind of task do you tackle?',
    category: 'Category',
    title: 'Title',
    titleExample: 'e.g.) Examination Preparing',
    intervalOfWorkingDate: 'Interval of Working Date',
    delete: 'Delete',
    save: 'Save',
    dialog: {
      taskMgmt: 'Task Management',
      doYouReallyDeleteTask: 'Do you really delete "%{taskTitle}"?',
      delete: 'DELETE',
      cancel: 'CANCEL',
    },
    toast: {
      taskWasDeleted: 'Task was deleted.',
      taskWasSaved: 'Task was saved.',
    },
  },
  taskInProgress: {
    taskInProgress: 'Task in Progress',
    working: 'Working...',
    minutesLeft: '%{min} mins left',
    operation: {
      minimize: 'Minimize',
      stop: 'Stop',
      finish: 'Finish',
    },
    dialog: {
      doYouReallyStopWorking: 'Do you really stop working?',
      doYouReallyFinishWorking: 'Do you really finish working?',
      stop: 'STOP',
      finish: 'FINISH',
      cancel: 'CANCEL',
    },
    toast: {
      stoppedWorking: 'Task has been stopped.',
      finishedWorking: 'You got this task done.',
    },
  },
  taskFinish: {
    taskFinish: 'Task Finish',
    wellDone: 'Well done!',
    properties: {
      workingTime: 'Working Time',
      recessTime: 'Recess Time',
      currentLevel: 'Current Level',
      plusPt: '+%{pt}pt',
      mins: '%{min} mins',
    },
    letsRecordYourConcentrationLevel: 'Let\'s record your concentration level.',
    close: 'Close',
  },
  appSettings: {
    appSettings: 'App Settings',
  },
};

export default en;