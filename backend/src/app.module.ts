import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import * as path from 'path';
import { buildDatabaseConfig, EnvName } from './app.config';
import { DfoAuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/user';
import { BfoCommonModule } from './common/common.module';
import { fromEnv } from './common/env';
import { DfoControllerModule } from './controller/controller.module';
import { UserController } from './controller/user.controller';
import { DfoGatewayModule } from './gateway/gateway.module';

/**
 * Application module
 */
@Module({
  imports: [
    ScheduleModule.forRoot(),

    BfoCommonModule.forRoot({
      // database config
      db: buildDatabaseConfig(),
      // setting config
      appHome: fromEnv(EnvName.AppHome).asString || path.normalize(path.join(__dirname, '..')),
    }),
    DfoAuthModule.forRoot({
      priKeyFilename: fromEnv(EnvName.AuthPriFile).asString,
      pubKeyFilename: fromEnv(EnvName.AuthPubFile).asString,
      digestSecret: fromEnv(EnvName.DigestSecret).asString,
    }),
    DfoGatewayModule,
    DfoControllerModule,
  ],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer): any {

    const publicRoutes = ['/', '/about', '/alive', '/about', '/login', '/register'];

    consumer
      .apply(AuthMiddleware)
      .exclude(...publicRoutes)
      .forRoutes(
        UserController,
      ); // TODO Add here all controllers
  }
}
