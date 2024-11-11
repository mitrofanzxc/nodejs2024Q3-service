import { UnprocessableEntityException } from '@nestjs/common';

export const replaceIDToNull = <Type extends { id: string | null }>(
    id: string | null,
    collection: Type[],
    keyToNull: string | null,
): Type[] => {
    try {
        const updatedCollection = collection?.map((entity: Type) => {
            if (entity?.[keyToNull] === id) {
                return {
                    ...entity,
                    [keyToNull]: null,
                };
            } else {
                return entity;
            }
        });

        return updatedCollection;
    } catch (error) {
        throw new UnprocessableEntityException(`Entity with id doesn't exist`);
    }
};
