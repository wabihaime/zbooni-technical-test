export interface RegisterField {
  name: string;
  placeholder: string;
  type: string;
  keyboardType?: string;
  autoCapitalize?: string;
  readOnly?: boolean;
  accessory?: string;
}

export const registerFields: RegisterField[] = [
  {
    name: "firstName",
    placeholder: "First Name",
    type: "text",
  },
  {
    name: "lastName",
    placeholder: "Last Name",
    type: "text",
  },
  {
    name: "email",
    placeholder: "Email",
    type: "email",
    keyboardType: "email-address",
    autoCapitalize: "none",
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    accessory: "passwordToggle", // Identifier for accessory component
  },
  {
    name: "countryCode",
    placeholder: "Select a country code",
    type: "text",
    readOnly: true,
    accessory: "countryPicker", // Identifier for accessory component
  },
  {
    name: "phoneNumber",
    placeholder: "Phone Number",
    type: "phone",
    keyboardType: "phone-pad",
  },
];
