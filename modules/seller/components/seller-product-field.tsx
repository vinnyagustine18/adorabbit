import { Divider, Text } from 'react-native-paper';
import {
  RabbitModel,
  RabbitOwnershipEnum,
} from '../../../api-hook/rabbit/model';
import { View } from '../../../components/themed';
import TextInput from '../../../components/element/text-input';
import colorConstant from '../../../constants/color.constant';

interface Props {
  product: RabbitModel;
  index: number;
}

export default function SellerProductField(props: Props) {
  const { product, index } = props;

  const isCollection =
    product.ownershipStatus === RabbitOwnershipEnum.collection;

  const isOutOfStock = product.quantity === 0;
  return (
    <View
      style={{
        gap: 4,
        marginTop: 16,
      }}
    >
      <Text>
        {product.name} - {product.type.name} ({isCollection ? 'Qty' : 'Kg'})
      </Text>
      <Text>Price (@) : Rp {product.price}</Text>
      {isOutOfStock ? (
        <Text
          style={{
            color: colorConstant.redDefault,
          }}
        >
          Out Of Stock
        </Text>
      ) : (
        <TextInput
          label="Qty"
          name={`products[${index}].quantity`}
          keyboardType="number-pad"
        />
      )}
      <Divider />
    </View>
  );
}
