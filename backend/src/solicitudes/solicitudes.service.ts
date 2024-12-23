import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solicitud } from './solicitud.entity';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { EmpleadosService } from '../empleados/empleados.service';

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectRepository(Solicitud)
    private solicitudesRepository: Repository<Solicitud>,
    private empleadosService: EmpleadosService,
  ) { }

  async create(createSolicitudDto: CreateSolicitudDto): Promise<Solicitud> {

    if (!/^[A-Za-z0-9\-\_]+$/.test(createSolicitudDto.codigo)) {
      throw new BadRequestException('Formato de código inválido');
    }
    // Verificar que el empleado existe
    await this.empleadosService.findOne(createSolicitudDto.id_empleado);

    const solicitud = await this.solicitudesRepository
      .createQueryBuilder()
      .insert()
      .into(Solicitud)
      .values({
        codigo: createSolicitudDto.codigo,
        descripcion: createSolicitudDto.descripcion,
        resumen: createSolicitudDto.resumen,
        id_empleado: createSolicitudDto.id_empleado
      })
      .returning('*')
      .execute();

    return solicitud.raw[0];
  }

  async findAll(): Promise<Solicitud[]> {
    return this.solicitudesRepository
      .createQueryBuilder('solicitud')
      .leftJoinAndSelect('solicitud.empleado', 'empleado')
      .select([
        'solicitud.id',
        'solicitud.codigo',
        'solicitud.descripcion',
        'solicitud.resumen',
        'empleado.id',
        'empleado.nombre'
      ])
      .getMany();
  }

  async findOne(id: number): Promise<Solicitud> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestException('ID inválido');
    }

    const solicitud = await this.solicitudesRepository
      .createQueryBuilder('solicitud')
      .leftJoinAndSelect('solicitud.empleado', 'empleado')
      .where('solicitud.id = :id', { id })
      .getOne();

    if (!solicitud) {
      throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
    }

    return solicitud;
  }

  async remove(id: number): Promise<void> {
    const result = await this.solicitudesRepository
      .createQueryBuilder()
      .delete()
      .from(Solicitud)
      .where('id = :id', { id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
    }
  }
}