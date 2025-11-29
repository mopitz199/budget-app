import { colors } from "@/colors";
import { globalStyles } from "@/global-styles";
import { Text as RNText, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

// Text component for regular text
export function Text({ children, style }: { children: string; style?: any }) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode });

  return (
    <RNText style={StyleSheet.compose(styles.text, style)}>{children}</RNText>
  )
}

// Title to describe a main section in the screen
export function Title({ children, style }: { children: string; style?: any }) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode });

  return (
    <RNText style={StyleSheet.compose(styles.title, style)}>{children}</RNText>
  )
}

// Title to describe a main section in the screen
export function ConfirmationTitle({ children, style }: { children: string; style?: any }) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode });

  return (
    <RNText style={StyleSheet.compose(styles.confirmationTitle, style)}>{children}</RNText>
  )
}

// Title to use in the modal alert
export function AlertTitle({ children, style }: { children: string; style?: any }) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode });

  return (
    <RNText style={StyleSheet.compose(styles.alertTitle, style)}>{children}</RNText>
  )
}

// Text that acts as a link
export function LinkText({ children, onPress, style }: { children: string; onPress?: () => void; style?: any }) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode });

  return (
    <TouchableOpacity onPress={onPress}>
      <RNText style={StyleSheet.compose(styles.linkText, style)}>{children}</RNText>
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
      color: isDarkMode ? colors.dark.onSurface : colors.light.onSurface,
    },
    title: {
      fontFamily: globalStyles.titleFontFamily,
      fontSize: globalStyles.titleFontSize,
      color: isDarkMode ? colors.dark.onSurface : colors.light.onSurface,
    },
    confirmationTitle: {
      fontFamily: globalStyles.confirmationTitleFontFamily,
      fontSize: globalStyles.confirmationTitleFontSize,
      color: isDarkMode ? colors.dark.onSurface : colors.light.onSurface,
    },
    alertTitle: {
      fontFamily: globalStyles.alertTitleFontFamily,
      fontSize: globalStyles.alertTitleFontSize,
      color: isDarkMode ? colors.dark.onSurface : colors.light.onSurface,
    },
    linkText: {
      fontFamily: globalStyles.fontFamily,
      fontSize: globalStyles.textFontSize,
      color: isDarkMode ? colors.dark.link : colors.light.link,
    },
  })
  return styles;
}
