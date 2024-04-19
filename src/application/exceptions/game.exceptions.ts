import { HttpStatus } from '@nestjs/common';
import { GenericHttpException } from './common.exceptions';

export class InvalidAPIKey extends GenericHttpException {
  constructor() {
    super('Invalid API Key', HttpStatus.UNAUTHORIZED, 'INVALID_API_KEY');
  }
}
