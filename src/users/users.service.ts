import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/users/schemas/users.schema';
import { UpdateUserDto, SearchUserDto, CreateUserDto, FindOneUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private UserModel: Model<Users>
  ) {}

  async createUser(CreateUserDto: CreateUserDto) {
    return await this.UserModel.create(CreateUserDto)
  }
  
  async searchUsers(SearchUserDto: SearchUserDto) {
    let filter = SearchUserDto
    const page = filter?.page ? filter?.page : 1;
        const resourcePerPage = filter?.limit ? filter?.limit : 10;
        
        delete filter?.page
        delete filter?.limit
    
        let resources: any[] = [];
        let totalCount: number;
        
        if (filter) {
            filter = filter?.deleted ? filter : filter.hasOwnProperty('deleted') ? filter : { deleted: false, ...filter }
            
            totalCount = await this.UserModel.countDocuments(filter);
            resources = await this.UserModel.find(filter)
                .skip((page - 1) * resourcePerPage)
                .limit(resourcePerPage)
                .sort({ createdAt: 1 })
                .select('-__v -updatedAt -deleted');
        } else {
            totalCount = await this.UserModel.countDocuments({ deleted: false });
            resources = await await this.UserModel.find({ deleted: false })
                .skip((page - 1) * resourcePerPage)
                .limit(resourcePerPage)
                .sort({ createdAt: 1 })
                .select('-__v -updatedAt -deleted');
        }
        
        return {
            data: resources,
            currentPage: page,
            totalPages: Math.ceil(totalCount / resourcePerPage)
        };
  }

  async findUser(id: string) {
    const filter = { deleted: false, _id: id }
    return await this.UserModel.findOne(filter)
    .select('-__v -updatedAt -deleted');
  }

  async findUserByEmailOrUsername(FindOneUserDto: FindOneUserDto ) {
    const filter = { deleted: false, ...FindOneUserDto }
    return await this.UserModel.findOne(filter)
    .select('-__v -updatedAt -deleted');
  }

  async editUser(id: string, updateUserDto: UpdateUserDto) {
    return await this.UserModel.findByIdAndUpdate(id, updateUserDto)
  }

  async removeUser(id: string) {
    return await this.UserModel.findByIdAndUpdate(id, { deleted: true })
  }

  async deleteUser(id: string) {
    return await this.UserModel.findByIdAndDelete(id)
  }
}
