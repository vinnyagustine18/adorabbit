import Container from '../../../components/container';
import {
  PaymentEnum,
  TransactionModel,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '../../../api-hook/transaction/model';
import { TransactionFormMethod, TransactionFormType } from './form-type';
import { RabbitModel } from '../../../api-hook/rabbit/model';
import React from 'react';
import { useForm } from 'react-hook-form';
import Form from '../../../components/form/form';
import { ScrollView } from 'react-native';
import { View } from '../../../components/themed';
import Toast from '../../../components/toast';
import FormHeader from '../../../components/form/form-header';
import FormFooter from '../../../components/form/form-footer';
import DateInput from '../../../components/element/date-input';
import TextInput from '../../../components/element/text-input';
import RadioInput from '../../../components/element/radio-input';
import { UserModel, UserTypeEnum } from '../../../api-hook/user/model';
import { Text } from 'react-native-paper';
import TransactionProductsField from './transaction-products-field';

interface Props {
  transaction?: TransactionModel;
  onSubmit: (
    values: TransactionFormType,
    form: TransactionFormMethod,
  ) => Promise<any>;
  rabbits?: RabbitModel[];
  user: UserModel;
}

export default function TransactionForm(props: Props) {
  const { transaction, rabbits, user } = props;

  const isUserSales = user?.type === UserTypeEnum.seller;

  const defaultValues = React.useMemo<TransactionFormType>(() => {
    const products = (rabbits ?? []).map((rabbit) => {
      const product = transaction?.products?.find(
        (product) => product.id === rabbit.id,
      );
      return {
        ...rabbit,
        quantity: product?.quantity ?? 0,
        isCheck: !!product,
      };
    });

    const type = transaction?.type ?? TransactionTypeEnum.purchase;
    const status = transaction?.status ?? TransactionStatusEnum.finish;

    return {
      products:
        type === TransactionTypeEnum.purchase
          ? products
          : (transaction?.products ?? []).map((product) => {
              return {
                ...product,
                isCheck: true,
              };
            }),

      transactionAt: transaction?.transactionAt ?? new Date(),

      paymentAmount: transaction?.paymentAmount ?? 0,
      paymentAt: transaction?.paymentAt ?? null,
      paymentType: transaction?.paymentType ?? PaymentEnum.cash,

      type,
      status,

      isSales: type === TransactionTypeEnum.sell,
    };
  }, [rabbits, transaction]);

  const methods = useForm({
    defaultValues,
  });

  const onSubmit = React.useCallback(
    async (values: TransactionFormType) => {
      try {
        await props.onSubmit(values, methods);
      } catch (e: any) {
        Toast.error(e);
        console.log(e);
      }
    },
    [methods, props],
  );

  const isSales = defaultValues.isSales;

  const isEditable = React.useMemo(() => {
    return true;
    // const status = defaultValues.status as TransactionStatusEnum;
    // if (!isUserSales) {
    //   return false;
    // }
    // if (defaultValues.type === TransactionTypeEnum.purchase) {
    //   return true;
    // }
    // switch (status) {
    //   case TransactionStatusEnum.finish:
    //   case TransactionStatusEnum.cancel:
    //     return false;
    //   case TransactionStatusEnum.pending:
    //   case TransactionStatusEnum.active:
    //   default:
    //     return true;
    // }
  }, []);

  return (
    <Form methods={methods} defaultEditable={!transaction}>
      <Container>
        <ScrollView>
          <FormHeader
            data={transaction}
            defaultLabel="Product Adjustment"
            editLabel={
              transaction?.type === TransactionTypeEnum.sell
                ? 'Sales View'
                : 'Edit Product Adjustment'
            }
          />
          <View
            style={{
              marginTop: 16,
              marginHorizontal: 16,
              paddingBottom: 64,
            }}
          >
            <DateInput
              name="transactionAt"
              label={isSales ? 'Transaction Date' : 'Adjustment Date'}
              disabled
            />
            <Text variant="titleMedium">
              {isSales ? 'Product List' : 'Rabbit List'}
            </Text>
            <TransactionProductsField />
            {isSales && isUserSales && (
              <View style={{ marginTop: 16 }}>
                <TextInput
                  name="paymentAmount"
                  label="Payment Amount"
                  disabled
                />
                <DateInput name="paymentAt" label="Payment Date" />
                <RadioInput
                  name="status"
                  options={[
                    {
                      label: 'Active',
                      value: TransactionStatusEnum.active,
                    },
                    {
                      label: 'Cancel',
                      value: TransactionStatusEnum.cancel,
                    },
                    {
                      label: 'Finish',
                      value: TransactionStatusEnum.finish,
                    },
                  ]}
                />
              </View>
            )}
          </View>
        </ScrollView>
        {isEditable && <FormFooter onSubmit={onSubmit} data={transaction} />}
      </Container>
    </Form>
  );
}
