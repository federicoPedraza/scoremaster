import { Logger } from '@nestjs/common';
import {
  GameDetailsPresentation,
  GameDetailsScoreboardPresentation,
} from 'src/application/presentations';
import { IGame } from 'src/domain/entities';

export class GetGameDetailsV1 {
  private readonly logger = new Logger(GetGameDetailsV1.name);

  constructor() {}

  async exec(game: IGame): Promise<GameDetailsPresentation> {
    const scoreboards: GameDetailsScoreboardPresentation[] =
      game.scoreboards.map((scoreboard) => {
        return {
          id: scoreboard?.['_id'].toString(),
          name: scoreboard?.['name'],
        };
      });

    return {
      scoreboards,
    };
  }
}
