import { colors } from "@/colors";
import { ActivityIndicator, Modal, StyleSheet, useColorScheme, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Confetti from "./Confetti";

export interface MainViewProps {
  headerShown?: boolean;
  loading?: boolean;
  showConfetti?: boolean;
  children: React.ReactNode;
}

type StyleParams = {
  isDarkMode: boolean;
};

export default function MainView({ headerShown = true, loading = false, showConfetti = false,children }: MainViewProps) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const style = makeStyles({ isDarkMode });

  const loadingScreen = () => {
    return (
      <Modal visible={loading} transparent animationType="none">
        <View style={style.backdrop}>
          <ActivityIndicator size="large" color={colors.light.primary}/>
        </View>
      </Modal>
    )
  }

  if (headerShown) {
    return (
      <>
        <Confetti show={showConfetti} />
        <View style={style.container}>
          {loading && loadingScreen()}
          {children}
        </View>
      </>
    )
  } else {
    return (
      <>
        <Confetti show={showConfetti} />
        <SafeAreaView style={style.container}>
          {loading && loadingScreen()}
          {children}
        </SafeAreaView>
      </>
    )
  }
}

function makeStyles({ isDarkMode }: StyleParams) {
  return StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      backgroundColor: isDarkMode ? colors.dark.background : colors.light.background,
      padding: 20,
    },
    backdrop: {
      flex: 1,
      backgroundColor: isDarkMode ? colors.dark.loadingBackground : colors.light.loadingBackground,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }
  });
}