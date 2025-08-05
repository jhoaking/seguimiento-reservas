import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserhDto, LoginUserDto } from './dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserhDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto : LoginUserDto){
    return this.authService.loginUser(loginUserDto)
  }
  
}
