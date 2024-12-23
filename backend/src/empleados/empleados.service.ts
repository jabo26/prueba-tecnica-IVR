import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private empleadosRepository: Repository<Empleado>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    
      if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(createEmpleadoDto.nombre.trim())) {
        throw new BadRequestException('El nombre solo puede contener letras y espacios');
      }  
      
      if (createEmpleadoDto.salario <= 0 || createEmpleadoDto.salario > 999999999.99) {
        throw new BadRequestException('Salario fuera de rango válido');
      }  
      
      const fechaIngreso = new Date(createEmpleadoDto.fecha_ingreso);
      if (isNaN(fechaIngreso.getTime()) || fechaIngreso > new Date()) {
        throw new BadRequestException('Fecha de ingreso inválida');
      }
  
      try {        
        const result = await this.empleadosRepository
          .createQueryBuilder()
          .insert()
          .into(Empleado)
          .values({
            nombre: createEmpleadoDto.nombre.trim(),
            fecha_ingreso: fechaIngreso,
            salario: createEmpleadoDto.salario
          })
          .returning('*')
          .execute();
  
        return result.raw[0];
      } catch (error) {
      
        if (error.code === '23505') { 
          throw new ConflictException('Ya existe un empleado con estos datos');
        }
        throw new InternalServerErrorException('Error al crear el empleado');
      }
  }

  async findAll(): Promise<Empleado[]> {
    return this.empleadosRepository
    .createQueryBuilder('empleado')
    .select([
      'empleado.id',
      'empleado.nombre',
      'empleado.fecha_ingreso',
      'empleado.salario'
    ])
    .getMany();
  }

  async findOne(id: number): Promise<Empleado> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestException('ID inválido');
    }

    const empleado = await this.empleadosRepository
      .createQueryBuilder('empleado')
      .leftJoinAndSelect('empleado.solicitudes', 'solicitudes')
      .where('empleado.id = :id', { id })
      .getOne();

    if (!empleado) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    }

    return empleado;
  }
}