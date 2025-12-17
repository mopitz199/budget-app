import { getAuth } from "@react-native-firebase/auth";
import { doc, getDoc, getFirestore } from '@react-native-firebase/firestore';
import { Stack } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function RootLayout() {

  const { t } = useTranslation();
  const auth = getAuth()
  
  const [userSettings, setUserSettings] = useState<any | null>(null);

  const fetchUserSettings = async () => {
    const user = auth.currentUser;
    if(!user){
      // error
    }else {
      const db = getFirestore();
      const docRef = doc(db, "user_settings", user.uid);
      const docSnap = await getDoc(docRef); 

      if(docSnap.exists()){
        const userSettings = docSnap.data();
        return userSettings;        
      }else{
        // error
      }
    }
  }

  return (
    <Stack screenOptions={{animation: 'none'}}>
      <Stack.Screen name="login" options={{animation: 'none'}}/>
      <Stack.Screen name="component-example" options={{animation: 'default'}}/>
      <Stack.Screen name="recover-account" options={{animation: 'default'}}/>
      <Stack.Screen name="register" options={{animation: 'default'}}/>
      <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'none' }} />
    </Stack>
  )
}


