import { OidDto } from '../dto/oid.dto';
export declare class Oid {
    id: number;
    user: string;
    password: string;
    email: string;
    static mapToDto(userDto: OidDto): Oid;
}
