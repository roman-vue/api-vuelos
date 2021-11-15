import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('api/v1/user')
export class UsersController {
    constructor(private readonly userService: UsersService){}
   @Post()
   create(@Body() userDto:UserDto){
     return this.userService.create(userDto)
   }

   @Get()
   findall(){
       return this.userService.findAll()
   }

   @Get(':idUser')
   findById(@Param('idUser') idUser: string){
       return this.userService.findById(idUser);
   }

   @Put(':idUser')
   update(@Param('idUser') idUser: string, @Body()userDto: UserDto){
     return this.userService.update(idUser, userDto)
   }
   
   @Delete(':idUser')
   delete(@Param('idUser') idUser:string){
       return this.userService.delete(idUser)
   }
}
