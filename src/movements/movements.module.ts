import { Module } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { MovementsController } from './movements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movement } from './entities/movement.entity';
import { VehiclesController } from 'src/vehicles/vehicles.controller';
import { EstablishmentsController } from 'src/establishments/establishments.controller';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { EstablishmentsService } from 'src/establishments/establishments.service';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Establishment } from 'src/establishments/entities/establishment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movement, Vehicle, Establishment])],
  controllers: [MovementsController, VehiclesController, EstablishmentsController],
  providers: [MovementsService, VehiclesService, EstablishmentsService],
})
export class MovementsModule {}
