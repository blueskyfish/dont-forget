import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as path from 'path';
import { BikeAuthModule } from '../src/auth/auth.module';
import { AuthMiddleware } from '../src/auth/user';
import { BikeBusinessModule } from '../src/business/business.module';
import { SystemService } from '../src/business/system';
import { BikeCommonModule } from '../src/common/common.module';
import { LoginController } from '../src/controller/login.controller';
import { RegisterController } from '../src/controller/register.controller';
import { SystemController } from '../src/controller/system.controller';
import { UserController } from '../src/controller/user.controller';
import { TEST_AUTH_PRI_FILENAME, TEST_AUTH_PUB_FILENAME } from './test.settings';

/**
 * The test module
 */
@Module({
  imports: [
    BikeCommonModule.forRoot({
      db: {
        type: 'sqlite',
        filename: path.join(process.cwd(), 'data', 'dont-forget.db'),
      },
      appHome: process.cwd(),
    }),
    BikeAuthModule.forRoot({
      priKeyFilename: TEST_AUTH_PRI_FILENAME,
      pubKeyFilename: TEST_AUTH_PUB_FILENAME,
      digestSecret: 'ABC123'
    }),
    BikeBusinessModule,
  ],
  controllers: [
    SystemController,
    LoginController,
    RegisterController,
    UserController,
  ],
  providers: [
    SystemService,
  ]
})
export class TestModule implements NestModule {

  configure(consumer: MiddlewareConsumer): any {
    const publicRoutes = ['/', '/check', '/about', '/login', '/register'];
    consumer
      .apply(AuthMiddleware)
      .exclude(...publicRoutes)
      .forRoutes(
        UserController,
      ); // TODO Add here all controllers
  }
}
