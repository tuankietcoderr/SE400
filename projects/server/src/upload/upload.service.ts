import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CloudStorage } from 'src/cloudinary/cloud-storage.interface';
import { CloudinaryAdapter } from 'src/cloudinary/cloudinary.adapter';

@Injectable()
export class UploadService {
  private readonly cloudinaryService: CloudStorage;
  constructor(private readonly configService: ConfigService) {
    this.cloudinaryService = new CloudinaryAdapter(this.configService);
  }

  async uploadSingleFile(file: Express.Multer.File) {
    return await this.cloudinaryService.uploadFile(file).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  async uploadMultipleFiles(files: Express.Multer.File[]) {
    return await this.cloudinaryService.uploadMultipleFiles(files).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  async deleteResource(public_id: string, resource_type: string) {
    return await this.cloudinaryService.deleteFile(public_id, resource_type).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }
}
