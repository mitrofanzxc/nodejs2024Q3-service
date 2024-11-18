import { Module } from '@nestjs/common';

import { UserService } from './service';
import { UserController } from './controller';
import { DatabaseService } from 'src/database/service';
import { PrismaService } from '../prisma/service';

@Module({
    controllers: [UserController],
    providers: [UserService, DatabaseService, PrismaService],
})
export class UserModule {}
