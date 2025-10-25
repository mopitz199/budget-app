import { StyleSheet, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export interface MainViewProps {
  headerShown?: boolean;
  children: React.ReactNode;
}

export default function MainView({ headerShown = true, children }: MainViewProps) {
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

const style = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 2,
  },
})