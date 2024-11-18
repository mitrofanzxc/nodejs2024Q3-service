import { validateIDFormat } from './validate-id-format';

export const isIDValid = (id: string | null) => {
    try {
        if (id) {
            validateIDFormat(id);
        }

        return typeof id === 'string' || id === null;
    } catch {
        return typeof id === 'string' || id === null;
    }
};
