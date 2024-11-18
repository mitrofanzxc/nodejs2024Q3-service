import { BadRequestException } from '@nestjs/common';

export const validateIDFormat = (id: string | null) => {
    try {
        const matcher =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (!id.match(matcher)) {
            throw new BadRequestException(`User id ${id} is in wrong format`);
        }
    } catch {
        throw new BadRequestException(`User id is in wrong format`);
    }
};
