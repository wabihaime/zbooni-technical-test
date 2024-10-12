import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

export interface CustomTextInputProps extends TextInputProps {
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
  container: {
    flexDirection: "row",
    alignItems: "stretch",
    borderBottomWidth: 1,
    borderBottomColor: "#848484",
  },
  input: {
    height: 50,
    alignItems: "center",
    flex: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,

    fontSize: 16,
  },
  accessory: {
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
