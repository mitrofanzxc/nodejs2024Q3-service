export class CreateTrackDTO {
    readonly name: string | null;
    readonly artistId: string | null;
    readonly albumId: string | null;
    readonly duration: number | null;
}

export class UpdateTrackDTO {
    readonly name: string | null;
    readonly artistId: string | null;
    readonly albumId: string | null;
    readonly duration: number | null;
}
