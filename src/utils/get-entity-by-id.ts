import { NotFoundException } from '@nestjs/common';

import { validateIDFormat } from './validate-id-format';

export const getEntityByID = <Type extends { id: string | null }>(
    id: string | null,
    collection: Type[],
): Type => {
    try {
        validateIDFormat(id);

        const entity = collection?.find((entity) => entity?.id === id);

        if (entity) {
            return entity;
        } else {
            throw new NotFoundException(`Entity with id ${id} not found`);
        }
    } catch {
        throw new NotFoundException(`Entity with id not found`);
    }
};
