import { Module } from '@nestjs/common';

import { FavsService } from './service';
import { FavsController } from './controller';
import { DatabaseService } from 'src/database/service';
import { PrismaService } from '../prisma/service';

@Module({
    controllers: [FavsController],
    providers: [FavsService, DatabaseService, PrismaService],
})
export class FavsModule {}
