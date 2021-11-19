import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    
    @UseGuards(LocalAuthGuard)
    @ApiBody({type: SignInDto})
    @Post('signIn')
    async signin(@Req() req){
        return await this.authService.signIn(req.user);
    }

    @Post('signUp')
    async signUp(@Body() userDto:UserDto){
        return await this.authService.signUp(userDto);
    }
}
