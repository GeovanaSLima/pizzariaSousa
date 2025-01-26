import { StyleSheet, TouchableOpacity } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  marginTop?: number;
}

export function Button({ children, onPress, marginTop }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { marginTop: marginTop }]}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '90%',
    height: 45,
    backgroundColor: '#e11138',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
