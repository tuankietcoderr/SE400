import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { AssetService } from './asset.service';
import { Roles } from 'src/common/decorators';
import { ERole } from 'src/common/enum';
import { SuccessResponse } from 'src/common/responses';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Roles([ERole.ADMIN])
  @Get()
  async getAllAdminAssets() {
    return new SuccessResponse(await this.assetService.getAllAdminAssets());
  }
}
