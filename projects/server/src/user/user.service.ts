import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/common/entities';
import { CreateUserRequestDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getUsers() {
    return this.userModel.find();
  }

  async getUser(userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng`);
    }

    return user.toJSON();
  }

  async getUserByEmailOrThrow(email: string) {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng`);
    }

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async getUserByPhoneOrThrow(phone: string) {
    const user = await this.getUserByPhone(phone);

    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng`);
    }

    return user;
  }

  async getUserByPhone(phone: string) {
    const user = await this.userModel.findOne({ phone_number: phone });

    return user;
  }

  async getUserByEmailOrPhone(email: string, phone: string) {
    const user = await this.userModel.findOne({ email, phone_number: phone });

    return user;
  }

  async createUser(data: CreateUserRequestDto) {
    return await this.userModel.create(data);
  }
  
  async updateProfile(userId: string, data: any) {
    const user = await this.userModel.findByIdAndUpdate(userId, { $set: data }, { new: true });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng`);
    }
    return user;
  }
}
