import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
