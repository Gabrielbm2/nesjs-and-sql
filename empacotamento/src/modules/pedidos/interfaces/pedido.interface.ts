export interface Produto {
  altura: number;
  largura: number;
  comprimento: number;
}

export interface Pedido {
  id: string;
  produtos: Produto[];
}
