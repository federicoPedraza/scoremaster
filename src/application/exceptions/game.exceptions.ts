import { HttpStatus } from '@nestjs/common';
import { GenericHttpException } from './common.exceptions';

export class InvalidAPIKey extends GenericHttpException {
  constructor() {
    super('Invalid API Key', HttpStatus.UNAUTHORIZED, 'INVALID_API_KEY');
  }
}

export class GameAlreadyExists extends GenericHttpException {
  constructor() {
    super('Game already exists', HttpStatus.BAD_REQUEST, 'GAME_ALREADY_EXISTS');
  }
}
