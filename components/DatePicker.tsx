import { colors } from "@/colors";
import { Text } from "@/components/Texts";
import { globalStyles } from "@/global-styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as DateTimePickerLibrary from '@react-native-community/datetimepicker';
import { useState } from "react";
import { Modal, Platform, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import { PrincipalButton, SecondaryButton } from "./Buttons";

export default function DateTimePicker({
  initialValue = new Date(),
  mode,
  errorMessage = 'Error',
  onFinalValueChange,
  ...props
}: {
  initialValue: Date;
  mode: 'date' | 'time';
  errorMessage?: string;
  onFinalValueChange?: (date: Date) => void;
  [key: string]: any
}) {  

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode });

  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(initialValue); // To handle the iOS picker intermediate value
  const [finalDate, setFinalDate] = useState<Date>(initialValue); // The confirmed selected date that will be used in the input display

  const onChange = (event: any, newDate: Date | undefined) => {
    if(newDate === undefined) {
      newDate = new Date();
    }

    if(Platform.OS === 'ios'){
      setSelectedDate(newDate);
    }else {
      if(event.type == 'set'){
        // Here we confirm the selection in android
        setFinalDate(newDate);
        if(onFinalValueChange){
          onFinalValueChange(newDate);
        }
      }
      setShow(false);
    }
  }

  const onIOSOkPress = () => {
    // Here we confirm the selection in ios
    setFinalDate(selectedDate);
    if(onFinalValueChange){
      onFinalValueChange(selectedDate);
    }
    setShow(false);
  }

  const onIOSCancelPress = () => {
    setShow(false);
  }

  const onOpenPress = () => {
    setSelectedDate(finalDate);
    setShow(true);
  }

  const displayDatePicker = () => {
    // For ios
    if(Platform.OS === 'ios'){
      return (
        <Modal visible={show} transparent animationType="none">
          <View style={styles.backdrop}>
            <View style={{
              backgroundColor: isDarkMode ? colors.dark.surface : colors.light.surface,
              borderRadius: 12, padding: 16,
            }}>
              <DateTimePickerLibrary.default
                value={selectedDate}
                mode={mode}
                onChange={onChange}
                display="inline"
                accentColor={isDarkMode ? colors.dark.primary : colors.light.primary}
                {...props}
              />
              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 12
              }}>
                <SecondaryButton
                  style={{ marginRight: 8, width: 80, height: 40 }}
                  title="Cancel"
                  onPress={() => {onIOSCancelPress()}}
                />
                <PrincipalButton
                  style={{ width: 80, height: 40 }}
                  title="Ok"
                  onPress={() => {onIOSOkPress()}}
                />
              </View>
            </View>
          </View>
        </Modal>
      )
    }else{
      // for android
      if(show){
        return (
          <DateTimePickerLibrary.default
            value={finalDate}
            mode={mode}
            onChange={onChange}
            display='calendar'
            {...props}
          />
        )
      } else {
        return null;
      }
    }
  }


  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => {onOpenPress()}}>
        <Text style={styles.inputText}>
          {finalDate.toLocaleDateString()}
        </Text>
        <Ionicons
          name={'caret-down-outline'}
          size={globalStyles.inputRightIconSize}
          color={isDarkMode ? colors.dark.onSurface : colors.light.onSurface}
        />
      </TouchableOpacity>
      <Text style={styles.errorMessage}>
        {errorMessage}
      </Text>
      {displayDatePicker()}
    </>
  )
}

type StyleParams = {
  isDarkMode: boolean
};

function makeStyles({ isDarkMode }: StyleParams) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      height: globalStyles.inputHeight,
      paddingHorizontal: globalStyles.inputPaddingHorizontal,
      justifyContent: 'space-between',
      borderColor: isDarkMode ? '' : colors.light.outline,
      borderWidth: isDarkMode ? 0 : 0.5,
      backgroundColor: isDarkMode ? colors.dark.surface : colors.light.surface,
      borderRadius: globalStyles.inputBorderRadius,
    },
    inputText: {
      color: isDarkMode ? colors.dark.onSurface : colors.light.onSurface,
      fontSize: globalStyles.inputFontSize,
    },
    errorMessage: {
      marginTop: 4,
      color: isDarkMode ? colors.dark.error : colors.light.error,
    },
    backdrop: {
      flex: 1,
      backgroundColor: isDarkMode ? colors.dark.loadingBackground : colors.light.loadingBackground,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }
  });
}