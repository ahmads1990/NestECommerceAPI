import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import { DeleteResult, Model } from 'mongoose';
import { Vendor } from './schemas/vendor.schema';
import { randomUUID } from 'crypto';
import { hash } from 'bcrypt';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    @InjectModel(Vendor.name) private vendorModel: Model<Vendor>,
  ) {}

  async findAll(): Promise<any> {
    return await this.userModel.find().lean();
  }

  async findByID(id: string): Promise<any> {
    return await this.userModel.findOne({ id }).lean();
  }
  async findByEmail(email: string): Promise<any> {
    return await this.userModel.findOne((user) => user.email === email).lean();
  }

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, isVendor } = createUserDto;

    const userID: string = randomUUID();
    const hashedPassword = await hash(password, 10);

    let newUser = {
      userID: userID,
      name: name,
      email: email,
      passwordHash: hashedPassword,
      type: isVendor ? Vendor.name : Customer.name,
    };

    let result;
    if (isVendor) {
      result = this.vendorModel.create({
        ...newUser,
        description: createUserDto.description,
      });
    } else {
      result = this.customerModel.create({
        ...newUser,
        address: createUserDto.address,
      });
    }

    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    let result;

    if (updateUserDto.isVendor) {
      result = await this.vendorModel.findOneAndUpdate({ id }, updateUserDto);
    } else {
      result = await this.customerModel.findOneAndUpdate({ id }, updateUserDto);
    }
    return result;
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.userModel.deleteOne({ id }).lean();
  }
}
