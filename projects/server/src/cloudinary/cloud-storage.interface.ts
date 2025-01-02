import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export interface CloudStorage {
  uploadFile(file: Express.Multer.File, folder?: string): Promise<any>;
  uploadMultipleFiles(files: Express.Multer.File[], folder?: string): Promise<any[]>;
  deleteFile(publicId: string, resource_type: string): Promise<any>;
}
