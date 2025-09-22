import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsArray, IsNumber, Min } from 'class-validator';

class ProdutoDto {
  @ApiProperty({ description: 'Altura do produto em centímetros', example: 10 })
  @IsNumber()
  @Min(0.1, { message: 'Altura deve ser maior que 0.1cm' })
  altura: number;

  @ApiProperty({
    description: 'Largura do produto em centímetros',
    example: 15,
  })
  @IsNumber()
  @Min(0.1, { message: 'Largura deve ser maior que 0.1cm' })
  largura: number;

  @ApiProperty({
    description: 'Comprimento do produto em centímetros',
    example: 20,
  })
  @IsNumber()
  @Min(0.1, { message: 'Comprimento deve ser maior que 0.1cm' })
  comprimento: number;
}

export class CreatePedidoDto {
  @ApiProperty({ type: [ProdutoDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProdutoDto)
  produtos: ProdutoDto[];
}

export class CreateMultiplesPedidosDto {
  @ApiProperty({
    type: [CreatePedidoDto],
    description: 'Lista de pedidos a serem processados',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePedidoDto)
  pedidos: CreatePedidoDto[];
}
