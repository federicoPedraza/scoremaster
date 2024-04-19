import { Inject, Logger } from '@nestjs/common';
import { CreateGameDTO } from 'src/application/dtos';
import { PORT } from 'src/application/enums';
import { IGame } from 'src/domain/entities';
import { IGameRepository } from 'src/infrastructure/repositories';
import { v4 as uuidv4 } from 'uuid';

export class CreateGameV1 {
  private readonly logger = new Logger(CreateGameV1.name);

  constructor(
    @Inject(PORT.Game) private readonly gameRepository: IGameRepository,
  ) {}

  async exec(data: CreateGameDTO): Promise<IGame> {
    const apikey = uuidv4();

    const gameData: IGame = {
      email: data.email,
      name: data.name,
      apikey,
    };

    return await this.gameRepository.create(gameData);
  }
}
