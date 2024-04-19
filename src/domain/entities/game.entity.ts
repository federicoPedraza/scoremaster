import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IMongoDBEntity } from './entity.base';

export interface IGame extends IMongoDBEntity {
  name: string;
  email: string;
  apikey: string;
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
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  apikey: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
