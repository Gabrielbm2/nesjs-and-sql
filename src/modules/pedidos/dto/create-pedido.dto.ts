import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsArray, IsNumber } from 'class-validator';

class ProdutoDto {
  @ApiProperty()
  @IsNumber()
  altura: number;

  @ApiProperty()
  @IsNumber()
  largura: number;

  @ApiProperty()
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
