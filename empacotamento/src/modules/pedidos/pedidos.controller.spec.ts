import { Test, TestingModule } from '@nestjs/testing';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { CREATE_PEDIDO_DTO, PEDIDO_RESPONSE_DTO } from './mocks/pedido.mock';

describe('PedidosController', () => {
  let controller: PedidosController;
  let service: Required<typeof serviceMock>;

  const serviceMock = {
    create: jest.fn().mockReturnValue(PEDIDO_RESPONSE_DTO),
    findAll: jest.fn().mockReturnValue([PEDIDO_RESPONSE_DTO]),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidosController],
      providers: [{ provide: PedidosService, useValue: serviceMock }],
    }).compile();

    controller = module.get<PedidosController>(PedidosController);
    service = module.get(PedidosService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('deve criar um pedido chamando o service', () => {
    const result = controller.create(CREATE_PEDIDO_DTO);

    expect(service.create).toHaveBeenCalledWith(CREATE_PEDIDO_DTO);
    expect(result).toEqual(PEDIDO_RESPONSE_DTO);
  });

  it('deve listar todos os pedidos chamando o service', () => {
    const result = controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([PEDIDO_RESPONSE_DTO]);
  });

  it('deve retornar lista vazia quando não há pedidos', () => {
    service.findAll.mockReturnValueOnce([]);

    const result = controller.findAll();

    expect(result).toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('deve propagar erro quando service.create lançar exceção', () => {
    service.create.mockImplementationOnce(() => {
      throw new Error('Erro de criação');
    });

    expect(() => controller.create(CREATE_PEDIDO_DTO)).toThrow(
      'Erro de criação',
    );
  });
});
