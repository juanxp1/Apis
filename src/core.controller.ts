import { Controller, Get, Param } from '@nestjs/common';
@Controller('core')
export class CoreController {
  @Get(':jac')
  async set(@Param('jac') jac: string): Promise<string> {
    return jac;
  }
}
