import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudesController } from './solicitudes.controller';
import { SolicitudesService } from './solicitudes.service';
import { Solicitud } from './solicitud.entity';
import { EmpleadosModule } from '../empleados/empleados.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Solicitud]),
    EmpleadosModule
  ],
  controllers: [SolicitudesController],
  providers: [SolicitudesService],
})
export class SolicitudesModule {}