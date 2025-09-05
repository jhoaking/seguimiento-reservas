import { Controller, Get, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';

import { GetUser,Auth } from './Decorator';


import { CreateUserhDto, LoginUserDto } from './dto';

import { User } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserhDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Get('check-auth-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.chekAuhtStatus(user);
  }

  @Post('/login-ia')
  loginIa(){
    return this.authService.loginAi();
  }
}
