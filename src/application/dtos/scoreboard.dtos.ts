import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateScoreboardDTO {
  @ApiProperty({
    description:
      'Nombre del scoreboard, que se utilizara en el futuro como identificador unico',
    example: 'Killscore',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class PostScoreDTO {
  @ApiProperty({
    description: 'Username del usuario',
    example: 'Mike',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Puntaje obtenido',
    example: 55,
  })
  @IsNumber()
  @IsNotEmpty()
  score: number;
}
