import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';



@Controller('two-factor')
export class TwoFactorController {
  constructor(private readonly twoFactorService: TwoFactorService) {}

 
}
