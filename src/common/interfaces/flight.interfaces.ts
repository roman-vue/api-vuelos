import { IPassenger } from "./passenger.interfaces";
import { IWeather } from "./weather.location";

export interface IFlight extends Document {
     _id?:string,
     pilot: string;
     airplane:string;
     destinationCity:string;
     flightDate:Date;
     passenger: IPassenger[];
     weather: IWeather[];

}
