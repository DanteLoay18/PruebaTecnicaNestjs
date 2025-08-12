import { Injectable } from "@nestjs/common";
import { AuthService } from "src/core/domain/services/AuthService";
import { UserRole } from "src/core/domain/User";

@Injectable()
export class AuthUseCase{

    constructor(private readonly authService:AuthService){}

    async register(username: string, password: string, role:string){

        return await this.authService.register(username,password,role);
    }

    async login (username: string, password: string){
        return await this.authService.validateUser(username,password);
    }


    


}