
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from '../LoginCommand';
import { AuthService } from 'src/core/domain/services/AuthService';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: LoginCommand) {
    const { username, password } = command;
    return this.authService.validateUser(username, password);
  }
}
