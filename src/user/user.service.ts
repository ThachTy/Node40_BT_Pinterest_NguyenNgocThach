import { Injectable } from '@nestjs/common';
import { userI } from './user.interface';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { responseCreator, hashCrypte, compareCryte } from '../base';

const SECRECT_KEY = process.env.SKEY || 'NO_KEY';
const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  prisma = new PrismaClient();
  response = new Response();
  jwtService = new JwtService();

  //#region Get All Users
  async getAll(): Promise<userI[] | undefined> {
    let data = await this.prisma.users.findMany();
    return data;
  }
  //#endregion

  //#region Get User by userId
  async getUserByUserId(res, userId): Promise<userI[] | undefined> {
    let data = await this.prisma.users.findFirst({
      where: {
        userId,
      },
    });

    if (!data)
      return responseCreator(res, {
        code: 200,
        message: 'Không tìm thấy User',
      });

    return responseCreator(res, {
      code: 200,
      message: 'Thành công : Lấy thông tin User',
      data,
    });
  }
  //#endregio

  //#region Register
  async register(res, { username, password }) {
    let usernameDB = await this.prisma.users.findFirst({
      where: {
        username,
      },
    });

    if (usernameDB)
      return responseCreator(res, {
        code: 404,
        message: 'Tài khoản đã tồn tại',
      });

    let hashPassword = await hashCrypte(password, SALT_ROUNDS);

    let newUser = await this.prisma.users.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    const token = await this.jwtService.signAsync(
      { userId: newUser.userId },
      {
        secret: SECRECT_KEY,
      },
    );

    return responseCreator(res, {
      code: 200,
      message: 'Đăng ký tài khoản thành công',
      token,
    });
  }
  //#endregion

  //#region Login
  async login(res, { username, password }) {
    let userDB = await this.prisma.users.findFirst({
      where: {
        username,
      },
    });

    if (!userDB)
      return responseCreator(res, {
        code: 404,
        message: 'Tài khoản không đúng',
      });

    let isCompare = await compareCryte(password, userDB.password);
    if (!isCompare)
      return responseCreator(res, {
        code: 404,
        message: 'Mật khẩu không đúng',
      });

    const token = await this.jwtService.signAsync(
      { userId: userDB.userId },
      {
        secret: SECRECT_KEY,
        expiresIn: '5m',
      },
    );

    return responseCreator(res, {
      code: 200,
      message: 'Đăng nhập thành công!',
      token,
    });
  }
  //#endregion
}
