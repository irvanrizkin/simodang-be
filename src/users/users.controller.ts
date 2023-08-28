import {
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserProfileDto } from './dto/user.profile.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
    const userDto = plainToInstance(UserDto, user);
    return userDto;
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id', new ParseIntPipe()) userId: number,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<UserProfileDto> {
    const user = await this.usersService.updateUser(userId, userUpdateDto);
    const userDto = plainToInstance(UserDto, user);
    return userDto;
  }

  @Patch('profile-pic/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads/assets/profile',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          callback(null, `${uniqueSuffix}${extension}`);
        },
      }),
    }),
  )
  async changeProfilePic(
    @Request() req,
    @Param('id', new ParseIntPipe()) userId: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UserDto> {
    const profilePic = `${req.protocol}://${req.get('Host')}/assets/profile/${
      file.filename
    }`;
    const user = await this.usersService.changeProfilePic(userId, profilePic);
    const userDto = plainToInstance(UserDto, user);
    return userDto;
  }
}
