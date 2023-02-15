import { hashedPassword } from '../../utils/utils';
import { Organization } from './models/Organization';
import { User } from './models/User';

export const seedInitialEntities = async () => {
    await seedInitialAdmin();
    await seedInitialUser();
    await seedInitialRandomUsers();
    await seedInitialOrganization();
    await seedInitialRandomOrganizations();
};

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
    const users = await User.findAndCountAll({
        where: {
            username: randomUserNames,
        },
    });

    if (users.count > 0) {
        return;
    }

    randomUserNames.map(async (name) => {
        const initialUser = await User.create({
            username: name,
            password: hashedPassword(name),
            role: 'user',
        });
        await initialUser.save();
    });
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

const seedInitialRandomOrganizations = async () => {
    const orgs = await Organization.findAndCountAll({
        where: {
            name: randomOrgNames,
        },
    });

    if (orgs.count > 0) {
        return;
    }

    randomOrgNames.map(async (name) => {
        const userForOrg = await User.findOne();

        const initialOrg = await Organization.create({
            name: name,
        });
        await initialOrg.save();
    });
};

const randomUserNames: string[] = [
    'testRandom1',
    'testRandom2',
    'testRandom3',
    'testRandom4',
    'testRandom5',
];

const randomOrgNames: string[] = [
    'testRandomOrg1',
    'testRandomOrg2',
    'testRandomOrg3',
    'testRandomOrg4',
    'testRandomOrg5',
];
