import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { DB_TOKEN } from 'src/database/database-token';

import { addEntityToCollection } from 'src/utils/add-entity-to-collection';
import { deleteEntityFromCollection } from 'src/utils/delete-entity-from-collection';
import { deleteIDFromFavsCollection } from 'src/utils/delete-id-from-favs-collection';
import { getEntityByID } from 'src/utils/get-entity-by-id';
import { replaceIDToNull } from 'src/utils/replace-id-to-null';
import { updateEntityInCollection } from 'src/utils/update-entity-in-collection';
import { validateIDFormat } from 'src/utils/validate-id-format';

import { Album, Artist, Track } from 'src/types/interfaces';
import { DatabaseInterface } from 'src/database/database';
import { CreateArtistDTO, UpdateArtistDTO } from './types';

@Injectable()
export class ArtistService {
    constructor(@Inject(DB_TOKEN) private readonly database: DatabaseInterface) {}

    private isInvalidDto(dto: CreateArtistDTO | UpdateArtistDTO) {
        return (
            !Object.keys(dto).includes('grammy') ||
            !dto.name ||
            typeof dto.grammy !== 'boolean' ||
            typeof dto.name !== 'string'
        );
    }

    async getArtists() {
        return this.database.artists;
    }

    async getArtistById(id: string | null) {
        return getEntityByID<Artist>(id, this.database.artists);
    }

    async createArtist(createArtistDto: CreateArtistDTO) {
        if (this.isInvalidDto(createArtistDto)) {
            throw new BadRequestException(
                'Request body does not contain required fields or their format is not correct',
            );
        } else {
            return addEntityToCollection(createArtistDto, this.database.artists);
        }
    }

    async deleteArtist(id: string | null) {
        deleteEntityFromCollection(id, this.database.artists);
        deleteIDFromFavsCollection(id, this.database.favs.artists);

        this.database.albums = replaceIDToNull<Album>(id, this.database.albums, 'artistId');
        this.database.tracks = replaceIDToNull<Track>(id, this.database.tracks, 'artistId');
    }

    async updateArtist(updateArtistDto: UpdateArtistDTO, id: string | null) {
        if (this.isInvalidDto(updateArtistDto)) {
            throw new BadRequestException(
                'Request body does not contain required fields or their format is not correct',
            );
        }

        validateIDFormat(id);

        const updatedArtist = updateEntityInCollection<Artist>(
            id,
            updateArtistDto,
            this.database.artists,
        );

        return updatedArtist;
    }
}
