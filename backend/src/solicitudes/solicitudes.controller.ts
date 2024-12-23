import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { Solicitud } from './solicitud.entity';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('solicitudes')
@UseGuards(JwtAuthGuard) 
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudesService) {}

  @Post()
  create(@Body() createSolicitudDto: CreateSolicitudDto): Promise<Solicitud> {
    return this.solicitudesService.create(createSolicitudDto);
  }

  @Get()
  findAll(): Promise<Solicitud[]> {
    return this.solicitudesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Solicitud> {
    return this.solicitudesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.solicitudesService.remove(id);
  }
}