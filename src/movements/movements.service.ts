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
  ) { }

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

  async findAll() {
    const movement = await this.movementRepository.find();

    if (!movement) {
      throw new Error('Movement not found');
    }

    const movementDetails = await Promise.all(movement.map(async (movement) => {
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
    }));

    return movementDetails;
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

  async update(id: string, updateMovementDto: UpdateMovementDto) {
    const movement = this.movementRepository.create({
      dh_exit: updateMovementDto.dh_exit || new Date(),
    });

    await this.movementRepository.update(id, movement);

    return await this.movementRepository.findOneBy({ id });
  }

  remove(id: string) {
    return `This action removes a #${id} movement`;
  }

  async summary(establishmentId: string) {
    const movements = await this.movementRepository.findBy({ id_establishment: establishmentId });

    if (!movements.length) {
      throw new Error('Movements not found');
    }

    const establishment = await this.establishmentRepository.findOneBy({ id: establishmentId });

    const movementDetails = await Promise.all(movements.map(async (movement) => {
      const vehicle = await this.vehicleRepository.findOneBy({ id: movement.id_vehicle });

      return {
        dh_entry: movement.dh_entry,
        dh_exit: movement.dh_exit,
        vehicle: {
          license_plate: vehicle?.license_plate,
          model: vehicle?.model,
          color: vehicle?.color,
        },
      };
    }));

    return {
      establishment: {
        name: establishment?.name,
      },
      movements: movementDetails,
    };
  }

  async summaryHour(establishmentId: string) {
    const movements = await this.movementRepository.findBy({ id_establishment: establishmentId });

    if (!movements.length) {
      throw new Error('Movements not found');
    }

    const hourlySummary = movements.reduce((summary, movement) => {
      const hour = movement.dh_entry.getHours();
      if (!summary[hour]) {
        summary[hour] = 0;
      }
      summary[hour]++;
      return summary;
    }, {});

    return hourlySummary;
  }

  async report(establishmentId: string) {
    const movements = await this.movementRepository.findBy({ id_establishment: establishmentId });

    if (!movements.length) {
      throw new Error('Movements not found');
    }

    const establishment = await this.establishmentRepository.findOneBy({ id: establishmentId });

    const report = movements.map(movement => ({
      dh_entry: movement.dh_entry,
      dh_exit: movement.dh_exit,
      vehicle: {
        id: movement.id_vehicle,
      },
    }));

    return {
      establishment: {
        name: establishment?.name,
      },
      report,
    };
  }

}
