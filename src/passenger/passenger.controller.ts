import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PassengerDto } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

@Controller('api/v1/passenger')
export class PassengerController {
    constructor(readonly passengerService:PassengerService){}

    @Post()
     createPassenger(@Body() passengerDto:PassengerDto){
        return this.passengerService.createPassenger(passengerDto);
    }

    @Get()
     findAllPassenger(){
         return this.passengerService.findAllPassenger();
     }

    @Get(':idPassenger')
    finByIdPassenger(@Param('idPassenger') idPassenger: string){
      return this.passengerService.findByIdPassenger(idPassenger)
    }

    @Delete(':idPassenger')
    deletePassenger(@Param('idPassenger') idPassenger: string){
        return this.passengerService.deletePassenger(idPassenger)
    }

    @Put(':idPassenger')
    updatePassenger(@Param('idPassenger') idPassenger: string, @Body() passengerDto:PassengerDto){
        return this.passengerService.updatePassenger(idPassenger,passengerDto)
    }
    
}
