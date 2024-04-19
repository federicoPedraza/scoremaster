import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateGameDTO } from 'src/application/dtos';
import {
  CreateGamePresentation,
  DefaultApiResponse,
  GameDetailsPresentation,
} from 'src/application/presentations';
import { CreateGameV1, GetGameDetailsV1 } from 'src/application/use-cases';
import { ApiKeyGuard } from 'src/infrastructure/config/auth';

@Controller({
  version: '1',
  path: 'games',
})
export class GameControllerV1 {
  constructor(
    private readonly createGameUseCase: CreateGameV1,
    private readonly getGameDetailsUseCase: GetGameDetailsV1,
  ) {}

  @Post('register')
  async register(
    @Body() body: CreateGameDTO,
  ): Promise<DefaultApiResponse<CreateGamePresentation>> {
    const game = await this.createGameUseCase.exec(body);

    return {
      message: 'Game registered successfully',
      info: game,
      status: HttpStatus.CREATED,
    };
  }

  @Get('/')
  @UseGuards(ApiKeyGuard)
  async details(
    @Request() req,
  ): Promise<DefaultApiResponse<GameDetailsPresentation>> {
    const game = await this.getGameDetailsUseCase.exec(req.game);

    return {
      message: 'Game details retrieved successfully',
      info: game,
      status: HttpStatus.CREATED,
    };
  }
}
