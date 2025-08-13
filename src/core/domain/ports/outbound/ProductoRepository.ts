import { Producto } from "../../Producto";


export interface ProductoRepository {
    findById(id: string): Promise<Producto | null>;
    findAll(): Promise<Producto[]>;
    save(producto: Producto): Promise<void>;
    update(producto: Producto): Promise<Producto>;
    delete(id: string): Promise<void>;

    findAllPaginated(offset: number, limit: number,nombre?: string,
        categoriaId?: string): Promise<Producto[]>;
     count(): Promise<number>;

  }
  
  export const PRODUCTO_REPOSITORY = Symbol('PRODUCTO_REPOSITORY');