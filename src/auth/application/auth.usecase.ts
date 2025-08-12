import { Injectable } from "@nestjs/common";
import { UserRole } from "../domain/entities/user.entity";
import { AuthService } from "../domain/services/auth.service";

@Injectable()
export class AuthUseCase{

    constructor(private readonly authService:AuthService){}

    async register(username: string, password: string, role:UserRole){

        await this.authService.register(username,password,role);
        return { message: "User registered successfully" };
    }

    async login (username: string, password: string){
        return await this.authService.validateUser(username,password);
    }


    


}