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

import { ArtistService } from './service';

import { ControllerName } from 'src/constants/controller';
import { Route } from 'src/constants/routes';

import { CreateArtistDTO, UpdateArtistDTO } from './types';

@Controller(ControllerName.ARTIST)
export class ArtistController {
    constructor(private readonly artistService: ArtistService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.artistService.getArtists();
    }

    @Get(Route.ID)
    @HttpCode(HttpStatus.OK)
    async getById(
        @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        id: string | null,
    ) {
        return await this.artistService.getArtistById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        createArtistDto: CreateArtistDTO,
    ) {
        return await this.artistService.createArtist(createArtistDto);
    }

    @Delete(Route.ID)
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        id: string | null,
    ) {
        await this.artistService.deleteArtist(id);
    }

    @Put(Route.ID)
    @HttpCode(HttpStatus.OK)
    async update(
        @Body(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        updateArtistDto: UpdateArtistDTO,
        @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        id: string | null,
    ) {
        return await this.artistService.updateArtist(updateArtistDto, id);
    }
}
