import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    ValidationPipe,
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
    async getById(
        @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        id: string | null,
    ) {
        return await this.userService.getUserById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        createUserDto: CreateUserDTO,
    ) {
        return await this.userService.createUser(createUserDto);
    }

    @Delete(Route.ID)
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        id: string | null,
    ) {
        await this.userService.deleteUser(id);
    }

    @Put(Route.ID)
    @HttpCode(HttpStatus.OK)
    async update(
        @Body(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        updateUserDto: UpdateUserDTO,
        @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
        id: string | null,
    ) {
        return await this.userService.updatePassword(updateUserDto, id);
    }
}
