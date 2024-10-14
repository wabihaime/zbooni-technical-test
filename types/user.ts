export interface User {
  is_email_verified: string;
  date_joined: string;
  gender: string;
  language: string;
  first_name: string;
  email: string;
  address: string;
  birth_date: string;
  last_name: string;
  avatar: string;
  id: string;
  is_active: string;
  url: string;
  phone_number: {
    prefix: string;
    number: string;
  };
  last_login: null;
}
