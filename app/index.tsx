import { colors } from "@/colors";
import BottomHalfModal from "@/components/BottomHalfModal";
import MainView from "@/components/MainView";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text } from "react-native";

export default function Index() {
  const screenConf: ScreenConf = {
    headerShown: false
  };
  const router = useRouter();

  useHeaderBehavior({ headerShown: screenConf.headerShown });
  
  const styles = makeStyles({ isDarkMode: false });

  const [open, setOpen] = useState(false);

  return (
    <MainView headerShown={screenConf.headerShown}>
      <BottomHalfModal visible={open} onClose={() => setOpen(false)}>
        <Text>
          Contenido aquí… Desliza hacia abajo o toca fuera para cerrar.
        </Text>
      </BottomHalfModal>

      <Text>Splash</Text>
      <Button title="Open Modal" onPress={() => {setOpen(true)} }/>
      <Button title="Go to Home" onPress={() => {router.replace('/(auth)/home')}} />
      <Button title="Go to Login" onPress={() => {router.replace('/login')}} />
    </MainView>
  );
}

type StyleParams = {
  isDarkMode: boolean;
};

function makeStyles({ isDarkMode }: StyleParams) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? colors.dark.background : colors.light.background,
      padding: 20,
    },
    backdrop: {
      flex: 1,
      borderColor: 'red',
      borderWidth: 2,
      backgroundColor: isDarkMode ? colors.dark.loadingBackground : colors.light.loadingBackground,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }
  });
}