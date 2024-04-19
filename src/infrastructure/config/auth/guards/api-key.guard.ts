import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PORT } from 'src/application/enums';
import { InvalidAPIKey } from 'src/application/exceptions';
import { IGameRepository } from 'src/infrastructure/repositories';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(PORT.Game) private readonly gameRepository: IGameRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!Boolean(request['game'])) throw new InvalidAPIKey();

    return true;
  }
}
