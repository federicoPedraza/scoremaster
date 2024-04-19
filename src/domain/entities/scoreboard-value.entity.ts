import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface IScoreboardValue {
  _id?: Types.ObjectId;
  username: string;
  score: number;
}

@Schema({ versionKey: false, timestamps: false, _id: true })
export class ScoreboardValue extends Document {
  @Prop({
    type: String,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  score: number;
}

export const ScoreboardValueSchema =
  SchemaFactory.createForClass(ScoreboardValue);
