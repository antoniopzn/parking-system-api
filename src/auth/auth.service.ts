import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './dto/auth.dto';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        this.jwtExpirationTimeInSeconds = this.configService.get<number>('JWT_EXPIRATION_TIME') || 3600;
    }

    signIn(username: string, password: string): AuthResponseDto {
        const foundUser = this.usersService.findByUsername(username);

        if (!foundUser || !compareSync(password, foundUser.password)) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: foundUser.username, sub: foundUser.id };

        const token = this.jwtService.sign(payload);

        return {
            token, expiresIn: this.jwtExpirationTimeInSeconds,
        }
    }
}
