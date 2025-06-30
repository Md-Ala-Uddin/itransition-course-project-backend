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

@Module({
  imports: [AuthModule, UsersModule, TemplatesModule, FormsModule, CommentsModule, LikesModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
