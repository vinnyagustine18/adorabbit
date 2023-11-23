export enum UserTypeEnum {
  user = "user",
  seller = "seller",
}

export type UserType = {
  address: string;
  email: string;
  latitude: number;
  longitude: number;
  name: string;
  password: string;
  phoneNumber: string;
  type: UserTypeEnum;
};
