import { HttpStatus } from '@nestjs/common';
import { GenericHttpException } from './common.exceptions';

export class ScoreboardAlreadyExists extends GenericHttpException {
  constructor() {
    super(
      'Scoreboard already exists',
      HttpStatus.BAD_REQUEST,
      'SCOREBOARD_ALREADY_EXISTS',
    );
  }
}

export class ScoreboardNotFound extends GenericHttpException {
  constructor() {
    super('Scoreboard not found', HttpStatus.NOT_FOUND, 'SCOREBOARD_NOT_FOUND');
  }
}
