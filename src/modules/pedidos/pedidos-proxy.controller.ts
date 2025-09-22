import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { PedidosClient } from './pedidos.client';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { PedidoResponseDto } from './dto/response-pedido.dto';
import { lastValueFrom } from 'rxjs';

@ApiExcludeController()
@Controller('pedidos-proxy')
export class PedidosProxyController {
  constructor(private readonly client: PedidosClient) {}

  @Post()
  async criar(@Body() dto: CreatePedidoDto): Promise<PedidoResponseDto> {
    return await lastValueFrom(this.client.criarPedido(dto));
  }

  @Get()
  async listar(): Promise<PedidoResponseDto[]> {
    return await lastValueFrom(this.client.listarPedidos());
  }
}
