import { User } from "../entities/user.entity";

export type CreateUserDto = Required<
    Pick<User, 'login' | 'password'>
> & Partial<
    Omit<User, 'login' | 'password'>
>;
