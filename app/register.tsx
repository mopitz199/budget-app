import MainView from "@/components/MainView";
import { Text } from "react-native";

export default function RegisterScreen() {
  const headerShown = true;

  return (
    <MainView headerShown={headerShown}>
      <Text>Register Page</Text>
    </MainView>
  );
}