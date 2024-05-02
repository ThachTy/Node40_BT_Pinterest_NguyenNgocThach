import { Controller, Get, Put, Req, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import { responseCreator } from '../base';
import { ApiTags } from '@nestjs/swagger';

@Controller('image')
@ApiTags('Images')
export class ImageController {
  constructor(public imageService: ImageService) {}

  //#region Get All
  @Get('/get-all-images')
  allImages() {
    return this.imageService.getAll();
  }
  //#endregion

  //#region Get Image by Name
  @Get('/get-images-by-name')
  getImageByName(@Req() req, @Res() res) {
    let { name } = req.body;
    if (name === '')
      return responseCreator(res, {
        code: 400,
        message: 'Tên hình không được trống',
      });
    return this.imageService.getImageByName(res, name);
  }
  //#endregion

  //#region Check Image Saved by imageId
  @Get('/get-details-image-saved-by-imageId')
  getImageSaved(@Req() req, @Res() res) {
    let { userId, imageId } = req.body;
    if (
      userId === '' ||
      !Number.isInteger(userId * 1) ||
      !Number.isInteger(imageId * 1)
    )
      return responseCreator(res, {
        code: 400,
        message: 'Mã User hoặc Ảnh không hợp lệ',
      });
    return this.imageService.getDetailsImageSaved(
      res,
      Number(imageId),
      Number(userId),
    );
  }

  //#region Get Images by UserId
  @Get('/get-images-by-userId')
  getImagesByUserId(@Req() req, @Res() res) {
    let { userId } = req.body;
    if (userId === '' || !Number.isInteger(userId * 1))
      return responseCreator(res, {
        code: 400,
        message: 'Mã User không hợp lệ',
      });
    return this.imageService.getImagesByUserId(res, Number(userId));
  }
  //#endregion

  //#region Get Images Saved by UserId
  @Get('/get-images-Saved-by-userId')
  getImagesSavedByUserId(@Req() req, @Res() res) {
    let { userId } = req.body;
    if (userId === '' || !Number.isInteger(userId * 1))
      return responseCreator(res, {
        code: 400,
        message: 'Mã User không hợp lệ',
      });
    return this.imageService.getImagesSavedByUserId(res, Number(userId));
  }
  //#endregion

  //#region Delete Image by imageId
  @Put('/delete-image-by-imageId')
  deleteImgaByImageId(@Req() req, @Res() res) {
    let { imageId } = req.body;

    if (imageId === '' || !Number.isInteger(imageId * 1))
      return responseCreator(res, {
        code: 400,
        message: 'Mã Ảnh không hợp lệ',
      });

    return this.imageService.deleteImgaByImageId(res, Number(imageId));
  }
  //#endregion
}
