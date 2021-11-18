import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    
    @Post('signIn')
    async signin(@Req() req){
        return this.authService.signIn(req.user);
    }

    @Post('signUp')
    async signUp(@Body() userDto:UserDto){
        return await this.authService.signUp(userDto);
    }
}
