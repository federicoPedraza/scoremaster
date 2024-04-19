import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IScoreboardValue, ScoreboardValue } from './scoreboard-value.entity';

export interface IScoreboard {
  _id?: Types.ObjectId;
  name: string;
  values: IScoreboardValue[];
}

@Schema({ versionKey: false, timestamps: false, _id: true })
export class Scoreboard extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    type: [ScoreboardValue],
    required: true,
    default: [],
  })
  values: ScoreboardValue[];
}

export const ScoreboardSchema = SchemaFactory.createForClass(Scoreboard);
