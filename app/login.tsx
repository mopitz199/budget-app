import MainView from "@/components/MainView";
import { Text } from "react-native";

export default function LoginScreen() {
  const headerShown = false;

  return (
    <MainView headerShown={headerShown}>
      <Text>Login Page</Text>
    </MainView>
  );
}