import { UserSettingsData } from "@/models/UserSettings";
import { createContext, useContext } from "react";

export const UserSettingsContext = createContext<{
  userSettingsData: UserSettingsData | undefined;
  setUserSettings: (settings: UserSettingsData | undefined) => void;
} | undefined>(undefined);

export function useUserSettings() {
  const userSettings = useContext(UserSettingsContext);
  if(userSettings == undefined) {
    throw new Error("useUserSettings must be used within a UserSettingsProvider");
  }
  return userSettings;
}