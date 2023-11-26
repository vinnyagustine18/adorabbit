import React from "react";
import {
  RabbitModel,
  RabbitOwnershipEnum,
  RabbitStatusEnum,
} from "../../../api-hook/rabbit/model";
import Container from "../../../components/container";
import {
  RabbitFormMethod,
  RabbitFormSchema,
  RabbitFormType,
} from "./form-type";
import { GenderEnum } from "../../../api-hook/user/model";
import useYupValidationResolver from "../../../hooks/use-yup-validation-resolver";
import { useForm } from "react-hook-form";
import Toast from "../../../components/toast";
import Form from "../../../components/form/form";
import FormHeader from "../../../components/form/form-header";
import { WhiteSpace } from "@ant-design/react-native";
import FormFooter from "../../../components/form/form-footer";
import { ScrollView } from "react-native";
import DateInput from "../../../components/element/date-input";
import TextInput from "../../../components/element/text-input";
import colorConstant from "../../../constants/color.constant";
import RadioInput from "../../../components/element/radio-input";
import TextAreaInput from "../../../components/element/text-area-input";
import TypeSelectInput from "../../type/components/type-select-input";

interface Props {
  rabbit?: RabbitModel;
  onSubmit: (values: RabbitFormType, form: RabbitFormMethod) => Promise<any>;
}

export default function RabbitForm(props: Props) {
  const { rabbit } = props;
  const defaultValues = React.useMemo<RabbitFormType>(() => {
    return {
      birthAt: rabbit?.birthAt ?? new Date(),
      description: rabbit?.description ?? "",
      gender: rabbit?.gender ?? GenderEnum.male,
      name: rabbit?.name ?? "",
      ownershipStatus:
        rabbit?.ownershipStatus ?? RabbitOwnershipEnum.collection,
      price: rabbit?.price ?? 0,
      status: rabbit?.status ?? RabbitStatusEnum.alive,
      typeId: rabbit?.type?.id ?? "",
    };
  }, [rabbit]);

  const resolver = useYupValidationResolver(RabbitFormSchema()) as any;

  const methods = useForm<RabbitFormType>({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(async (values: RabbitFormType) => {
    try {
      await props.onSubmit(values, methods);
    } catch (e: any) {
      Toast.error(e);
      console.log(e);
    }
  }, []);

  return (
    <Form methods={methods} defaultEditable={!rabbit}>
      <Container>
        <ScrollView>
          <FormHeader
            data={rabbit}
            defaultLabel="Create Rabbit"
            editLabel="Edit Rabbit"
          />
          <WhiteSpace size="xl" />
          <TextInput name="name" label="Name" />
          <WhiteSpace size="xl" />
          <TypeSelectInput
            name="typeId"
            label="Type"
            placeholder="Fill the type"
          />
          <DateInput
            name="birthAt"
            placeholder="Birth Date"
            style={{
              backgroundColor: colorConstant.black,
            }}
          />
          <WhiteSpace size="xl" />
          <TextAreaInput
            name="description"
            label="Description"
            placeholder="Fill the description"
          />
          <WhiteSpace size="xl" />
          <RadioInput
            name="gender"
            label="Gender"
            options={[
              {
                label: "Male",
                value: GenderEnum.male,
              },
              {
                label: "Female",
                value: GenderEnum.female,
              },
            ]}
          />
          <WhiteSpace size="xl" />
          <RadioInput
            name="status"
            label="Status"
            options={[
              {
                label: "Alive",
                value: RabbitStatusEnum.alive,
              },
              {
                label: "Deceased",
                value: RabbitStatusEnum.deceased,
              },
            ]}
          />
          <WhiteSpace size="xl" />
          <RadioInput
            name="ownershipStatus"
            label="Ownership"
            options={[
              {
                label: "Collection",
                value: RabbitOwnershipEnum.collection,
              },
              {
                label: "Commercial",
                value: RabbitOwnershipEnum.commercial,
              },
            ]}
          />
          <WhiteSpace size="xl" />
          <TextInput
            type="number"
            name="price"
            label="Price"
            placeholder="Fill the price"
          />
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
        </ScrollView>
        <FormFooter onSubmit={onSubmit} data={rabbit} />
      </Container>
    </Form>
  );
}
