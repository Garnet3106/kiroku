export type NavigationRoute = {
  path: NavigationRoutePath,
  params: NavigationRouteParameters,
};

export type NavigationRouteParameters = { [key: string]: any };

export enum NavigationRoutePath {
  Initialization = '/init',
  Home = '/home',
  Performance = '/performance',
  Management = '/management',
  Settings = '/settings',
  TaskInProgress = '/progress',
  TaskFinish = '/progress/finish',
  TaskEdit = 'task/edit',
}

export namespace NavigationRoutePath {
  export function getMenuBarDisplayed(path: NavigationRoutePath): boolean {
    switch (path) {
      case NavigationRoutePath.Initialization:
      case NavigationRoutePath.TaskFinish:
        return false;

      default:
        return true;
    }
  }
}

export enum InitializationPageIndex {
  Top,
  Login,
  EmailLogin,
  RegistrationNickname,
  RegistrationServiceLinking,
  RegistrationEmail,
  Finish,
}
