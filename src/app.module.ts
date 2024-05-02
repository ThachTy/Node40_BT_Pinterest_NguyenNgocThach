import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ImageModule } from './image/image.module';
import { CommentModule } from './comment/comment.module';
@Module({
  imports: [UserModule, ImageModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
