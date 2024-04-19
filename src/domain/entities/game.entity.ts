import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IMongoDBEntity } from './entity.base';
import { Entity } from 'src/application/enums';

export interface IGame extends IMongoDBEntity {
  name: string;
  email: string;
  apikey: string;
  scoreboards?: Types.ObjectId[];
}

export enum EGameStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
}

@Schema({ versionKey: false, timestamps: true })
export class Game extends Document implements IGame {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  apikey: string;

  @Prop({
    type: [Types.ObjectId],
    ref: Entity.Scoreboard,
    required: false,
  })
  scoreboards: Types.ObjectId[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
