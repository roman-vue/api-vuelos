import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { type } from 'os';
import { PassengerService } from 'src/passenger/passenger.service';
import { FlightDto } from './dto/flight.dto';
import { FlightService } from './flight.service';

@ApiTags('Flight')
@Controller('api/v1/flight')
export class FlightController {
    constructor(private fligthService:FlightService, private passengerService: PassengerService){}
    
   @ApiResponse({type:FlightDto , status: 200}) 
    @Post()
    createFlight(@Body() flightDto:FlightDto){
      return this.fligthService.createFlight(flightDto);
    }
    
    @ApiResponse({type:FlightDto , status: 200})
    @Get()
    getAllFlight(){
        return this.fligthService.getAllFlight();
    }
    

    @Get(':idFlight')
    getFlightByID(@Param('idFlight') idFlight: string){
      return this.fligthService.getFligthByID(idFlight);
    }

    @Delete(':idFlight')
    deleteFlight(@Param('idFlight') idFlight: string){
      return this.fligthService.deleteFligth(idFlight);
    }

    @Post(':idFlight/passenger/:idPassenger')
    async addPassenger(@Param('idFlight') idFlight: string , @Param('idPassenger') idPassenger:string){
      const passenger = await this.passengerService.findByIdPassenger(idPassenger);

      if(!passenger){
        throw new HttpException('passenger not found', HttpStatus.NOT_FOUND);
      }
        return this.fligthService.addPassenger(idFlight, idPassenger);
    }
}
