import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { User } from '@sentry/types';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as Sentry from '@sentry/minimal';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const requestUser = request.user;
    return next.handle().pipe(
      tap(null, (exception) => {
        let user: User = {
          exists: false,
        };
        if (requestUser) {
          user = {
            id: requestUser.id,
            email: requestUser.email,
          };
        }
        Sentry.setUser(user);
        Sentry.captureException(exception);
      }),
    );
  }
}
