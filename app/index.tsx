import { PrincipalButton } from "@/components/Buttons";
import MainView from "@/components/MainView";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { useRouter } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

export default function Index() {
  const screenConf: ScreenConf = {
    headerShown: false
  };
  const router = useRouter();
  const theme = useColorScheme();
  
  useHeaderBehavior({ headerShown: screenConf.headerShown });

  return (
    <MainView headerShown={screenConf.headerShown}>
      <PrincipalButton title="Components" onPress={() => {router.replace('/component-example')}} />
      <PrincipalButton title="Login" onPress={() => {router.replace('/login')}} />
    </MainView>
  );
}