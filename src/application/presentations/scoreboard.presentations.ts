import { IScoreboardValue } from 'src/domain/entities';

export class CreateScoreboardPresentation {
  name: string;
  id: string;
}

export class GetScoreboardPresentation {
  name: string;
  values: IScoreboardValue[];
  game: string;
}
