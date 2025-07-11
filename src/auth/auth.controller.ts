import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { PublicUser } from 'src/users/interfaces/public-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request & { user: PublicUser },
  ) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerDto: CreateUserDto) {
    return await this.authService.register(registerDto);
  }
}
