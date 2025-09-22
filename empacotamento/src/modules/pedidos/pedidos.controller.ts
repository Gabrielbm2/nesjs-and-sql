/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import {
    ApiTags,
    ApiResponse,
    ApiOperation,
    ApiSecurity,
} from '@nestjs/swagger';
import { PedidosService } from './pedidos.service';
import {
    CreatePedidoDto,
    CreateMultiplesPedidosDto,
} from './dto/create-pedido.dto';
import { PedidoResponseDto } from './dto/response-pedido.dto';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('pedidos')
@ApiSecurity('x-api-key')
@Controller('pedidos')
export class PedidosController {
    constructor(private readonly service: PedidosService) { }

    @Post()
    @MessagePattern({ cmd: 'criar_pedido' })
    @ApiOperation({ summary: 'Criar um pedido e calcular caixas' })
    @ApiResponse({ status: 201, type: PedidoResponseDto })
    create(@Body() dto: CreatePedidoDto): PedidoResponseDto {
        return this.service.create(dto);
    }

    @Post('multiplos')
    @MessagePattern({ cmd: 'criar_multiplos_pedidos' })
    @ApiOperation({
        summary: 'Criar múltiplos pedidos e calcular caixas para cada um',
    })
    @ApiResponse({ status: 201, type: [PedidoResponseDto] })
    createMultiples(@Body() dto: CreateMultiplesPedidosDto): PedidoResponseDto[] {
        return this.service.createMultiples(dto);
    }

    @Get()
    @MessagePattern({ cmd: 'listar_pedidos' })
    @ApiOperation({ summary: 'Listar todos os pedidos' })
    @ApiResponse({ status: 200, type: [PedidoResponseDto] })
    findAll(): PedidoResponseDto[] {
        return this.service.findAll();
    }
}
