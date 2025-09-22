import { ApiProperty } from '@nestjs/swagger';

class ProdutoResponseDto {
  @ApiProperty()
  altura: number;

  @ApiProperty()
  largura: number;

  @ApiProperty()
  comprimento: number;
}

class CaixaResponseDto {
  @ApiProperty()
  tipo: string;

  @ApiProperty({ type: [ProdutoResponseDto] })
  produtos: ProdutoResponseDto[];
}

export class PedidoResponseDto {
  @ApiProperty()
  pedidoId: string;

  @ApiProperty({ type: [CaixaResponseDto] })
  caixas: CaixaResponseDto[];
}
