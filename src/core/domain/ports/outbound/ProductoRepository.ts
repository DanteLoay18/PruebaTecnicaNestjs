import { Producto } from "../../Producto";


export interface ProductoRepository {
    findById(id: string): Promise<Producto | null>;
    findAll(): Promise<Producto[]>;
    save(producto: Producto): Promise<void>;
    update(producto: Producto): Promise<void>;
    delete(id: string): Promise<void>;


  }
  
  export const PRODUCTO_REPOSITORY = Symbol('PRODUCTO_REPOSITORY');