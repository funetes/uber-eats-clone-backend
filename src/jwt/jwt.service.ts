import { Inject, Injectable } from '@nestjs/common';
import { jwtOptions } from './jwt.interfaces';
import { JWT_OPTIONS } from './jwt.const';
import * as Jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  // injected from jwt module
  constructor(@Inject(JWT_OPTIONS) private readonly options: jwtOptions) {}
  sign(id: number): string {
    return Jwt.sign({ id }, this.options.privateKey);
  }
  verify(token: string) {
    return Jwt.verify(token, this.options.privateKey);
  }
}
