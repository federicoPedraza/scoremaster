import { IsNotEmpty, IsString } from 'class-validator';

export class CreateScoreboardDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
