import React from "react";
import { TypeModel } from "../../../api-hook/type/model";
import { TypeFormMethod, TypeFormSchema, TypeFormType } from "./form-type";
import useYupValidationResolver from "../../../hooks/use-yup-validation-resolver";
import { useForm } from "react-hook-form";
import Form, { FormState } from "../../../components/form/form";
import Container from "../../../components/container";
import TextInput from "../../../components/element/text-input";
import { Button, Flex, List, WhiteSpace } from "@ant-design/react-native";
import Toast from "../../../components/toast";
import { Text, View } from "../../../components/themed";
import FormFooter from "../../../components/form/form-footer";
import FormHeader from "../../../components/form/form-header";

interface Props {
  type?: TypeModel;
  onSubmit: (values: TypeFormType, form: TypeFormMethod) => Promise<any>;
}

export default function TypeForm(props: Props) {
  const { type } = props;
  const defaultValues = React.useMemo<TypeFormType>(() => {
    return {
      name: type?.name ?? "",
    };
  }, [type]);

  const resolver = useYupValidationResolver(TypeFormSchema()) as any;

  const methods = useForm<TypeFormType>({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(async (values: TypeFormType) => {
    try {
      await props.onSubmit(values, methods);
    } catch (e: any) {
      Toast.error(e);
      console.log(e);
    }
  }, []);

  return (
    <Container>
      <Form methods={methods} defaultEditable={!type}>
        <FormHeader
          data={type}
          editLabel="Edit Type"
          defaultLabel="Create Type"
        />
        <WhiteSpace size="xl" />
        <TextInput name="name" placeholder="Fill the name" label="Name" />
        <WhiteSpace size="xl" />
        <FormFooter onSubmit={onSubmit} data={type} />
      </Form>
    </Container>
  );
}
