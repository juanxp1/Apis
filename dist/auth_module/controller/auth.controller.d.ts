import { Oid } from '../entity/oid.entity';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { OidDto } from '../dto/oid.dto';
export declare class AuthController {
    private readonly accessService;
    private readonly authService;
    constructor(accessService: UserService, authService: AuthService);
    findUserId(id: string, data: Request): Promise<Oid>;
    setNewUser(user: OidDto): Promise<Oid>;
    getLogin(user: Oid): Promise<{
        access_token: string;
    }>;
}
