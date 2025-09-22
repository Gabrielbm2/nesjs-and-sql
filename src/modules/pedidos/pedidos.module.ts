import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { PedidosRepository } from './repositories/pedido.repository';
import { PedidosClient } from './pedidos.client';
import { PedidosMicroController } from './pedidos.micro.controller';
import { PedidosProxyController } from './pedidos-proxy.controller';

@Module({
  controllers: [
    PedidosController,
    PedidosMicroController,
    PedidosProxyController,
  ],
  providers: [PedidosService, PedidosRepository, PedidosClient],
  exports: [PedidosClient],
})
export class PedidosModule {}
