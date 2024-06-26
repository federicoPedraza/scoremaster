import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Game,
  GameSchema,
  Scoreboard,
  ScoreboardSchema,
} from 'src/domain/entities';
import { PORT } from 'src/application/enums';
import * as UseCase from 'src/application/use-cases';
import { GameRepository } from '../repositories';
import { GameControllerV1 } from '../controllers';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: Scoreboard.name, schema: ScoreboardSchema },
    ]),
  ],
  controllers: [GameControllerV1],
  providers: [
    UseCase.CreateGameV1,
    UseCase.GetGameDetailsV1,
    { provide: PORT.Game, useClass: GameRepository },
  ],
  exports: [],
})
export class GameModule {}
