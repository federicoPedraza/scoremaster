import { Game, IGame } from 'src/domain/entities';
import { IRepository, Repository } from './repository.base';
import { Model } from 'mongoose';
import { Entity } from 'src/application/enums';
import { InjectModel } from '@nestjs/mongoose';

export interface IGameRepository extends IRepository<IGame> {}

export class GameRepository extends Repository<Game> {
  constructor(
    @InjectModel(Entity.Game) private readonly gameModel: Model<Game>,
  ) {
    super(gameModel);
  }
}
