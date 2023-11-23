import { RabbitModel } from "../rabbit/model";

export enum HealthStatusEnum {
  well = "well",
  sick = "sick",
}

export type HealthModel = {
  id: string;
  checkAt: Date;
  weight: number;
  status: HealthStatusEnum;
  description: string;

  rabbit: RabbitModel;
};
