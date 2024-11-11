import { v4 as uuidv4 } from 'uuid';
import { UnprocessableEntityException } from '@nestjs/common';

export const addEntityToCollection = <Type extends { id: string | null }>(
    entityDTO: Omit<Type, 'id'>,
    collection: Type[],
): Type => {
    try {
        const newEntity = {
            id: uuidv4(),
            ...entityDTO,
        } as Type;

        collection.push(newEntity);

        return newEntity;
    } catch {
        throw new UnprocessableEntityException(`Entity with id doesn't exist`);
    }
};
