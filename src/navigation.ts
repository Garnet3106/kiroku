export type NavigationRoute = {
  path: NavigationRoutePath,
  params?: object,
};

export enum NavigationRoutePath {
  Initialization = '/init',
  Home = '/home',
}
