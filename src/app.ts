import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

import { UserModule } from './modules/user';
import { BoardModule } from './modules/board';
import { TaskModule } from './modules/task';
import { AuthModule } from './modules/auth';
import config from './common/config';
import ormconfig from '../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          ...ormconfig,
          host: configService.get('POSTGRES_HOST'),
          port: Number(configService.get('POSTGRES_PORT')) || 5432,
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          synchronize: false,
        } as ConnectionOptions),
    }),
    UserModule,
    BoardModule,
    TaskModule,
    AuthModule,
  ],
})
export class AppModule {}
