import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AgricultorService } from '../service/agricultor.service';
import { CreateAgricultorDto } from '../dto/create-agricultor.dto';
import { UpdateAgricultorDto } from '../dto/update-agricultor.dto';
import { QueryAgricultorDto } from '../dto/query-agricultor.dto';

@Controller('agricultores')
export class AgricultorController {
  constructor(private readonly agricultorService: AgricultorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAgricultorDto: CreateAgricultorDto) {
    return this.agricultorService.create(createAgricultorDto);
  }

  @Get()
  async findAll(@Query() queryDto: QueryAgricultorDto) {
    return this.agricultorService.findAll(queryDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.agricultorService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAgricultorDto: UpdateAgricultorDto) {
    return this.agricultorService.update(id, updateAgricultorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.agricultorService.remove(id);
  }
}