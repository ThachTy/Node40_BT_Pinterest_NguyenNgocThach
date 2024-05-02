import { Module } from '@nestjs/common';
import { commentService } from './comment.service';
import { commentController } from './comment.controller';

@Module({
  controllers: [commentController],
  providers: [commentService],
})
export class CommentModule {}
