import { IsString, IsOptional, IsDateString, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateAgricultorDto {
  @IsOptional()
  @IsString({ message: 'Nome completo deve ser uma string' })
  @Transform(({ value }) => value?.trim())
  fullName?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Data de nascimento deve ser uma data válida' })
  birthDate?: string;

  @IsOptional()
  @IsString({ message: 'Telefone deve ser uma string' })
  phone?: string;

  @IsOptional()
  @IsBoolean({ message: 'Active deve ser um boolean' })
  active?: boolean;
}