import { Module } from '@nestjs/common';

import { TrackService } from './service';
import { TrackController } from './controller';
import { DatabaseService } from 'src/database/service';
import { PrismaService } from '../prisma/service';

@Module({
    controllers: [TrackController],
    providers: [TrackService, DatabaseService, PrismaService],
})
export class TrackModule {}
