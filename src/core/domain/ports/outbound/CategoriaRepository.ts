
import { Categoria } from "../../Categoria";

export interface CategoriaRepository{

    findById(id:string):Promise<Categoria|null>;
    findAll():Promise<Categoria[]>;
    save(categoria:Categoria):Promise<void>;
    delete(id:string):Promise<void>;


    
}

export const CATEGORIA_REPOSITORY=Symbol('CATEGORIA_REPOSITORY')