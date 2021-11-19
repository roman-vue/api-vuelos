import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
    
    constructor(private readonly userService: UsersService , 
        private readonly jwtService:JwtService){}

    async validateUser(username:string, password:string):Promise<any> {
      const user = await this.userService.finByUserName(username);
    
      const isValidpassword = await this.userService.checkPassword(password, user.password)
      

      if(user && isValidpassword){
          return user;
      }
      
      return null;
    }

    public async signIn(user:any){
       
        const payload = {
            username: user.username,
            sub: user._id
        }
        
    return {access_token: this.jwtService.sign(payload)}

    }

    public async signUp(userDto:UserDto){
        return this.userService.create(userDto)
    }
}
