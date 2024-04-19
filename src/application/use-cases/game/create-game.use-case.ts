import { Inject, Logger } from '@nestjs/common';
import { CreateGameDTO } from 'src/application/dtos';
import { PORT } from 'src/application/enums';
import { GameAlreadyExists } from 'src/application/exceptions';
import { CreateGamePresentation } from 'src/application/presentations';
import { IGame } from 'src/domain/entities';
import { IGameRepository } from 'src/infrastructure/repositories';
import { v4 as uuidv4 } from 'uuid';

export class CreateGameV1 {
  private readonly logger = new Logger(CreateGameV1.name);

  constructor(
    @Inject(PORT.Game) private readonly gameRepository: IGameRepository,
  ) {}

  async exec(data: CreateGameDTO): Promise<CreateGamePresentation> {
    const apikey = uuidv4();

    const gameData: IGame = {
      email: data.email,
      name: data.name,
      apikey,
    };

    const games = await this.gameRepository.findAll({
      query: { email: data.email },
    });

    if (
      games.filter(
        (game) => game.name.toLowerCase() === data.name.toLowerCase(),
      ).length > 0
    )
      throw new GameAlreadyExists();

    const result: IGame = await this.gameRepository.create(gameData);

    return {
      apikey,
      name: result.name,
      warning: "DON'T FORGET TO STORE THE APIKEY",
    };
  }
}
