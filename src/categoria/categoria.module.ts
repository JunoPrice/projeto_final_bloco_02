import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaController } from "./controllers/categoria.controller";
import { Categoria } from "./entities/categoria.entity";
import { CategoriaService } from "./services/categoria.service";

@Module({
    controllers: [CategoriaController],
    providers: [CategoriaService],
    imports: [TypeOrmModule.forFeature([Categoria])],
    exports: [CategoriaService],
})
export class CategoriaModule {};