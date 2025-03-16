import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstablishmentsModule } from './establishments/establishments.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { MovementsModule } from './movements/movements.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Establishment } from './establishments/entities/establishment.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'admin',
    password: 'P@ss2025',
    database: 'parking',
    entities: [Establishment],
    synchronize: true
  }),
  EstablishmentsModule, VehiclesModule, MovementsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
