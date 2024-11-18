import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly grammy: boolean;

    readonly favoritesId: string | null;
}

export class UpdateArtistDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly grammy: boolean;

    readonly favoritesId: string | null;
}
