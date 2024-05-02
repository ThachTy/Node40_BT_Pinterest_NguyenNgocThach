import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: 'Id Tài Khoản',
  })
  userId: number;
  @ApiProperty({
    description: 'Tên Tài Khoản',
  })
  username: string;
  @ApiProperty({
    description: 'Mật Khẩu',
  })
  password: string;
}
