import React, { Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";
import TextInput, {
  CustomTextInputProps,
} from "@/components/base/input/TextInput";
import { isRTL } from "@/src/utils/isRTL";

interface FormFieldProps<T> extends CustomTextInputProps {
  placeholder: string;
  value: string;
  onBlur: (e: any) => void;
  error?: string;
  touched?: boolean;
  accessory?: React.ReactNode;
  readOnly?: boolean;
}

export function FormField<T extends {}>({
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  accessory,
  readOnly = false,
  keyboardType,
  ...rest
}: FormFieldProps<T>) {
  return (
    <Fragment>
      <TextInput
        readOnly={readOnly}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        accessory={accessory}
        {...rest}
      />
      <View style={styles.errorContainer}>
        {!!error && touched && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    marginTop: 5,
    marginLeft: 5,
    textAlign: isRTL ? "right" : "left",
  },
  errorContainer: {
    height: 20,
    flexDirection: "row",
    justifyContent: isRTL ? "flex-end" : "flex-start",
    width: "100%",
  },
});
