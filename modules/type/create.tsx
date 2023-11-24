import React from "react";
import TypeForm from "./components/form";
import { TypeFormMethod, TypeFormType } from "./components/form-type";
import firestore from "@react-native-firebase/firestore";
import Toast from "../../components/toast";
import { router } from "expo-router";
import Container from "../../components/container";

export default function TypeCreate() {
  const onSubmit = React.useCallback(
    async (values: TypeFormType, form: TypeFormMethod) => {
      const result = await firestore().collection("types").add(values);
      Toast.success("Data Berhasil Disimpan");
      router.back();
      return result;
    },
    []
  );
  return (
    <Container>
      <TypeForm onSubmit={onSubmit} />
    </Container>
  );
}
