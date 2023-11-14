export type NavigationRoute = {
  path: NavigationRoutePath,
  params?: { [key: string]: any },
};

export enum NavigationRoutePath {
  Initialization = '/init',
  Home = '/home',
}

export namespace NavigationRoutePath {
  export function getMenuBarDisplayed(path: NavigationRoutePath): boolean {
    return path !== NavigationRoutePath.Initialization;
  }
}

export enum InitializationPageIndex {
  Top,
  RegistrationNickname,
  RegistrationServiceLinking,
}
