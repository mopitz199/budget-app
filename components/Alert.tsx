

import { colors } from '@/colors';
import { AlertTitle, Text } from '@/components/Texts';
import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';

export function Alert ({ 
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
          style={style.alertContainer}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={{
            alignItems: 'center',
          }}>
            <AlertTitle>{title}</AlertTitle>
            <Text style={{ textAlign: 'center', marginTop: 5 }}>{message}</Text>
            <View style={{
              width: '100%',
              marginTop: 12,
              flexDirection: 'row',
              gap: 10,
            }}>
              {leftButton && (
                <View style={{ flex: 1 }}>
                  {leftButton}
                </View>
              )}
              {rightButton && (
                <View style={{ flex: 1 }}>
                  {rightButton}
                </View>
              )}
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
      maxWidth: '80%',
      justifyContent: "center",
      alignItems: "center",
      padding: 15,
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