import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FlightDto } from './dto/flight.dto';
import { FlightService } from './flight.service';

@Controller('api/v1/flight')
export class FlightController {
    constructor(private fligthService:FlightService){}

    @Post()
    createFlight(@Body() flightDto:FlightDto){
      return this.fligthService.createFlight(flightDto);
    }

    @Get()
    getAllFlight(){
        return this.fligthService.getAllFlight();
    }

    @Get(':idFlight')
    getFligthByID(@Param('idFlight') idFlight: string){
      return this.fligthService.getFligthByID(idFlight);
    }
}
