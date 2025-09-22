import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { PedidoResponseDto } from './dto/response-pedido.dto';
import { PedidosClient } from './pedidos.client';
import { lastValueFrom } from 'rxjs';

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
