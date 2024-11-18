import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from 'src/modules/prisma/service';

import { CreateTrackDTO, UpdateTrackDTO } from './types';

@Injectable()
export class TrackService {
    constructor(private prisma: PrismaService) {}

    private async getExistedTrack(id: string) {
        const track = await this.prisma.track.findUnique({
            where: {
                id,
            },
        });

        if (!track) {
            throw new NotFoundException('Track with id ${id} not found');
        }

        return track;
    }

    async getTracks() {
        const tracks = await this.prisma.track.findMany();

        return tracks;
    }

    async getTrackById(id: string) {
        const track = await this.getExistedTrack(id);

        if (track) {
            return track;
        }
    }

    async createTrack(createTrackDto: CreateTrackDTO) {
        const newTrack = await this.prisma.track.create({
            data: {
                id: uuidv4(),
                ...createTrackDto,
            },
        });

        return newTrack;
    }

    async deleteTrack(id: string) {
        const track = await this.getExistedTrack(id);

        if (track) {
            await this.prisma.track.delete({
                where: {
                    id,
                },
            });
        }
    }

    async updateTrack(updateTrackDto: UpdateTrackDTO, id: string) {
        const track = await this.getExistedTrack(id);

        if (track) {
            const updatedTrack = await this.prisma.track.update({
                where: {
                    id,
                },
                data: {
                    ...track,
                    ...updateTrackDto,
                },
            });

            return updatedTrack;
        }
    }
}
