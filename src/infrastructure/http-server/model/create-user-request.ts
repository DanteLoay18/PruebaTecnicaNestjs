import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, MinLength } from 'class-validator';

export enum UserRole {
    ADMIN = 'ADMIN',
    EMPLEADO = 'EMPLEADO',
}

export class CreateUserRequet {
  @ApiProperty({ example: 'dante' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'S3cret!', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.EMPLEADO })
  @IsEnum(UserRole)
  role: UserRole;
}