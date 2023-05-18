import { Oid } from './oid.entity';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly accessService;
    private readonly authService;
    constructor(accessService: UserService, authService: AuthService);
    findUserId(id: string, data: Request): Promise<Oid>;
    set(jac: string): Promise<string>;
}
