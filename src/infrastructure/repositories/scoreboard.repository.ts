import { IScoreboard, Scoreboard } from 'src/domain/entities';
import { IRepository, Repository } from './repository.base';
import { Model } from 'mongoose';
import { Entity } from 'src/application/enums';
import { InjectModel } from '@nestjs/mongoose';

export interface IScoreboardRepository extends IRepository<IScoreboard> {}

export class ScoreboardRepository extends Repository<Scoreboard> {
  constructor(
    @InjectModel(Entity.Scoreboard)
    private readonly scoreboardModel: Model<Scoreboard>,
  ) {
    super(scoreboardModel);
  }
}
