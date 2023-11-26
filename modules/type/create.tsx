import React from "react";
import TypeForm from "./components/form";
import { TypeFormMethod, TypeFormType } from "./components/form-type";
import firestore from "@react-native-firebase/firestore";
import Toast from "../../components/toast";
import { router } from "expo-router";
import Container from "../../components/container";
import useGetAuthAction from "../../hooks/use-get-auth-action";

import shortId from "short-uuid";

export default function TypeCreate() {
  const { user } = useGetAuthAction();
  const userId = user?.uid;

  const onSubmit = React.useCallback(
    async (values: TypeFormType, form: TypeFormMethod) => {
      console.log(values, userId);
      const result = await firestore()
        .collection("types")
        .add({ ...values });
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
