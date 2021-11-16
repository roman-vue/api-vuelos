import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interfaces';
import { FLIGHT } from 'src/common/interfaces/models/models';
import { FlightDto } from './dto/flight.dto';

@Injectable()
export class FlightService {
    constructor(@InjectModel(FLIGHT.name) private model: Model<IFlight>){}
  
    public async createFlight(flightDto: FlightDto):Promise<IFlight>{
      const newFlight = new this.model(flightDto);
      const save = await newFlight.save();
      return save;
    }

    public async getAllFlight():Promise<IFlight[]>{
        const find = await this.model.find();

        if(find.length <= 0){
            throw new NotFoundException({msg:'there are no flight', status: HttpStatus.NOT_FOUND});
        }
        
        return find
    }

    public async getFligthByID(idFlight:string):Promise<IFlight>{
        const findById= await this.model.findById(idFlight);
        if(!findById){
            throw new NotFoundException({msg:'there are no flight', status: HttpStatus.NOT_FOUND});
        }

        return findById
    }

}
