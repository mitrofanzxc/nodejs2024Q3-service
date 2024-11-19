import { Module } from '@nestjs/common';

import { AlbumService } from './service';
import { AlbumController } from './controller';
import { PrismaService } from 'src/modules/prisma/service';

@Module({
    controllers: [AlbumController],
    providers: [AlbumService, PrismaService],
})
export class AlbumModule {}
