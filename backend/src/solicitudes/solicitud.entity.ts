import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Empleado } from '../empleados/empleado.entity';

@Entity('solicitudes')
export class Solicitud {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  codigo: string;

  @Column({ length: 50 })
  descripcion: string;

  @Column({ length: 500 })
  resumen: string;

  @Column('int')
  id_empleado: number;

  @ManyToOne(() => Empleado, empleado => empleado.solicitudes)
  @JoinColumn({ name: 'id_empleado' })
  empleado: Empleado;
}