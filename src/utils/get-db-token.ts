import { env } from 'node:process';

import { DB_TOKEN } from 'src/database/database-token';

export const getDatabaseToken = (): string => {
    try {
        return env.TOKEN_DATABASE || DB_TOKEN;
    } catch {
        return DB_TOKEN;
    }
};
