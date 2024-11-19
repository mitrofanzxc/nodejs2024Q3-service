import { Module } from '@nestjs/common';

import { TrackService } from './service';
import { TrackController } from './controller';
import { PrismaService } from 'src/modules/prisma/service';

@Module({
    controllers: [TrackController],
    providers: [TrackService, PrismaService],
})
export class TrackModule {}
