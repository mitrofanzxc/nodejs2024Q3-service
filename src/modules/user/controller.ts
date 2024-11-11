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
import { CreateUserDTO, UpdateUserDTO } from './types';
import { UserService } from './service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.userService.getUsers();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: string | null) {
        return await this.userService.getUserById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDTO: CreateUserDTO) {
        return await this.userService.createUser(createUserDTO);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string | null) {
        return await this.userService.deleteUser(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Body() updateUserDTO: UpdateUserDTO, @Param('id') id: string | null) {
        return await this.userService.updatePassword(updateUserDTO, id);
    }
}
