import { TranslationDictionaryData } from '.';
import { DayOfWeek, TaskCategory, TaskSortStyle } from '../task';

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
    dayOfWeek: {
      [DayOfWeek.Monday]: 'Mon.',
      [DayOfWeek.Tuesday]: 'Tue.',
      [DayOfWeek.Wednesday]: 'Wed.',
      [DayOfWeek.Thursday]: 'Thu.',
      [DayOfWeek.Friday]: 'Fri.',
      [DayOfWeek.Saturday]: 'Sat.',
      [DayOfWeek.Sunday]: 'Sun.',
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
  serviceLinking: {
    google: 'Google',
    emailAddress: 'Email address',
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
    login: {
      chooseServiceToLogin: 'Choose a service to login.',
      toast: {
        failedToLogin: 'Failed to login. Please try again.',
        loggedIn: 'You\'re now logged in.',
      },
    },
    emailLogin: {
      emailAddress: 'Email address',
      emailAddressExample: 'e.g.) ...@gmail.com',
      sendLoginLink: 'Send login link',
      resendLoginLink: 'Resend login link',
      dialog: {
        confirmEmail: 'Confirm Email',
        areYouSureToSendAuthLink: 'Are you sure to send authentication link to "%{email}"?',
        send: 'SEND',
        cancel: 'CANCEL',
      },
      toast: {
        sentAuthMail: 'Authentication mail has been sent. Please check your mailbox.',
        loggedIn: 'You\'re now logged in.',
        invalidAuthLink: 'Authentication link is invalid.',
        failedToAuthWithEmail: 'Failed to authenticate with email. Please try again.',
      },
    },
    nickname: {
      nickname: 'Nickname',
      nicknameExample: 'e.g.) John',
    },
    serviceLinking: {
      chooseLinkingService: 'Which service do you wish to link to your account?',
      caption: 'It is required for the next login.',
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
      completed: 'Completed',
      startTask: 'Task Start',
      dialog: {
        doYouReallyTackle: 'Do you really tackle "%{taskTitle}" now?',
        start: 'START',
        cancel: 'CANCEL',
      },
      toast: {
        taskStarted: 'Task started.',
        finishCurrentTask: 'Please finish current task before starting another task.',
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
    taskReg: 'Task Registration',
    taskEdit: 'Task Edit',
    whatKindOfTask: 'What kind of task would you tackle?',
    category: 'Category',
    title: 'Title',
    titleExample: 'e.g.) Examination Preparing',
    targetTime: 'Target Time',
    custom: 'Custom',
    min: '%{min} min',
    intervalOfWorkingDate: 'Interval of Working Date',
    day: 'Day',
    week: 'Week',
    every: 'Every %{value}',
    delete: 'Delete',
    save: 'Save',
    dialog: {
      taskMgmt: 'Task Management',
      doYouReallyDeleteTask: 'Do you really delete "%{taskTitle}"?',
      doYouWantToArchive: 'Do you want to archive this task?\n\n* If not archived, task data including work logs will be deleted.',
      delete: 'DELETE',
      archive: 'ARCHIVE',
      cancel: 'CANCEL',
    },
    toast: {
      taskWasDeleted: 'Task was deleted.',
      taskWasSaved: 'Task was saved.',
      failedToSaveTask: 'Failed to save task. Please try again.',
      failedToDeleteTask: 'Failed to delete task. Please try again.',
    },
  },
  taskInProgress: {
    taskInProgress: 'Task in Progress',
    working: 'Working...',
    onBreak: 'On a break',
    minutesLeft: '%{min} mins left',
    ranOverMinutes: 'Ran over %{min} minutes',
    operation: {
      minimize: 'Minimize',
      stop: 'Stop',
      resume: 'Resume',
      finish: 'Finish',
    },
    dialog: {
      doYouReallyStopWorking: 'Do you really stop working?',
      doYouReallyResumeWorking: 'Do you really resume working?',
      doYouReallyFinishWorking: 'Do you really finish working?',
      stop: 'STOP',
      resume: 'RESUME',
      finish: 'FINISH',
      cancel: 'CANCEL',
    },
    toast: {
      stoppedWorking: 'Task was stopped.',
      resumedWorking: 'Task was resumed.',
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
    save: 'Save',
    toast: {
      workLogWasSaved: 'Work log was saved.',
      failedToSaveWorkLog: 'Failed to save work log. Please try again.',
    },
  },
  appSettings: {
    appSettings: 'App Settings',
    yourAccount: 'Your Account',
    nickname: 'Nickname',
    logout: 'Logout',
    dialog: {
      doYouReallyLogout: 'Do you really logout?',
      logout: 'LOGOUT',
      cancel: 'CANCEL',
    },
    toast: {
      loggedOut: 'You logged out.',
      failedToLogout: 'Failed to logout. Please try again.',
    },
  },
};

export default en;
