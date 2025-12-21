export type UserSettingsData = {
  defaultCurrency: string;
};

type UserSettingsFactory = {
  initToApp: () => UserSettingsData;
  toApp: (data: any) => UserSettingsData;
  toFirebase: (data: UserSettingsData) => any;
};

export const UserSettingsFactory: UserSettingsFactory = {
  initToApp: function(): UserSettingsData {
    return {
      defaultCurrency: 'USD',
    };
  },
  toApp: function(data: any): UserSettingsData {
    return {
      defaultCurrency: data.defaultCurrency
    };
  },
  toFirebase: function(data: UserSettingsData): any {
    return {
      defaultCurrency: data.defaultCurrency
    };
  }
};