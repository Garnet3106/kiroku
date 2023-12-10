import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StorageKey {
  EmailForLinkAuth = 'email-for-link-auth',
  TaskInProgress = 'task-in-progress',
}

export namespace Storage {
  export function getItem(key: StorageKey): Promise<string | null> {
    return AsyncStorage.getItem(key);
  }

  export function setItem(key: StorageKey, value: string): Promise<void> {
    return AsyncStorage.setItem(key, value);
  }

  export function removeItem(key: StorageKey): Promise<void> {
    return AsyncStorage.removeItem(key);
  }
}
