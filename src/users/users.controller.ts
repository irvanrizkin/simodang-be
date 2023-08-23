import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserProfileDto } from './dto/user.profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Request() req): Promise<{ message: string }> {
    const { id } = req.user;
    await this.usersService.logout(id);
    return { message: 'successfully logged out' };
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Request() req): Promise<UserProfileDto> {
    const { id: userId } = req.user;
    const user = await this.usersService.getProfile(userId);
    const { id, email, name, phoneNum, address, profilePic } = user;
    return {
      id,
      email,
      name,
      phoneNum,
      address,
      profilePic,
    };
  }
}
