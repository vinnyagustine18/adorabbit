import { HealthFormType } from './components/form-type';
import firestore from '@react-native-firebase/firestore';

export async function getSubmitData(values: HealthFormType) {
  const { rabbitId, ...rest } = values;

  //get the type
  const rabbit = (await firestore().doc(`rabbits/${rabbitId}`).get()).data();

  return { ...rest, rabbit };
}
