import { IPassenger } from "./passenger.interfaces";

export interface IFlight extends Document {
     pilot: string;
     airplane:string;
     destinationCity:string;
    flightDate:Date;
    passenger: IPassenger;
}
