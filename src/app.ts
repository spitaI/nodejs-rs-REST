import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

import config from './common/config';
import ormconfig from '../ormconfig';

// process.on('uncaughtException', (err: Error) => {
//   const date = new Date().toISOString();
//   const message = `[${date}] uncaughtException \n${err.stack}`;

//   if (logger.errorPath) {
//     fs.writeFileSync(logger.errorPath, message, { flag: 'a' });
//   }

//   logger.error(message);
//   process.exit(1);
// });

// process.on('unhandledRejection', (err: Error) => {
//   const date = new Date().toISOString();
//   const message = `[${date}] unhandledRejection \n${err.stack}`;

//   if (logger.errorPath) {
//     fs.writeFileSync(logger.errorPath, message, { flag: 'a' });
//   }

//   logger.error(message);
//   process.exit(1);
// });

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
  ],
})
export class AppModule {}
