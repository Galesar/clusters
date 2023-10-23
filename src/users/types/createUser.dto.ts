import { InferAttributes } from 'sequelize';
import { User } from '@db/models/user.model';

export type CreateUserDto = Partial<Omit<InferAttributes<User>, 'id'>>;
