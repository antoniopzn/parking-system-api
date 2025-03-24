import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Establishment } from 'src/establishments/entities/establishment.entity';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Establishment)
    private establishmentRepository: Repository<Establishment>,
  ) { }

  async create(createUserDto: CreateUserDto) {

    const establishment = await this.establishmentRepository.findOneBy({ id: createUserDto.id_establishment });

    if (!establishment) {
      throw new NotFoundException('Establishment not found');
    }
    const user = await this.userRepository.create({
      id_establishment: createUserDto.id_establishment,
      username: createUserDto.username,
      password: hashSync(createUserDto.password, 10),
    });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id });
  }
}
