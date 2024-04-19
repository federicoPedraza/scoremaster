import { Inject, Logger } from '@nestjs/common';
import { CreateScoreboardDTO } from 'src/application/dtos';
import { PORT } from 'src/application/enums';
import { ScoreboardAlreadyExists } from 'src/application/exceptions';
import { CreateScoreboardPresentation } from 'src/application/presentations';
import { IGame, IScoreboard } from 'src/domain/entities';

import {
  IGameRepository,
  IScoreboardRepository,
} from 'src/infrastructure/repositories';

export class CreateScoreboardV1 {
  private readonly logger = new Logger(CreateScoreboardV1.name);

  constructor(
    @Inject(PORT.Game) private readonly gameRepository: IGameRepository,
    @Inject(PORT.Scoreboard)
    private readonly scoreboardRepository: IScoreboardRepository,
  ) {}

  async exec(
    data: CreateScoreboardDTO,
    game: IGame,
  ): Promise<CreateScoreboardPresentation> {
    if (game.scoreboards.some((scoreboard) => scoreboard['name'] === data.name))
      throw new ScoreboardAlreadyExists();

    const scoreboardData: IScoreboard = {
      name: data.name,
      values: [],
    };

    const scoreboard = await this.scoreboardRepository.create(scoreboardData);

    await this.gameRepository.update(
      { query: { _id: game._id } },
      { $addToSet: { scoreboards: scoreboard._id } },
    );

    return {
      name: scoreboard.name,
      id: scoreboard._id.toString(),
    };
  }
}
