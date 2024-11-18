import { Inject, Injectable } from '@nestjs/common';

import { DB_TOKEN } from 'src/database/database-token';

import { addIDToFavsCollection } from 'src/utils/add-id-to-favs-collection';
import { deleteEntityIDFromFavsCollection } from 'src/utils/delete-entity-id-from-favs-collection';

import { Album, Artist, FavoritesResponse, Track } from 'src/types/interfaces';
import { DatabaseInterface } from 'src/database/database';

@Injectable()
export class FavsService {
    constructor(@Inject(DB_TOKEN) private readonly database: DatabaseInterface) {}

    async getFavs() {
        const favsResponse: FavoritesResponse = {
            artists: [],
            albums: [],
            tracks: [],
        };

        Object.entries(this.database.favs).map(([key, value]) => {
            const favorites = value.map((favId: string) => {
                const favorite = this.database[key].find((el: any) => el.id === favId);

                return favorite;
            });

            favsResponse[key] = favorites;
        });

        return favsResponse;
    }

    async addTrack(id: string) {
        const track = addIDToFavsCollection<Track>(
            id,
            this.database.tracks,
            this.database.favs.tracks,
        );

        return track;
    }

    async addAlbum(id: string) {
        const album = addIDToFavsCollection<Album>(
            id,
            this.database.albums,
            this.database.favs.albums,
        );

        return album;
    }

    async addArtist(id: string) {
        const artist = addIDToFavsCollection<Artist>(
            id,
            this.database.artists,
            this.database.favs.artists,
        );

        return artist;
    }

    async deleteArtist(id: string) {
        deleteEntityIDFromFavsCollection(id, this.database.favs.artists);
    }

    async deleteAlbum(id: string) {
        deleteEntityIDFromFavsCollection(id, this.database.favs.albums);
    }

    async deleteTrack(id: string) {
        deleteEntityIDFromFavsCollection(id, this.database.favs.tracks);
    }
}
