import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { AssetService } from './asset.service';
import { Roles } from 'src/common/decorators';
import { ERole } from 'src/common/enum';
import { PaginateResponse } from 'src/common/responses';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Roles([ERole.ADMIN])
  @Get()
  async getAssetsByType(
    @Query(
      'page',
      new ParseIntPipe({
        optional: true
      })
    )
    page: number = 1,
    @Query(
      'limit',
      new ParseIntPipe({
        optional: true
      })
    )
    limit: number = 10
  ) {
    const totalDocuments = await this.assetService.totalDocuments();
    return new PaginateResponse(
      await this.assetService.getAssetsPaginate({
        page,
        limit
      }),
      {
        page,
        limit,
        totalDocuments
      }
    ).setMessage('Danh sách tài nguyên');
  }
}
