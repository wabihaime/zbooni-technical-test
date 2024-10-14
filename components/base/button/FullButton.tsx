import { ButtonProps, StyleSheet, Text, TouchableOpacity } from "react-native";

interface FullButtonProps extends ButtonProps {
  title: string;
  variant?: "primary" | "secondary";
  onPress: () => void;
}

export function FullButton({
  title,
  variant = "primary",
  onPress,
  disabled,
}: FullButtonProps) {
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        buttonStyle.base,
        buttonStyle[variant],
        { opacity: disabled ? 0.5 : 1 },
      ])}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={StyleSheet.flatten([textStyle.base, textStyle[variant]])}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const buttonStyle = StyleSheet.create({
  base: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#000",
  },
  secondary: {
    backgroundColor: "#fff",
  },
});

const textStyle = StyleSheet.create({
  base: {
    textAlign: "center",
    fontSize: 16,
  },
  primary: {
    color: "#fff",
  },
  secondary: {
    color: "#000",
  },
});
