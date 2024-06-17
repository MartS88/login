import {Body, Controller, Param, Post, Res, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {AuthService} from './auth.service';
import {AuthUserDto} from "./dto/auth-user.dto";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/ru/data/v3/testmethods/docs/login')
    async login(@Body() authDto: AuthUserDto) {
        try {
            const user = await this.authService.login(authDto)
            return {success: true, user}
        } catch (error) {
            console.error('back error', error);
            return {success: false, error: error.message};
        }
    }


}
