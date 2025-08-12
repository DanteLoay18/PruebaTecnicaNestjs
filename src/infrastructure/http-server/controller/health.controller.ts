import { Controller, Get, Head, HttpStatus, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import { DataSource } from "typeorm";

@ApiTags('Health')
@Controller('health')

export class HealthController {
    constructor(private datasource:DataSource){}


    @Head('db')
    async checkDb(@Res() res:Response) {



        try {
            await this.datasource.query('SELECT 1');
            return res.status(HttpStatus.OK).send();

        } catch (error) {

            return res.status(HttpStatus.SERVICE_UNAVAILABLE).send();

        }

    }

}



