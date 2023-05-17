import { Access } from './access.entity';
import { AccessService } from './access.service';
import { AuthService } from './auth.service';
export declare class AccessController {
    private readonly accessService;
    private readonly authService;
    constructor(accessService: AccessService, authService: AuthService);
    findUserId(id: string, data: Request): Promise<Access>;
    set(jac: string): Promise<string>;
}
