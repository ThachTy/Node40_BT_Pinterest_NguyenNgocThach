import { Injectable } from '@nestjs/common';
import { imageI } from './image.interface';
import { PrismaClient } from '@prisma/client';
import { responseCreator } from 'src/base';

@Injectable()
export class ImageService {
  prisma = new PrismaClient();

  //#region Get All Images
  async getAll(): Promise<imageI[]> {
    let data = await this.prisma.images.findMany();
    return data;
  }
  //#endregion

  //#region Get Image By Name
  async getImageByName(res, name): Promise<imageI[]> {
    let data = await this.prisma.images.findMany({
      where: {
        name: { contains: name },
      },
    });

    if (data.length === 0)
      return responseCreator(res, { code: 200, message: 'Không tìm thấy ảnh' });

    return responseCreator(res, {
      code: 200,
      message: 'Thành Công: Danh sách ảnh theo tên',
      data,
    });
  }
  //#endregion

  //#region Get Detail Image By idImage
  async getDetailsImageByImageId(res, imageId): Promise<imageI[]> {
    let data = await this.prisma.images.findUnique({
      where: {
        imageId,
      },
      include: { users: true },
    });

    if (!data)
      return responseCreator(res, { code: 200, message: 'Không tìm thấy ảnh' });

    return responseCreator(res, {
      code: 200,
      message: 'Thành Công: Danh sách thông tin ảnh theo id',
      data,
    });
  }

  //#endregion

  //#region Get Details Saved by ImageID
  async getDetailsImageSaved(res, imageId, userId) {
    let checkImage = await this.prisma.imagesSaved.findFirst({
      where: { userId, imageId },
    });
    let message = '';
    // Ảnh đã được lưu => Bỏ lưu ảnh
    if (checkImage) {
      await this.prisma.imagesSaved.delete({
        where: { saveId: checkImage.saveId },
      });
      message = 'Bỏ lưu Ảnh thành công';
    } else {
      // Ảnh chưa được lưu
      await this.prisma.imagesSaved.create({
        data: {
          userId,
          imageId,
        },
      });

      message = 'Lưu Ảnh thành công';
    }

    // Ảnh chưa được lưu
    return responseCreator(res, {
      code: 200,
      message,
    });
  }
  //#endregion

  //#region Get Images by UserId
  async getImagesByUserId(res, userId) {
    let data = await this.prisma.images.findMany({
      where: { userId },
    });

    return responseCreator(res, {
      code: 200,
      message: 'Thành công: Lấy danh sách ảnh theo mã User',
      data,
    });
  }
  //#endregion

  //#region Get Images by ImageId
  async deleteImgaByImageId(res, imageId) {
    let image = await this.prisma.images.findFirst({
      where: {
        imageId,
      },
    });

    if (!image)
      return responseCreator(res, { code: 200, message: 'Không tìm thấy Ảnh' });

    let data = await this.prisma.images.update({
      where: {
        imageId,
      },
      data: { active: false },
    });

    return responseCreator(res, {
      code: 200,
      message: 'Xóa Ảnh thành công',
      data,
    });
  }
  //#endregion

  //#region Get Images by UserId
  async getImagesSavedByUserId(res, userId) {
    let data = await this.prisma.imagesSaved.findMany({
      where: { userId },

      include: {
        images: {
          select: { name: true, url: true, active: true, comments: true },
          where: { active: true },
        },
        users: { select: { username: true } },
      },
    });

    return responseCreator(res, {
      code: 200,
      message: 'Thành công: Lấy danh sách ảnh đã lưu theo mã User',
      data,
    });
  }
  //#endregion
}
