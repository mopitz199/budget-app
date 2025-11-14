import { colors } from "@/colors";
import { globalStyles } from "@/global-styles";
import { Text as RNText, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

export function Text({ children, style }: { children: string; style?: any }) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode });

  return (
    <RNText style={StyleSheet.compose(styles.text, style)}>{children}</RNText>
  )
}

export function Title({ children, style }: { children: string; style?: any }) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode });

  return (
    <RNText style={StyleSheet.compose(style, styles.title)}>{children}</RNText>
  )
}

export function LinkText({ children, style }: { children: string; style?: any }) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode });

  return (
    <TouchableOpacity>
      <RNText style={StyleSheet.compose(style, styles.linkText)}>{children}</RNText>
    </TouchableOpacity>
  )
}

type StyleParams = {
  isDarkMode: boolean;
};

function makeStyles({ isDarkMode }: StyleParams) {
  const styles = StyleSheet.create({
    text: {
      fontFamily: globalStyles.fontFamily,
      fontSize: globalStyles.textFontSize,
    },
    title: {
      fontFamily: globalStyles.titleFontFamily,
      fontSize: globalStyles.titleFontSize,
    },
    linkText: {
      fontFamily: globalStyles.fontFamily,
      fontSize: globalStyles.textFontSize,
      color: isDarkMode ? colors.dark.link : colors.light.link,
    },
  })
  return styles;
}
