import { Observable, throwError } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'
import { Injectable, ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common'

import { Logger } from '.'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger()

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest()

    this.logger.log({
      msg: `Request: ${req.method} - ${req.originalUrl}`,
      ...req.body,
    })

    const now = Date.now()

    return next
      .handle()
      .pipe(
        tap((response) => {
          this.logger.debug({
            msg: `Response: ${req.method} - ${req.originalUrl}`,
            executionTime: Date.now() - now,
            response,
          })
        })
      )
      .pipe(
        catchError((error) => {
          this.logger.error(
            {
              msg: `ResponseError: ${req.method} - ${req.originalUrl}`,
              executionTime: Date.now() - now,
              error,
            },
            error.stack ? error.stack : error
          )

          return throwError(error)
        })
      )
  }
}
