import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserInput: CreateUserInput) {
    // check if user exists
    const existUser = await this.userModel.findOne({
      username: createUserInput.username,
    });
    if (existUser) throw new BadRequestException('username already exists!');
    const saltOrRounds = 10;
    const hashedPassword = bcrypt.hashSync(
      createUserInput.password,
      saltOrRounds
    );
    const createdUser = new this.userModel({
      ...createUserInput,
      password: hashedPassword,
    });
    return await createdUser.save();
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(username: string) {
    return await this.userModel.findOne({ username });
  }
}
