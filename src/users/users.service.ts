import { Injectable, NotFoundException, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRoles } from 'src/common/enums/roles.enum';
import { UserGender } from 'src/common/enums/gender.enum';
import { ManagerError } from 'src/common/errors/manager.error';
import { ResponseAllUsers } from './interfaces/response-users.interface';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';

@Injectable()
export class UsersService {
  private users: UserEntity[]=[
    {id: 1, name: 'Juan', age: 18, photo: ['photo.jpg'], email: 'juan3@gmail.com', password: '12345678', role: UserRoles.userRole, gender: UserGender.male, isActive: true },
    {id: 2, name: 'Juanito', age: 21, photo: ['photo.jpg'], email: 'juanito@gmail.com', password: '123483332', role: UserRoles.adminRole, gender: UserGender.male, isActive: true },
    {id: 3, name: 'Juana', age: 19, photo: ['photo.jpg'], email: 'juana@gmail.com', password: '1234562148', role: UserRoles.userRole, gender: UserGender.female, isActive: true }
  ]

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user: UserEntity = {
        ...createUserDto,
        isActive: true,
        id: this.users.length + 1,
        role: UserRoles.userRole
      }

      this.users.push(user);

      return user;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseAllUsers> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      if (this.users.length === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Users not found!',
        });
      }

      const total = this.users.filter((user) => user.isActive === true).length;
      const lastPage = Math.ceil(total / limit);
      const data = this.users.filter((user) => user.isActive === true).slice(skip, limit);

      return {
        page,
        limit,
        lastPage,
        total,
        data,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: number): Promise<UserEntity> {
    try {
      const user = this.users.find((user) => user.id === id && user.isActive === true);
      if (!user) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: "user not found",
        })
      }

      return user
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    try {
      const user = this.users.find((user) => user.id === id && user.isActive === true);
      if (!user) {
        throw new NotFoundException('user not found!');
      }

      const index = this.users.findIndex((user) => user.id === id && user.isActive === true);

      this.users[index] = {
        ...this.users[index],
        ...updateUserDto,
      };

      return this.users[index];
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: number): Promise<UserEntity> {
    try {
      const indexUser = this.users.findIndex((user) => user.id === id && user.isActive === true);
      if (indexUser === -1) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      this.users[indexUser] = {
        ...this.users[indexUser],
        isActive: false,
      }

      return this.users[indexUser]
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
