import { RabbitFormType } from './components/form-type';
import firestore from '@react-native-firebase/firestore';

export async function getSubmitData(values: RabbitFormType) {
  const { typeId, price, quantity, ...rest } = values;

  //get the type
  const type = (await firestore().doc(`types/${typeId}`).get()).data();

  return {
    ...rest,
    price: parseFloat(price),
    quantity: parseFloat(quantity),
    type,
  };
}
