import { Controller, Post, Body, Get, Param, ConflictException, NotFoundException, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './usuario.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('usuarios')
@UseGuards(JwtAuthGuard) 
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('create')
  async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      const usuario = await this.usuariosService.create(createUsuarioDto);
      return usuario;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('El nombre de usuario ya existe');
      }
      throw error;
    }
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string): Promise<Usuario> {
    const usuario = await this.usuariosService.findByUsername(username);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return usuario;
  }
}