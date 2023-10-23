import { Identifier } from 'sequelize';
import { User } from '../db/models/user.model';
import { CreateUserDto } from './types/createUser.dto';

const model = User;

async function updateBalance(id: number, value: number): Promise<User> {
  const user = await getById(id);
  const userData = user.dataValues;

  const newBalance = userData.balance + value;
  const updatedResult = await update(id, { balance: newBalance });
  const result = updatedResult[1][0];
  return result;
}

async function create(data: CreateUserDto) {
  const result = await model.create(data);
  return result;
}

async function update(id: number, data: CreateUserDto) {
  return model.update(data, { where: { id }, returning: true });
}

async function getById(identifier: Identifier) {
  return model.findByPk(identifier);
}

export default {
  create,
  update,
  getById,
  updateBalance,
};
