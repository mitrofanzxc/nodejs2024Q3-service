import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    readonly artistId: string | null;

    readonly albumId: string | null;

    readonly favoritesId: string | null;

    @IsNumber()
    @IsNotEmpty()
    readonly duration: number;
}

export class UpdateTrackDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    readonly artistId: string | null;

    readonly albumId: string | null;

    readonly favoritesId: string | null;

    @IsNumber()
    @IsNotEmpty()
    readonly duration: number;
}
