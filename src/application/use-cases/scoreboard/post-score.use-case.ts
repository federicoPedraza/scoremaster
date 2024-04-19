import { Inject, Logger } from '@nestjs/common';
import { PostScoreDTO } from 'src/application/dtos';
import { PORT } from 'src/application/enums';
import { ScoreboardNotFound } from 'src/application/exceptions';
import { IGame, IScoreboardValue } from 'src/domain/entities';

import { IScoreboardRepository } from 'src/infrastructure/repositories';

export class PostScoreV1 {
  private readonly logger = new Logger(PostScoreV1.name);

  constructor(
    @Inject(PORT.Scoreboard)
    private readonly scoreboardRepository: IScoreboardRepository,
  ) {}

  async exec(game: IGame, name: string, data: PostScoreDTO): Promise<any> {
    const cachedScoreboard = game.scoreboards?.find(
      (scoreboard) => scoreboard['name']?.toLowerCase() === name.toLowerCase(),
    );

    if (!Boolean(cachedScoreboard)) throw new ScoreboardNotFound();

    const value: IScoreboardValue = {
      username: data.username,
      score: data.score,
    };

    await this.scoreboardRepository.update(
      {
        query: { name: cachedScoreboard['name'] },
      },
      { $addToSet: { values: value } },
    );
  }
}
