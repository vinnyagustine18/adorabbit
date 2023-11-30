import { UserModel } from '../../api-hook/user/model';
import { HealthFormType } from './components/form-type';
import firestore from '@react-native-firebase/firestore';

export async function getSubmitData(values: HealthFormType, userId: string) {
  const { rabbitId, ...rest } = values;

  //get the type
  const rabbit = (await firestore().doc(`rabbits/${rabbitId}`).get()).data();

  //get the user
  const _user = (
    await firestore().doc(`users/${userId}`).get()
  ).data() as UserModel;

  //extract the password
  const { password, ...user } = _user;

  return { ...rest, rabbit, user };
}
