import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GlobalModule } from '../../../wasaf/elon-bizda/src/global/global.module';

@Module({
  imports: [UserModule, AuthModule, GlobalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
