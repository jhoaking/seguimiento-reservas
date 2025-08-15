import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservasModule } from './reservas/reservas.module';
import { ServiciosModule } from './servicios/servicios.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { HistorialModule } from './historial/historial.module';
import { InteraccionesModule } from './interacciones/interacciones.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod' ? true : false,
      extra: {
        ssl:
          process.env.STAGE === 'prod' ? { rejectUnauthorized: false } : null,
      },
      type: 'postgres',

      url: process.env.URL,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),

    AuthModule,

    ReservasModule,

    ServiciosModule,

    CommonModule,

    SeedModule,

    HistorialModule,

    InteraccionesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
