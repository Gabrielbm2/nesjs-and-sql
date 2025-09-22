import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsArray, IsNumber } from 'class-validator';

class ProdutoDto {
  @ApiProperty({ description: 'Altura do produto em centímetros', example: 10 })
  @IsNumber()
  altura: number;

  @ApiProperty({
    description: 'Largura do produto em centímetros',
    example: 15,
  })
  @IsNumber()
  largura: number;

  @ApiProperty({
    description: 'Comprimento do produto em centímetros',
    example: 20,
  })
  @IsNumber()
  comprimento: number;
}

export class CreatePedidoDto {
  @ApiProperty({ type: [ProdutoDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProdutoDto)
  produtos: ProdutoDto[];
}
