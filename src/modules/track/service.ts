import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { DB_TOKEN } from 'src/database/database-token';

import { addEntityToCollection } from 'src/utils/add-entity-to-collection';
import { deleteEntityFromCollection } from 'src/utils/delete-entity-from-collection';
import { deleteIDFromFavsCollection } from 'src/utils/delete-id-from-favs-collection';
import { getEntityByID } from 'src/utils/get-entity-by-id';
import { isIDValid } from 'src/utils/is-id-valid';
import { updateEntityInCollection } from 'src/utils/update-entity-in-collection';
import { validateIDFormat } from 'src/utils/validate-id-format';

import { Track } from 'src/types/interfaces';
import { DatabaseInterface } from 'src/database/database';
import { CreateTrackDTO, UpdateTrackDTO } from './types';

@Injectable()
export class TrackService {
    constructor(@Inject(DB_TOKEN) private readonly database: DatabaseInterface) {}

    private isInvalidDto(dto: CreateTrackDTO | UpdateTrackDTO) {
        return !dto.name || !isIDValid(dto.albumId) || !isIDValid(dto.artistId);
    }

    async getTracks() {
        return this.database.tracks;
    }

    async getTrackById(id: string) {
        return getEntityByID<Track>(id, this.database.tracks);
    }

    async createTrack(createTrackDto: CreateTrackDTO) {
        if (this.isInvalidDto(createTrackDto)) {
            throw new BadRequestException(
                'Request body does not contain required fields or their format is not correct',
            );
        } else {
            return addEntityToCollection(createTrackDto, this.database.tracks);
        }
    }

    async deleteTrack(id: string) {
        deleteEntityFromCollection(id, this.database.tracks);
        deleteIDFromFavsCollection(id, this.database.favs.tracks);
    }

    async updateTrack(updateTrackDto: UpdateTrackDTO, id: string) {
        if (this.isInvalidDto(updateTrackDto)) {
            throw new BadRequestException(
                'Request body does not contain required fields or their format is not correct',
            );
        }

        validateIDFormat(id);

        const updatedTrack = updateEntityInCollection<Track>(
            id,
            updateTrackDto,
            this.database.tracks,
        );

        return updatedTrack;
    }
}
