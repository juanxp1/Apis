import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
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
    console.log('tag-user-' + data);
    return this.accessService.findOneById(+id);
  }

  @Get('jac/:jac')
  async set(@Param('jac') jac: string): Promise<string> {
    const mockAccess = {
      id: 1,
      user: 'jacgsaw',
      password: '12345',
      email: 'alex@jacgx.com',
    };
    await this.authService.signIn(mockAccess);
    return jac;
  }
}
