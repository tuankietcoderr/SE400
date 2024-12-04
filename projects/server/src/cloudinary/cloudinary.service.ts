import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as mime from 'mime-types';

@Injectable()
export class CloudinaryService {
  async upload(
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

  async uploadMultiple(files: Express.Multer.File[]): Promise<Array<UploadApiResponse | UploadApiErrorResponse>> {
    return Promise.all(
      files.map(async (file) => {
        return await this.upload(file);
      })
    );
  }

  async deleteResource(
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
