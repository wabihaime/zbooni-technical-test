import { UserContext } from "@/src/contexts";
import React, { useContext } from "react";
import { Text } from "react-native";

export default function More() {
  const { user } = useContext(UserContext);

  return <Text>{user ? `Welcome, ${user.email ?? "User"}` : "Welcome"}</Text>;
}
