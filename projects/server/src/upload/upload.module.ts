import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { AssetService } from 'src/asset/asset.service';
import { CloudinaryAdapter } from 'src/cloudinary/cloudinary.adapter';

@Module({
  controllers: [UploadController],
  providers: [UploadService, CloudinaryAdapter, AssetService, UploadService]
})
export class UploadModule {}
