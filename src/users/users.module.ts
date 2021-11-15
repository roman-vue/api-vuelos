import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {MongooseModule} from '@nestjs/mongoose'
import {USER} from '../common/interfaces/models/models'
import { UserSchema } from './schema/user.schema';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([{
      name: USER.name,
      useFactory:()=>{
        return UserSchema;
      }
    }])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
