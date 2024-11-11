import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    ValidationPipe,
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
    async getById(
        @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        id: string | null,
    ) {
        return await this.albumService.getAlbumById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        createAlbumDto: CreateAlbumDTO,
    ) {
        return await this.albumService.createAlbum(createAlbumDto);
    }

    @Delete(Route.ID)
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        id: string | null,
    ) {
        return await this.albumService.deleteAlbum(id);
    }

    @Put(Route.ID)
    @HttpCode(HttpStatus.OK)
    async update(
        @Body(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        updateAlbumDto: UpdateAlbumDTO,
        @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        id: string | null,
    ) {
        return await this.albumService.updateAlbum(updateAlbumDto, id);
    }
}
