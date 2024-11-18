import { env } from 'node:process';

import { Injectable } from '@nestjs/common';

import { Route } from './constants/routes';

@Injectable()
export class AppService {
    getHello(): string {
        return `Welcome to Home Library Service: Part 1! Go to http://localhost:${
            env.PORT || 4000
        }/${Route.API}`;
    }
}
