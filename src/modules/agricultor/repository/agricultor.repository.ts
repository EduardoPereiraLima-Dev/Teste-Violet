import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, SortOrder } from 'mongoose';

import { Agricultor, AgricultorDocument } from '../schemas/agricultor.schema';
import { CreateAgricultorDto } from '../dto/create-agricultor.dto';
import { UpdateAgricultorDto } from '../dto/update-agricultor.dto';
import { QueryAgricultorDto } from '../dto/query-agricultor.dto';

@Injectable()
export class AgricultorRepository {
  constructor(
    @InjectModel(Agricultor.name)
    private readonly agricultorModel: Model<AgricultorDocument>,
  ) {}

  async create(createDto: CreateAgricultorDto): Promise<AgricultorDocument> {
    const created = new this.agricultorModel(createDto);
    return created.save();
  }

  async findAll(queryDto: QueryAgricultorDto): Promise<{ data: AgricultorDocument[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      fullName,
      cpf,
      active,
    } = queryDto;

    const query: FilterQuery<AgricultorDocument> = this.buildFilters({ fullName, cpf, active });

    const skip = (page - 1) * limit;
    const sort: Record<string, SortOrder> = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [data, total] = await Promise.all([
      this.agricultorModel.find(query).sort(sort).skip(skip).limit(limit).exec(),
      this.agricultorModel.countDocuments(query).exec(),
    ]);

    return { data, total };
  }

  async findOne(id: string): Promise<AgricultorDocument | null> {
    return this.agricultorModel.findById(id).exec();
  }

  async findByCpf(cpf: string): Promise<AgricultorDocument | null> {
    return this.agricultorModel.findOne({ cpf }).exec();
  }

  async update(id: string, updateDto: UpdateAgricultorDto): Promise<AgricultorDocument | null> {
    return this.agricultorModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async remove(id: string): Promise<AgricultorDocument | null> {
    return this.agricultorModel.findByIdAndDelete(id).exec();
  }

  async existsByCpf(cpf: string): Promise<boolean> {
    const count = await this.agricultorModel.countDocuments({ cpf }).exec();
    return count > 0;
  }

  // Método privado para centralizar filtros reutilizáveis
  private buildFilters(filters: Partial<Pick<QueryAgricultorDto, 'fullName' | 'cpf' | 'active'>>): FilterQuery<AgricultorDocument> {
    const query: FilterQuery<AgricultorDocument> = {};

    if (filters.fullName) {
      query.fullName = { $regex: filters.fullName, $options: 'i' };
    }

    if (filters.cpf) {
      query.cpf = filters.cpf;
    }

    if (typeof filters.active === 'boolean') {
      query.active = filters.active;
    }

    return query;
  }
}
