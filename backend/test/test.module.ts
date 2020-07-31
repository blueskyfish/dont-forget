import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as path from 'path';
import { DfoAuthModule } from '../src/auth/auth.module';
import { AuthMiddleware } from '../src/auth/user';
import { DfoBusinessModule } from '../src/business/business.module';
import { SystemService } from '../src/business/system';
import { BfoCommonModule } from '../src/common/common.module';
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
    BfoCommonModule.forRoot({
      db: {
        type: 'sqlite',
        filename: path.join(process.cwd(), 'data', 'dont-forget.db'),
      },
      appHome: process.cwd(),
    }),
    DfoAuthModule.forRoot({
      priKeyFilename: TEST_AUTH_PRI_FILENAME,
      pubKeyFilename: TEST_AUTH_PUB_FILENAME,
      digestSecret: 'ABC123'
    }),
    DfoBusinessModule,
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
