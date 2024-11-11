import { Module } from '@nestjs/common';

import { UserService } from './service';
import { UserController } from './controller';
import { DatabaseService } from 'src/database/service';

@Module({
    providers: [UserService, DatabaseService],
    controllers: [UserController],
})
export class UserModule {}
