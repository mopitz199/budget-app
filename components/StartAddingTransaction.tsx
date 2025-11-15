import { colors } from "@/colors";
import { Text } from "@/components/Texts";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native";

type StartAddingTransactionProps = {
  onClose?: () => void;
  manualTransactionText?: string;
  fileTransactionText?: string;
  onManualTransaction?: () => void;
  onFileTransaction?: () => void;
  style?: any;
};

export default function StartAddingTransaction({
  onClose,
  manualTransactionText='',
  fileTransactionText='',
  onManualTransaction,
  onFileTransaction,
  style
}: StartAddingTransactionProps){

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles(isDarkMode);

  const [showCloseButton, setShowCloseButton] = useState(false);

  const onClosePress = () => {
    if (onClose) {
      onClose();
    }
    setShowCloseButton(false)
  }

  const onManualTransactionPress = () => {
    if (onManualTransaction) {
      onManualTransaction();
    }
  }

  const onFileTransactionPress = () => {
    if (onFileTransaction) {
      onFileTransaction();
    }
  }

  const closeTransaction = () => {
    return (
      <View style={StyleSheet.compose(styles.container, style)}>
        <View style={styles.transactionRow}>
          <Text>{manualTransactionText}</Text>
          <TouchableOpacity activeOpacity={0.9} onPress={onManualTransactionPress} style={styles.iconButton}>
            <Ionicons
              name={'hand-right-outline'}
              size={24}
              color={colors.light.onSurface}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.transactionRow}>
          <Text>{fileTransactionText}</Text>
          <TouchableOpacity activeOpacity={0.9} onPress={onFileTransactionPress} style={styles.iconButton}>
            <Ionicons
              name={'document-outline'}
              size={24}
              color={colors.light.onSurface}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.transactionRow}>
          <TouchableOpacity activeOpacity={1} onPress={onClosePress} style={styles.closeButton}>
            <Ionicons
              name={'close-outline'}
              size={36}
              color={colors.dark.onSurface}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const addTransaction = () => {
    return (
      <View style={StyleSheet.compose(styles.container, style)}>
        <View style={styles.transactionRow}>
          <TouchableOpacity activeOpacity={1} onPress={() => {setShowCloseButton(true)}} style={styles.closeButton}>
            <Ionicons
              name={'add-outline'}
              size={36}
              color={colors.dark.onSurface}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View>
      {showCloseButton ? closeTransaction() : addTransaction()}
    </View>
  )
}

function makeStyles(isDarkMode: boolean) {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      flexDirection: 'column',
      gap: 10,
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      alignSelf: 'flex-end',
    },
    transactionRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconButton: {
      alignItems: 'center',
      backgroundColor: colors.light.surface,
      borderColor: isDarkMode ? '' : colors.light.outline,
      borderWidth: isDarkMode ? 0 : 0.5,
      height: isDarkMode ? 50 : 49.5,
      width: isDarkMode ? 50 : 49.5,
      justifyContent: 'center',
      borderRadius: 10,
      marginRight: 5,
      marginLeft: 10,
    },
    closeButton: {
      alignItems: 'center',
      backgroundColor: isDarkMode ? colors.dark.primary : colors.light.primary,
      height: 60,
      width: 60,
      justifyContent: 'center',
      borderRadius: 10,
    },
  });
}