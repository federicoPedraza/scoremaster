import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import * as Config from 'src/infrastructure/config';
import * as Modules from 'src/infrastructure/modules';
import { GameMiddleware } from './infrastructure/config/middlewares';
import { PORT } from './application/enums';
import { GameRepository } from './infrastructure/repositories';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Game,
  GameSchema,
  Scoreboard,
  ScoreboardSchema,
} from './domain/entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get('RATE_LIMIT_TTL'),
          limit: config.get('RATE_LIMIT_COUT'),
        },
      ],
    }),
    Config.MongoDBModule,
    Modules.GameModule,
    Modules.ScoreboardModule,
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: Scoreboard.name, schema: ScoreboardSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [GameMiddleware, { provide: PORT.Game, useClass: GameRepository }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GameMiddleware).forRoutes('*');
  }
}
