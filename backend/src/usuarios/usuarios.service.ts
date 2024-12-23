import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const userExists = await this.usuariosRepository.findOne({
      where: { username: createUsuarioDto.username }
    });

    if (userExists) {
      throw new ConflictException('El nombre de usuario ya existe');
    }

    const usuario = this.usuariosRepository.create(createUsuarioDto);
    return await this.usuariosRepository.save(usuario);
  }

  async findByUsername(username: string): Promise<Usuario> {
    return await this.usuariosRepository.findOne({
      where: { username }
    });
  }
}