import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface IScoreboard {
  _id?: Types.ObjectId;
  name: string;
}

@Schema({ versionKey: false, timestamps: false, _id: true })
export class Scoreboard extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;
}

export const ScoreboardSchema = SchemaFactory.createForClass(Scoreboard);
