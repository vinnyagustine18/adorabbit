import { UserModel } from '../../api-hook/user/model';
import { RabbitFormType } from './components/form-type';
import firestore from '@react-native-firebase/firestore';

export async function getSubmitData(values: RabbitFormType, userId: string) {
  const { typeId, price, quantity, ...rest } = values;

  //get the type
  const type = (await firestore().doc(`types/${typeId}`).get()).data();

  //get the user
  const _user = (
    await firestore().doc(`users/${userId}`).get()
  ).data() as UserModel;

  //extract the password
  const { password, ...user } = _user;

  return {
    ...rest,
    price: parseFloat(price),
    quantity: parseFloat(quantity),
    type,
    user,
  };
}
