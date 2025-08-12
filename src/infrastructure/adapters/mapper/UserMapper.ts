import { Injectable } from "@nestjs/common";
import { Mapper } from "src/core/shared/Mapper";
import { UserEntity } from "src/infrastructure/presistence/Db/entities/user.entity";
import { User, UserRole } from "src/core/domain/User";

@Injectable()
export class UserMapper implements Mapper<UserEntity[], User[]> {

    map(entities: UserEntity[]): User[] {

        return entities.map(user => new User(
            user.id,
            user.username,
            user.password,
            User.getUserRole(user.role)


        ))

    }

    mapUser(entity: UserEntity): User {

        return new User(
            entity.id,
            entity.username,
            entity.password,
            User.getUserRole(entity.role)
        );

    }

    

}