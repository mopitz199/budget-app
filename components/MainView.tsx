import { colors } from "@/colors";
import { StyleSheet, useColorScheme, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export interface MainViewProps {
  headerShown?: boolean;
  children: React.ReactNode;
}

type StyleParams = {
  isDarkMode: boolean;
};

export default function MainView({ headerShown = true, children }: MainViewProps) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const style = makeStyles({ isDarkMode });

  if (headerShown) {
    return (
      <View style={style.container}>
        {children}
      </View>
    )
  } else {
    return (
      <SafeAreaView style={style.container}>
        {children}
      </SafeAreaView>
    )
  }
}

function makeStyles({ isDarkMode }: StyleParams) {
  console.log("isDarkMode", isDarkMode);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? colors.dark.background : colors.light.background,
      borderWidth: 2,
    },
  });
}