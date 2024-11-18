export class CreateUserDTO {
    readonly login: string | null;
    readonly password: string | null;
}

export class UpdateUserDTO {
    readonly oldPassword: string | null;
    readonly newPassword: string | null;
}
