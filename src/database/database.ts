import { Album, Artist, FavoritesRequest, Track, User } from 'src/types/interfaces';

export interface InterfaceDatabase {
    albums: Album[];
    artists: Artist[];
    tracks: Track[];
    users: User[];
    favs: FavoritesRequest;
}

export const DATABASE: InterfaceDatabase = {
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
