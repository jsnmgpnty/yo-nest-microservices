import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isArray, isObject } from 'lodash';
import { Types } from 'mongoose';

@Injectable()
export class EntitySanitizerInterceptor implements NestInterceptor {
  validators: Validator[] = [];

  constructor () {
    this.initializeValidators();
  }

  initializeValidators() {
    this.validators = [
      {
        validate: (obj, prop) => prop === 'password',
        recurse: false,
        delete: true,
      },
      {
        validate: (obj, prop) => /^_/.test(prop),
        recurse: false,
        delete: true,
      },
      {
        validate: (obj, prop) => typeof obj[prop] === 'function',
        recurse: false,
        delete: true,
      },
      {
        validate: (obj, prop) => obj[prop] === 'object',
        recurse: true,
        delete: false,
      },
    ];
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map(response => {
          if (!response) return null;
          let objectToClean = response.data ? response.data : response;
          
          const clean = (object) => {
            for (let prop in object) {
              this.validators.some(v => {
                if (!v.validate(object, prop)) return false;
                if (v.delete) {
                  delete object[prop];
                  return false;
                }
                if (v.recurse) {
                  object[prop] = clean(object[prop]);
                  return false;
                }
              });
            }
            return object;
          };

          if (isArray(objectToClean)) objectToClean.forEach(o => clean(o));
          if (isObject) clean(objectToClean);
          return objectToClean;
        }),
      );
  }
}

interface Validator {
  validate: (obj: any, prop: string) => boolean;
  recurse: boolean;
  delete: boolean;
};
