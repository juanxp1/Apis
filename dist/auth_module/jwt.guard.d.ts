import { ExecutionContext } from '@nestjs/common';
import { AuthService } from './services/auth.service';
declare const JwtGuard_base: any;
export declare class JwtGuard extends JwtGuard_base {
    private readonly authService;
    constructor(authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
