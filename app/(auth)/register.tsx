import { Header } from "@/components/base/header";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { FullButton } from "@/components/base/button";
import Checkbox from "expo-checkbox";
import { FormField } from "@/components/base/input/FormField";
import { FormFieldConfig, RegisterFormValues } from "@/types/auth";
import { CountryPicker } from "react-native-country-codes-picker";
import { registerUser } from "@/src/api/register";
import { UserContext } from "@/src/contexts";
import { useTranslation } from "react-i18next";
import { isRTL } from "@/src/utils/isRTL";

const SignupSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  countryCode: Yup.string().required("Country code is required"),
  phone_number: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .required("Phone number is required"),
});

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [openCountryPicker, setOpenCountryPicker] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  const { t } = useTranslation();

  const basicFields: FormFieldConfig<RegisterFormValues>[] = [
    {
      name: "first_name",
      placeholder: "First Name",
    },
    {
      name: "last_name",
      placeholder: "Last Name",
    },
    {
      name: "email",
      placeholder: "Email Address",
      keyboardType: "email-address",
      autoCapitalize: "none",
    },
    {
      name: "password",
      placeholder: "Password",
      accessory: "passwordToggle",
      secureTextEntry: !showPassword,
    },
  ];

  const contactFields: FormFieldConfig<RegisterFormValues>[] = [
    {
      name: "countryCode",
      placeholder: "Select a country code",

      readOnly: true,
      accessory: "countryPicker",
    },
    {
      name: "phone_number",
      placeholder: "Phone Number",

      keyboardType: "phone-pad",
    },
  ];

  const handleSignup = async (
    values: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      countryCode: string;
      phone_number: string;
    },
    { setErrors }: { setErrors: (errs: Partial<RegisterFormValues>) => void }
  ) => {
    try {
      const response = await registerUser({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
        phone_number: values.countryCode + values.phone_number,
      });

      if (response.status === 201) {
        setUser(response.data);
        if (Platform.OS === "web") {
          window.alert("Account Created");
          router.replace("/(home)/create");
        } else {
          Alert.alert(
            "Account Created",
            "Your account has been created successfully. ",
            [{ text: "OK", onPress: () => router.replace("/(home)/create") }]
          );
        }
      } else {
        setErrors(response?.data);
      }
    } catch (error: any) {
      console.error("Registration Error Response:", error);
    }
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
        <TouchableOpacity onPress={() => setOpenCountryPicker(true)}>
          <Text style={styles.countryCodeText}>Select country code</Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <>
      <Header
        title={t("Create an Account")}
        leftOption={
          router.canGoBack() && (
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => router.back()}
            >
              <AntDesign name={isRTL ? "right" : "left"} size={24} />
            </TouchableOpacity>
          )
        }
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              countryCode: "",
              phone_number: "",
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
                      placeholder={t(field.placeholder)}
                      keyboardType={field.keyboardType as KeyboardTypeOptions}
                      onChangeText={handleChange(field.name)}
                      onBlur={handleBlur(field.name)}
                      value={values[field.name]}
                      accessory={renderAccessory(field.name) ?? null}
                      error={errors[field.name]}
                      touched={touched[field.name]}
                      secureTextEntry={field.secureTextEntry}
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

                  <Text style={styles.agreementText}>
                    {t(
                      "By creating an account you agree to the Terms and Conditions & Privacy Policy"
                    )}
                  </Text>
                </View>

                <View style={styles.submitContainer}>
                  {isSubmitting ? (
                    <ActivityIndicator />
                  ) : (
                    <FullButton
                      title="Create Account"
                      variant="primary"
                      onPress={handleSubmit}
                      disabled={!isAgreed}
                    />
                  )}
                </View>
                <CountryPicker
                  show={openCountryPicker}
                  lang="en"
                  pickerButtonOnPress={(item) => {
                    setFieldValue("countryCode", item.dial_code);
                    setOpenCountryPicker(false);
                  }}
                  searchMessage="Search for a country"
                  style={{
                    modal: {
                      height: Dimensions.get("window").height * 0.8,
                    },
                  }}
                  onBackdropPress={() => setOpenCountryPicker(false)}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 64,
  },
  agreementText: {
    textAlign: "left",
  },
  link: {
    color: "#848484",
  },
  languages: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
});
