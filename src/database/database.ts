import { Album, Artist, FavoritesRequest, Track, User } from 'src/types/interfaces';

export interface DatabaseInterface {
    albums: Album[];
    artists: Artist[];
    tracks: Track[];
    users: User[];
    favs: FavoritesRequest;
}

export const DATABASE: DatabaseInterface = {
    albums: [],
    artists: [],
    tracks: [],
    users: [],
    favs: {
        artists: [],
        albums: [],
        tracks: [],
    },
};
