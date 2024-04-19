import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Game,
  GameSchema,
  Scoreboard,
  ScoreboardSchema,
  ScoreboardValue,
  ScoreboardValueSchema,
} from 'src/domain/entities';
import { PORT } from 'src/application/enums';
import * as UseCase from 'src/application/use-cases';
import { GameRepository, ScoreboardRepository } from '../repositories';
import { ScoreboardControllerV1 } from '../controllers';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: Scoreboard.name, schema: ScoreboardSchema },
      { name: ScoreboardValue.name, schema: ScoreboardValueSchema },
    ]),
  ],
  controllers: [ScoreboardControllerV1],
  providers: [
    UseCase.CreateScoreboardV1,
    UseCase.GetScoreboardV1,
    UseCase.PostScoreV1,
    { provide: PORT.Game, useClass: GameRepository },
    { provide: PORT.Scoreboard, useClass: ScoreboardRepository },
  ],
  exports: [],
})
export class ScoreboardModule {}
