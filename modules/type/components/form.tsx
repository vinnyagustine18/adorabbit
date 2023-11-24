import React from "react";
import { TypeModel } from "../../../api-hook/type/model";
import { TypeFormMethod, TypeFormSchema, TypeFormType } from "./form-type";
import useYupValidationResolver from "../../../hooks/use-yup-validation-resolver";
import { useForm } from "react-hook-form";
import Form, { FormState } from "../../../components/form";
import Container from "../../../components/container";
import TextInput from "../../../components/element/text-input";
import { Button, Flex, List, WhiteSpace } from "@ant-design/react-native";
import Toast from "../../../components/toast";
import { Text, View } from "../../../components/themed";

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
      <Form methods={methods}>
        <Text
          style={{
            marginLeft: 16,
            fontWeight: "600",
            fontSize: 18,
          }}
        >
          {type ? "Edit Type" : "Create Type"}
        </Text>
        <WhiteSpace size="xl" />
        <TextInput name="name" placeholder="Fill the name" label="Name" />
        <WhiteSpace size="xl" />
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            position: "absolute",
            bottom: 16,
            left: 16,
            right: 16,
          }}
        >
          {!!type && (
            <FormState>
              {({ editable, setIsEditable }) => {
                return editable && !!type ? (
                  <Button
                    style={{ flex: 1 }}
                    type="warning"
                    onPress={() => setIsEditable(false)}
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    type="ghost"
                    style={{ flex: 1 }}
                    onPress={() => setIsEditable(true)}
                  >
                    Edit
                  </Button>
                );
              }}
            </FormState>
          )}
          <FormState>
            {({ editable }) =>
              editable &&
              editable && (
                <Button
                  onPress={methods.handleSubmit(onSubmit as any)}
                  loading={methods.formState.isSubmitting}
                  disabled={methods.formState.isSubmitting}
                  style={{ flex: 1 }}
                  type="primary"
                >
                  Save
                </Button>
              )
            }
          </FormState>
        </View>
      </Form>
    </Container>
  );
}
