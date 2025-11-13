import { colors } from "@/colors";
import { globalStyles } from "@/global-styles";
import { Image, StyleSheet, Text, TouchableOpacity, useColorScheme } from "react-native";

export function PrincipalButton({ title, onPress, ...props }: { title: string; onPress: () => void; [key: string]: any }) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles(isDarkMode);

  return (
    <TouchableOpacity
      {...props}
      style={styles.principalButton}
      onPress={onPress}
    >
      <Text style={styles.principalButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export function SecondaryButton({ title, onPress, ...props }: { title: string; onPress: () => void; [key: string]: any }) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles(isDarkMode);

  return (
    <TouchableOpacity
      {...props}
      style={styles.secondaryButton}
      onPress={onPress}
    >
      <Text style={styles.secondaryButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export function GoogleButton({ title, onPress, ...props }: { title: string; onPress: () => void; [key: string]: any }) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles(isDarkMode);

  return (
    <TouchableOpacity
      {...props}
      style={styles.googleButton}
      onPress={onPress}
    >
      <Image source={require('../assets/images/search.png')} style={styles.googleImage} />
      <Text style={styles.googleButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

function makeStyles(isDarkMode: boolean) {
  return (
    StyleSheet.create({
      principalButton: {
        backgroundColor: isDarkMode ? colors.dark.primary : colors.light.primary,
        borderRadius: globalStyles.buttonBorderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        height: globalStyles.buttonMinHeight,
      },
      principalButtonText: {
        color: colors.dark.onSurface,
        fontFamily: globalStyles.fontFamily,
        fontSize: globalStyles.buttonTextFontSize,
      },
      secondaryButton: {
        borderColor: isDarkMode ? colors.dark.outline : colors.light.outline,
        borderWidth: 0.5,
        borderRadius: globalStyles.buttonBorderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        height: globalStyles.buttonMinHeight,
      },
      secondaryButtonText: {
        color: isDarkMode ? colors.dark.onSurface : colors.light.onSurface,
        fontFamily: globalStyles.fontFamily,
        fontSize: globalStyles.buttonTextFontSize,
      },
      googleButton: {
        backgroundColor: colors.light.surface,
        borderColor: isDarkMode ? '' : colors.light.outline,
        borderWidth: 0.5,
        borderRadius: globalStyles.buttonBorderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: globalStyles.buttonMinHeight,
      },
      googleImage: {
        position: 'absolute',
        left: 36,
        width: 24,
        height: 24,
      },
      googleButtonText: {
        color: colors.light.onSurface,
        fontFamily: globalStyles.fontFamily,
        fontSize: globalStyles.buttonTextFontSize,
      }
    })
  )
}


