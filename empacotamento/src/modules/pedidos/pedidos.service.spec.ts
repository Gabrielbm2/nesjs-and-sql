import { Test, TestingModule } from '@nestjs/testing';
import { PedidosService } from './pedidos.service';
import { PedidosRepository } from './repositories/pedido.repository';
import { CREATE_PEDIDO_DTO } from './mocks/pedido.mock';
import {
  PRODUTO_GIGANTE,
  PRODUTO_PEQUENO,
  PRODUTO_MEDIO,
} from './mocks/produtos.mock';

describe('PedidosService', () => {
  let service: PedidosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidosService, PedidosRepository],
    }).compile();

    service = module.get<PedidosService>(PedidosService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um pedido válido e retornar caixas', () => {
    const result = service.create(CREATE_PEDIDO_DTO);
    expect(result.pedidoId).toBeDefined();
    expect(result.caixas.length).toBeGreaterThan(0);
  });

  it('deve lançar erro ao tentar empacotar produto gigante', () => {
    expect(() => service.create({ produtos: [PRODUTO_GIGANTE] })).toThrow(
      'não cabe em nenhuma caixa disponível',
    );
  });

  it('deve armazenar pedidos criados e listá-los em findAll', () => {
    service.create(CREATE_PEDIDO_DTO);
    service.create({ produtos: [PRODUTO_PEQUENO] });

    const pedidos = service.findAll();

    expect(pedidos.length).toBe(2);
    expect(pedidos[0].pedidoId).toBeDefined();
    expect(Array.isArray(pedidos[0].caixas)).toBe(true);
  });

  it('deve empacotar produtos pequenos e médios na mesma caixa (otimização)', () => {
    const result = service.create({
      produtos: [PRODUTO_PEQUENO, PRODUTO_MEDIO],
    });
    expect(result.caixas.length).toBe(1);
    expect(result.caixas[0].produtos.length).toBe(2);
  });

  it('deve manter múltiplos produtos médios na mesma caixa se houver espaço', () => {
    const result = service.create({
      produtos: [PRODUTO_MEDIO, PRODUTO_MEDIO, PRODUTO_MEDIO],
    });
    expect(result.caixas.length).toBe(1);
    expect(result.caixas[0].produtos.length).toBe(3);
  });

  it('deve criar múltiplos pedidos e retornar array de resultados', () => {
    const multiplos = {
      pedidos: [
        { produtos: [PRODUTO_PEQUENO] },
        { produtos: [PRODUTO_MEDIO] },
        CREATE_PEDIDO_DTO
      ]
    };

    const resultados = service.createMultiples(multiplos);

    expect(resultados.length).toBe(3);
    expect(resultados[0].pedidoId).toBeDefined();
    expect(resultados[1].pedidoId).toBeDefined();
    expect(resultados[2].pedidoId).toBeDefined();
    expect(resultados[0].caixas.length).toBeGreaterThan(0);
    expect(resultados[1].caixas.length).toBeGreaterThan(0);
    expect(resultados[2].caixas.length).toBeGreaterThan(0);
  });

  it('deve falhar múltiplos pedidos se um deles for inválido', () => {
    const multiplos = {
      pedidos: [
        { produtos: [PRODUTO_PEQUENO] },
        { produtos: [PRODUTO_GIGANTE] }
      ]
    };

    expect(() => service.createMultiples(multiplos)).toThrow(
      'Erro ao processar pedido',
    );
  });
});
