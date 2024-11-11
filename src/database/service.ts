import { env } from 'node:process';
import { Provider } from '@nestjs/common';

import { DB_TOKEN } from './database-token';
import { DATABASE } from './database';

export const DatabaseService: Provider = {
    provide: env.TOKEN_DATABASE || DB_TOKEN,
    useValue: DATABASE,
};
