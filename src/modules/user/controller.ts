import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import { UserService } from './service';

import { ControllerName } from 'src/constants/controller';
import { Route } from 'src/constants/routes';

import { CreateUserDTO, UpdateUserDTO } from './types';

@Controller(ControllerName.USER)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.userService.getUsers();
    }

    @Get(Route.ID)
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: string | null) {
        return await this.userService.getUserById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDTO: CreateUserDTO) {
        return await this.userService.createUser(createUserDTO);
    }

    @Delete(Route.ID)
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string | null) {
        return await this.userService.deleteUser(id);
    }

    @Put(Route.ID)
    @HttpCode(HttpStatus.OK)
    async update(@Body() updateUserDTO: UpdateUserDTO, @Param('id') id: string | null) {
        return await this.userService.updatePassword(updateUserDTO, id);
    }
}
