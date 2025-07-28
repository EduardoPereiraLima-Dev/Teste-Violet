import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CpfValidator } from '../../../common/validators/validators';

export class CreateAgricultorDto {
  @IsNotEmpty({ message: 'Nome completo é obrigatório' })
  @IsString({ message: 'Nome completo deve ser uma string' })
  @Transform(({ value }) => value?.trim())
  fullName: string;

  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @IsString({ message: 'CPF deve ser uma string' })
  @Validate(CpfValidator)
  @Transform(({ value }) => value?.replace(/[^\d]/g, ''))
  cpf: string;

  @IsOptional()
  @IsDateString({}, { message: 'Data de nascimento deve ser uma data válida' })
  birthDate?: string;

  @IsOptional()
  @IsString({ message: 'Telefone deve ser uma string' })
  phone?: string;
}