import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, AddressDocument } from 'src/common/entities';

@Injectable()
export class AddressService {
  constructor(@InjectModel(Address.name) private readonly addressModel: Model<Address>) {}

  async create(data: Partial<Address>) {
    const addresses = await this.findByUserId(data.user_id.toString());

    return await this.addressModel.create({
      ...data,
      is_default: addresses.length === 0
    });
  }

  async findAll() {
    return await this.addressModel.find();
  }

  async findByUserId(user_id: string) {
    return await this.addressModel.find({ user_id });
  }

  async findById(id: string) {
    return await this.addressModel.findById(id);
  }

  async findByIdOrThrow(id: string) {
    const address = await this.findById(id);
    if (!address) {
      throw new NotFoundException('Không tìm thấy địa chỉ');
    }

    return address;
  }

  async update(id: string, data: Partial<Address>) {
    const address = await this.addressModel.findByIdAndUpdate(id, { $set: data }, { new: true });
    if (!address) {
      throw new NotFoundException('Không tìm thấy địa chỉ');
    }

    return address;
  }

  async setDefault(id: string) {
    const address = await this.findByIdOrThrow(id);

    const addresses = await this.findByUserId(address.user_id.toString());
    await Promise.all(
      addresses.map((item) => {
        if (item._id.toString() === id) {
          item.is_default = true;
        } else {
          item.is_default = false;
        }

        return item.save();
      })
    );

    return address;
  }

  async delete(id: string) {
    const address = await this.findByIdOrThrow(id);

    if (address.is_default) {
      throw new NotFoundException('Không thể xóa địa chỉ mặc định');
    }

    await address.deleteOne();

    return address;
  }
}
