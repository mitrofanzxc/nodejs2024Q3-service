import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    readonly login: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}

export class UpdateUserDTO {
    @IsString()
    @IsNotEmpty()
    readonly oldPassword: string;

    @IsString()
    @IsNotEmpty()
    readonly newPassword: string;
}
