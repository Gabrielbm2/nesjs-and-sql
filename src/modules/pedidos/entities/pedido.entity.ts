import { Pedido, Produto } from '../interfaces/pedido.interface';

export class PedidoEntity implements Pedido {
  constructor(
    public id: string,
    public produtos: Produto[],
  ) {}
}
