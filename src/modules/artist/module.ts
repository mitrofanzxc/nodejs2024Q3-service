import { Module } from '@nestjs/common';

import { ArtistService } from './service';
import { ArtistController } from './controller';
import { PrismaService } from 'src/modules/prisma/service';

@Module({
    controllers: [ArtistController],
    providers: [ArtistService, PrismaService],
})
export class ArtistModule {}
