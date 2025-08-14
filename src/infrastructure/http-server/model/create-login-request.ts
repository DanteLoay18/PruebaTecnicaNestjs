
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';


export class LoginRequet {
  @ApiProperty({ example: 'dante' })
  @IsString()
  @IsNotEmpty({ message: 'El username es obligatorio' })
  username: string;

  @ApiProperty({ example: 'S3cret!', minLength: 6 })
  @IsString()
  @IsNotEmpty({ message: 'El username es obligatorio' })
  @MinLength(6)
  password: string;

  
}