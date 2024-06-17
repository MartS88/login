import {
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {User} from '../users/user-model';
import {InjectModel} from '@nestjs/sequelize';
import {AuthUserDto} from './dto/auth-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
        private readonly jwtService: JwtService
    ) {
    }

    async login(authDto: AuthUserDto): Promise<any> {
        const user = await this.authenticateUser(authDto);
        const token = this.generateToken(user.username, user.password);
        return token

    }

    async authenticateUser(authDto: AuthUserDto): Promise<User> {
        const {username, password} = authDto;
        const user = await this.userRepository.findOne({where: {username}});

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        if (user.password !== password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }

    private generateToken(username: string, password: string): { token: string } {
        const payload = {username, password};
        return {
            token: this.jwtService.sign(payload),
        };
    }
}
