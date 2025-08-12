import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "../CreateUserCommand";
import { AuthUseCase } from "src/core/application/services/AuthUseCases";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {

    constructor(private authUseCase: AuthUseCase) { }

    async execute(command: CreateUserCommand) {
        console.log("Handler", command)

       return this.authUseCase.register(command.createUserRequest.username, command.createUserRequest.password, command.createUserRequest.role);

    }

}