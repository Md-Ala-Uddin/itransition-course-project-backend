import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Role } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { PublicUser } from 'src/users/interfaces/public-user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<PublicUser | null> {
    const user = await this.userService.findOne({ email });

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(
      password,
      user.passwordHash as string,
    );

    if (!isPasswordValid) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...publicUser } = user;

    return publicUser as PublicUser;
  }

  async login(user: PublicUser) {
    const payload = { email: user.email, sub: user.id };
    return await Promise.resolve({
      user,
      accessToken: this.jwtService.sign(payload),
    });
  }

  async register(registerDto: CreateUserDto): Promise<PublicUser> {
    const { password, ...rest } = registerDto;

    const passwordHash = await bcrypt.hash(password, 10);

    return await this.userService.create({
      ...rest,
      passwordHash,
      role: Role.USER,
      blocked: false,
    });
  }
}
