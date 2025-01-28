import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { NumericTransformer } from "../util/numericTransformer";

@Entity({name: "tb_produtos"})
export class Produto {
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, nullable: false})
    nome: string

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    marca: string

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    descricao: string

    @Column()
    data_validade: Date

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @IsPositive()
    @Column({ type: "decimal", precision: 10, scale: 2, transformer: new NumericTransformer() })
    preco: number

    @Column({type: "varchar", length: 5000, nullable: true})
    foto : string

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
       onDelete: "CASCADE"
    })
    categoria: Categoria

}