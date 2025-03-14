import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstablishmentsModule } from './establishments/establishments.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { MovementsModule } from './movements/movements.module';

@Module({
  imports: [EstablishmentsModule, VehiclesModule, MovementsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
