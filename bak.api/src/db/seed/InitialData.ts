import { User } from '../../models/User';
import { hashedPassword } from '../../utils/utils';

const seedInitialAdmin = async () => {
    const users = await User.findAndCountAll({
        where: {
            username: 'admin',
        },
    });

    if (users.count > 0) {
        return;
    }

    const initialAdmin = await User.create({
        username: 'admin',
        password: hashedPassword('admin'),
        role: 'admin',
    });

    initialAdmin.save();
};

const seedInitialUser = async () => {
    const users = await User.findAndCountAll({
        where: {
            username: 'user',
        },
    });

    if (users.count > 0) {
        return;
    }

    const initialUser = await User.create({
        username: 'user',
        password: hashedPassword('user'),
        role: 'user',
    });

    initialUser.save();
};

const seedInitialRandomUsers = async () => {
    const randomNames: string[] = [
        'testRandom1',
        'testRandom2',
        'testRandom3',
        'testRandom4',
        'testRandom5',
    ];
    const users = await User.findAndCountAll({
        where: {
            username: randomNames,
        },
    });

    if (users.count > 0) {
        return;
    }

    randomNames.map(async (name) => {
        const initialUser = await User.create({
            username: name,
            password: hashedPassword(name),
            role: 'user',
        });
        initialUser.save();
    });
};

export const seedInitialUsers = async () => {
    seedInitialAdmin();
    seedInitialUser();
    seedInitialRandomUsers();
};
