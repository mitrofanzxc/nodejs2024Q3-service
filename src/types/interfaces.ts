export interface User {
    id: string | null;
    login: string | null;
    password: string | null;
    version: number | null;
    createdAt: number | null;
    updatedAt: number | null;
}

export interface Artist {
    id: string | null;
    name: string | null;
    grammy: boolean;
}

export interface Album {
    id: string | null;
    name: string | null;
    year: number | null;
    artistId: string | null;
}

export interface Track {
    id: string | null;
    name: string | null;
    artistId: string | null;
    albumId: string | null;
    duration: number | null;
}

export interface FavoritesRequest {
    artists: string[];
    albums: string[];
    tracks: string[];
}

export interface FavoritesResponse {
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
}
