import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { PedidoResponseDto } from './dto/response-pedido.dto';

@Injectable()
export class PedidosClient implements OnModuleInit {
  private client: ClientProxy;

  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'localhost', port: 4000 },
    });
  }

  criarPedido(dto: CreatePedidoDto) {
    return this.client.send<PedidoResponseDto>({ cmd: 'criar_pedido' }, dto);
  }

  listarPedidos() {
    return this.client.send<PedidoResponseDto[]>({ cmd: 'listar_pedidos' }, {});
  }
}
