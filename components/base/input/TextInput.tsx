import { TextInput, TextInputProps, View } from "react-native";

interface CustomTextInputProps extends TextInputProps {
  accessory?: React.ReactNode;
}

export default function CustomTextInput({
  accessory,
  ...props
}: CustomTextInputProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "stretch" }}>
      <TextInput
        {...props}
        style={{
          height: 50,
          alignItems: "center",
          flex: 1,
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#848484",
          fontSize: 16,
        }}
        placeholderTextColor="#848484"
      />
      {accessory && (
        <View
          style={{
            marginLeft: 8,
            justifyContent: "center",
            alignItems: "center",
            width: 64,
          }}
        >
          {accessory}
        </View>
      )}
    </View>
  );
}
