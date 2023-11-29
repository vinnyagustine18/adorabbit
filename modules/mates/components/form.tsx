import React from 'react';
import { MateModel } from '../../../api-hook/mate/model';
import { MateFormMethod, MateFormSchema, MateFormType } from './form-type';
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
import TextInput from '../../../components/element/text-input';
import { ScrollView } from 'react-native';
import { GenderEnum } from '../../../api-hook/user/model';

interface Props {
  mate?: MateModel;
  onSubmit: (values: MateFormType, form: MateFormMethod) => Promise<any>;
}

export default function MateForm(props: Props) {
  const { mate } = props;

  const defaultValues = React.useMemo<MateFormType>(() => {
    return {
      description: mate?.description ?? '',
      femaleRabbitId: mate?.femaleRabbit?.id ?? '',
      maleRabbitId: mate?.maleRabbit?.id ?? '',
      mateAt: mate?.mateAt ?? new Date(),
    };
  }, [mate]);

  const resolver = useYupValidationResolver(MateFormSchema()) as any;

  const methods = useForm<MateFormType>({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: MateFormType) => {
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
    <Form methods={methods} defaultEditable={!mate}>
      <Container>
        <ScrollView>
          <FormHeader
            data={mate}
            editLabel="Edit Mate"
            defaultLabel="Create Mate"
          />
          <View
            style={{
              marginHorizontal: 16,
              marginTop: 16,
            }}
          >
            <DateInput
              name="mateAt"
              label="Mate Date"
              placeholder="Mate Date"
            />
            <RabbitSelectInput
              name="maleRabbitId"
              label="Rabbit Male"
              gender={GenderEnum.male}
            />
            <RabbitSelectInput
              name="femaleRabbitId"
              label="Rabbit Female"
              gender={GenderEnum.female}
            />
            <TextInput
              name="description"
              label="Description"
              placeholder="Description"
            />
          </View>
        </ScrollView>
        <FormFooter onSubmit={onSubmit} data={mate} />
      </Container>
    </Form>
  );
}
