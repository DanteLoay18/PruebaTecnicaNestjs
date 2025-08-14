import { Controller, Get, Head, HttpStatus, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import { DataSource } from "typeorm";

@ApiTags('Health')
@Controller('health')

export class HealthController {
    constructor(private datasource:DataSource){}


    @Head()
    async checkDb(@Res() res:Response) {


        try {
            return res.status(HttpStatus.OK).send();

        } catch (error) {

            return res.status(HttpStatus.SERVICE_UNAVAILABLE).send();

        }

    }

}



