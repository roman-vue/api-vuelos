import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interfaces';
import { FLIGHT } from 'src/common/interfaces/models/models';
import { FlightDto } from './dto/flight.dto';
import axios from 'axios';
import * as moment from 'moment';
import { ILocation } from 'src/common/interfaces/location.interface';
import { IWeather } from 'src/common/interfaces/weather.location';
@Injectable()
export class FlightService {
    constructor(@InjectModel(FLIGHT.name) private model: Model<IFlight>){}
    
    public async createFlight(flightDto: FlightDto):Promise<IFlight>{
        const newFlight = new this.model(flightDto);
        const save = await newFlight.save();
        return save;
    }

    public async getAllFlight():Promise<IFlight[]>{
        const find = await this.model.find().populate('passenger');

        if(find.length <= 0){
            throw new NotFoundException({msg:'there are no flight', status: HttpStatus.NOT_FOUND});
        }
        
        return find
    }
    
    public async getFligthByID(idFlight:string):Promise<IFlight>{
        const findById= await this.model.findById(idFlight).populate('passenger');
        const location:ILocation = await this.getLocation(findById.destinationCity);        
        
        const weather: IWeather[] = await this.getWeather(
            location.woeid, findById.flightDate)
        
        return this.assing(findById, weather);
    }
    
    public async deleteFligth(idFlight:string){
        const deletes =  await this.model.findByIdAndDelete(idFlight);
        return{msg: "delete", status: HttpStatus.OK}
    }
    
    public async addPassenger(idFlight:string, idPassenger:string):Promise<IFlight>{
   
        
        return await this.model.findByIdAndUpdate(idFlight,
            {
                $addToSet:{passenger:idPassenger}
            },{new:true}).populate('passenger')
            
    }
        
        
        
    private async getLocation(destinationCity:string):Promise<ILocation>{
     const {data} = await axios.get(`https://www.metaweather.com/api/location/search/?query=${destinationCity}`)
     return data[0];
    }
      
    private  async getWeather(woeid:number , flightDate:Date): Promise<IWeather[]>{
     const dateFormat = moment.utc(flightDate).format();
      
     const year = dateFormat.substring(0,4);
     const mounth = dateFormat.substring(5,7);
     const day = dateFormat.substring(8,10);
     const {data} = await axios.get(`
     https://www.metaweather.com/api/location/${woeid}/${year}/${mounth}/${day}`)

            return data
    }
     
   private assing({_id, pilot, airplane,destinationCity, flightDate, passenger}:IFlight, weather:IWeather[]): IFlight{
        return Object.assign({_id, pilot, airplane,destinationCity, flightDate, passenger, weather})
    }

}
