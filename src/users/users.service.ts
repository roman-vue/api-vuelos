import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs'
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { USER } from 'src/common/interfaces/models/models';
import { IUser } from 'src/common/interfaces/user.interfaces';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(USER.name) private readonly model: Model<IUser>){}
  
    public async create(userDto:UserDto){
       const hash = await this.hashPassword(userDto.password);
       const newUser = new this.model({...userDto, password:hash});
       return await newUser.save();
  }

  public async findAll(): Promise<IUser[]>{
    return this.model.find();
  }

  public async findById(idUser:string): Promise<IUser>{

    if(!idUser){
      throw new NotFoundException({msg:"You Must Insert User", status: HttpStatus.CONFLICT})
    }
    
    return await this.model.findById(idUser)
  }

  public async update(idUser: string , userDto: UserDto): Promise<IUser>{
    const validation = await this.findById(idUser);

    if(!validation){
      throw new NotFoundException({msg:"this user does not exist", status: HttpStatus.NOT_FOUND})
    }
    
    const hash = await this.hashPassword(userDto.password);
    const user = {...userDto, password: hash};
   
    return await this.model.findByIdAndUpdate(idUser, user, {new: true})
  }

  public async delete(idUser:string){
    const validation = await this.findById(idUser);

    if(!validation){
      throw new NotFoundException({msg:"this user does not exist", status: HttpStatus.NOT_FOUND})
    }
    
    await this.model.findByIdAndDelete(idUser);
    return {status: HttpStatus.OK, msg:'Delete'}
  }
  

  private async hashPassword(password: string): Promise<string>{
   const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
  }

}


