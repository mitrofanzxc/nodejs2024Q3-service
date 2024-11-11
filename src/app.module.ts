import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/service';
import { UserModule } from './modules/user/module';

@Module({
    imports: [ConfigModule.forRoot(), UserModule],
    controllers: [AppController],
    providers: [AppService, DatabaseService],
})
export class AppModule {}
