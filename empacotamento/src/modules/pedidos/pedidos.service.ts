import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { PedidoResponseDto } from './dto/response-pedido.dto';
import { PedidoEntity } from './entities/pedido.entity';
import { PedidosRepository } from './repositories/pedido.repository';
import { randomUUID } from 'crypto';
import { empacotarProdutos } from './domain/empacotar.domain';

@Injectable()
export class PedidosService {
  constructor(private readonly repository: PedidosRepository) {}

  create(dto: CreatePedidoDto): PedidoResponseDto {
    const pedido = new PedidoEntity(randomUUID(), dto.produtos);
    this.repository.save(pedido);

    try {
      const caixas = empacotarProdutos(pedido.produtos);

      return {
        pedidoId: pedido.id,
        caixas,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll(): PedidoResponseDto[] {
    return this.repository.findAll().map((pedido) => {
      const caixas = empacotarProdutos(pedido.produtos);

      return {
        pedidoId: pedido.id,
        caixas,
      };
    });
  }
}
