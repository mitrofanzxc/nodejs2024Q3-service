import { NotFoundException } from '@nestjs/common';

import { validateIDFormat } from './validate-id-format';

export const deleteEntityIDFromFavsCollection = (id: string | null, collection: string[]) => {
    try {
        validateIDFormat(id);

        if (collection?.includes(id)) {
            const idx = collection?.indexOf(id);

            collection?.splice(idx, 1);
        } else {
            throw new NotFoundException(`Entity with id ${id} is not favorite`);
        }
    } catch {
        throw new NotFoundException(`Entity with id is not favorite`);
    }
};
