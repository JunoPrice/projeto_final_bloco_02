import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Módulos Categoria (e2e)', () => {
  let categoriaId: any;
  let app: INestApplication;

  beforeAll(async () => {
    // Aqui criei uma instância do Nest com o banco de dados em memória para não sujar meu DB
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + './../src/**/entities/*.entity.ts'], // Importando as entidades
          synchronize: true, // Sincronização do schema com o banco
          dropSchema: true, // Garantindo que o banco será limpo ao iniciar os testes
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe()); // Validação de pipes globais

    await app.init();
  });

  afterAll(async () => {
    await app.close(); // Fechar o app após os testes
  });

  it('01 - Deve cadastrar uma nova categoria', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/categorias') // Caminho para /categorias
      .send({
        tipo: 'Primeiros Socorros',
      })
      .expect(201); // Espera um status 201 (Criado)

    categoriaId = resposta.body.id; // Salvando o ID da categoria criada pra usar depois em outro teste
  });

  it('02 - Deve listar todas as categorias', async () => {
    return await request(app.getHttpServer())
      .get('/categorias')
      .expect(200); // Espera o status 200 (OK)
  });

  it('03 - Deve buscar uma categoria pelo ID', async () => {
    return await request(app.getHttpServer())
      .get(`/categorias/${categoriaId}`) // Buscando a categoria pelo ID
      .expect(200); // Espera o status 200 (OK)
  });

  it('04 - Deve listar categorias pelo tipo', async () => {
    return await request(app.getHttpServer())
      .get(`/categorias/tipo/Primeiros Socorros`) // Filtrando pelo tipo
      .expect(200); // Espera o status 200 (OK)
  });

  it('05 - Deve atualizar uma categoria', async () => {
    return request(app.getHttpServer())
      .put('/categorias') // Atualizando a categoria
      .send({
        id: categoriaId,
        tipo: 'Cuidados de Emergência',
      })
      .expect(200) // Espera o status 200 (OK)
      .then(resposta => {
        expect('Cuidados de Emergência').toEqual(resposta.body.tipo); // Verifica se a atualização foi bem-sucedida
      });
  });

  it('06 - Deve excluir uma categoria', async () => {
    return await request(app.getHttpServer())
      .delete(`/categorias/${categoriaId}`) // Excluindo a categoria
      .expect(204); // Espera o status 204 (Sem conteúdo)
  });
});