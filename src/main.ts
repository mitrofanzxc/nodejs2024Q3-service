import { env } from 'node:process';

import * as yamljs from 'yamljs';
import * as dotenv from 'dotenv';

import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { Route } from './constants/routes';

const PATH_TO_YAML = './doc/api.yaml';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const document: OpenAPIObject = yamljs.load(PATH_TO_YAML);
    const path = Route.API;

    SwaggerModule.setup(path, app, document);

    await app.listen(env.PORT);
}

bootstrap();
