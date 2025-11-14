import { colors } from "@/colors";
import { Text } from "@/components/Texts";
import { StyleSheet, useColorScheme, View } from "react-native";

export default function LoginLine({ children }: { children: string }) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode });

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{children}</Text>
      <View style={styles.line}></View>
    </View>
  )
}

type StyleParams = {
  isDarkMode: boolean;
};

function makeStyles({ isDarkMode }: StyleParams) {
  const styles = StyleSheet.create({
    text: {
      marginHorizontal: 8,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: isDarkMode ? colors.dark.outline : colors.light.outline,
    }
  })
  return styles;
}
