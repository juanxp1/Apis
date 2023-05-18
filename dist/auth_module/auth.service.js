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
const user_service_1 = require("./user.service");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signUp(createUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = Object.assign(Object.assign({}, createUserDto), { password: hashedPassword });
        return this.usersService.create(user);
    }
    async signIn(loginUserDto) {
        const user = await this.usersService.findByUsername(loginUserDto.user);
        if (!user) {
            throw new Error('User not found');
        }
        const hashedPassword = await bcrypt.hash(loginUserDto.password, 10);
        console.log('tag-p-' + loginUserDto.password);
        console.log('tag-h-' + hashedPassword);
        const isPasswordValid = await bcrypt.compare(loginUserDto.password, hashedPassword);
        if (!isPasswordValid) {
            console.log('tag-p-' + user.password);
            throw new Error('Invalid password');
        }
        const payload = { username: user.user, sub: user.id };
        console.log('tag-jwt-' +
            this.jwtService.sign(payload, {
                secret: this.configService.get('jwt.secret'),
            }));
        const isValid = await this.validateToken(this.jwtService.sign(payload, {
            secret: this.configService.get('jwt.secret'),
        }));
        console.log('jacgsaw-valid-' + isValid.username);
        return {
            access_token: this.jwtService.sign(payload, {
                secret: this.configService.get('jwt.secret'),
            }),
        };
    }
    async validateToken(token) {
        try {
            return this.jwtService.verify(token, {
                secret: this.configService.get('jwt.secret'),
            });
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async validateUser(username, password) {
        const user = await this.usersService.findByUsername(username);
        if (user && (await bcrypt.compare(password, user.password))) {
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
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map