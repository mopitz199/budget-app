import { PrincipalButton } from "@/components/Buttons";
import MainView from "@/components/MainView";
import { Text } from "@/components/Texts";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { getAuth, onAuthStateChanged, signOut } from '@react-native-firebase/auth';
import { getCrashlytics, recordError, setUserId } from '@react-native-firebase/crashlytics';
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


  function unauthenticatedScreen(){
    return (
      <>
        <Text>{isAuthorized() ? 'Welcome back!' : 'Please log in.'}</Text>
        {isAuthorized() && (
          <PrincipalButton title="Logout" onPress={() => {
            signOut(auth).then(() => console.log('User signed out!'));
          }} />
        )}
        <PrincipalButton title="Components" onPress={() => {
          recordError(crashlyticsInstance, new Error('error_at_index: '));
          router.replace('/component-example')}
        } />
        <PrincipalButton title="Login" onPress={() => {router.replace('/login')}} />
      </>
    )
  }

  function unauthorizedScreen(){
    return (
      <>
        <Text>Register your email</Text>
        <PrincipalButton title="Sign out" onPress={async () => {
          await signOut(auth);
          console.log('User signed out!');
        }} />
      </>
    )
  }

  function authorizedScreen(){
    return (
      <>
        <Text>{isAuthorized() ? 'Welcome back!' : 'Please log in.'}</Text>
        {isAuthorized() && (
          <PrincipalButton title="Sign out" onPress={() => {
            signOut(auth).then(() => console.log('User signed out!'));
          }} />
        )}
        <PrincipalButton title="Components" onPress={() => {
          recordError(crashlyticsInstance, new Error('error_at_index: '));
          router.replace('/component-example')}
        } />
      </>
    )
  }

  useEffect(() => {
    if(!initializing){
      if(isAuthenticated()){
        if(isAuthorized()){
          router.replace('/(auth)/home');
        }else{
          router.replace('/(auth)/account-not-verified');
          //router.replace('/(auth)/home');
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