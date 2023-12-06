import { Divider, Text } from 'react-native-paper';
import { View } from '../../../components/themed';
import { useFormContext } from 'react-hook-form';
import { SellerFormType } from './form-type';
import { format } from 'date-fns';
import useGetAuthAction from '../../../hooks/use-get-auth-action';
import Container from '../../../components/container';
import { ScrollView } from 'react-native';
import React from 'react';
import { UserModel } from '../../../api-hook/user/model';

function UserInformation(props: { user: UserModel }) {
  const { user } = props;
  return (
    <View>
      <Text>
        Name : {user.name} - {user.phoneNumber}
      </Text>
      <Text>Address: {user.address}</Text>
    </View>
  );
}

export default function SellerPricePreview() {
  const { getValues } = useFormContext<SellerFormType>();
  const values = getValues();
  const { user } = useGetAuthAction();

  const { paymentAmount, products } = React.useMemo(() => {
    const products = values.products.filter((product) => !!product.quantity);
    let paymentAmount = products.reduce((prev, product) => {
      const amount = product.quantity * product.price;
      return prev + amount;
    }, 0);
    return { paymentAmount, products };
  }, [values.products]);

  return (
    user && (
      <Container>
        <Text variant="headlineMedium">Price Preview</Text>
        <Text>
          Transaction Date :{' '}
          {format(values.transactionAt, 'dd MMMM yyyy, HH:mm')}
        </Text>
        <View style={{ height: 16 }} />
        <Text>Buyer</Text>
        <UserInformation user={user} />
        <View style={{ height: 16 }} />

        <Text>Seller</Text>
        <UserInformation user={values.seller} />
        <View style={{ height: 16 }} />

        <Text variant="titleMedium">Products</Text>
        <View style={{ height: 16 }} />
        <ScrollView>
          {products.map((product) => {
            return (
              <View key={product.id}>
                <Text style={{ textAlign: 'right' }}>
                  {product.name} - {product.type.name}{' '}
                </Text>
                <Text style={{ textAlign: 'right' }}>
                  Price (@) : Rp {product.price}
                </Text>
                <Text style={{ textAlign: 'right' }}>
                  Qty : {parseFloat(product.quantity.toString())}
                </Text>
                <Text variant="titleSmall" style={{ textAlign: 'right' }}>
                  Subtotal : Rp {product.price * product.quantity}
                </Text>
                <Divider style={{ marginTop: 4, marginBottom: 8 }} />
              </View>
            );
          })}
          <Text variant="titleSmall" style={{ textAlign: 'right' }}>
            Total : Rp {paymentAmount}
          </Text>
        </ScrollView>
        <View style={{ height: 16 }} />
      </Container>
    )
  );
}
