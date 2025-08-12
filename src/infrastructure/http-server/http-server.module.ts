import { Module } from "@nestjs/common";
import { HealthController } from "./controller/health.controller";
import { AuthController } from "./controller/auth.controller";
import { CoreModule } from "src/core/core.module";

@Module({
    imports: [
        CoreModule,
    ],
    controllers: [
        HealthController,
        AuthController,
    ],
})
export class HttpServerModule {

}