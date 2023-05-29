import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Oid } from './oid.entity';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(Oid)
    private readonly accessService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Get(':id')
  @UseGuards(JwtGuard)
  async findUserId(
    @Param('id') id: string,
    @Req() data: Request,
  ): Promise<Oid> {
    console.log('tag-user-' + data['user'].auth);
    return this.accessService.findOneById(+id);
  }

  @Post('create')
  @UseGuards(JwtGuard)
  async setNewUser(@Body() user: Oid): Promise<Oid> {
    return this.authService.signUp(user);
  }

  @Post('login')
  async getLogin(@Body() user: Oid): Promise<{ access_token: string }> {
    return this.authService.signIn(user);
  }
}
