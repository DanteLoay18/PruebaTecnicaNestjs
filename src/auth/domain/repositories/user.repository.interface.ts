import { User } from "../entities/user.entity"

export interface UserRepository{
    findByUsername(username:string):Promise<User|null>;
    save(user:User):Promise<void>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');