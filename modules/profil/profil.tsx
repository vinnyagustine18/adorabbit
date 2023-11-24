import { List } from "@ant-design/react-native";
import React from "react";
import { ScrollView } from "react-native";
import useGetAuthAction from "../../hooks/use-get-auth-action";
import { router } from "expo-router";

export default function Profile() {
  const { onSignOut, isLoading } = useGetAuthAction();
  const items = React.useMemo(() => {}, []);
  const managementItems = React.useMemo(() => {
    return [
      {
        onPress: () => router.push("/rabbit/"),
        label: "Rabbit List",
      },
      {
        onPress: () => router.push("/rabbit/create"),
        label: "Rabbit Craete",
      },
      {
        onPress: () => router.push("/rabbit/123"),
        label: "Test",
      },
    ];
  }, []);
  return (
    <ScrollView
      style={{
        marginTop: 24,
      }}
    >
      <List renderHeader="User">
        <List.Item arrow="empty">Edit Profile</List.Item>
      </List>
      <List renderHeader="Management">
        <List.Item arrow="empty">Rabbit List</List.Item>
        <List.Item arrow="empty">Type List</List.Item>
        <List.Item arrow="empty">Drug List</List.Item>
        <List.Item arrow="empty">Birth List</List.Item>
        <List.Item arrow="empty">Mate List</List.Item>
        {managementItems.map((item) => (
          <List.Item arrow="empty" onPress={item.onPress}>
            {item.label}
          </List.Item>
        ))}
      </List>
      <List renderHeader="Management">
        <List.Item arrow="empty" onPress={onSignOut}>
          Logout
        </List.Item>
      </List>
    </ScrollView>
  );
}
