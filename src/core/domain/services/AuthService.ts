import { randomUUID } from "crypto";
import { UserRepository } from "../ports/outbound";
import { JwtService } from "@nestjs/jwt";
import { User, UserRole } from "../User";
import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { AppResponse } from "src/infrastructure/http-server/model/app.response";

export class AuthService {

    // constructor(private readonly userRepository: UserRepository) { }

    constructor(private userRepository: UserRepository, private readonly JwtService: JwtService) { }

    async register(username: string, password: string, role: string): Promise<AppResponse> {
        const existingUser = await this.userRepository.findByUsername(username);

        if (existingUser) {
            return {
                status: 400,
                message: 'Este usuario ya existe',
                data: null
            };

        }

        const id = randomUUID(); // UUID v4
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User(id, username, passwordHash, User.getUserRole(role));


        await this.userRepository.save(newUser);

        return {
            status: 200,
            message: 'Se registro correctament',
            data: null
        };

    }

    async validateUser(username: string, password: string): Promise<{
        status: number;
        message: string;
        data: {
            accessToken: string;
            user: { username: string; role: string };
        };
    }> {
        console.log(username);
        const user = await this.userRepository.findByUsername(username);
        if (!user) {
            throw new UnauthorizedException({
                status: 401,
                message: 'Credenciales invalidas ',
                data: null
            });
        }

        const isPasswordVali = await bcrypt.compare(password, user.password)

        if (!isPasswordVali) {
            throw new UnauthorizedException({
                status: 401,
                message: 'Credenciales invalidas',
                data: null
            })
        }

        const payload = { username: user.username, sub: user.id, role: user.role };
        const accessToken = await this.JwtService.signAsync(payload);

        return {
            status: 200,
            message: 'Login exitoso',
            data: {
                accessToken,
                user: {
                    username: user.username,
                    role: user.role
                }
            }
        };
    }




}