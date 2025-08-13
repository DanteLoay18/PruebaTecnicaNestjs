import { Module } from "@nestjs/common";
import { HealthController } from "./controller/health.controller";
import { AuthController } from "./controller/auth.controller";
import { CoreModule } from "src/core/core.module";
import { CategoriaController } from "./controller/categoria.controller";
import { ProductoController } from "./controller/producto.controller";

@Module({
    imports: [
        CoreModule,
    ],
    controllers: [
        HealthController,
        AuthController,
        CategoriaController,
        ProductoController
    ],
})
export class HttpServerModule {

}