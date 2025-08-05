import { forwardRef, Module } from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';
import { TwoFactorController } from './two-factor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwoFactor } from './entities/two-factor.entity';
import { AuthModule } from '../auth.module';
import { EmailService } from './EmailService/sendEmail';

@Module({
  controllers: [TwoFactorController],
  providers: [TwoFactorService, EmailService],
  imports: [
    TypeOrmModule.forFeature([TwoFactor]),
    forwardRef(() => AuthModule),
  ],
  exports: [TypeOrmModule, TwoFactorService],
})
export class TwoFactorModule {}
