import { Module } from '@nestjs/common';

import { TrackService } from './service';
import { TrackController } from './controller';
import { DatabaseService } from 'src/database/service';

@Module({
    controllers: [TrackController],
    providers: [TrackService, DatabaseService],
})
export class TrackModule {}
