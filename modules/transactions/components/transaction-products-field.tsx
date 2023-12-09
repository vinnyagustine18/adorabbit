import { useFormContext, useWatch } from 'react-hook-form';
import { TransactionFormType } from './form-type';

import { View } from '../../../components/themed';
import TextInput from '../../../components/element/text-input';
import CheckboxInput from '../../../components/element/checkbox-input';
import React from 'react';
import { TransactionTypeEnum } from '../../../api-hook/transaction/model';
import { Divider, Text } from 'react-native-paper';
import { useFormState } from '../../../components/form/form';

interface Props {
  index: number;
}

const name = 'products' as const;

function TransactionProductField(props: Props) {
  const { control } = useFormContext<TransactionFormType>();
  const parentName = `${name}.${props.index}` as const;
  const [product, type, isSales] = useWatch({
    control,
    name: [parentName, 'type', 'isSales'],
  });

  const isPurchase = type === TransactionTypeEnum.purchase;
  const label = `${product.name} - ${product.type.name}`;
  return (
    <View
      style={{
        gap: 4,
      }}
    >
      {isPurchase ? (
        <CheckboxInput name={`${parentName}.isCheck`} label={label} />
      ) : (
        <View style={{ marginTop: 16 }}>
          <Text>{label}</Text>
          <Text>Price (@) : Rp {product.price}</Text>
        </View>
      )}
      {product.isCheck && (
        <TextInput
          label="Qty"
          name={`${parentName}.quantity`}
          keyboardType="number-pad"
          disabled={isSales}
        />
      )}
      <Divider />
    </View>
  );
}

export default function TransactionProductsField() {
  const { getValues } = useFormContext<TransactionFormType>();
  const products = getValues('products');
  const { editable } = useFormState();

  return (
    <React.Fragment>
      {products.map((product, index) => {
        if (product.isActive || editable) {
          return <TransactionProductField key={product.id} index={index} />;
        }
        return <React.Fragment key={product.id} />;
      })}
    </React.Fragment>
  );
}
