import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AgricultorDocument = Agricultor & Document;

@Schema({ timestamps: true })
export class Agricultor {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  cpf: string;

  @Prop({ type: Date, required: false })
  birthDate?: Date;

  @Prop({ required: false })
  phone?: string;

  @Prop({ default: true })
  active: boolean;
}

export const AgricultorSchema = SchemaFactory.createForClass(Agricultor);

// Índices para performance
AgricultorSchema.index({ cpf: 1 });
AgricultorSchema.index({ fullName: 1 });
AgricultorSchema.index({ active: 1 });