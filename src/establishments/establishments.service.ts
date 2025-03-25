import { Injectable, ConflictException } from '@nestjs/common';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Establishment } from './entities/establishment.entity';

@Injectable()
export class EstablishmentsService {
  constructor(
    @InjectRepository(Establishment)
    private establishmentRepository: Repository<Establishment>,
  ) {}

  async create(createEstablishmentDto: CreateEstablishmentDto) {
    try {
      const establishment = this.establishmentRepository.create(
        createEstablishmentDto,
      );
      return await this.establishmentRepository.save(establishment);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('CNPJ already exists');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.establishmentRepository.find();
  }

  async findOne(id: string): Promise<Establishment | null> {
    return (await this.establishmentRepository.findOneBy({ id })) || null;
  }

  async update(id: string, updateEstablishmentDto: UpdateEstablishmentDto) {
    await this.establishmentRepository.update(id, updateEstablishmentDto);
    return this.establishmentRepository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.establishmentRepository.delete(id);
  }
}
