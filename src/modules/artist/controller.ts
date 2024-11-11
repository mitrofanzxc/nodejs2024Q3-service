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
    async getById(@Param('id') id: string | null) {
        return await this.artistService.getArtistById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createArtistDto: CreateArtistDTO) {
        return await this.artistService.createArtist(createArtistDto);
    }

    @Delete(Route.ID)
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string | null) {
        return await this.artistService.deleteArtist(id);
    }

    @Put(Route.ID)
    @HttpCode(HttpStatus.OK)
    async update(@Body() updateArtistDto: UpdateArtistDTO, @Param('id') id: string | null) {
        return await this.artistService.updateArtist(updateArtistDto, id);
    }
}
