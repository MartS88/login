import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from "class-validator";


export class AuthUserDto {
    @ApiProperty({example: 'user@gmail.com', description: 'Email'})
    @IsString({message: 'Value must be string'})
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({example: 'Signed message', description: 'Signature from MetaMask'})
    @IsString({message: 'wallet must be string'})
    @IsNotEmpty()
    password: string;

}
