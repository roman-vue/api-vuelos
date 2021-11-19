import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
