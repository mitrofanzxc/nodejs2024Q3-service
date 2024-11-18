import { UnprocessableEntityException } from '@nestjs/common';

import { validateIDFormat } from './validate-id-format';

export const addIDToFavsCollection = <Type extends { id: string | null }>(
    id: string | null,
    collection: Type[],
    favsCollection: string[],
): Type => {
    try {
        validateIDFormat(id);

        if (favsCollection?.includes(id)) {
            throw new UnprocessableEntityException(`Entity with id ${id} is already in favorites`);
        }

        const entity = collection?.find((entity) => entity?.id === id);

        if (entity) {
            favsCollection.push(id);

            return entity;
        } else {
            throw new UnprocessableEntityException(`Entity with id ${id} doesn't exist`);
        }
    } catch {
        throw new UnprocessableEntityException(`Entity with id doesn't exist`);
    }
};
