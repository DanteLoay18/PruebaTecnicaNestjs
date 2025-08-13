import { Injectable } from "@nestjs/common";
import { CategoriaService } from "src/core/domain/services/CategoriaService";


@Injectable()
export class  CategoriaUseCase{

    constructor(private readonly categoriaService:CategoriaService){}

    async createCategoria(nombre:string,descripcion:string){
        return await this.categoriaService.createCategoria(nombre,descripcion);
    }

    async getAllCategoria(){
        return await this.categoriaService.getAllCategorias();
    }

    async getCategoriaById(id:string){
        return await this.categoriaService.getCategoriaById(id);
    }

    async deleteCategoria(id:string){

        return await this.categoriaService.deleteCategoria(id);

    }


}