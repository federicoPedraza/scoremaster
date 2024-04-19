import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateScoreboardDTO, PostScoreDTO } from 'src/application/dtos';
import {
  CreateScoreboardPresentation,
  DefaultApiResponse,
  GetScoreboardPresentation,
} from 'src/application/presentations';
import {
  CreateScoreboardV1,
  GetScoreboardV1,
  PostScoreV1,
} from 'src/application/use-cases';
import { ApiKeyGuard } from 'src/infrastructure/config/auth';

@Controller({
  version: '1',
  path: 'scoreboards',
})
@UseGuards(ApiKeyGuard)
export class ScoreboardControllerV1 {
  constructor(
    private readonly createScoreboardUseCase: CreateScoreboardV1,
    private readonly getScoreboardUseCase: GetScoreboardV1,
    private readonly postScoreUseCase: PostScoreV1,
  ) {}

  @Post('/')
  async create(
    @Body() body: CreateScoreboardDTO,
    @Request() req,
  ): Promise<DefaultApiResponse<CreateScoreboardPresentation>> {
    const scoreboard = await this.createScoreboardUseCase.exec(body, req.game);

    return {
      message: 'Scoreboard created successfully',
      info: scoreboard,
      status: HttpStatus.CREATED,
    };
  }

  @Get('/:name')
  async get(
    @Param('name') name: string,
    @Request()
    req,
  ): Promise<DefaultApiResponse<GetScoreboardPresentation>> {
    const scoreboard = await this.getScoreboardUseCase.exec(req.game, name);

    return {
      message: 'Scoreboard retrieved successfully',
      info: scoreboard,
      status: HttpStatus.FOUND,
    };
  }

  @Put('/:name')
  async post(
    @Body() body: PostScoreDTO,
    @Param('name') name: string,
    @Request()
    req,
  ): Promise<DefaultApiResponse<any>> {
    await this.postScoreUseCase.exec(req.game, name, body);

    return {
      message: 'Score posted successfully',
      status: HttpStatus.CREATED,
    };
  }
}
