import { NotFoundException } from '@nestjs/common';

import { validateIDFormat } from './validate-id-format';

export const deleteEntityFromCollection = <Type extends { id: string | null }>(
    id: string | null,
    collection: Type[],
) => {
    try {
        validateIDFormat(id);

        const entity: Type = collection?.find((entity) => entity?.id === id);

        if (entity) {
            collection?.splice(collection?.indexOf(entity), 1);
        } else {
            throw new NotFoundException(`Entity with id ${id} not found`);
        }
    } catch {
        throw new NotFoundException(`Entity with id not found`);
    }
};
