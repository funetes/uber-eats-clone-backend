import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // console.log(context['args'][2].user === context.getArgs()[2].user);
    // console.log(
    //   context['args'][2] === GqlExecutionContext.create(context).getContext(),
    // );
    const gqlContext = GqlExecutionContext.create(context).getContext();

    return Boolean(gqlContext['user']);
    // return Boolean(context['args'][2].user);
  }
}
