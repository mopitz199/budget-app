import MainView from "@/components/MainView";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { getAuth, onAuthStateChanged, reload } from '@react-native-firebase/auth';
import { getCrashlytics, setUserId } from '@react-native-firebase/crashlytics';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
export default function Index() {
  const screenConf: ScreenConf = {
    headerShown: false
  };
  const router = useRouter();
  const auth = getAuth()
  const crashlyticsInstance = getCrashlytics();
  
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

  function isAuthenticated() {
    return user != null
  }

  // Reload user data from Firebase to check for email verification updates
  async function refreshUser() {
    if (user) {
      try {
        await reload(auth.currentUser!);
        // After reload, get the fresh user data
        const refreshedUser = auth.currentUser;
        setUser(refreshedUser);
        return refreshedUser;
      } catch (error) {
        console.error('Error refreshing user:', error);
        return null;
      }
    }
    return null;
  }

  // Handle user state changes
  function handleAuthStateChanged(user: any) {
    if(user){
      setUserId(crashlyticsInstance, user.uid);
    }
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if(!initializing){
      if(isAuthenticated()){
        if(isAuthorized()){
          router.replace('/(auth)/home');
        }else{
          router.replace({
            pathname: '/(auth)/account-not-verified',
            params: { enableConfetti: 'false' }
          });
        }
      }else{
        router.replace('/login');
      }
    }
  }, [initializing]);

  return (
    <MainView headerShown={screenConf.headerShown} loading={false}>
      <></>
    </MainView>
  );
}