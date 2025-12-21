import LoadingModal from "@/components/LoadingModal";
import { UserSettingsContext } from "@/contexts";
import { UserSettingsData, UserSettingsFactory } from "@/models/UserSettings";
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
  const user = auth.currentUser;

  const [userSettingsData, setUserSettings] = useState<UserSettingsData | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserSettings = async () => {  
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

      let userSettingsData = UserSettingsFactory.initToApp()
      if(docSnap.exists()){
        userSettingsData = UserSettingsFactory.toApp(docSnap.data());
      }else{
        log(crashlyticsInstance, 'Creating user settings for user: ' + user.uid);
        await setDoc(
          docRef,
          UserSettingsFactory.toFirebase(userSettingsData)
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
        <Stack>
          <Stack.Screen name="home" options={{animation: 'none'}}/>
          <Stack.Screen name="account-not-verified"/>
          <Stack.Screen name="settings"/>
          <Stack.Screen name="transactions"/>
          <Stack.Screen name="manual-transaction"/>
          <Stack.Screen name="upload-file"/>
          <Stack.Screen name="upload-file-success"/>
          <Stack.Screen name="upload-file-transactions-preview"/>
          <Stack.Screen name="upload-file-transactions-preview-edition" />
        </Stack>
      </UserSettingsContext.Provider>
    )}
    </>
  )
}
