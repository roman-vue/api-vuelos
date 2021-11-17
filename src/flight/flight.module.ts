import { Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FLIGHT } from 'src/common/interfaces/models/models';
import { FlightSchema } from './schema/flight.schema';
import { PassengerModule } from 'src/passenger/passenger.module';

@Module({
  imports:[MongooseModule.forFeatureAsync([
    {
      name: FLIGHT.name,
      useFactory: ()=> FlightSchema.plugin(require('mongoose-autopopulate'))
    }
  ]),
   PassengerModule
  ],
  providers: [FlightService],
  controllers: [FlightController]
})
export class FlightModule {}
