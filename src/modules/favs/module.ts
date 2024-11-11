import { Module } from '@nestjs/common';

import { FavsService } from './service';
import { FavsController } from './controller';
import { DatabaseService } from 'src/database/service';

@Module({
    controllers: [FavsController],
    providers: [FavsService, DatabaseService],
})
export class FavsModule {}
