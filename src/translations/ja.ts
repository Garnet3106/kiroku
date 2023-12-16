import { TranslationDictionaryData } from '.';
import { Language } from './lang';
import { DayOfWeek, TaskCategory, TaskSortStyle } from '../task';

const ja: TranslationDictionaryData = {
  lang: {
    [Language.English]: 'English',
    [Language.Japanese]: '日本語',
  },
  app: {
    name: 'キロク',
    slogan: 'キャッチコピーが入ります',
  },
  task: {
    categories: {
      [TaskCategory.Uncategorized]: '未分類',
      [TaskCategory.Reading]: '読書',
      [TaskCategory.Study]: '勉強',
    },
    dayOfWeek: {
      [DayOfWeek.Monday]: '月',
      [DayOfWeek.Tuesday]: '火',
      [DayOfWeek.Wednesday]: '水',
      [DayOfWeek.Thursday]: '木',
      [DayOfWeek.Friday]: '金',
      [DayOfWeek.Saturday]: '土',
      [DayOfWeek.Sunday]: '日',
    },
    sortStyles: {
      [TaskSortStyle.Name]: '名前順',
      [TaskSortStyle.WorkingDay]: '作業日が近い順',
    },
  },
  menuBar: {
    home: 'ホーム',
    perf: '実績',
    mgmt: '管理',
    settings: '設定',
  },
  serviceLinking: {
    google: 'Google',
    emailAddress: 'メールアドレス',
  },
  init: {
    back: '前に戻る',
    next: '次へ進む',
    top: {
      getStarted: '初めての方はこちら',
      login: 'ログイン',
      tos: '利用規約',
      privacyPolicy: 'プライバシーポリシー',
    },
    login: {
      chooseServiceToLogin: 'ログインするサービスを選んでください。',
      toast: {
        failedToLogin: 'ログインできませんでした。再度お試しください。',
        loggedIn: 'ログインしました。',
      },
    },
    emailLogin: {
      emailAddress: 'メールアドレス',
      emailAddressExample: '例）...@gmail.com',
      sendLoginLink: '認証リンクを送信',
      resendLoginLink: '認証リンクを再送信',
      dialog: {
        confirmEmail: 'メール確認',
        areYouSureToSendAuthLink: '「%{email}」に認証リンクを送信します。よろしいですか？',
        send: '送信',
        cancel: 'キャンセル',
      },
      toast: {
        sentAuthMail: '認証メールを送信しました。メールボックスを確認してください。',
        loggedIn: 'ログインしました。',
        invalidAuthLink: '認証リンクが無効です。',
        failedToAuthWithEmail: 'メール認証に失敗しました。再度お試しください。',
      },
    },
    nickname: {
      nickname: 'ニックネーム',
      nicknameExample: '例）きろくたろー',
    },
    serviceLinking: {
      chooseLinkingService: 'アカウントに連携させるサービスを選択してください。',
      caption: '次回以降のログインで使用します。',
    },
    registrationEmail: {
      emailAddress: 'メールアドレス',
      emailAddressExample: '例）...@gmail.com'
    },
    finish: {
      completed: '準備完了',
      letsGetStarted: 'さっそくキロクを使ってみましょう！',
      continueToTop: 'アプリトップに進む',
    },
  },
  home: {
    home: 'ホーム',
    todaysPerf: '今日の実績',
    todaysTasks: '今日の作業',
    done: '%{progress} 完了',
    taskItem: {
      minutesLeft: '残り%{min}分',
      completed: '完了',
      startTask: '作業開始',
      dialog: {
        doYouReallyTackle: '「%{taskTitle}」を開始しますか？',
        start: '開始',
        cancel: 'キャンセル',
      },
      toast: {
        taskStarted: '作業を開始しました。',
        finishCurrentTask: '他の作業を始める前に現在の作業を終了してください。',
      },
    },
  },
  taskPerf: {
    taskPerf: '作業実績',
  },
  taskMgmt: {
    taskMgmt: '作業管理',
    newTask: '新規作業',
    taskItem: {
      mins: '%{min}分',
      everyWeeksOn: '%{interval}週おき%{daysOfWeek}',
      daily: '毎日',
      everyDays: '%{interval}日おき',
      remindRecess: '休憩通知あり',
    },
  },
  taskEdit: {
    taskReg: '作業登録',
    taskEdit: '作業編集',
    whatKindOfTask: 'どのような作業に取り組みますか？',
    category: 'カテゴリー',
    title: 'タイトル',
    titleExample: '例）受験勉強',
    targetTime: '目標時間',
    custom: 'カスタム',
    min: '%{min}分',
    intervalOfWorkingDate: '作業間隔',
    day: '日おき',
    week: '週おき',
    every: '%{value}',
    delete: '削除',
    save: '保存',
    dialog: {
      taskMgmt: '作業管理',
      doYouReallyDeleteTask: '「%{taskTitle}」を削除しますか？',
      doYouWantToArchive: '作業をアーカイブしますか？\n\n※アーカイブしなかった場合、作業履歴を含む作業データが削除されます。',
      delete: '削除',
      archive: 'アーカイブ',
      cancel: 'キャンセル',
    },
    toast: {
      taskWasDeleted: '作業が削除されました。',
      taskWasSaved: '作業が保存されました。',
      failedToSaveTask: '作業を保存できませんでした。再度お試しください。',
      failedToDeleteTask: '作業を削除できませんでした。再度お試しください。',
    },
  },
  taskInProgress: {
    taskInProgress: '作業進捗',
    working: '作業中',
    onBreak: '休憩中',
    minutesLeft: '残り%{min}分',
    ranOverMinutes: '%{min}分オーバー',
    operation: {
      minimize: '最小化',
      stop: '休憩･中断',
      resume: '再開',
      finish: '終了',
    },
    dialog: {
      doYouReallyStopWorking: '作業を中断しますか？',
      doYouReallyResumeWorking: '作業を再開しますか？',
      doYouReallyFinishWorking: '作業を終了しますか？',
      stop: '中断',
      resume: '再開',
      finish: '終了',
      cancel: 'キャンセル',
    },
    toast: {
      stoppedWorking: '作業を中断しました。',
      resumedWorking: '作業を再開しました。',
      finishedWorking: '作業を終了しました。',
    },
  },
  taskFinish: {
    taskFinish: '作業終了',
    wellDone: 'お疲れ様でした！',
    properties: {
      workingTime: '作業時間',
      recessTime: '休憩時間',
      currentLevel: '現在のレベル',
      plusPt: '+%{pt}pt',
      mins: '%{min}分',
    },
    letsRecordYourConcentrationLevel: '今回の集中度を記録しましょう。',
    save: '保存',
    toast: {
      workLogWasSaved: '作業履歴を保存しました。',
      failedToSaveWorkLog: '作業履歴を保存できませんでした。再度お試しください。',
    },
  },
  appSettings: {
    appSettings: 'アプリ設定',
    yourProfile: 'プロフィール',
    nickname: 'ニックネーム',
    logout: 'ログアウト',
    display: '表示',
    lang: '言語',
    dialog: {
      doYouReallyLogout: 'ログアウトしますか？',
      logout: 'ログアウト',
      cancel: 'キャンセル',
    },
    toast: {
      loggedOut: 'ログアウトしました。',
      failedToLogout: 'ログアウトできませんでした。再度お試しください。',
    },
  },
};

export default ja;
