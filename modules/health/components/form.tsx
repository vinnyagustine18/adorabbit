import React from 'react';

import {
  HealthFormMethod,
  HealthFormSchema,
  HealthFormType,
} from './form-type';
import useYupValidationResolver from '../../../hooks/use-yup-validation-resolver';
import { useForm } from 'react-hook-form';
import Form from '../../../components/form/form';
import Container from '../../../components/container';
import TextInput from '../../../components/element/text-input';
import Toast from '../../../components/toast';
import { View } from '../../../components/themed';
import FormFooter from '../../../components/form/form-footer';
import FormHeader from '../../../components/form/form-header';
import { HealthModel, HealthStatusEnum } from '../../../api-hook/health/model';
import RabbitSelectInput from '../../rabbit/components/rabbit-select-input';
import DateInput from '../../../components/element/date-input';
import RadioInput from '../../../components/element/radio-input';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
  health?: HealthModel;
  onSubmit: (values: HealthFormType, form: HealthFormMethod) => Promise<any>;
}

export default function HealthForm(props: Props) {
  const { health } = props;
  const defaultValues = React.useMemo<HealthFormType>(() => {
    return {
      checkAt: health?.checkAt ?? new Date(),
      description: health?.description ?? '',
      rabbitId: health?.rabbit?.id ?? '',
      status: health?.status ?? HealthStatusEnum.well,
      weight: health?.weight ?? 0,
    };
  }, [health]);

  const resolver = useYupValidationResolver(HealthFormSchema()) as any;

  const methods = useForm<HealthFormType>({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: HealthFormType) => {
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
      <Form methods={methods} defaultEditable={!health}>
        <ScrollView>
          <FormHeader
            data={health}
            editLabel="Edit Health"
            defaultLabel="Create Health"
          />
          <View
            style={{
              marginHorizontal: 16,
              marginTop: 16,
            }}
          >
            <DateInput
              name="checkAt"
              label="Check Date"
              placeholder="Check Date"
            />
            <RabbitSelectInput name="rabbitId" label="Rabbit" />
            <TextInput
              name="weight"
              placeholder="Fill the weight"
              label="Weight"
            />
            <TextInput
              name="description"
              placeholder="Fill the description"
              label="Description"
            />
            <RadioInput
              name="status"
              options={[
                {
                  value: HealthStatusEnum.sick,
                  label: 'Sick',
                },
                {
                  value: HealthStatusEnum.well,
                  label: 'Well',
                },
              ]}
            />
          </View>
        </ScrollView>

        <FormFooter onSubmit={onSubmit} data={health} />
      </Form>
    </Container>
  );
}
