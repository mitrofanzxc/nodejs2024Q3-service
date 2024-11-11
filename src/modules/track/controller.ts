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

import { TrackService } from './service';

import { ControllerName } from 'src/constants/controller';
import { Route } from 'src/constants/routes';

import { CreateTrackDTO, UpdateTrackDTO } from './types';

@Controller(ControllerName.TRACK)
export class TrackController {
    constructor(private readonly trackService: TrackService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.trackService.getTracks();
    }

    @Get(Route.ID)
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: string | null) {
        return await this.trackService.getTrackById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTrackDto: CreateTrackDTO) {
        return await this.trackService.createTrack(createTrackDto);
    }

    @Delete(Route.ID)
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string | null) {
        return await this.trackService.deleteTrack(id);
    }

    @Put(Route.ID)
    @HttpCode(HttpStatus.OK)
    async update(@Body() updateTrackDto: UpdateTrackDTO, @Param('id') id: string | null) {
        return await this.trackService.updateTrack(updateTrackDto, id);
    }
}
