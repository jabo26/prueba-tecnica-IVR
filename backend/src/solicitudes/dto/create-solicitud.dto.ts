import { IsNotEmpty, IsString, IsNumber, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSolicitudDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  @Matches(/^[A-Za-z0-9\-\_]+$/, {
    message: 'El código solo puede contener letras, números, guiones y guiones bajos'
  })
  @Transform(({ value }) => value.trim())
  codigo: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  @Transform(({ value }) => value.trim())
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 500)
  @Transform(({ value }) => value.trim())
  resumen: string;

  @IsNumber()
  @IsNotEmpty()
  id_empleado: number;
}