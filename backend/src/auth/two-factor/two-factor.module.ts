import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TwoFactorService } from './two-factor.service';
import { TwoFactorController } from './two-factor.controller';
import { TwoFactor } from './entities/two-factor.entity';
import { AuthModule } from '../auth.module';
import { EmailService } from './EmailService/sendEmail';

@Module({
  controllers: [TwoFactorController],
  providers: [TwoFactorService, EmailService],
  imports: [
    TypeOrmModule.forFeature([TwoFactor]),
    forwardRef(() => AuthModule),
    PassportModule,
  ],
  exports: [TypeOrmModule, TwoFactorService],
})
export class TwoFactorModule {}
