import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.save(createUserDto);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async findAllUser(): Promise<User[]> {
    try {
      const res = await this.usersRepository.find();

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async findOneUser(id: string): Promise<User> {
    try {
      const res = await this.usersRepository.findOne({ where: { id } });

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      // check if user exists in db or not
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        return { message: 'User not found' };
      }

      const res = await this.usersRepository.update({ id }, updateUserDto);
      console.log(res.affected);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });

      if (!user) {
        return { message: 'User not found' };
      }

      const res = await this.usersRepository.delete({ id });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
