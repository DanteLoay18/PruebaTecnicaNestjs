import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { DataSource } from "typeorm";


@Injectable()
export class DatabaseService implements OnModuleInit{

    private readonly logger=new Logger(DatabaseService.name);

    constructor(private dataSource:DataSource){}

    async onModuleInit() {
        try {
            
            await this.dataSource.query('SELECT 1');
            this.logger.log('Conexión a PostgreSQL OK');

        } catch (error) {
            this.logger.error('Error al conectar a PostgreSQL:', error);
            
        }
    }


}