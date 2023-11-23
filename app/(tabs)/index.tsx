import { StyleSheet } from "react-native";
import { View } from "../../components/themed";
import React from "react";
import { RegisterFormType } from "../../modules/register/form-type";
import firestore from "@react-native-firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { useGetUsers } from "../../api-hook/user/query";
export default function TabOneScreen() {
  const { data, isLoading } = useGetUsers();
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  map: {
    width: "100%",
    flex: 1,
  },
});
