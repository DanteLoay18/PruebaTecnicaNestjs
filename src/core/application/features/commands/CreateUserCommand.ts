import { CreateUserRequest } from 'src/core/shared/dto/CreateUserRequest';

export class CreateUserCommand {
    
    constructor(public readonly createUserRequest: CreateUserRequest) { }
    
}