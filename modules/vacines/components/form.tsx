import React from 'react';

import {
  VacineFormMethod,
  VacineFormSchema,
  VacineFormType,
} from './form-type';
import useYupValidationResolver from '../../../hooks/use-yup-validation-resolver';
import { useForm } from 'react-hook-form';
import Toast from '../../../components/toast';
import Container from '../../../components/container';
import Form from '../../../components/form/form';
import FormHeader from '../../../components/form/form-header';
import { View } from '../../../components/themed';
import FormFooter from '../../../components/form/form-footer';
import DateInput from '../../../components/element/date-input';
import RabbitSelectInput from '../../rabbit/components/rabbit-select-input';
import { ScrollView } from 'react-native';
import { VacineModel } from '../../../api-hook/vacine/model';
import DrugSelectInput from '../../drugs/components/drug-select-input';

interface Props {
  vacine?: VacineModel;
  onSubmit: (values: VacineFormType, form: VacineFormMethod) => Promise<any>;
}

export default function VacineForm(props: Props) {
  const { vacine } = props;

  const defaultValues = React.useMemo<VacineFormType>(() => {
    return {
      drugId: vacine?.drug.id ?? '',
      rabbitId: vacine?.rabbit.id ?? '',
      vacineAt: vacine?.vacineAt ?? new Date(),
    };
  }, [vacine]);

  const resolver = useYupValidationResolver(VacineFormSchema()) as any;

  const methods = useForm<VacineFormType>({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: VacineFormType) => {
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
    <Form methods={methods} defaultEditable={!vacine}>
      <Container>
        <ScrollView>
          <FormHeader
            data={vacine}
            editLabel="Edit Vacine"
            defaultLabel="Create Vacine"
          />
          <View
            style={{
              marginHorizontal: 16,
              marginTop: 16,
            }}
          >
            <DateInput
              name="vacineAt"
              label="Vacine Date"
              placeholder="Vacine Date"
            />
            <RabbitSelectInput name="rabbitId" label="Rabbit" />
            <DrugSelectInput name="drugId" label="Drug" />
          </View>
        </ScrollView>
        <FormFooter onSubmit={onSubmit} data={vacine} />
      </Container>
    </Form>
  );
}
