import { BadRequestException } from '@nestjs/common';
import { Produto } from '../interfaces/pedido.interface';

type Caixa = {
  tipo: string;
  altura: number;
  largura: number;
  comprimento: number;
};

type CaixaAberta = {
  tipo: string;
  altura: number;
  largura: number;
  comprimento: number;
  espacosOcupados: {
    x: number;
    y: number;
    z: number;
    altura: number;
    largura: number;
    comprimento: number;
  }[];
  produtos: Produto[];
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

function produtoCabeNaCaixa(produto: Produto, caixa: Caixa): boolean {
  const dimensoesProduto = [produto.altura, produto.largura, produto.comprimento].sort((a, b) => a - b);
  const dimensoesCaixa = [caixa.altura, caixa.largura, caixa.comprimento].sort((a, b) => a - b);

  return dimensoesProduto[0] <= dimensoesCaixa[0] &&
         dimensoesProduto[1] <= dimensoesCaixa[1] &&
         dimensoesProduto[2] <= dimensoesCaixa[2];
}

function encontrarPosicaoParaProduto(produto: Produto, caixaAberta: CaixaAberta): { x: number; y: number; z: number } | null {
  const tentativas = [
    { altura: produto.altura, largura: produto.largura, comprimento: produto.comprimento },
    { altura: produto.altura, largura: produto.comprimento, comprimento: produto.largura },
    { altura: produto.largura, largura: produto.altura, comprimento: produto.comprimento },
    { altura: produto.largura, largura: produto.comprimento, comprimento: produto.altura },
    { altura: produto.comprimento, largura: produto.altura, comprimento: produto.largura },
    { altura: produto.comprimento, largura: produto.largura, comprimento: produto.altura },
  ];

  for (const orientacao of tentativas) {
    for (let x = 0; x <= caixaAberta.largura - orientacao.largura; x++) {
      for (let y = 0; y <= caixaAberta.comprimento - orientacao.comprimento; y++) {
        for (let z = 0; z <= caixaAberta.altura - orientacao.altura; z++) {
          const novoEspaco = {
            x,
            y,
            z,
            altura: orientacao.altura,
            largura: orientacao.largura,
            comprimento: orientacao.comprimento,
          };

          const temColisao = caixaAberta.espacosOcupados.some(espaco =>
            !(novoEspaco.x >= espaco.x + espaco.largura ||
              novoEspaco.x + novoEspaco.largura <= espaco.x ||
              novoEspaco.y >= espaco.y + espaco.comprimento ||
              novoEspaco.y + novoEspaco.comprimento <= espaco.y ||
              novoEspaco.z >= espaco.z + espaco.altura ||
              novoEspaco.z + novoEspaco.altura <= espaco.z)
          );

          if (!temColisao) {
            caixaAberta.espacosOcupados.push(novoEspaco);
            return { x, y, z };
          }
        }
      }
    }
  }

  return null;
}

export function empacotarProdutos(produtos: Produto[]) {
  const caixasUsadas: CaixaAberta[] = [];

  produtos.sort((a, b) => calculaVolume(b) - calculaVolume(a));

  for (const produto of produtos) {
    const caixasPossiveis = CAIXAS.filter(caixa => produtoCabeNaCaixa(produto, caixa));

    if (caixasPossiveis.length === 0) {
      throw new BadRequestException(
        `Produto com dimensões ${produto.altura}x${produto.largura}x${produto.comprimento}cm não cabe em nenhuma caixa disponível. ` +
        `Seu Manoel possui os seguintes tamanhos de caixas de papelão (altura, largura, comprimento em centímetros): ` +
        `Caixa 1: 30 x 40 x 80, Caixa 2: 50 x 50 x 40, Caixa 3: 50 x 80 x 60. ` +
        `Verifique se as dimensões estão corretas.`,
      );
    }

    caixasPossiveis.sort((a, b) => calculaVolume(a) - calculaVolume(b));

    let alocado = false;
    for (const caixaAberta of caixasUsadas) {
      if (caixasPossiveis.some(c => c.tipo === caixaAberta.tipo)) {
        const posicao = encontrarPosicaoParaProduto(produto, caixaAberta);
        if (posicao) {
          caixaAberta.produtos.push(produto);
          alocado = true;
          break;
        }
      }
    }

    if (!alocado) {
      const caixaEscolhida = caixasPossiveis[0];
      const novaCaixa: CaixaAberta = {
        tipo: caixaEscolhida.tipo,
        altura: caixaEscolhida.altura,
        largura: caixaEscolhida.largura,
        comprimento: caixaEscolhida.comprimento,
        espacosOcupados: [],
        produtos: [],
      };

      const posicao = encontrarPosicaoParaProduto(produto, novaCaixa);
      if (posicao) {
        novaCaixa.produtos.push(produto);
        caixasUsadas.push(novaCaixa);
      } else {
        throw new BadRequestException(
          `Erro interno: não foi possível alocar produto na nova caixa`,
        );
      }
    }
  }

  return caixasUsadas.map(({ tipo, produtos }) => ({ tipo, produtos }));
}
