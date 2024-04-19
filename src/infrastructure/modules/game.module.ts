import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Game, GameSchema } from 'src/domain/entities';
import { PORT } from 'src/application/enums';
import * as UseCase from 'src/application/use-cases';
import { GameControllerV1 } from '../controllers/v1/game.controller';
import { GameRepository } from '../repositories';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
  controllers: [GameControllerV1],
  providers: [
    UseCase.CreateGameV1,
    { provide: PORT.Game, useClass: GameRepository },
  ],
  exports: [],
})
export class GameModule {}
