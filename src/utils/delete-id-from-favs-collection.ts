import { NotFoundException } from '@nestjs/common';

export const deleteIDFromFavsCollection = (id: string | null, collection: string[]) => {
    try {
        if (collection?.includes(id)) {
            const idx = collection?.indexOf(id);

            collection?.splice(idx, 1);
        }
    } catch {
        throw new NotFoundException(`Entity with id not found`);
    }
};
