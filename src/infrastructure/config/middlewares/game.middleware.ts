import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PORT } from 'src/application/enums';
import { GameRepository } from 'src/infrastructure/repositories/game.repository';

@Injectable()
export class GameMiddleware implements NestMiddleware {
  constructor(
    @Inject(PORT.Game) private readonly gameRepository: GameRepository,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-apikey'];

    if (apiKey) {
      const game = await this.gameRepository.findOne({
        query: { apikey: apiKey },
        populate: 'scoreboards',
      });

      if (game) {
        req['game'] = game;
      }
    }

    next();
  }
}
