import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstablishmentsModule } from './establishments/establishments.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { MovementsModule } from './movements/movements.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Establishment } from './establishments/entities/establishment.entity';
import { Vehicle } from './vehicles/entities/vehicle.entity';
import { Movement } from './movements/entities/movement.entity';
import { UsersModule } from './users/users.module';
import 'dotenv/config';
import { User } from './users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'admin',
    password: process.env.DB_PASSWORD,
    database: 'parking',
    entities: [Establishment, Vehicle, Movement, User],
    synchronize: true
  }),
  EstablishmentsModule, VehiclesModule, MovementsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
