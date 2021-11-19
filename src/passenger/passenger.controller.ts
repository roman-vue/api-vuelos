import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PassengerDto } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';
@ApiTags('Passenger')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
