import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
} from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('PrismaService: Successfully connected to the database.');
    } catch (error) {
      console.error('PrismaService: Failed to connect to the database.', error);
      throw error;
    }
  }
  async onApplicationShutdown(signal?: string) {
    console.log(
      `PrismaService: Application shutting down. Signal received: ${signal || 'N/A'}.`,
    );
    try {
      await this.$disconnect();
      console.log(
        'PrismaService: Successfully disconnected from the database.',
      );
    } catch (error) {
      console.error(
        'PrismaService: Error disconnecting from the database.',
        error,
      );
    }
  }
}
