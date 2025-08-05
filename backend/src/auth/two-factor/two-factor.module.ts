import { Module } from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';
import { TwoFactorController } from './two-factor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwoFactor } from './entities/two-factor.entity';
import { AuthModule } from '../auth.module';

@Module({
  controllers: [TwoFactorController],
  providers: [TwoFactorService],
  imports: [TypeOrmModule.forFeature([TwoFactor]), AuthModule],
  exports: [TypeOrmModule, TwoFactorService],
})
export class TwoFactorModule {}
