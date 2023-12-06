export enum UserTypeEnum {
  user = 'user',
  seller = 'seller',
}

export enum GenderEnum {
  male = 'male',
  female = 'female',
}

export type UserModel = {
  id: string;
  address: string;
  email: string;
  latitude: number;
  longitude: number;
  name: string;
  password: string;
  phoneNumber: string;
  type: UserTypeEnum;

  key: string;
};
