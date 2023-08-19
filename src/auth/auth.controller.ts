import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserModel } from '@prisma/client';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() authDto: AuthDto): Promise<UserModel> {
    const { email, password } = authDto;
    return this.authService.register(email, password);
  }

  @Post('login')
  async login(@Body() authDto: AuthDto): Promise<{ token: string }> {
    const { email, password } = authDto;
    const token = await this.authService.login(email, password);
    return { token };
  }
}
