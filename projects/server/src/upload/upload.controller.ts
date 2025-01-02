import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { AssetService } from 'src/asset/asset.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ErrorResponse, SuccessResponse } from 'src/common/responses';
import * as mime from 'mime-types';
import { CurrentUser } from 'src/common/decorators';
import { User } from 'src/common/entities';
import { ERole } from 'src/common/enum';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly assetService: AssetService
  ) {}

  @Post('/single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(@UploadedFile() file: Express.Multer.File, @CurrentUser() user: User) {
    const res = await this.uploadService.uploadSingleFile(file);

    const asset = await this.assetService.create({
      publicId: res.public_id,
      url: res.secure_url,
      format: res.format ?? mime.extension(file.mimetype),
      originalFilename: res.original_filename,
      size: res.bytes,
      uploader: user._id.toString(),
      assetType: res.resource_type,
      isAdminUpload: user.role === ERole.ADMIN
    });

    return new SuccessResponse(asset).setMessage('Tải lên tệp tin thành công').setStatusCode(HttpStatus.CREATED);
  }

  @Post('/multiple')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMultiple(@UploadedFiles() files: Array<Express.Multer.File>, @CurrentUser() user: User) {
    const r = await this.uploadService.uploadMultipleFiles(files);
    const assets = await Promise.all(
      r.map(async (res) => {
        const asset = await this.assetService.create({
          publicId: res.public_id,
          url: res.secure_url,
          format: res.format ?? mime.extension(res.mimetype),
          originalFilename: res.original_filename,
          size: res.bytes,
          uploader: user._id.toString(),
          assetType: res.resource_type,
          isAdminUpload: user.role === ERole.ADMIN
        });

        return asset;
      })
    );

    return new SuccessResponse(assets).setMessage('Tải lên tệp tin thành công').setStatusCode(HttpStatus.CREATED);
  }

  @Delete()
  async deleteResource(@Query('public_id') public_id: string) {
    const asset = await this.assetService.getAssetByPublicIdOrThrow(public_id);

    return await this.uploadService
      .deleteResource(public_id, asset.assetType)
      .then(async (res) => {
        if (res.result === 'ok') {
          const asset = await this.assetService.delete(public_id);
          return new SuccessResponse(asset).setStatusCode(HttpStatus.NO_CONTENT);
        }

        return new ErrorResponse('Lỗi xảy ra khi xóa tệp tin').setStatusCode(HttpStatus.BAD_REQUEST);
      })
      .catch((error) => {
        return new ErrorResponse(error.message).setStatusCode(HttpStatus.BAD_REQUEST);
      });
  }
}
