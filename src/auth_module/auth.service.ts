import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from './auth.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(createUserDto: Users): Promise<Users> {
    const hashedPassword = await bcrypt.hash(createUserDto.contrasena, 10);
    const user = {
      ...createUserDto,
      password: hashedPassword,
    };
    return this.usersService.create(user);
  }

  async signIn(loginUserDto: Users) {
    const user = await this.usersService.findByUsername(loginUserDto.usuario);
    if (!user) {
      throw new Error('User not found');
    }
    const hashedPassword = await bcrypt.hash(loginUserDto.contrasena, 10);
    console.log('Jacgsaw-u-' + loginUserDto.contrasena);
    console.log('Jacgsaw-h-' + hashedPassword);
    const isPasswordValid = await bcrypt.compare(
      loginUserDto.contrasena,
      hashedPassword,
    );
    if (!isPasswordValid) {
      console.log('Jacgsaw-c-' + user.contrasena);
      throw new Error('Invalid password');
    }
    const payload = { username: user.usuario, sub: user.id };
    console.log(
      'jacgsaw-p-' +
        this.jwtService.sign(payload, {
          secret: this.configService.get('jwt.secret'),
        }),
    );
    const isvailid = await this.validateToken(
      this.jwtService.sign(payload, {
        secret: this.configService.get('jwt.secret'),
      }),
    );
    console.log('jacgsaw-valid-' + isvailid.username);
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('jwt.secret'),
      }),
    };
  }

  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get('jwt.secret'),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Users | undefined> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.contrasena))) {
      return user;
    }
    return undefined;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
