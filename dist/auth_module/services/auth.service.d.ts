import { JwtService } from '@nestjs/jwt';
import { Oid } from '../entity/oid.entity';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private configService;
    constructor(usersService: UserService, jwtService: JwtService, configService: ConfigService);
    signUp(createUserDto: Oid): Promise<Oid>;
    signIn(loginUserDto: Oid): Promise<{
        access_token: string;
    }>;
    validateToken(token: string): Promise<any>;
    validateUser(username: string, password: string): Promise<Oid | undefined>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
