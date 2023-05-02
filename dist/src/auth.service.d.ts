import { JwtService } from '@nestjs/jwt';
import { Access } from './access.entity';
import { AccessService } from './access.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: AccessService, jwtService: JwtService);
    signUp(createUserDto: Access): Promise<Access>;
    signIn(loginUserDto: Access): Promise<{
        access_token: string;
    }>;
    validateUser(username: string, password: string): Promise<Access | undefined>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
