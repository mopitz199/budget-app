

import { colors } from '@/colors';
import { AlertTitle, Text } from '@/components/Texts';
import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function Alert ({ 
  title, 
  message, 
  visible, 
  onClose=() => {},
  onOutsidePress=() => {},
  leftButton=null,
  rightButton=null
}: { 
  title: string; 
  message: string; 
  visible: boolean;
  onClose?: () => void;
  onOutsidePress?: () => void;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
}) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const style = makeStyles({ isDarkMode });

  return (
    <Modal visible={visible} transparent animationType="none">
      <TouchableOpacity 
        style={style.backdrop} 
        activeOpacity={1}
        onPress={() => {
          if (onClose){
            onClose();
          }
          if (onOutsidePress){
            onOutsidePress();
          }
        }}
      >
        <TouchableOpacity 
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={style.alertContainer}>
            <AlertTitle>{title}</AlertTitle>
            <Text>{message}</Text>
            <View style={{ marginVertical: 12, flexDirection: 'row' }}>
              <View>
                {leftButton}
              </View>
              <View>
                {rightButton}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

type StyleParams = {
  isDarkMode: boolean;
};

function makeStyles({ isDarkMode }: StyleParams) {
  return StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: isDarkMode ? colors.dark.loadingBackground : colors.light.loadingBackground,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    },
    alertContainer: {
      width: '80%',
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: isDarkMode ? colors.dark.surface : colors.light.surface,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });
}