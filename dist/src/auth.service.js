"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const access_service_1 = require("./access.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signUp(createUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.contrasena, 10);
        const user = Object.assign(Object.assign({}, createUserDto), { password: hashedPassword });
        return this.usersService.create(user);
    }
    async signIn(loginUserDto) {
        const user = await this.usersService.findByUsername(loginUserDto.usuario);
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(loginUserDto.contrasena, user.contrasena);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const payload = { username: user.usuario, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async validateUser(username, password) {
        const user = await this.usersService.findByUsername(username);
        if (user && (await bcrypt.compare(password, user.contrasena))) {
            return user;
        }
        return undefined;
    }
    async login(user) {
        const payload = { email: user.email, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [access_service_1.AccessService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map