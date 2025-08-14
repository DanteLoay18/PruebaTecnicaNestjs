import { User, UserRole } from "../../User";

export interface UserRepository{
    findByUsername(username:string):Promise<User|null>;
    save(user:User):Promise<void>;
    findByRole(role: UserRole): Promise<User[]>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');