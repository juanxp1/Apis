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
import { Oid } from '../entity/oid.entity';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { JwtGuard } from '../jwt.guard';
import { OidDto } from '../dto/oid.dto';

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
  async setNewUser(@Body() user: OidDto): Promise<Oid> {
    const userDto = Oid.mapToDto(user);
    return this.authService.signUp(userDto);
  }

  @Post('login')
  async getLogin(@Body() user: Oid): Promise<{ access_token: string }> {
    const userDto = Oid.mapToDto(user);
    return this.authService.signIn(userDto);
  }
}
