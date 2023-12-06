import { RabbitModel } from '../../api-hook/rabbit/model';
import { MateFormType } from './components/form-type';
import firestore from '@react-native-firebase/firestore';

export async function getSubmitData(values: MateFormType) {
  const { femaleRabbitId, maleRabbitId, ...rest } = values;

  const maleRabbit = (
    await firestore().doc(`rabbits/${maleRabbitId}`).get()
  ).data() as RabbitModel;

  const femaleRabbit = (
    await firestore().doc(`rabbits/${femaleRabbitId}`).get()
  ).data() as RabbitModel;

  return { ...rest, maleRabbit, femaleRabbit };
}
