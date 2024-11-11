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
    async getById(
        @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        id: string | null,
    ) {
        return await this.trackService.getTrackById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        createTrackDto: CreateTrackDTO,
    ) {
        return await this.trackService.createTrack(createTrackDto);
    }

    @Delete(Route.ID)
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        id: string | null,
    ) {
        return await this.trackService.deleteTrack(id);
    }

    @Put(Route.ID)
    @HttpCode(HttpStatus.OK)
    async update(
        @Body(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        updateTrackDto: UpdateTrackDTO,
        @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        id: string | null,
    ) {
        return await this.trackService.updateTrack(updateTrackDto, id);
    }
}
