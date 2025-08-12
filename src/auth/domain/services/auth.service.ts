import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { User, UserRole } from "../entities/user.entity";
import { USER_REPOSITORY, type UserRepository } from "../repositories/user.repository.interface";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";

import { randomUUID } from 'crypto';


@Injectable()
export class AuthService{

    constructor( @Inject(USER_REPOSITORY)   private userRepository:UserRepository,private readonly JwtService:JwtService){}

    async register(username: string, password: string,role:UserRole):Promise<void>{
        const existingUser=await this.userRepository.findByUsername(username);

        if(existingUser){
            throw new Error('User already exists');
        }
        
        const id = randomUUID(); // UUID v4
        const passwordHash=await bcrypt.hash(password,10);
        const newUser=new User(id,username,passwordHash,role);

        await this.userRepository.save(newUser);

    }

    async validateUser(username:string,password:string):Promise<{ accessToken: string }>{

        const user=await this.userRepository.findByUsername(username);
        if(!user){
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordVali=await bcrypt.compare(password,user.password)

        if(!isPasswordVali){
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload={username:user.username,sub:user.id,role:user.role};
        const accessToken=await this.JwtService.signAsync(payload);

        return {accessToken};
    }
}