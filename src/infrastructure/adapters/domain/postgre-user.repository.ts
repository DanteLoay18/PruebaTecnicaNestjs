import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User, UserRole } from "src/core/domain/User";
import { UserEntity } from "src/infrastructure/presistence/Db/entities/user.entity";
import { Repository } from "typeorm";
import { UserMapper } from "../mapper/UserMapper";
import { UserRepository } from "src/core/domain/ports/outbound";

@Injectable()
export class PostgresUserRepository implements UserRepository {

    constructor(
        @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
        private mapper: UserMapper,

    ) { }

    async findByUsername(username: string): Promise<User | null> {

        return this.repository.findOneBy({ username })
            .then(entity => (entity ? this.mapper.mapUser(entity) : null));

    }
    
    async save(user: User): Promise<void> {

        console.log('USER REPOSITORY', user);
        
        await this.repository.save(user);
    }

    async findByRole(role: UserRole): Promise<User[]> {
        const entities = await this.repository.find({
            where: { role }
        });
        return entities.map(entity => this.mapper.mapUser(entity));
    }

    

    

}