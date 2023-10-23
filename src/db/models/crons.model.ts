import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '../index';

export class Cron extends Model<
  InferAttributes<Cron>,
  InferCreationAttributes<Cron>
> {
  declare id: CreationOptional<number>;
  declare startDate: Date;
  declare processingTime: number;
  declare result: any;
  declare name: string;
}

Cron.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    startDate: DataTypes.DATE,
    processingTime: DataTypes.INTEGER,
    result: DataTypes.JSONB,
    name: DataTypes.STRING,
  },
  {
    tableName: 'Crons',
    sequelize: db,
    timestamps: false,
  },
);
