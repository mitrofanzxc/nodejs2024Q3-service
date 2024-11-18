import { Module } from '@nestjs/common';

import { ArtistService } from './service';
import { ArtistController } from './controller';
import { DatabaseService } from 'src/database/service';
import { PrismaService } from '../prisma/service';

@Module({
    controllers: [ArtistController],
    providers: [ArtistService, DatabaseService, PrismaService],
})
export class ArtistModule {}
