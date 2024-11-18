import { Module } from '@nestjs/common';

import { FavsService } from './service';
import { FavsController } from './controller';
import { PrismaService } from 'src/modules/prisma/service';

@Module({
    controllers: [FavsController],
    providers: [FavsService, PrismaService],
})
export class FavsModule {}
