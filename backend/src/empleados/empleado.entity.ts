import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Solicitud } from '../solicitudes/solicitud.entity';

@Entity('empleados')
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha_ingreso: Date;

  @Column({ length: 50 })
  nombre: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  salario: number;

  @OneToMany(() => Solicitud, solicitud => solicitud.empleado)
  solicitudes: Solicitud[];
}