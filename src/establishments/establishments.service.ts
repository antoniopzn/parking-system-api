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
    const establishment = await this.establishmentRepository.create(createEstablishmentDto);
    return await this.establishmentRepository.save(establishment);
  }

  async findAll() {
    const establishment = await this.establishmentRepository.find();
    return establishment;
  }

  async findOne(id: string): Promise<Establishment | null> {
    const establishment = await this.establishmentRepository.findOneBy({ id });
    return establishment || null;
  }

  update(id: number, updateEstablishmentDto: UpdateEstablishmentDto) {
    return `This action updates a #${id} establishment`;
  }

  remove(id: number) {
    return `This action removes a #${id} establishment`;
  }
}
