import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePedidoDto, CreateMultiplesPedidosDto } from './dto/create-pedido.dto';
import { PedidoResponseDto } from './dto/response-pedido.dto';
import { PedidoEntity } from './entities/pedido.entity';
import { PedidosRepository } from './repositories/pedido.repository';
import { randomUUID } from 'crypto';
import { empacotarProdutos } from './domain/empacotar.domain';

@Injectable()
export class PedidosService {
  constructor(private readonly repository: PedidosRepository) {}

  create(dto: CreatePedidoDto): PedidoResponseDto {
    try {
      const caixas = empacotarProdutos(dto.produtos);
      const pedido = new PedidoEntity(randomUUID(), dto.produtos, caixas);
      this.repository.save(pedido);

      return {
        pedidoId: pedido.id,
        caixas,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  createMultiples(dto: CreateMultiplesPedidosDto): PedidoResponseDto[] {
    const resultados: PedidoResponseDto[] = [];

    for (const pedidoDto of dto.pedidos) {
      try {
        const resultado = this.create(pedidoDto);
        resultados.push(resultado);
      } catch (error) {
        throw new BadRequestException(`Erro ao processar pedido: ${error.message}`);
      }
    }

    return resultados;
  }

  findAll(): PedidoResponseDto[] {
    return this.repository.findAll().map((pedido) => ({
      pedidoId: pedido.id,
      caixas: pedido.caixas || [],
    }));
  }
}
