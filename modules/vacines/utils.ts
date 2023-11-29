import { RabbitModel } from '../../api-hook/rabbit/model';
import { UserModel } from '../../api-hook/user/model';
import { VacineFormType } from './components/form-type';
import firestore from '@react-native-firebase/firestore';

export async function getSubmitData(values: VacineFormType, userId: string) {
  const { drugId, rabbitId, ...rest } = values;

  const { password, ...user } = (
    await firestore().doc(`users/${userId}`).get()
  ).data() as UserModel;

  const rabbit = (
    await firestore().doc(`rabbits/${rabbitId}`).get()
  ).data() as RabbitModel;

  const drug = (
    await firestore().doc(`drugs/${drugId}`).get()
  ).data() as RabbitModel;

  return { ...rest, rabbit, drug, user };
}
