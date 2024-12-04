import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument, Customer, CustomerDocument, User, UserDocument } from 'src/common/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    @InjectModel(Customer.name) private readonly customerModel: Model<CustomerDocument>
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

  async createUser(data: Partial<User>) {
    const user = await this.userModel.create(data);

    return user;
  }

  async createAdmin(data: Partial<Admin>) {
    const admin = await this.adminModel.create(data);

    return admin;
  }

  async newAdmin(data: Partial<Admin>) {
    return new this.adminModel(data);
  }

  async createCustomer(data: Partial<Customer>) {
    const customer = await this.customerModel.create(data);

    return customer;
  }
}
