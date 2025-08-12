import { UserRepository } from "src/auth/domain/repositories/user.repository.interface";
import { Repository } from "typeorm";
import {User as UserEntityORM} from "./user.orm-entity"
import { User, UserRole } from "src/auth/domain/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class TypeormUserRepository implements UserRepository{

    constructor(
        @InjectRepository(UserEntityORM)
        private readonly repo:Repository<UserEntityORM>
    ){}

    async findByUsername(username: string): Promise<User | null> {
        const userROM=await this.repo.findOne({where:{username}});

        if(!userROM) return null;

        return new User(userROM.id,userROM.username,userROM.password,userROM.role as UserRole);

    }

    async save(user: User): Promise<void> {
        const userROM=this.repo.create({
            id:user.id,
            username:user.username,
            password: user.password,
            role:user.role
        });

        await this.repo.save(userROM)
    }
}