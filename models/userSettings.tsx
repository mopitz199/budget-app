export type UserSettings = {
  defaultCurrency: string;
};

export function initUserSettings(): UserSettings {
  return {
    defaultCurrency: 'USD',
  };
}

export function transformToAppUserSettings(firebaseData: any): UserSettings {
  return {
    defaultCurrency: firebaseData.defaultCurrency
  };
}

export function transformToFirebaseUserSettings(appData: UserSettings): any {
  return {
    defaultCurrency: appData.defaultCurrency,
  };
}