import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Access } from './access.entity';
import { AccessService } from './access.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './JwtAuthGuard';

@Controller('access')
export class AccessController {
  constructor(
    @InjectRepository(Access)
    private readonly accessService: AccessService,
    private readonly authService: AuthService,
  ) {}
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findUserId(
    @Param('id') id: string,
    @Req() data: Request,
  ): Promise<Access> {
    console.log('jacgsaw-token-' + data['user'].username);
    return this.accessService.findOneById(+id);
  }

  @Get('jac/:jac')
  async set(@Param('jac') jac: string): Promise<string> {
    const mockAccess = {
      id: 1,
      idusuario: 1,
      usuario: 'alex',
      contrasena: '123',
    };
    await this.authService.signIn(mockAccess);
    return jac;
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() acceso: Acceso,
  // ): Promise<Acceso> {
  //   await this.accesoRepository.update(id, acceso);
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   return this.accesoRepository.findOne(id);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<void> {
  //   await this.accesoRepository.delete(id);
  // }
}
