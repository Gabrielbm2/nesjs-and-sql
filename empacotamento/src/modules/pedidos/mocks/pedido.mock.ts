import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { PedidoResponseDto } from '../dto/response-pedido.dto';
import { LISTA_PRODUTOS_VALIDOS } from './produtos.mock';

export const CREATE_PEDIDO_DTO: CreatePedidoDto = {
  produtos: LISTA_PRODUTOS_VALIDOS,
};

export const PEDIDO_RESPONSE_DTO: PedidoResponseDto = {
  pedidoId: 'mock-pedido-id',
  caixas: [
    {
      tipo: 'Caixa 1',
      produtos: LISTA_PRODUTOS_VALIDOS,
    },
  ],
};
