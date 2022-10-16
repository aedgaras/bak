import { Organization } from '../../models/Organization';
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

    await initialAdmin.save();
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

    await initialUser.save();
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
        await initialUser.save();
    });
};

export const seedInitialUsers = async () => {
    await seedInitialAdmin();
    await seedInitialUser();
    await seedInitialRandomUsers();
};

export const seedInitialOrganization = async () => {
    const organizations = await Organization.findAndCountAll({
        where: {
            name: 'organization',
        },
    });

    if (organizations.count > 0) {
        return;
    }

    const initialOrg = await Organization.create({
        name: 'organization',
    });

    await initialOrg.save();

    const users = await User.update(
        { OrganizationId: 1 },
        {
            where: {
                OrganizationId: null,
            },
        }
    );
};
