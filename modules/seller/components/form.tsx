import React from 'react';
import {
  RabbitModel,
  RabbitOwnershipEnum,
} from '../../../api-hook/rabbit/model';
import { useForm, useFormContext, useWatch } from 'react-hook-form';
import Form from '../../../components/form/form';
import { Button, Text } from 'react-native-paper';
import { SellerFormType } from './form-type';
import {
  PaymentEnum,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '../../../api-hook/transaction/model';
import { UserModel } from '../../../api-hook/user/model';
import useGetAuthAction from '../../../hooks/use-get-auth-action';
import { View } from '../../../components/themed';
import TextInput from '../../../components/element/text-input';
import colorConstant from '../../../constants/color.constant';
import firestore from '@react-native-firebase/firestore';
import { nanoid } from 'nanoid';
import { router } from 'expo-router';
import Toast from '../../../components/toast';
import SellerPricePreview from './seller-price-preview';

interface Props {
  rabbits: RabbitModel[];
  seller: UserModel;
}

enum SellerStep {
  main = 'main',
  final = 'final',
}

function IsolatedButton(props: { onSubmit: any }) {
  const { control, handleSubmit } = useFormContext<SellerFormType>();
  const products = useWatch({
    control,
    name: 'products',
  });

  const disabled = products.every((product) => !product.quantity);

  return (
    <>
      <Button
        style={{ flex: 1 }}
        mode="contained"
        disabled={disabled}
        onPress={handleSubmit(props.onSubmit)}
      >
        Order
      </Button>
    </>
  );
}

export default function SellerForm(props: Props) {
  const { rabbits, seller } = props;
  const { user } = useGetAuthAction();
  const [step, setStep] = React.useState<SellerStep>(SellerStep.main);

  const { collection, commercial } = React.useMemo(() => {
    return {
      commercial: rabbits.filter(
        (rabbit) => rabbit.ownershipStatus === RabbitOwnershipEnum.commercial,
      ),
      collection: rabbits.filter(
        (rabbit) => rabbit.ownershipStatus === RabbitOwnershipEnum.collection,
      ),
    };
  }, [rabbits]);

  const defaultValues = React.useMemo<SellerFormType>(() => {
    return {
      paymentAmount: 0,
      paymentType: PaymentEnum.cash,
      products: [...collection, ...commercial].map((rabbit) => {
        return {
          ...rabbit,
          quantity: 0,
        };
      }),
      status: TransactionStatusEnum.pending,
      transactionAt: new Date(),
      type: TransactionTypeEnum.sell,
      paymentAt: null,
      seller,
    };
  }, [collection, commercial, seller]);

  const methods = useForm({
    defaultValues,
  });

  const onSubmit = React.useCallback(
    async (values: SellerFormType) => {
      const { products: rawProducts, transactionAt, ...rest } = values;
      const products = rawProducts
        .filter((product) => !!product.quantity)
        .map((product) => {
          return {
            ...product,
            quantity: parseFloat(product.quantity.toString()),
          };
        });
      const paymentAmount = products.reduce((prev, product) => {
        const amount = product.quantity + product.price;
        return prev + amount;
      }, 0);
      const id = nanoid();

      const { password, ...currentSeller } = seller;
      const { password: passwordUser, ...currentUser } = user!;

      const result = await firestore()
        .doc(`transactions/${id}`)
        .set({
          ...rest,
          paymentAmount,
          products,
          id,
          seller: currentSeller,
          createBy: currentUser,
          transactionAt: new Date(),
        });

      Toast.success('Produk berhasil dipesan');

      router.replace('/(tabs)/');
      return result;
    },
    [seller, user],
  );

  const noData = collection.length === 0 && commercial.length === 0;
  return (
    <Form methods={methods}>
      {step === SellerStep.main ? (
        <>
          {noData && (
            <Text
              style={{
                textAlign: 'center',
              }}
              variant="headlineMedium"
            >
              No Data
            </Text>
          )}
          {!!collection.length && (
            <>
              <Text
                variant="titleMedium"
                style={{
                  marginBottom: 8,
                }}
              >
                Collection Rabbit
              </Text>
              {collection.map((col, index) => {
                return (
                  <View
                    key={col.id}
                    style={{
                      gap: 4,
                    }}
                  >
                    <Text>
                      {col.name} - {col.type.name} (Qty)
                    </Text>
                    <Text>Price (@) : Rp {col.price}</Text>
                    <TextInput
                      label="Qty"
                      name={`products[${index}].quantity`}
                      keyboardType="number-pad"
                    />
                  </View>
                );
              })}
            </>
          )}
          <View style={{ padding: 10 }} />
          {!!commercial.length && (
            <>
              <Text
                variant="titleMedium"
                style={{
                  marginBottom: 8,
                }}
              >
                Commercial Rabbit
              </Text>
              {commercial.map((com, index) => {
                return (
                  <View
                    key={com.id}
                    style={{
                      gap: 4,
                    }}
                  >
                    <Text>
                      {com.name} - {com.type.name} (KG)
                    </Text>
                    <Text>Price (@) : Rp {com.price}</Text>
                    <TextInput
                      label={`Kg`}
                      name={`products[${collection.length + index}].quantity`}
                      keyboardType="number-pad"
                    />
                  </View>
                  // <View key={com.id}>
                  //   <Text>
                  //     {com.name} - {com.type.name}
                  //   </Text>
                  // </View>
                );
              })}
            </>
          )}
          <View style={{ height: 64 }} />
        </>
      ) : (
        <SellerPricePreview />
      )}

      {(!!user || noData) && (
        <View
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 10,
            backgroundColor: colorConstant.white,
            flexDirection: 'row',
          }}
        >
          {step === SellerStep.final ? (
            <>
              <Button
                style={{ flex: 1 }}
                onPress={() => setStep(SellerStep.main)}
              >
                Back
              </Button>
              <IsolatedButton onSubmit={onSubmit} />
            </>
          ) : (
            <Button
              style={{ flex: 1 }}
              onPress={() => setStep(SellerStep.final)}
              mode="contained"
            >
              Next
            </Button>
          )}
        </View>
      )}
    </Form>
  );
}
