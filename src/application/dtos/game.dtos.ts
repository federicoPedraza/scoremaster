import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDTO {
  @ApiProperty({
    description: 'Email usado para referencias',
    example: 'mike@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Nombre del juego',
    example: 'Minecraft',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
