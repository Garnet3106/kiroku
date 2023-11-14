export type NavigationRoute = {
  path: NavigationRoutePath,
  params?: { [key: string]: any },
};

export enum NavigationRoutePath {
  Initialization = '/init',
  Home = '/home',
}

export enum InitializationPageIndex {
  Top,
  RegistrationNickname,
}
