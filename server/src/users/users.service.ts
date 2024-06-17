import {CreateUserDto} from './dto/create-user.dto';
import {User} from './user-model';
import {InjectModel} from '@nestjs/sequelize';
import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private readonly jwtService: JwtService
    ) {
    }

    async createUser(dto: CreateUserDto) {
        try {

            const existingUser = await this.getUserByUsername(dto.username);
            if (dto.password !== 'password') {
                throw new BadRequestException('Password must be "password"');
            }
            if (existingUser) {
                throw new BadRequestException('User with this username already exists.');
            }
            const newUser = await this.userRepository.create(dto);
            const token = this.generateToken(newUser.username);
            return token


        } catch (error) {
            console.error('Error creating user:', error);
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to create user');
        }
    }

    async getUserByUsername(username: string) {
        const user = await this.userRepository.findOne({where: {username}, include: {all: true}});
        return user;
    }

    private generateToken(username: string): string {
        const payload = {username};
        return this.jwtService.sign(payload);
    }
}
