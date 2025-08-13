import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('categoria')
export class CategoriaEntity{


    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    nombre:string;

    @Column()
    descripcion:string;
}