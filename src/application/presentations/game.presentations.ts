import { ApiProperty } from '@nestjs/swagger';

export class CreateGamePresentation {
  @ApiProperty({
    description: 'APIKey unica para este juego',
    example: '9397ce38-6d1e-45db-9d6a-cf18dd5a2f6a',
  })
  apikey: string;

  @ApiProperty({
    description: 'Nombre del juego',
    example: 'Minecraft',
  })
  name: string;

  @ApiProperty({
    description: 'Aviso importante: RECORDA GUARDAR LA APIKEY',
  })
  warning: string;
}

export class GameDetailsScoreboardPresentation {
  @ApiProperty({
    description: 'Nombre del scoreboard',
    example: 'Minecraft',
  })
  name: string;

  @ApiProperty({
    description: 'ID del scoreboard',
    example: '662282096011716ed620e3f2',
  })
  id: string;
}

export class GameDetailsPresentation {
  @ApiProperty({
    description: 'Lista de nombre de todos los scoreboards',
  })
  scoreboards: GameDetailsScoreboardPresentation[];
}
