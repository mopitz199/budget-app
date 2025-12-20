import { UserSettings } from "@/models/userSettings";
import { createContext, useContext } from "react";

export const UserSettingsContext = createContext<{
  userSettingsData: UserSettings | undefined;
  setUserSettings: (settings: UserSettings | undefined) => void;
} | undefined>(undefined);

export function useUserSettings() {
  const userSettings = useContext(UserSettingsContext);
  if(userSettings == undefined) {
    throw new Error("useUserSettings must be used within a UserSettingsProvider");
  }
  return userSettings;
}