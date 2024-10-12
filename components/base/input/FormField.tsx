// components/FormField.js
import React, { Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardTypeOptions,
  TextInputProps,
} from "react-native";
import TextInput, {
  CustomTextInputProps,
} from "@/components/base/input/TextInput"; // Ensure the path is correct

interface FormFieldProps extends CustomTextInputProps {
  error?: string;
  touched?: boolean;
  accessory?: React.ReactNode;
  readOnly?: boolean;
}

export function FormField({
  placeholder,

  value,
  onChangeText,
  onBlur,
  error,
  touched,
  accessory,
  readOnly = false,
  ...rest
}: FormFieldProps) {
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
  },
  errorContainer: { height: 20 },
});
