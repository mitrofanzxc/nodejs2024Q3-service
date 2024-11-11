import { env } from 'node:process';
import { load } from 'yamljs';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Route } from './constants/routes';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const document: OpenAPIObject = load(Route.YAML);
    const path = Route.API;

    SwaggerModule.setup(path, app, document);

    await app.listen(env.PORT);
}

bootstrap();
