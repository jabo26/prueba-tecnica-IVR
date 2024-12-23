import { IsNotEmpty, IsString, IsNumber, IsDateString, Length, Min, Max, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateEmpleadoDto {
  @IsDateString()
  @IsNotEmpty()
  fecha_ingreso: Date;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @Transform(({ value }) => value.trim())
  @Matches(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios'
  })
  nombre: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(999999999.99)
  salario: number;
}