import { PrincipalButton } from "@/components/Buttons";
import MainView from "@/components/MainView";
import { Text } from "@/components/Texts";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { getAuth, onAuthStateChanged, signOut } from '@react-native-firebase/auth';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export default function Index() {
  const screenConf: ScreenConf = {
    headerShown: false
  };
  const router = useRouter();
  const theme = useColorScheme();
  
  useHeaderBehavior({ headerShown: screenConf.headerShown });

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  function isAuthorized() {
    if(!user){
      return false
    }else{
      if(user.emailVerified){
        return true
      }else{
        return false
      }
    }
  }

  // Handle user state changes
  function handleAuthStateChanged(user: any) {
    console.log('Auth state changed:', user);
    console.log('Is authorized:', isAuthorized());
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <MainView headerShown={screenConf.headerShown}>
      <Text>{isAuthorized() ? 'Welcome back!' : 'Please log in.'}</Text>
      {isAuthorized() && (
        <PrincipalButton title="Logout" onPress={() => {
          signOut(getAuth()).then(() => console.log('User signed out!'));
        }} />
      )}
      <PrincipalButton title="Components" onPress={() => {router.replace('/component-example')}} />
      <PrincipalButton title="Login" onPress={() => {router.replace('/login')}} />
    </MainView>
  );
}