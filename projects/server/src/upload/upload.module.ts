import { Module } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { AssetService } from 'src/asset/asset.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, CloudinaryService, AssetService, UploadService]
})
export class UploadModule {}
