import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TemplatesModule } from './templates/templates.module';
import { FormsModule } from './forms/forms.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { TagsModule } from './tags/tags.module';
import { TopicsModule } from './topics/topics.module';
import { FilesModule } from './files/files.module';
import { SearchService } from './search/search.service';
import { AdminModule } from './admin/admin.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/app.config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TemplatesModule,
    FormsModule,
    CommentsModule,
    LikesModule,
    TagsModule,
    TopicsModule,
    FilesModule,
    AdminModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, SearchService],
})
export class AppModule {}
