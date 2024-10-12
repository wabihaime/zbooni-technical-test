import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface CustomTextInputProps extends TextInputProps {
  accessory?: React.ReactNode;
}

export default function CustomTextInput({
  accessory,
  ...props
}: CustomTextInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor="#848484"
      />
      {accessory && <View style={styles.accessory}>{accessory}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "stretch" },
  input: {
    height: 50,
    alignItems: "center",
    flex: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#848484",
    fontSize: 16,
  },
  accessory: {
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 64,
  },
});
