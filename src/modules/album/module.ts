import { Module } from '@nestjs/common';

import { AlbumService } from './service';
import { AlbumController } from './controller';
import { DatabaseService } from 'src/database/service';

@Module({
    controllers: [AlbumController],
    providers: [AlbumService, DatabaseService],
})
export class AlbumModule {}
