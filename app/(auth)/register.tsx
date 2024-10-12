import { Header } from "@/components/base/header";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import TextInput from "@/components/base/input/TextInput";
import { Formik } from "formik";
import { Fragment, useState } from "react";
import { FullButton } from "@/components/base/button";
import Checkbox from "expo-checkbox";
import { FormField } from "@/components/base/input/FormField";
import { FormFieldConfig } from "@/types/signup/formFieldTypes";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  countryCode: Yup.string().required("Country code is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .required("Phone number is required"),
});

const basicFields: FormFieldConfig[] = [
  {
    name: "firstName",
    placeholder: "First Name",
  },
  {
    name: "lastName",
    placeholder: "Last Name",
  },
  {
    name: "email",
    placeholder: "Email",

    keyboardType: "email-address",
    autoCapitalize: "none",
  },
  {
    name: "password",
    placeholder: "Password",
    accessory: "passwordToggle",
  },
];

const contactFields: FormFieldConfig[] = [
  {
    name: "countryCode",
    placeholder: "Select a country code",

    readOnly: true,
    accessory: "countryPicker",
  },
  {
    name: "phoneNumber",
    placeholder: "Phone Number",

    keyboardType: "phone-pad",
  },
];

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const router = useRouter();

  const handleSignup = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    countryCode: string;
    phoneNumber: string;
  }) => {
    console.log("Values", values);
  };

  const renderAccessory = (field: string) => {
    if (field === "password") {
      return (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather name={showPassword ? "eye" : "eye-off"} size={24} />
        </TouchableOpacity>
      );
    }

    if (field === "countryCode") {
      return (
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Country Picker", "Open country picker here")
          }
        >
          <AntDesign name="down" size={20} color="#888" />
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <>
      <Header
        title="Create an Account"
        leftOption={
          router.canGoBack() && (
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => router.back()}
            >
              <AntDesign name="left" size={24} />
            </TouchableOpacity>
          )
        }
      />
      <View>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            countryCode: "",
            phoneNumber: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <View style={{ gap: 20 }}>
              <View style={styles.content}>
                {basicFields.map((field) => (
                  <FormField
                    key={field.name}
                    placeholder={field.placeholder}
                    keyboardType={field.keyboardType as KeyboardTypeOptions}
                    onChangeText={handleChange(field.name)}
                    onBlur={handleBlur(field.name)}
                    value={values[field.name]}
                    accessory={renderAccessory(field.name) ?? null}
                    error={errors[field.name]}
                    touched={touched[field.name]}
                  />
                ))}
              </View>
              <View style={styles.content}>
                {contactFields.map((field) => (
                  <FormField
                    key={field.name}
                    readOnly={field.readOnly}
                    placeholder={field.placeholder}
                    keyboardType={field.keyboardType as KeyboardTypeOptions}
                    onChangeText={handleChange(field.name)}
                    onBlur={handleBlur(field.name)}
                    value={values[field.name]}
                    error={errors[field.name]}
                    touched={touched[field.name]}
                    accessory={renderAccessory(field.name) ?? null}
                  />
                ))}
              </View>
              <View style={styles.agreementSection}>
                <Checkbox value={isAgreed} onValueChange={setIsAgreed} />
                <View>
                  <Text>By creating an account, you agree to the</Text>
                  <View style={styles.legalLinks}>
                    <TouchableOpacity>
                      <Text style={styles.link}>Terms of Service</Text>
                    </TouchableOpacity>
                    <Text>&</Text>
                    <TouchableOpacity>
                      <Text style={styles.link}>Privacy Policy</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.submitContainer}>
                {isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <FullButton
                    title="Create Account"
                    variant="primary"
                    onPress={handleSubmit}
                    disabled={!isAgreed || isSubmitting}
                  />
                )}
              </View>
            </View>
          )}
        </Formik>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  submitContainer: {
    padding: 24,
    alignItems: "center",
  },
  errorContainer: { height: 20 },
  errorText: {
    color: "red",
  },
  countryCodeContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#848484",
  },
  countryCodeText: {
    fontSize: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: "#848484",
  },
  agreementSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  legalLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  link: {
    color: "#848484",
  },
});
