import { Inject, Injectable } from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movement } from './entities/movement.entity';
import { Repository } from 'typeorm';
import { Establishment } from 'src/establishments/entities/establishment.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';

@Injectable()
export class MovementsService {
  constructor(
    @InjectRepository(Movement)
    private movementRepository: Repository<Movement>,

    @InjectRepository(Establishment)
    private establishmentRepository: Repository<Establishment>,

    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}
  
  async create(createMovementDto: CreateMovementDto) {
    const vehicle = await this.vehicleRepository.findOneBy({ id: createMovementDto.id_vehicle });
    const establishment = await this.establishmentRepository.findOneBy({ id: createMovementDto.id_establishment });

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    if (!establishment) {
      throw new Error('Establishment not found');
    }

    const movement = this.movementRepository.create({
      id_vehicle: createMovementDto.id_vehicle,
      id_establishment: createMovementDto.id_establishment,
      dh_entry: createMovementDto.dh_entry || new Date(),
    });

    await this.movementRepository.save(movement);
    return movement;
  }

  findAll() {
    return `This action returns all movements`;
  }

  async findOne(id: string) {
    const movement = await this.movementRepository.findOneBy({ id });

    if (!movement) {
      throw new Error('Movement not found');
    }

    const establishment = await this.establishmentRepository.findOneBy({ id: movement.id_establishment });
    const vehicle = await this.vehicleRepository.findOneBy({ id: movement.id_vehicle });

    return {
      id: movement.id,
      establishment: {
        name: establishment?.name,
      },
      vehicle: {
        license_plate: vehicle?.license_plate,
        model: vehicle?.model,
        color: vehicle?.color,
      },
      dh_entry: movement.dh_entry,
      dh_exit: movement.dh_exit
    }
  }

  update(id: string, updateMovementDto: UpdateMovementDto) {
    return `This action updates a #${id} movement`;
  }

  remove(id: string) {
    return `This action removes a #${id} movement`;
  }
}
