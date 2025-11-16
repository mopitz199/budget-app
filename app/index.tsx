import { PrincipalButton } from "@/components/Buttons";
import MainView from "@/components/MainView";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
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
  const [user, setUser] = useState();

  // Handle user state changes
  function handleAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <MainView headerShown={screenConf.headerShown}>
      <PrincipalButton title="Components" onPress={() => {router.replace('/component-example')}} />
      <PrincipalButton title="Login" onPress={() => {router.replace('/login')}} />
    </MainView>
  );
}