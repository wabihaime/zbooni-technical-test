import {
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const tabs = [
  {
    name: "index",
    title: "Create",
    icon: ({ color }: { color: string }) => (
      <MaterialCommunityIcons
        name="plus-box-multiple"
        size={24}
        color={color}
      />
    ),
  },
  {
    name: "notifications",
    title: "Notifications",
    icon: ({ color }: { color: string }) => (
      <Ionicons name="notifications-sharp" size={24} color={color} />
    ),
  },
  {
    name: "orders",
    title: "Orders",
    icon: ({ color }: { color: string }) => (
      <Ionicons name="document-text" size={24} color={color} />
    ),
  },
  {
    name: "store",
    title: "Store",
    icon: ({ color }: { color: string }) => (
      <FontAwesome6 name="store" size={24} color={color} />
    ),
  },
  {
    name: "more",
    title: "More",
    icon: ({ color }: { color: string }) => (
      <MaterialIcons name="more-horiz" size={24} color={color} />
    ),
  },
];

export default function HomeLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Tabs.Screen
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ color }) => <Icon color={color} />,
            }}
          />
        );
      })}
    </Tabs>
  );
}
