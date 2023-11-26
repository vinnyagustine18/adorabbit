import React from "react";
import TypeForm from "./components/form";

import firestore from "@react-native-firebase/firestore";
import Toast from "../../components/toast";
import { router } from "expo-router";
import Container from "../../components/container";
import useGetAuthAction from "../../hooks/use-get-auth-action";
import { RabbitFormMethod, RabbitFormType } from "./components/form-type";
import { getSubmitData } from "./utils";
import RabbitForm from "./components/form";
import shortId from "short-uuid";

export default function RabbitCreate() {
  const { user } = useGetAuthAction();
  const userId = user?.uid;
  const onSubmit = React.useCallback(
    async (values: RabbitFormType, form: RabbitFormMethod) => {
      const rabbit = await getSubmitData(values, userId!);

      const result = await firestore()
        .collection("rabbits")
        .add({ ...rabbit, id: shortId.generate() });

      Toast.success("Data Berhasil Disimpan");
      router.back();
      return result;
    },
    []
  );
  return (
    <Container>
      <RabbitForm onSubmit={onSubmit} />
    </Container>
  );
}
