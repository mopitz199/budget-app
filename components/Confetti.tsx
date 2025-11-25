import { useEffect, useState } from "react";
import { Animated, Dimensions, StyleSheet, useColorScheme, View } from "react-native";

export default function Confetti({show}: {show: boolean}) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode });

  const [confettiPieces, setConfettiPieces] = useState<any[]>([]);

  const createConfettiPiece = (index: number) => {
    const { width, height } = Dimensions.get('window');
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
    
    return {
      id: index,
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(-50 - Math.random() * 100), // Start higher above screen with randomized positions
      rotation: new Animated.Value(0),
      opacity: new Animated.Value(1),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      shape: Math.random() > 0.5 ? 'square' : 'circle',
    };
  };

  const startConfetti = () => {
    const pieces = Array.from({ length: 80 }, (_, i) => createConfettiPiece(i));
    setConfettiPieces(pieces);

    pieces.forEach((piece, index) => {
      const { height } = Dimensions.get('window');
      
      // Add slight delay to create more natural falling effect
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(piece.y, {
            toValue: height + 50,
            duration: 3000 + Math.random() * 2000,
            useNativeDriver: false,
          }),
          Animated.timing(piece.rotation, {
            toValue: 360 * (Math.random() > 0.5 ? 1 : -1), // Random rotation direction
            duration: 2000 + Math.random() * 1000,
            useNativeDriver: false,
          }),
          Animated.timing(piece.opacity, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: false,
          }),
        ]).start();
      }, Math.random() * 500); // Stagger the start times
    });
  };

  // Logic runs AFTER the component renders
  useEffect(() => {
    // This runs after render
    console.log('Component rendered');
    startConfetti();
  }, []); // Empty dependency - runs once after initial render

  if(!show){
    return null;
  }

  return (
    <View style={styles.confettiContainer}>
      {confettiPieces.map((piece) => (
        <Animated.View
          key={piece.id}
          style={[
            styles.confettiPiece,
            {
              left: piece.x,
              top: piece.y,
              backgroundColor: piece.color,
              width: piece.size,
              height: piece.size,
              borderRadius: piece.shape === 'circle' ? piece.size / 2 : 0,
              opacity: piece.opacity,
              transform: [
                {
                  rotate: piece.rotation.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  )
}

type StyleParams = {
  isDarkMode: boolean;
};

function makeStyles({
  isDarkMode,
}: StyleParams) {
  return StyleSheet.create({
    confettiContainer: {
      ...StyleSheet.absoluteFillObject, // This ensures full screen coverage
      top: 0, // Start from the very top of the screen
      pointerEvents: 'none',
      zIndex: 2000,
    },
    confettiPiece: {
      position: 'absolute',
    },
  });
}