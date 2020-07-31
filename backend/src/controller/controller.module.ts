import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { DfoBusinessModule } from '../business/business.module';
import { LoginController } from './login.controller';
import { RegisterController } from './register.controller';
import { UserController } from './user.controller';

/**
 * Endpoints (controllers)
 */
@Module({
  imports: [
    DfoBusinessModule,
  ],
  controllers: [
    SystemController,
    LoginController,
    RegisterController,
    UserController,
  ],
})
export class DfoControllerModule {
}
