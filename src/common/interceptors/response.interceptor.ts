import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // If the response already has the expected format (from auth service), return it as is
        if (data && typeof data === 'object' && 'statusCode' in data && 'message' in data && 'data' in data) {
          return {
            statusCode: data.statusCode,
            message: data.message,
            data: data.data,
          };
        }
        
        // For other responses, return as is
        return data;
      }),
    );
  }
}

