import { Pedido, Produto } from '../interfaces/pedido.interface';

type Caixa = {
  tipo: string;
  produtos: Produto[];
};

export class PedidoEntity implements Pedido {
  constructor(
    public id: string,
    public produtos: Produto[],
    public caixas?: Caixa[],
  ) {}
}
