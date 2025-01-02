import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as mime from 'mime-types';
import { CloudStorage } from './cloud-storage.interface';

@Injectable()
export class CloudinaryAdapter implements CloudStorage {
  constructor(private readonly configService: ConfigService) {
    v2.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET')
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    folder: string = 'booking'
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const fileExtension = mime.extension(file.mimetype);
    return new Promise((resolve, reject) => {
      const uploadStream = v2.uploader.upload_stream(
        {
          folder: `${folder}/${fileExtension}`,
          resource_type: 'auto',
          use_filename: true,
          access_mode: 'public',
          filename_override: file.originalname
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(file.buffer);
    });
  }

  async uploadMultipleFiles(
    files: Express.Multer.File[],
    folder: string = 'booking'
  ): Promise<Array<UploadApiResponse | UploadApiErrorResponse>> {
    return Promise.all(
      files.map(async (file) => {
        return await this.uploadFile(file, folder);
      })
    );
  }

  async deleteFile(
    public_id: string,
    resource_type: string
  ): Promise<{
    result: string;
  }> {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(
        public_id,
        {
          invalidate: true,
          resource_type
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  }
}
