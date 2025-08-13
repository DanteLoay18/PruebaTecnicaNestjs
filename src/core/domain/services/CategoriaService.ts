import { AppResponse } from "src/infrastructure/http-server/model/app.response";
import { CategoriaRepository } from "../ports/outbound";
import { randomUUID } from "crypto";
import { Categoria } from "../Categoria";


export class CategoriaService{

    constructor(private categoriaRepository:CategoriaRepository){}

    async createCategoria(nombre:string,descripcion:string):Promise<AppResponse>{

        const id=randomUUID();
        const categoria= new Categoria(id,nombre,descripcion);

        await this.categoriaRepository.save(categoria);

        return {

            status:200,
            message:'Categoría creada correctamente',
            data:null


        };

    }

    async getAllCategorias():Promise<AppResponse>{
        const categoria=await this.categoriaRepository.findAll();

        return{

            status: 200,
            message: "Lista de categorías",
            data: categoria
            

        };
    }

    async getCategoriaById(id: string): Promise<AppResponse> {
        const categoria = await this.categoriaRepository.findById(id);
        if (!categoria) {
          return {
            status: 404,
            message: "Categoría no encontrada",
            data: null
          };
        }
        return {
          status: 200,
          message: "Categoría encontrada",
          data: categoria
        };
      }

      async deleteCategoria(id: string): Promise<AppResponse> {
        const categoria = await this.categoriaRepository.findById(id);
        if (!categoria) {
          return {
            status: 404,
            message: "Categoría no encontrada",
            data: null
          };
        }
    
        await this.categoriaRepository.delete(id);
    
        return {
          status: 200,
          message: "Categoría eliminada correctamente",
          data: null
        };
      }





}