import React from 'react';
import {
  RabbitModel,
  RabbitOwnershipEnum,
  RabbitStatusEnum,
} from '../../../api-hook/rabbit/model';
import Container from '../../../components/container';
import {
  RabbitFormMethod,
  RabbitFormSchema,
  RabbitFormType,
} from './form-type';
import { GenderEnum, UserModel } from '../../../api-hook/user/model';
import useYupValidationResolver from '../../../hooks/use-yup-validation-resolver';
import { useForm } from 'react-hook-form';
import Toast from '../../../components/toast';
import Form from '../../../components/form/form';
import FormHeader from '../../../components/form/form-header';
import FormFooter from '../../../components/form/form-footer';
import { ScrollView } from 'react-native';
import DateInput from '../../../components/element/date-input';
import TextInput from '../../../components/element/text-input';
import RadioInput from '../../../components/element/radio-input';
import TypeSelectInput from '../../type/components/type-select-input';
import { View } from '../../../components/themed';
import CheckboxInput from '../../../components/element/checkbox-input';

interface Props {
  rabbit?: RabbitModel;
  onSubmit: (values: RabbitFormType, form: RabbitFormMethod) => Promise<any>;
  user: UserModel;
}

export default function RabbitForm(props: Props) {
  const { rabbit, user } = props;
  const defaultValues = React.useMemo<RabbitFormType>(() => {
    return {
      birthAt: rabbit?.birthAt ?? new Date(),
      description: rabbit?.description ?? '',
      gender: rabbit?.gender ?? GenderEnum.male,
      name: rabbit?.name ?? '',
      ownershipStatus:
        rabbit?.ownershipStatus ?? RabbitOwnershipEnum.collection,
      price: rabbit?.price?.toString() ?? '',
      status: rabbit?.status ?? RabbitStatusEnum.alive,
      typeId: rabbit?.type?.id ?? '',
      isActive: rabbit?.isActive ?? true,
      quantity: rabbit?.quantity?.toString() ?? '',
    };
  }, [rabbit]);

  const resolver = useYupValidationResolver(RabbitFormSchema()) as any;

  const methods = useForm<RabbitFormType>({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: RabbitFormType) => {
      try {
        await props.onSubmit(values, methods);
      } catch (e: any) {
        Toast.error(e);
        console.log(e);
      }
    },
    [methods, props],
  );

  const isContribute = !rabbit || rabbit?.user?.id === user.id;

  return (
    <Form methods={methods} defaultEditable={!rabbit}>
      <Container>
        <ScrollView>
          <FormHeader
            data={rabbit}
            defaultLabel="Create Rabbit"
            editLabel="Edit Rabbit"
          />
          <View
            style={{
              marginTop: 16,
              marginHorizontal: 16,
              paddingBottom: 64,
            }}
          >
            <TextInput name="name" label="Name" />

            <TypeSelectInput
              name="typeId"
              label="Type"
              placeholder="Fill the type"
            />

            <DateInput
              name="birthAt"
              label="Birth Date"
              placeholder="Birth Date"
            />

            <TextInput
              keyboardType="number-pad"
              name="price"
              label="Price"
              placeholder="Fill the price"
            />

            <TextInput
              keyboardType="number-pad"
              name="quantity"
              label="Quantity"
              placeholder="Fill the Quantity"
            />

            <TextInput
              name="description"
              label="Description"
              placeholder="Fill the description"
            />

            <CheckboxInput label="Is Active" name="isActive" />

            <RadioInput
              name="gender"
              label="Gender"
              options={[
                {
                  label: 'Male',
                  value: GenderEnum.male,
                },
                {
                  label: 'Female',
                  value: GenderEnum.female,
                },
              ]}
            />

            <RadioInput
              name="status"
              label="Status"
              options={[
                {
                  label: 'Alive',
                  value: RabbitStatusEnum.alive,
                },
                {
                  label: 'Deceased',
                  value: RabbitStatusEnum.deceased,
                },
              ]}
            />

            <RadioInput
              name="ownershipStatus"
              label="Ownership"
              options={[
                {
                  label: 'Collection',
                  value: RabbitOwnershipEnum.collection,
                },
                {
                  label: 'Commercial',
                  value: RabbitOwnershipEnum.commercial,
                },
              ]}
            />
          </View>
        </ScrollView>
        {isContribute && <FormFooter onSubmit={onSubmit} data={rabbit} />}
      </Container>
    </Form>
  );
}
