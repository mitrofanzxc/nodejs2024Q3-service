import { Module } from '@nestjs/common';

import { UserService } from './service';
import { UserController } from './controller';
import { PrismaService } from 'src/modules/prisma/service';

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService],
})
export class UserModule {}
