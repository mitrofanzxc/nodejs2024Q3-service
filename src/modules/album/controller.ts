import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import { AlbumService } from './service';

import { ControllerName } from 'src/constants/controller';
import { Route } from 'src/constants/routes';

import { CreateAlbumDTO, UpdateAlbumDTO } from './types';

@Controller(ControllerName.ALBUM)
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.albumService.getAlbums();
    }

    @Get(Route.ID)
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: string | null) {
        return await this.albumService.getAlbumById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createAlbumDTO: CreateAlbumDTO) {
        return await this.albumService.createAlbum(createAlbumDTO);
    }

    @Delete(Route.ID)
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string | null) {
        return await this.albumService.deleteAlbum(id);
    }

    @Put(Route.ID)
    @HttpCode(HttpStatus.OK)
    async update(@Body() updateAlbumDTO: UpdateAlbumDTO, @Param('id') id: string | null) {
        return await this.albumService.updateAlbum(updateAlbumDTO, id);
    }
}
