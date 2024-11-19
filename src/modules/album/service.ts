import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from 'src/modules/prisma/service';

import { CreateAlbumDTO, UpdateAlbumDTO } from './types';

@Injectable()
export class AlbumService {
    constructor(private prisma: PrismaService) {}

    private async getExistedAlbum(id: string) {
        const album = await this.prisma.album.findUnique({
            where: {
                id,
            },
        });

        if (!album) {
            throw new NotFoundException('Album with id ${id} not found');
        }

        return album;
    }

    async getAlbums() {
        const albums = await this.prisma.album.findMany();

        return albums;
    }

    async getAlbumById(id: string) {
        const album = await this.getExistedAlbum(id);

        if (album) {
            return album;
        }
    }

    async createAlbum(createAlbumDto: CreateAlbumDTO) {
        const newAlbum = await this.prisma.album.create({
            data: {
                id: uuidv4(),
                ...createAlbumDto,
            },
        });

        return newAlbum;
    }

    async deleteAlbum(id: string) {
        const album = await this.getExistedAlbum(id);

        if (album) {
            await this.prisma.album.delete({
                where: {
                    id,
                },
            });
        }
    }

    async updateAlbum(updateAlbumDto: UpdateAlbumDTO, id: string) {
        const album = await this.getExistedAlbum(id);

        if (album) {
            const updatedAlbum = await this.prisma.album.update({
                where: {
                    id,
                },
                data: {
                    ...album,
                    ...updateAlbumDto,
                },
            });

            return updatedAlbum;
        }
    }
}
