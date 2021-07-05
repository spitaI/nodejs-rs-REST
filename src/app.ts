import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './common/config';

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
  ],
})
export class AppModule {}
