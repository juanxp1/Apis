import { Controller, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Access } from './access.entity';
import { AccessService } from './access.service';


@Controller('access')
export class AccessController {
  constructor(
    @InjectRepository(Access)
    private readonly accessService: AccessService,
  ) {}
  @Get(':id')
  async findUserId(@Param('id') id: string): Promise<Access> {
    return this.accessService.findOneById(+id);
  }

  @Get('jac/:jac')
  async set(@Param('jac') jac: string): Promise<string> {
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
