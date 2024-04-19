import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: INestApplication<any>) => {
  const options = new DocumentBuilder()
    .setTitle('Scoremaster API')
    .setDescription("Scoremaster's documentation")
    .setVersion('1.0')
    .addTag('Scoremaster')
    .addApiKey(null, 'x-apikey')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document, {});
};
