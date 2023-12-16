import React from 'react';

import { DrugFormMethod, DrugFormSchema, DrugFormType } from './form-type';
import useYupValidationResolver from '../../../hooks/use-yup-validation-resolver';
import { useForm } from 'react-hook-form';
import Form from '../../../components/form/form';
import Container from '../../../components/container';
import TextInput from '../../../components/element/text-input';
import Toast from '../../../components/toast';
import { View } from '../../../components/themed';
import FormFooter from '../../../components/form/form-footer';
import FormHeader from '../../../components/form/form-header';
import { DrugModel } from '../../../api-hook/drug/model';
import { UserModel } from '../../../api-hook/user/model';

interface Props {
  drug?: DrugModel;
  onSubmit: (values: DrugFormType, form: DrugFormMethod) => Promise<any>;
  user: UserModel;
}

export default function TypeForm(props: Props) {
  const { drug, user } = props;
  const defaultValues = React.useMemo<DrugFormType>(() => {
    return {
      dose: drug?.dose ?? '',
      type: drug?.type ?? '',
    };
  }, [drug]);

  const resolver = useYupValidationResolver(DrugFormSchema()) as any;

  const methods = useForm<DrugFormType>({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: DrugFormType) => {
      try {
        await props.onSubmit(values, methods);
      } catch (e: any) {
        Toast.error(e);
        console.log(e);
      }
    },
    [methods, props],
  );

  const isContribute = !drug || drug?.user?.id === user.id;

  return (
    <Container>
      <Form methods={methods} defaultEditable={!drug}>
        <FormHeader
          data={drug}
          editLabel="Edit Drug"
          defaultLabel="Create Drug"
        />
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 16,
          }}
        >
          <TextInput name="type" placeholder="Fill the name" label="Type" />
          <TextInput name="dose" placeholder="Fill the dose" label="Dose" />
        </View>
        {isContribute && <FormFooter onSubmit={onSubmit} data={drug} />}
      </Form>
    </Container>
  );
}
