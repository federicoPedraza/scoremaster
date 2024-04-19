import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateScoreboardDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class PostScoreDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNumber()
  @IsNotEmpty()
  score: number;
}
