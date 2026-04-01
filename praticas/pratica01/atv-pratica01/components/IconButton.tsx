import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function IconButton({ icon, size, color, onPress }: {
  icon: string;
  size: number;
  color: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.button_container}>
        <Ionicons
          name={icon as any}
          size={size}
          color={color}
        />
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button_container: {
    padding: 10,
  },
  pressed: {
    opacity: 0.5,
  },
});
