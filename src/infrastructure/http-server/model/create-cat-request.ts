import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, MinLength } from 'class-validator';



export class CreateCategoriaRequet {
  @ApiProperty({ example: 'deporte' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Acceso de deporte'})
  @IsString()
  descripcion: string;


}