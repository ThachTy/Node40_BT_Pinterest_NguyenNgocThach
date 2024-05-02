import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { responseCreator } from '../base';

@Injectable()
export class commentService {
  prisma = new PrismaClient();
  //#region Get Comments By ImageId
  async getCommentsByImageId(res, imageId) {
    let data = await this.prisma.comments.findMany({
      where: {
        imageId,
      },
      select: { commentId: true, comment: true, imageId: true },
    });
    if (data.length === 0)
      return responseCreator(res, {
        code: 404,
        message: 'Không tìm thấy comments theo imageId',
      });

    return responseCreator(res, { code: 200, message: 'Thành công', data });
  }
  //#endregion

  //#region  Post new Comments
  async postCommentByUser(res, userId, imageId, comment) {
    let user = await this.prisma.users.findUnique({ where: { userId } });
    if (!user)
      return responseCreator(res, {
        code: 400,
        message: 'Không tìm thấy User',
      });

    let image = await this.prisma.images.findUnique({ where: { imageId } });
    if (!image)
      return responseCreator(res, {
        code: 400,
        message: 'Không tìm thấy Image',
      });

    let data = await this.prisma.comments.create({
      data: { userId, imageId, comment },
    });

    console.log(data);
    return responseCreator(res, {
      code: 200,
      message: 'Comment thành công',
      data,
    });
  }
  //#endregion
}
