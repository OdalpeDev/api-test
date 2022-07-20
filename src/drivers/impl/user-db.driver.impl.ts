import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IusersDbDriver } from '../users-db.driver';
import { Iuser } from 'src/core/domain/users/user.interface';
import { Users, UsersDocument } from '../schemas/users.schema';

@Injectable()
export class UsersDbDriver implements IusersDbDriver {
  constructor(
    @InjectModel(Users.name)
    private usersModel: Model<UsersDocument>,
  ) {}

  async getTotal(filter: any): Promise<number> {
    return await this.usersModel.countDocuments(filter);
  }

  async getAll(
    page: number,
    limit: number,
    filter: any,
    projection: any = {},
    sort: any = {},
  ): Promise<any[]> {
    return await this.usersModel
      .find(filter, projection)
      .skip(limit * (page - 1))
      .sort(sort)
      .limit(limit);
  }

  async getByEmail(email: string): Promise<Iuser> {
    const filter = { email };
    return await this.usersModel.findOne(filter);
  }

  async register(data: any): Promise<any> {
    const doc = new this.usersModel(data);
    return await doc.save();
  }

  async update(id: any, data: any): Promise<any> {
    return await this.usersModel.findByIdAndUpdate({ _id: id }, data);
  }
}
