import { Module } from '@nestjs/common';

import { ArtistService } from './service';
import { ArtistController } from './controller';
import { DatabaseService } from 'src/database/service';

@Module({
    controllers: [ArtistController],
    providers: [ArtistService, DatabaseService],
})
export class ArtistModule {}
