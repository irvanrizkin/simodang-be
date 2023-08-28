import { Expose, Exclude } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  name: string;

  @Expose()
  phoneNum: string;

  @Expose()
  address: string;

  @Expose()
  profilePic: string;

  @Exclude()
  token: string;
}
