import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { PedidoResponseDto } from './dto/response-pedido.dto';

@Controller()
export class PedidosMicroController {
  constructor(private readonly service: PedidosService) {}

  @MessagePattern({ cmd: 'criar_pedido' })
  createPedido(data: CreatePedidoDto): PedidoResponseDto {
    return this.service.create(data);
  }

  @MessagePattern({ cmd: 'listar_pedidos' })
  listarPedidos(): PedidoResponseDto[] {
    return this.service.findAll();
  }
}
