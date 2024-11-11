import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { DB_TOKEN } from 'src/database/database-token';

import { addEntityToCollection } from 'src/utils/add-entity-to-collection';
import { deleteEntityFromCollection } from 'src/utils/delete-entity-from-collection';
import { deleteIDFromFavsCollection } from 'src/utils/delete-id-from-favs-collection';
import { getEntityByID } from 'src/utils/get-entity-by-id';
import { isIDValid } from 'src/utils/is-id-valid';
import { replaceIDToNull } from 'src/utils/replace-id-to-null';
import { updateEntityInCollection } from 'src/utils/update-entity-in-collection';
import { validateIDFormat } from 'src/utils/validate-id-format';

import { Track, Album } from 'src/types/interfaces';
import { DatabaseInterface } from 'src/database/database';
import { CreateAlbumDTO, UpdateAlbumDTO } from './types';

@Injectable()
export class AlbumService {
    constructor(@Inject(DB_TOKEN) private readonly database: DatabaseInterface) {}

    private isInvalidDTO(dto: CreateAlbumDTO | UpdateAlbumDTO) {
        return (
            !dto.name ||
            typeof dto.year !== 'number' ||
            typeof dto.name !== 'string' ||
            !isIDValid(dto.artistId)
        );
    }

    async getAlbums() {
        return this.database.albums;
    }

    async getAlbumById(id: string) {
        return getEntityByID<Album>(id, this.database.albums);
    }

    async createAlbum(createAlbumDTO: CreateAlbumDTO) {
        if (this.isInvalidDTO(createAlbumDTO)) {
            throw new BadRequestException(
                'Request body does not contain required fields or their format is not correct',
            );
        } else {
            return addEntityToCollection(createAlbumDTO, this.database.albums);
        }
    }

    async deleteAlbum(id: string) {
        deleteEntityFromCollection(id, this.database.albums);

        this.database.tracks = replaceIDToNull<Track>(id, this.database.tracks, 'albumId');

        deleteIDFromFavsCollection(id, this.database.favs.albums);
    }

    async updateAlbum(updateAlbumDTO: UpdateAlbumDTO, id: string) {
        if (this.isInvalidDTO(updateAlbumDTO)) {
            throw new BadRequestException(
                'Request body does not contain required fields or their format is not correct',
            );
        }

        validateIDFormat(id);

        const updatedAlbum = updateEntityInCollection<Album>(
            id,
            updateAlbumDTO,
            this.database.albums,
        );

        return updatedAlbum;
    }
}
