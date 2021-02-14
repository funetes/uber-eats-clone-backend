import { DynamicModule, Global, Module } from '@nestjs/common';
import { jwtOptions } from './jwt.interfaces';
import { JWT_OPTIONS } from './jwt.const';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: jwtOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: JWT_OPTIONS,
          useValue: options,
        },
        JwtService,
      ],
      exports: [JwtService],
    };
  }
}
