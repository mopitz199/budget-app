import { colors } from "@/colors";
import { ActivityIndicator, Modal, StyleSheet, useColorScheme, View } from "react-native";

export interface LoadingModalProps {
  loading?: boolean;
}

type StyleParams = {
  isDarkMode: boolean;
};

export default function LoadingModal({ loading }: LoadingModalProps) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const style = makeStyles({ isDarkMode });

  return (
    <Modal visible={loading} transparent animationType="none">
      <View style={style.backdrop}>
        <ActivityIndicator size="large" color={colors.light.primary}/>
      </View>
    </Modal>
  )
}

function makeStyles({ isDarkMode }: StyleParams) {
  return StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: isDarkMode ? colors.dark.loadingBackground : colors.light.loadingBackground,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }
  });
}