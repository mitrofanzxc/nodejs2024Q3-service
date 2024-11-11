import { Module } from '@nestjs/common';

import { UserService } from './service';
import { UserController } from './controller';
import { DatabaseService } from 'src/database/service';

@Module({
    controllers: [UserController],
    providers: [UserService, DatabaseService],
})
export class UserModule {}
