import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiOperation({ summary: 'User register' })
  @ApiResponse({ status: 200, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UsePipes(ValidationPipe)
  @Post('/ru/data/v3/testmethods/docs/signup')
  async create(@Body() userDto: CreateUserDto, @Req() req: Request): Promise<any> {
    try {
      const token = await this.usersService.createUser(userDto);
      return { success: true, token};
    } catch (error) {
      console.log('user-registration SERVER error', error.message);
      return { success: false, error: error.message };
    }
  }




}