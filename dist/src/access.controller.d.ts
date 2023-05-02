import { Access } from './access.entity';
import { AccessService } from './access.service';
export declare class AccessController {
    private readonly accessService;
    constructor(accessService: AccessService);
    findUserId(id: string): Promise<Access>;
    set(jac: string): Promise<string>;
}
