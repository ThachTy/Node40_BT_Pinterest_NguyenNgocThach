import { Controller, Get, Res, Req, Post } from '@nestjs/common';
import { responseCreator } from '../base';
import { commentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('comment')
@ApiTags('Comments')
export class commentController {
  commentService = new commentService();

  //#region Get Image by imageId
  @Get('/get-comments-by-imageId')
  getDetailsImageById(@Req() req, @Res() res) {
    let { id: imageId } = req.body;
    // check imageId trước khi đưa vào
    if (imageId === '')
      return responseCreator(res, {
        code: 400,
        message: 'Mã ảnh không hợp lệ',
      });

    return this.commentService.getCommentsByImageId(res, Number(imageId));
  }
  ////#endregion

  //#region Get Image by imageId
  @Post('/post-comments')
  postCommentByUser(@Req() req, @Res() res) {
    let { userId, imageId, comment } = req.body;

    // check imageId trước khi đưa vào
    if (
      imageId === '' ||
      userId === '' ||
      !Number.isInteger(userId * 1) ||
      !Number.isInteger(imageId * 1)
    )
      return responseCreator(res, {
        code: 400,
        message: 'Mã ảnh hoặc mã người dùng không hợp lệ',
      });

    return this.commentService.postCommentByUser(
      res,
      Number(userId),
      Number(imageId),
      comment,
    );
  }
  ////#endregion
}
