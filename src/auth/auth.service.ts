import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { Role, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { PublicUser } from 'src/users/interfaces/public-user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async login(loginDto: LoginDto): Promise<User | null> {
    const { email, password } = loginDto;

    const user = await this.userService.findOne({ email });
    if (!user) {
      return null;
    }

    if (!(await compare(password, user.passwordHash as string))) {
      return null;
    }

    return user;
  }

  async register(registerDto: CreateUserDto): Promise<PublicUser> {
    const { password, ...rest } = registerDto;

    const passwordHash = await hash(password, 10);

    return await this.userService.create({
      ...rest,
      passwordHash,
      role: Role.USER,
      blocked: false,
    });
  }
}
