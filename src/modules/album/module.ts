import { Module } from '@nestjs/common';

import { AlbumService } from './service';
import { AlbumController } from './controller';
import { DatabaseService } from 'src/database/service';
import { PrismaService } from '../prisma/service';

@Module({
    controllers: [AlbumController],
    providers: [AlbumService, DatabaseService, PrismaService],
})
export class AlbumModule {}
