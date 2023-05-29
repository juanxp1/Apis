import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Oid } from './oid.entity';
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

  async signUp(createUserDto: Oid): Promise<Oid> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = {
      ...createUserDto,
      password: hashedPassword,
    };
    return this.usersService.create(user);
  }

  async signIn(loginUserDto: Oid) {
    const user = await this.usersService.findByUsername(loginUserDto.user);
    if (!user) {
      throw new Error('User not found');
    }
    const hashedPassword = await bcrypt.hash(loginUserDto.password, 10);
    console.log('tag-p-' + loginUserDto.password);
    console.log('tag-h-' + hashedPassword);
    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      hashedPassword,
    );
    if (!isPasswordValid) {
      console.log('tag-p-' + user.password);
      throw new Error('Invalid password');
    }
    const payload = { auth: user.user, sub: user.id };
    console.log(
      'tag-jwt-' +
        this.jwtService.sign(payload, {
          secret: this.configService.get('jwt.secret'),
        }),
    );
    const isValid = await this.validateToken(
      this.jwtService.sign(payload, {
        secret: this.configService.get('jwt.secret'),
      }),
    );
    console.log('jacgsaw-valid-' + isValid.username);
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
  ): Promise<Oid | undefined> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
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
