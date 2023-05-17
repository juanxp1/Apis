import { JwtService } from '@nestjs/jwt';
import { Access } from './access.entity';
import { AccessService } from './access.service';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private configService;
    constructor(usersService: AccessService, jwtService: JwtService, configService: ConfigService);
    signUp(createUserDto: Access): Promise<Access>;
    signIn(loginUserDto: Access): Promise<{
        access_token: string;
    }>;
    validateToken(token: string): Promise<any>;
    validateUser(username: string, password: string): Promise<Access | undefined>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
