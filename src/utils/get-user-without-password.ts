import { User } from 'src/types/interfaces';

export const getUserWithoutPassword = (user: User): Omit<User, 'password'> | null => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    } catch {
        return null;
    }
};
