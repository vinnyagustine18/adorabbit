import { UserModel } from "../../api-hook/user/model";
import { RabbitFormType } from "./components/form-type";
import firestore from "@react-native-firebase/firestore";

export async function getSubmitData(values: RabbitFormType, userId: string) {
  const { typeId, ...rest } = values;
  //get the type
  //   console.log(typeId);
  const _type = await firestore().collection("types").doc(typeId).get();
  const type = { ..._type.data() };

  //   //get the user
  const _user = await firestore().collection("users").doc(userId!).get();

  const user = {
    ...(_user.data() as UserModel),
    id: _user.id,
  };

  const { password, ...restUser } = user;

  //extract the password
  //   const { password, ...user } = _user!;
  return { ...rest, type, user: restUser };

  //   return { ...rest, type, user };
}
