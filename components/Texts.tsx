import { globalStyles } from "@/global-styles";
import { Text as RNText, StyleSheet } from "react-native";

export function Text({ children, style }: { children: string; style?: any }) {
  return (
    <RNText style={StyleSheet.compose(styles.text, style)}>{children}</RNText>
  )
}

export function Title({ children, style }: { children: string; style?: any }) {
  return (
    <RNText style={StyleSheet.compose(style, styles.title)}>{children}</RNText>
  )
}


const styles = StyleSheet.create({
  text: {
    fontFamily: globalStyles.fontFamily,
    fontSize: globalStyles.textFontSize,
  },
  title: {
    fontFamily: globalStyles.titleFontFamily,
    fontSize: globalStyles.titleFontSize,
  }
})