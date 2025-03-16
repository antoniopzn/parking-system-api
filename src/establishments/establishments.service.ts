import { Injectable } from '@nestjs/common';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Establishment } from './entities/establishment.entity';

@Injectable()
export class EstablishmentsService {
  constructor (
    @InjectRepository(Establishment)
    private establishmentRepository: Repository<Establishment>
  ) {}
  async create(createEstablishmentDto: CreateEstablishmentDto) {
    const establishment = await this.establishmentRepository.save(createEstablishmentDto);
    return establishment;
  }

  findAll() {
    return `This action returns all establishments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} establishment`;
  }

  update(id: number, updateEstablishmentDto: UpdateEstablishmentDto) {
    return `This action updates a #${id} establishment`;
  }

  remove(id: number) {
    return `This action removes a #${id} establishment`;
  }
}
