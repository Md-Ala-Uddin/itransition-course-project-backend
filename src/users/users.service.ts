import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { PublicUser } from './interfaces/public-user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: Prisma.UserCreateInput): Promise<PublicUser> {
    return await this.prismaService.user.create({
      data: user,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<PublicUser[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prismaService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        blocked: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<PublicUser> {
    return await this.prismaService.user.update({
      where,
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        blocked: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<PublicUser> {
    return await this.prismaService.user.delete({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        blocked: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
