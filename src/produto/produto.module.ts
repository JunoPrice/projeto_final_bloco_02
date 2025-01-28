import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from '../categoria/categoria.module';
import { ProdutoController } from './controllers/produto.controller';
import { Produto } from './entities/produto.entity';
import { ProdutoService } from './services/produto.service';

@Module({
    controllers: [ProdutoController],
    providers: [ProdutoService],
    imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule],
    exports: [],
})
export class ProdutoModule {};