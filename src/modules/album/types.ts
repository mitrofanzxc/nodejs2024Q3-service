import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAlbumDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    readonly year: number;

    readonly favoritesId: string | null;

    readonly artistId: string | null;
}

export class UpdateAlbumDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    readonly year: number;

    readonly favoritesId: string | null;

    readonly artistId: string | null;
}
