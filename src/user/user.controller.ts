import { Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { responseCreator } from 'src/base';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { User } from './user.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(public userService: UserService) {}

  //#region Get All Users
  @Get('/get-all-users')
  AllUsers() {
    return this.userService.getAll();
  }
  //#endregion

  //#region Get User by userId
  @Get('/get-user-by-id')
  getUserByUserId(@Res() res, @Body() body: User) {
    let { userId } = body;

    // if (userId === '')
    //   return responseCreator(res, { code: 200, message: 'Mã User không đúng' });

    return this.userService.getUserByUserId(res, Number(userId));
  }
  //#endregion

  //#region  Register User
  @Post('/register')
  register(@Req() req, @Res() res) {
    let { username, password } = req.body;
    if (username === '' || password === '')
      return responseCreator(res, {
        code: 404,
        message: 'Không tìm thấy username hay password',
      });

    return this.userService.register(res, { username, password });
  }
  //#endregion

  //#region Login User
  @Post('/login')
  login(@Req() req, @Res() res) {
    let { username, password } = req.body;
    if (username === '' || password === '')
      return responseCreator(res, {
        code: 404,
        message: 'Không tìm thấy username hay password',
      });
    return this.userService.login(res, { username, password });
  }
  //#endregion
}
