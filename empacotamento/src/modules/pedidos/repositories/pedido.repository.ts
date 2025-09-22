import { Injectable } from '@nestjs/common';
import { PedidoEntity } from '../entities/pedido.entity';

@Injectable()
export class PedidosRepository {
  private pedidos: PedidoEntity[] = [];

  save(pedido: PedidoEntity): PedidoEntity {
    this.pedidos.push(pedido);
    return pedido;
  }

  findAll(): PedidoEntity[] {
    return this.pedidos;
  }
}
