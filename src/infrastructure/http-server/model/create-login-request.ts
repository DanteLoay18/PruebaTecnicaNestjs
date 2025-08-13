
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, MinLength } from 'class-validator';


export class LoginRequet {
  @ApiProperty({ example: 'dante' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'S3cret!', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  
}