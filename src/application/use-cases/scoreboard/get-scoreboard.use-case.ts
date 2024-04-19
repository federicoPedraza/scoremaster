import { Inject, Logger } from '@nestjs/common';
import { PORT } from 'src/application/enums';
import { ScoreboardNotFound } from 'src/application/exceptions';
import { GetScoreboardPresentation } from 'src/application/presentations';
import { IGame } from 'src/domain/entities';

import { IScoreboardRepository } from 'src/infrastructure/repositories';

export class GetScoreboardV1 {
  private readonly logger = new Logger(GetScoreboardV1.name);

  constructor(
    @Inject(PORT.Scoreboard)
    private readonly scoreboardRepository: IScoreboardRepository,
  ) {}

  async exec(game: IGame, name: string): Promise<GetScoreboardPresentation> {
    const cachedScoreboard = game.scoreboards?.find(
      (scoreboard) => scoreboard['name']?.toLowerCase() === name.toLowerCase(),
    );

    if (!Boolean(cachedScoreboard)) throw new ScoreboardNotFound();

    const scoreboard = await this.scoreboardRepository.findOne({
      query: { name: cachedScoreboard['name'] },
    });

    return {
      name: scoreboard.name,
      values: scoreboard.values,
      game: game.name,
    };
  }
}
