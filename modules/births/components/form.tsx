import React from 'react';

import { BirthFormMethod, BirthFormSchema, BirthFormType } from './form-type';
import useYupValidationResolver from '../../../hooks/use-yup-validation-resolver';
import { useForm } from 'react-hook-form';
import Form from '../../../components/form/form';
import Container from '../../../components/container';
import TextInput from '../../../components/element/text-input';
import Toast from '../../../components/toast';
import { View } from '../../../components/themed';
import FormFooter from '../../../components/form/form-footer';
import FormHeader from '../../../components/form/form-header';
import { BirthModel } from '../../../api-hook/birth/model';
import DateInput from '../../../components/element/date-input';
import RabbitSelectInput from '../../rabbit/components/rabbit-select-input';
import { ScrollView } from 'react-native';
import MateSelectInput from '../../mates/components/mate-select-input';

interface Props {
  birth?: BirthModel;
  onSubmit: (values: BirthFormType, form: BirthFormMethod) => Promise<any>;
}

export default function BirthForm(props: Props) {
  const { birth } = props;
  const defaultValues = React.useMemo<BirthFormType>(() => {
    return {
      birthAt: birth?.birthAt ?? new Date(),
      birthWeight: birth?.birthWeight?.toString() ?? '',
      description: birth?.description ?? '',
      mateId: birth?.mate?.id ?? '',
      rabbitId: birth?.rabbit?.id ?? '',
    };
  }, [birth]);

  const resolver = useYupValidationResolver(BirthFormSchema()) as any;

  const methods = useForm<BirthFormType>({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: BirthFormType) => {
      try {
        await props.onSubmit(values, methods);
      } catch (e: any) {
        Toast.error(e);
        console.log(e);
      }
    },
    [methods, props],
  );

  return (
    <Container>
      <Form methods={methods} defaultEditable={!birth}>
        <ScrollView>
          <FormHeader
            data={birth}
            editLabel="Edit Birth"
            defaultLabel="Create Birth"
          />
          <View
            style={{
              marginTop: 16,
              marginHorizontal: 16,
              paddingBottom: 64,
            }}
          >
            <RabbitSelectInput name="rabbitId" label="Rabbit" />
            <MateSelectInput name="mateId" label="Mate" />
            <DateInput name="birthAt" label="Birth Date" />
            <TextInput
              name="birthWeight"
              keyboardType="number-pad"
              label="Birth Weight"
            />
            <TextInput
              name="description"
              keyboardType="number-pad"
              label="Description"
            />
          </View>
        </ScrollView>
        <FormFooter onSubmit={onSubmit} data={birth} />
      </Form>
    </Container>
  );
}
