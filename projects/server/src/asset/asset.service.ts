import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Asset, AssetDocument } from 'src/common/entities/asset.entity';
import { CreateAssetDto } from './asset.dto';
import { Model } from 'mongoose';

@Injectable()
export class AssetService {
  constructor(@InjectModel(Asset.name) private readonly assetModel: Model<AssetDocument>) {}
  async create(data: CreateAssetDto) {
    return await this.assetModel.create(data);
  }

  async delete(public_id: string) {
    const asset = await this.assetModel.findOneAndDelete({ publicId: public_id });
    if (!asset) {
      throw new NotFoundException('Không tìm thấy tệp tin');
    }

    return asset;
  }

  public async getAssetByPublicId(public_id: string) {
    return await this.assetModel.findOne({ publicId: public_id });
  }

  public async getAssetByPublicIdOrThrow(public_id: string) {
    const asset = await this.getAssetByPublicId(public_id);
    if (!asset) {
      throw new NotFoundException('Không tìm thấy tệp tin');
    }

    return asset;
  }

  public async getAllAdminAssets() {
    return await this.assetModel.find({ isAdminUpload: true });
  }
}
