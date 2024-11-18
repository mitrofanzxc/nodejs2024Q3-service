import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/service';

import { AlbumModule } from './modules/album/module';
import { ArtistModule } from './modules/artist/module';
import { FavsModule } from './modules/favs/module';
import { TrackModule } from './modules/track/module';
import { UserModule } from './modules/user/module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AlbumModule,
        ArtistModule,
        FavsModule,
        TrackModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService, DatabaseService],
})
export class AppModule {}
