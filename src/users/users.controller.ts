import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

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
}
