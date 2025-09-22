import { Produto } from '../interfaces/pedido.interface';

export const PRODUTO_PEQUENO: Produto = {
  altura: 10,
  largura: 20,
  comprimento: 30,
};

export const PRODUTO_MEDIO: Produto = {
  altura: 40,
  largura: 30,
  comprimento: 20,
};

export const PRODUTO_GIGANTE: Produto = {
  altura: 1000,
  largura: 2000,
  comprimento: 3000,
};

export const LISTA_PRODUTOS_VALIDOS: Produto[] = [
  PRODUTO_PEQUENO,
  PRODUTO_MEDIO,
];
