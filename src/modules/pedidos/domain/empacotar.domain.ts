import { BadRequestException } from '@nestjs/common';
import { Produto } from '../interfaces/pedido.interface';

type Caixa = {
  tipo: string;
  altura: number;
  largura: number;
  comprimento: number;
};

const CAIXAS: Caixa[] = [
  { tipo: 'Caixa 1', altura: 30, largura: 40, comprimento: 80 },
  { tipo: 'Caixa 2', altura: 50, largura: 50, comprimento: 40 },
  { tipo: 'Caixa 3', altura: 50, largura: 80, comprimento: 60 },
];

function calculaVolume({
  altura,
  largura,
  comprimento,
}: Produto | Caixa): number {
  return altura * largura * comprimento;
}

export function empacotarProdutos(produtos: Produto[]) {
  const caixasUsadas: {
    tipo: string;
    capacidade: number;
    ocupada: number;
    produtos: Produto[];
  }[] = [];

  for (const produto of produtos) {
    const volumeProduto = calculaVolume(produto);

    const caixasPossiveis = CAIXAS.filter(
      (c) => volumeProduto <= calculaVolume(c),
    );
    if (caixasPossiveis.length === 0) {
      throw new BadRequestException(
        `Produto não cabe em nenhuma caixa: ${JSON.stringify(produto)}`,
      );
    }

    caixasPossiveis.sort((a, b) => calculaVolume(a) - calculaVolume(b));

    let alocado = false;
    for (const caixaAberta of caixasUsadas) {
      if (
        caixasPossiveis.some(
          (c) =>
            c.tipo === caixaAberta.tipo &&
            caixaAberta.ocupada + volumeProduto <= caixaAberta.capacidade,
        )
      ) {
        caixaAberta.produtos.push(produto);
        caixaAberta.ocupada += volumeProduto;
        alocado = true;
        break;
      }
    }

    if (!alocado) {
      const caixaEscolhida = caixasPossiveis[0];
      caixasUsadas.push({
        tipo: caixaEscolhida.tipo,
        capacidade: calculaVolume(caixaEscolhida),
        ocupada: volumeProduto,
        produtos: [produto],
      });
    }
  }

  return caixasUsadas.map(({ tipo, produtos }) => ({ tipo, produtos }));
}
