import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, Length} from 'class-validator';

export class CreateUserDto {

    @ApiProperty({example: 'user1', description: 'Username'})
    @IsString({message: 'Username must be string'})
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({example: 'dexter', description: 'Password'})
    @IsString({message: 'Name must be string'})
    @IsNotEmpty()
    readonly password: string;


}
