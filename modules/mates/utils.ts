import { RabbitModel } from '../../api-hook/rabbit/model';
import { UserModel } from '../../api-hook/user/model';
import { MateFormType } from './components/form-type';
import firestore from '@react-native-firebase/firestore';

export async function getSubmitData(values: MateFormType, userId: string) {
  const { femaleRabbitId, maleRabbitId, ...rest } = values;

  const { password, ...user } = (
    await firestore().doc(`users/${userId}`).get()
  ).data() as UserModel;

  const maleRabbit = (
    await firestore().doc(`rabbits/${maleRabbitId}`).get()
  ).data() as RabbitModel;

  const femaleRabbit = (
    await firestore().doc(`rabbits/${femaleRabbitId}`).get()
  ).data() as RabbitModel;

  return { ...rest, maleRabbit, femaleRabbit, user };
}
