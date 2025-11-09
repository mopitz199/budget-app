import { Text as RNText, StyleSheet } from "react-native";

export default function Text({ children, style }: { children: string; style?: any }) {
  return (
    <RNText style={StyleSheet.compose(style, styles.text)}>{children}</RNText>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto',
  }
})