import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>
  ) {}

  async create(createVehicleDto: CreateVehicleDto) {
    try {
      const vehicle = await this.vehicleRepository.create(createVehicleDto);
      return this.vehicleRepository.save(vehicle);
    }
    catch (error) {
      return error;
    }
  }

  async findAll() {
    return await this.vehicleRepository.find();
  }

  async findOne(id: string): Promise<Vehicle | null> {
    return await this.vehicleRepository.findOneBy({ id }) || null;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    await this.vehicleRepository.update(id, updateVehicleDto);
    return await this.vehicleRepository.findOneBy({ id });
  }

  remove(id: string) {
    this.vehicleRepository.delete(id);
  }
}
