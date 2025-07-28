import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgricultorController } from './controller/agricultor.controller';
import { AgricultorService } from './service/agricultor.service';
import { AgricultorRepository } from './repository/agricultor.repository';
import { Agricultor, AgricultorSchema } from './schemas/agricultor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Agricultor.name, schema: AgricultorSchema }]),
  ],
  controllers: [AgricultorController],
  providers: [AgricultorService, AgricultorRepository],
  exports: [AgricultorService],
})
export class AgricultorModule {}