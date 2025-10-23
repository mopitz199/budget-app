import { View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export interface MainViewProps {
  headerShown?: boolean;
  children: React.ReactNode;
}

export default function MainView({ headerShown = true, children }: MainViewProps) {
  if (headerShown) {
    return (
      <View>
        {children}
      </View>
    )
  } else {
    return (
      <SafeAreaView>
        {children}
      </SafeAreaView>
    )
  }
}