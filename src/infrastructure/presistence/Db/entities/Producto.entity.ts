
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CategoriaEntity } from './categoria.entity';

@Entity('producto')
export class ProductoEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column('decimal')
  precio: number;

  @Column('int')
  cantidad: number;

  @ManyToOne(() => CategoriaEntity)
  @JoinColumn({ name: 'categoriaId' })
  categoria: CategoriaEntity;

  @Column()
  categoriaId: string;
}
