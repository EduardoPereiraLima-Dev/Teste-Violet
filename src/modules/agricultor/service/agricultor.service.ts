import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AgricultorRepository } from '../repository/agricultor.repository';
import { CreateAgricultorDto } from '../dto/create-agricultor.dto';
import { UpdateAgricultorDto } from '../dto/update-agricultor.dto';
import { QueryAgricultorDto } from '../dto/query-agricultor.dto';
import { AgricultorDocument } from '../schemas/agricultor.schema';

@Injectable()
export class AgricultorService {
  constructor(private readonly agricultorRepository: AgricultorRepository) {}

  async create(createAgricultorDto: CreateAgricultorDto): Promise<AgricultorDocument> {
    // RN2 - CPF único
    const existingAgricultor = await this.agricultorRepository.findByCpf(createAgricultorDto.cpf);
    if (existingAgricultor) {
      throw new ConflictException('Já existe um agricultor cadastrado com este CPF');
    }

    return this.agricultorRepository.create(createAgricultorDto);
  }

  async findAll(queryDto: QueryAgricultorDto) {
    const { data, total } = await this.agricultorRepository.findAll(queryDto);
    
    return {
      data,
      pagination: {
        total,
        page: queryDto.page,
        limit: queryDto.limit,
        totalPages: Math.ceil(total / queryDto.limit),
      },
    };
  }

  async findOne(id: string): Promise<AgricultorDocument> {
    const agricultor = await this.agricultorRepository.findOne(id);
    if (!agricultor) {
      throw new NotFoundException('Agricultor não encontrado');
    }
    return agricultor;
  }

  async update(id: string, updateAgricultorDto: UpdateAgricultorDto): Promise<AgricultorDocument> {
    // RN4 - Não permitir alteração do CPF
    if ('cpf' in updateAgricultorDto) {
      throw new BadRequestException('CPF não pode ser modificado após o cadastro');
    }

    const agricultor = await this.agricultorRepository.update(id, updateAgricultorDto);
    if (!agricultor) {
      throw new NotFoundException('Agricultor não encontrado');
    }
    return agricultor;
  }

  async remove(id: string): Promise<void> {
    const agricultor = await this.findOne(id);
    
    // RN5 - Só permitir exclusão se active for false
    if (agricultor.active) {
      throw new BadRequestException('Só é possível excluir agricultores inativos. Desative o agricultor primeiro.');
    }

    await this.agricultorRepository.remove(id);
  }
}