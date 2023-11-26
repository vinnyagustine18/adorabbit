import { RabbitModel } from "../rabbit/model";

export type MateModel = {
  id: string;
  mateAt: Date;
  description: string;

  maleRabbit: RabbitModel;
  femaleRabbit: RabbitModel;

  userId: string;
};
