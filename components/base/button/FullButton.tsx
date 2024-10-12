import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface FullButtonProps {
  title: string;
  variant: "primary" | "secondary";
  onPress: () => void;
}

export function FullButton({ title, variant, onPress }: FullButtonProps) {
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([buttonStyle.base, buttonStyle[variant]])}
      onPress={onPress}
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
