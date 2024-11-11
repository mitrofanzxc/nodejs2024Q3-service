import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';

import { FavsService } from './service';

import { ControllerName } from 'src/constants/controller';
import { Route } from 'src/constants/routes';

@Controller(ControllerName.FAVS)
export class FavsController {
    constructor(private readonly favsService: FavsService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.favsService.getFavs();
    }

    @Post(Route.TRACK_ID)
    @HttpCode(HttpStatus.CREATED)
    async addFavTrack(@Param('id') id: string | null) {
        return await this.favsService.addTrack(id);
    }

    @Post(Route.ALBUM_ID)
    @HttpCode(HttpStatus.CREATED)
    async addFavAlbum(@Param('id') id: string | null) {
        return await this.favsService.addAlbum(id);
    }

    @Post(Route.ARTIST_ID)
    @HttpCode(HttpStatus.CREATED)
    async addFavArtist(@Param('id') id: string | null) {
        return await this.favsService.addArtist(id);
    }

    @Delete(Route.ARTIST_ID)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteFAvArtist(@Param('id') id: string | null) {
        return await this.favsService.deleteArtist(id);
    }

    @Delete(Route.ALBUM_ID)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteFavAlbum(@Param('id') id: string | null) {
        return await this.favsService.deleteAlbum(id);
    }

    @Delete(Route.TRACK_ID)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteFavTrack(@Param('id') id: string | null) {
        return await this.favsService.deleteTrack(id);
    }
}
