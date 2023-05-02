import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Access } from './access.entity';
import * as bcrypt from 'bcrypt';
import { AccessService } from './access.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: AccessService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: Access): Promise<Access> {
    const hashedPassword = await bcrypt.hash(createUserDto.contrasena, 10);
    const user = {
      ...createUserDto,
      password: hashedPassword,
    };
    return this.usersService.create(user);
  }

  async signIn(loginUserDto: Access) {
    const user = await this.usersService.findByUsername(loginUserDto.usuario);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(
      loginUserDto.contrasena,
      user.contrasena,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const payload = { username: user.usuario, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Access | undefined> {
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
