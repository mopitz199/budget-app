import MainView from "@/components/MainView";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from "react-native";

export default function RegisterScreen() {
  const screenConf: ScreenConf = {
    headerShown: true
  };

  useHeaderBehavior({ headerShown: screenConf.headerShown, iconName: 'checkmark-circle' });

  return (
    <MainView headerShown={screenConf.headerShown}>
      <Ionicons name="checkmark-circle" size={32} color={'red'} />
      <Text>Register Page</Text>
    </MainView>
  );
}