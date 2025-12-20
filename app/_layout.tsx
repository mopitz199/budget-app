import LoadingModal from "@/components/LoadingModal";
import { UserSettingsContext } from "@/contexts";
import { initUserSettings, transformToAppUserSettings, transformToFirebaseUserSettings, UserSettings } from "@/models/userSettings";
import { log } from "@/utils/logUtils";
import { getAuth } from "@react-native-firebase/auth";
import { getCrashlytics, recordError } from "@react-native-firebase/crashlytics";
import { doc, getDoc, getFirestore, setDoc } from '@react-native-firebase/firestore';
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function RootLayout() {

  const { t } = useTranslation();
  const crashlyticsInstance = getCrashlytics();
  const auth = getAuth()
  
  const [userSettingsData, setUserSettings] = useState<UserSettings | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserSettings = async () => {
    const user = auth.currentUser;
    if(!user){
      recordError(
        crashlyticsInstance,
        new Error('user_does_not_exists: There is no user logged in')
      );
      return undefined
    }else {
      const db = getFirestore();
      const docRef = doc(db, "user_settings", user.uid);
      const docSnap = await getDoc(docRef); 

      let userSettingsData = initUserSettings()
      if(docSnap.exists()){
        userSettingsData = transformToAppUserSettings(docSnap.data());
      }else{
        log(crashlyticsInstance, 'Creating user settings for user: ' + user.uid);
        await setDoc(
          docRef,
          transformToFirebaseUserSettings(userSettingsData)
        )
      }
      return userSettingsData
    }
  }

  const loadContexts = async () => {
    const settings = await fetchUserSettings();
    setUserSettings(settings);
    setLoading(false);
  }

  useEffect(() => {
    loadContexts();
  }, []);

  return (
    <>
    {loading ? (
      <LoadingModal loading={loading} />
    ) : (
      <UserSettingsContext.Provider value={{
        userSettingsData: userSettingsData,
        setUserSettings: setUserSettings,
      }}>
        <Stack screenOptions={{animation: 'none'}}>
          <Stack.Screen name="login" options={{animation: 'none'}}/>
          <Stack.Screen name="component-example" options={{animation: 'default'}}/>
          <Stack.Screen name="recover-account" options={{animation: 'default'}}/>
          <Stack.Screen name="register" options={{animation: 'default'}}/>
          <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'none' }} />
        </Stack>
      </UserSettingsContext.Provider>
    )}
    </>
  )
}


