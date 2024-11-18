import { v4 as uuidv4 } from 'uuid';
import {
    BadRequestException,
    ForbiddenException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { DatabaseInterface } from 'src/database/database';
import { DB_TOKEN } from 'src/database/database-token';

import { deleteEntityFromCollection } from 'src/utils/delete-entity-from-collection';
import { getEntityByID } from 'src/utils/get-entity-by-id';
import { validateIDFormat } from 'src/utils/validate-id-format';
import { getUserWithoutPassword } from 'src/utils/get-user-without-password';

import { CreateUserDTO, UpdateUserDTO } from './types';
import { User } from 'src/types/interfaces';

@Injectable()
export class UserService {
    constructor(@Inject(DB_TOKEN) private readonly database: DatabaseInterface) {}

    async getUsers() {
        return this.database.users.map((user) => getUserWithoutPassword(user));
    }

    async getUserById(id: string | null) {
        validateIDFormat(id);

        const user = getEntityByID(id, this.database.users);

        if (user) {
            return getUserWithoutPassword(user);
        }
    }

    async createUser(userDTO: CreateUserDTO) {
        if (
            !userDTO.login ||
            !userDTO.password ||
            typeof userDTO.login !== 'string' ||
            typeof userDTO.password !== 'string'
        ) {
            throw new BadRequestException(
                'Request body does not contain required fields or their format is not correct',
            );
        }

        const currentTimestamp = Date.now();
        const newUser = {
            ...userDTO,
            id: uuidv4(),
            version: 1,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        };

        this.database.users.push(newUser);

        return getUserWithoutPassword(newUser);
    }

    async deleteUser(id: string | null) {
        deleteEntityFromCollection(id, this.database.users);
    }

    async updatePassword(updateUserDTO: UpdateUserDTO, id: string | null) {
        if (
            !updateUserDTO.oldPassword ||
            !updateUserDTO.newPassword ||
            typeof updateUserDTO.oldPassword !== 'string' ||
            typeof updateUserDTO.newPassword !== 'string'
        ) {
            throw new BadRequestException(
                'Request body does not contain required fields or their format is not correct',
            );
        }

        validateIDFormat(id);

        const user: User = this.database.users.find((user) => user.id === id);

        if (user) {
            if (updateUserDTO.oldPassword !== user.password) {
                throw new ForbiddenException('Old password is wrong');
            }

            const updatedUser = {
                ...user,
                password: updateUserDTO.newPassword,
                version: user.version + 1,
                updatedAt: Date.now(),
            };
            const userIdx = this.database.users.indexOf(user);

            this.database.users[userIdx] = updatedUser;

            return getUserWithoutPassword(updatedUser);
        } else {
            throw new NotFoundException(`User with id ${id} not found`);
        }
    }
}
