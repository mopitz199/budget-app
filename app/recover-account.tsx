import MainView from "@/components/MainView";
import { Text } from "react-native";

export default function RecoverAccountScreen() {
  const headerShown = true;

  return (
    <MainView headerShown={headerShown}>
      <Text>Recover Account Page</Text>
    </MainView>
  );
}