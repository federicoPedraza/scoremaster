import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CreateGameDTO } from 'src/application/dtos';
import {
  CreateGamePresentation,
  DefaultApiResponse,
} from 'src/application/presentations';
import { CreateGameV1 } from 'src/application/use-cases';

@Controller({
  version: '1',
  path: 'games',
})
export class GameControllerV1 {
  constructor(private readonly createGameUseCase: CreateGameV1) {}

  @Post('register')
  async register(
    @Body() body: CreateGameDTO,
  ): Promise<DefaultApiResponse<CreateGamePresentation>> {
    const game = await this.createGameUseCase.exec(body);

    return {
      message: 'Game registered successful',
      info: game,
      status: HttpStatus.CREATED,
    };
  }
}
