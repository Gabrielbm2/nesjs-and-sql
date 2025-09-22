import { ApiProperty } from '@nestjs/swagger';

class ProdutoResponseDto {
  @ApiProperty({ description: 'Altura do produto em centímetros', example: 10 })
  altura: number;

  @ApiProperty({
    description: 'Largura do produto em centímetros',
    example: 15,
  })
  largura: number;

  @ApiProperty({
    description: 'Comprimento do produto em centímetros',
    example: 20,
  })
  comprimento: number;
}

class CaixaResponseDto {
  @ApiProperty({ description: 'Tipo da caixa utilizada', example: 'Caixa 1' })
  tipo: string;

  @ApiProperty({
    type: [ProdutoResponseDto],
    description: 'Produtos alocados nesta caixa',
  })
  produtos: ProdutoResponseDto[];
}

export class PedidoResponseDto {
  @ApiProperty({
    description: 'ID único do pedido',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  pedidoId: string;

  @ApiProperty({
    type: [CaixaResponseDto],
    description: 'Caixas utilizadas para o empacotamento',
  })
  caixas: CaixaResponseDto[];
}
