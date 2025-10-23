import MainView from "@/components/MainView";
import { Text } from "react-native";

export default function SettingsScreen() {
  const headerShown = true;

  return (
    <MainView headerShown={headerShown}>
      <Text>Settings Page</Text>
    </MainView>
  );
}