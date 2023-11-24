import { TypeModel } from "../type/model";
import { GenderEnum, UserModel } from "../user/model";

export enum RabbitStatusEnum {
  alive = "alive",
  deceased = "deceased",
}

export enum RabbitOwnershipEnum {
  commercial = "commercial",
  collection = "collection",
}

export type RabbitModel = {
  id: string;
  name: string;
  gender: GenderEnum;
  birthAt: Date;
  status: RabbitStatusEnum;
  ownershipStatus: RabbitOwnershipEnum;
  price: number;
  description: string;

  //type table
  type: TypeModel;

  //user table
  user: UserModel;
};
