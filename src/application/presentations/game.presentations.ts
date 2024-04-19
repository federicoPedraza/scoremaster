export class CreateGamePresentation {
  apikey: string;
  name: string;
}

export class GameDetailsScoreboardPresentation {
  name: string;
  id: string;
}

export class GameDetailsPresentation {
  scoreboards: GameDetailsScoreboardPresentation[];
}
