export class CreateAlbumDTO {
    readonly name: string | null;
    readonly year: number | null;
    readonly artistId: string | null;
}

export class UpdateAlbumDTO {
    readonly name: string | null;
    readonly year: number | null;
    readonly artistId: string | null;
}
