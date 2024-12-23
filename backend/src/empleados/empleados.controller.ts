import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { Empleado } from './empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';'';

@Controller('empleados')
@UseGuards(JwtAuthGuard) 
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) {}

  @Post()
  create(@Body() createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    return this.empleadosService.create(createEmpleadoDto);
  }

  @Get()
  findAll(): Promise<Empleado[]> {
    return this.empleadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Empleado> {
    return this.empleadosService.findOne(id);
  }
}