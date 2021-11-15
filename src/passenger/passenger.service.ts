import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PASSENGER } from 'src/common/interfaces/models/models';
import { IPassenger } from 'src/common/interfaces/passenger.interfaces';
import { PassengerDto } from './dto/passenger.dto';


@Injectable()
export class PassengerService {
    constructor(@InjectModel(PASSENGER.name)  private readonly model: Model<IPassenger>){}

    public async createPassenger(passengerDto:PassengerDto):Promise<IPassenger>{
      const newPassenger = new this.model(passengerDto)
        const save = await newPassenger.save();  
      return save
    }

    public async findAllPassenger(): Promise<IPassenger[]>{
        const find = await this.model.find();
        if(find.length < 0){
            throw new NotFoundException({msg:'there are no passengers', status: HttpStatus.NOT_FOUND});
        }
        return find;
    }

    public async findByIdPassenger(idPassenger:string): Promise<IPassenger>{
      const passengerId = await this.model.findById(idPassenger);

      if(!passengerId){
        throw new NotFoundException({msg:'there are no passengers', status: HttpStatus.NOT_FOUND});
      }

      return passengerId;
    }

    public async deletePassenger(idPassenger: string){
          const deletePassenger = await this.model.findByIdAndDelete(idPassenger);

          if(!deletePassenger){
            throw new NotFoundException({msg:'there are no passengers', status: HttpStatus.NOT_FOUND});
          }
        
          return {msg: "delete", status:HttpStatus.OK}
    }

}
