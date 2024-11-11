import { NotFoundException } from '@nestjs/common';

export const updateEntityInCollection = <Type extends { id: string | null }>(
    id: string | null,
    entityDTO: Partial<Type>,
    collection: Type[],
): Type => {
    try {
        const entity = collection?.find((entity) => entity?.id === id);

        if (entity) {
            const updatedEntity = {
                ...entity,
                ...entityDTO,
            };
            const index = collection?.indexOf(entity);

            collection[index] = updatedEntity;

            return updatedEntity;
        } else {
            throw new NotFoundException(`Entity with id ${id} not found`);
        }
    } catch {
        throw new NotFoundException(`Entity with id not found`);
    }
};
