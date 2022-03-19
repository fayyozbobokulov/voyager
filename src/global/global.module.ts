import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SentryInterceptor } from './interceptors/sentry.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [SentryInterceptor],
  exports: [SentryInterceptor],
})
export class GlobalModule {}
