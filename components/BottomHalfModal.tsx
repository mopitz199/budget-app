import { colors } from "@/colors";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  heightRatio?: number;          // por defecto 0.5
};

export default function BottomHalfModal({
  visible,
  onClose,
  children,
  heightRatio = 0.5,
}: Props) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';

  const screenH = Dimensions.get("window").height;
  const sheetH = Math.max(200, screenH * heightRatio);

  const translateY = useRef(new Animated.Value(sheetH)).current;
  const backdrop = useRef(new Animated.Value(0)).current;

  const [dragging, setDragging] = useState(false);
  const dragY = useRef(new Animated.Value(0)).current;

  const styles = makeStyles({ isDarkMode, dragging, sheetH });

  const sheetTranslate = Animated.add(
    translateY,
    dragY.interpolate({
      inputRange: [0, sheetH],
      outputRange: [0, sheetH],
      extrapolate: "clamp",
    })
  );

  const openAnim = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(backdrop, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeAnim = (cb?: () => void) => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: sheetH,
        duration: 220,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(backdrop, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) cb?.();
    });
  };

  useEffect(() => {
    if (visible) {
      translateY.setValue(sheetH);
      dragY.setValue(0);
      backdrop.setValue(0);
      openAnim();
    } else {
      // reset para cuando el padre lo esconda
      translateY.setValue(sheetH);
      dragY.setValue(0);
      backdrop.setValue(0);
    }
  }, [visible]);

  // Pan solo en el "handle" superior
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true, // tocar el handle siempre inicia
        onMoveShouldSetPanResponder: (_evt, g) =>
          Math.abs(g.dy) > Math.abs(g.dx) && g.dy > 2, // gesto vertical hacia abajo
        onMoveShouldSetPanResponderCapture: (_evt, g) =>
          Math.abs(g.dy) > Math.abs(g.dx) && g.dy > 2, // capturamos (evita que el scroll interno gane)
        onPanResponderGrant: () => {
          setDragging(true);
          dragY.setValue(0);
        },
        onPanResponderMove: Animated.event([null, { dy: dragY }], {
          useNativeDriver: false, // requerido para Animated.event con valores no mapeados directo al estilo
        }),
        onPanResponderRelease: (_evt, g) => {
          setDragging(false);
          const totalY = Math.max(0, g.dy);
          const velocity = g.vy ?? 0;
          const shouldClose = totalY > sheetH * 0.25 || velocity > 1.1;
          if (shouldClose) {
            // continuar animación hacia abajo desde donde quedó el drag
            translateY.setValue(totalY);
            dragY.setValue(0);
            closeAnim(onClose);
          } else {
            // volver a la posición abierta
            Animated.spring(translateY, {
              toValue: 0,
              damping: 22,
              stiffness: 220,
              mass: 0.4,
              useNativeDriver: true,
            }).start(() => dragY.setValue(0));
          }
        },
        onPanResponderTerminate: () => {
          setDragging(false);
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start(() => dragY.setValue(0));
        },
      }),
    [sheetH, onClose]
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={() => closeAnim(onClose)}
      presentationStyle={Platform.OS === "ios" ? "overFullScreen" : undefined}
    >
      {/* Backdrop clickeable para cerrar */}
      <Pressable
        onPress={() => closeAnim(onClose)}
        style={styles.backdropPressable}
        accessibilityLabel="Cerrar modal"
        accessibilityRole="button"
      >
        <Animated.View
          pointerEvents="none"
          style={[styles.backdropView, { opacity: backdrop }]}
        />
      </Pressable>

      {/* Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          {
            height: sheetH,
            transform: [{ translateY: sheetTranslate }],
          }
        ]}
        accessibilityViewIsModal
      >
        {/* Área de arrastre (handle zone) */}
        <View
          {...panResponder.panHandlers}
          style={styles.handleZone}
        >
          <View
            style={[styles.handle, { opacity: dragging ? 1 : 0.9 }]}
          />
        </View>

        {/* Contenido del modal */}
        <View style={styles.content}>
          {children}
        </View>
      </Animated.View>
    </Modal>
  );
}

type StyleParams = {
  isDarkMode: boolean;
  dragging: boolean;
  sheetH: number;
};

function makeStyles({ isDarkMode, dragging, sheetH }: StyleParams) {
  return StyleSheet.create({
    backdropPressable: {
      flex: 1,
      backgroundColor: "transparent",
    },
    backdropView: {
      flex: 1,
      backgroundColor: isDarkMode ? colors.dark.loadingBackground : colors.light.loadingBackground,
    },
    sheet: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: isDarkMode ? colors.dark.surface : colors.light.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingBottom: 16,
      // sombra
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: -2 },
      elevation: 12,
    },
    handleZone: {
      paddingTop: 8,
      paddingBottom: 12,
      alignItems: "center",
    },
    handle: {
      width: 44,
      height: 5,
      borderRadius: 3,
      backgroundColor: isDarkMode ? colors.dark.loadingBackground : colors.light.loadingBackground,
    },
    content: {
      flex: 1,
    },
  });
}