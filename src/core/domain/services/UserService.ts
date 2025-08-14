import { randomUUID } from "crypto";
import { UserRepository } from "../ports/outbound";
import { JwtService } from "@nestjs/jwt";
import { User, UserRole } from "../User";
import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { AppResponse } from "src/infrastructure/http-server/model/app.response";

export class UserService {

    // constructor(private readonly userRepository: UserRepository) { }

    constructor(private readonly userRepository: UserRepository) { }

    async findByRole(role: UserRole): Promise<User[]> {
        const users = await this.userRepository.findByRole(role);



        return users;

    }





}