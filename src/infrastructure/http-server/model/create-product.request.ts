import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateProductoRequet {

    @ApiProperty({ example: 'tv' })
    @IsString()
    nombre: string;

    @ApiProperty({ example: '59 pulgadas' })
    @IsString()
    descripcion: string;

    @ApiProperty({ example: '9999.99' })
    @IsNumber()
    precio: number;

    @ApiProperty({ example: '999999' })
    @IsInt()
    @IsPositive()
    cantidad: number;

    @ApiProperty({ example: 'deporte' })
    @IsUUID()
    categoriaId: string;



}