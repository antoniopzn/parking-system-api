import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';

@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Post()
  create(@Body() createMovementDto: CreateMovementDto) {
    return this.movementsService.create(createMovementDto);
  }

  @Get()
  findAll() {
    return this.movementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movementsService.findOne(id);
  }

  @Put(':id/exit')
  update(@Param('id') id: string, @Body() updateMovementDto: UpdateMovementDto) {
    return this.movementsService.update(id, updateMovementDto);
  }

  @Get('summary/:establishmentId')
  summary(@Param('establishmentId') establishmentId: string) {
    return this.movementsService.summary(establishmentId);
  }

  @Get('summary/:establishmentId/hour')
  summaryHour(@Param('establishmentId') establishmentId: string) {
    return this.movementsService.summaryHour(establishmentId);
  }

  @Get('report/:id')
  report(@Param('id') id: string) {
    return this.movementsService.report(id);
  }
}
