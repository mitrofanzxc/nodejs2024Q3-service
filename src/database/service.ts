import { Provider } from '@nestjs/common';

import { DATABASE } from './database';

import { getDatabaseToken } from '../utils/get-db-token';

export const DatabaseService: Provider = {
    provide: getDatabaseToken(),
    useValue: DATABASE,
};
