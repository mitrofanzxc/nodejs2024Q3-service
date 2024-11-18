import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from 'src/modules/prisma/service';

import { CreateArtistDTO, UpdateArtistDTO } from './types';

@Injectable()
export class ArtistService {
    constructor(private prisma: PrismaService) {}

    private async getExistedArtist(id: string) {
        const artist = await this.prisma.artist.findUnique({
            where: {
                id,
            },
        });

        if (!artist) {
            throw new NotFoundException(`Artist with id ${id} not found`);
        }

        return artist;
    }

    async getArtists() {
        const artists = await this.prisma.artist.findMany();

        return artists;
    }

    async getArtistById(id: string) {
        const artist = await this.getExistedArtist(id);

        if (artist) {
            return artist;
        }
    }

    async createArtist(createArtistDto: CreateArtistDTO) {
        const newArtist = await this.prisma.artist.create({
            data: {
                id: uuidv4(),
                ...createArtistDto,
            },
        });

        return newArtist;
    }

    async deleteArtist(id: string) {
        const artist = await this.getExistedArtist(id);

        if (artist) {
            await this.prisma.artist.delete({
                where: {
                    id,
                },
            });
        }
    }

    async updateArtist(updateArtistDto: UpdateArtistDTO, id: string) {
        const artist = await this.getExistedArtist(id);

        if (artist) {
            const updatedArtist = await this.prisma.artist.update({
                where: {
                    id,
                },
                data: {
                    ...artist,
                    ...updateArtistDto,
                },
            });

            return updatedArtist;
        }
    }
}
