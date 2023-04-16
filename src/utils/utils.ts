import jwtDecode from 'jwt-decode';
import { Classification, Role } from './Models';

export const sleep = async (milliseconds: number) => {
    await new Promise((resolve) => {
        return setTimeout(resolve, milliseconds);
    });
};

export const getJwtFromStorage = localStorage.getItem('accessToken');
export const getRefreshTokenFromStorage = localStorage.getItem('refreshToken');

export interface TokenPayload {
    accessToken: string;
    refreshToken: string;
}

interface Jwt {
    sub: string;
    role: Role;
    classification: Classification;
    exp: number;
    iss: string;
    aud: string;
    userId: number;
}

export const isJwtExpired = () => {
    const storedJwt = getJwtFromStorage;

    if (!storedJwt) {
        return undefined;
    }

    const decodedJwt: Jwt = jwtDecode(storedJwt);

    const expDate = new Date(decodedJwt.exp * 1000);
    const curDate = new Date();

    if (curDate > expDate) {
        return true;
    }

    return false;
};

export const isRefreshTokenExpired = () => {
    const storedJwt = getRefreshTokenFromStorage;

    if (!storedJwt) {
        return undefined;
    }

    const decodedJwt: Jwt = jwtDecode(storedJwt);

    const expDate = new Date(decodedJwt.exp * 1000);
    const curDate = new Date();

    if (curDate > expDate) {
        return true;
    }

    return false;
};

export const CaseValues = [
    { value: 0, key: 'Temporary' },
    { value: 1, key: 'Preliminary' },
    { value: 2, key: 'Final' },
];

export const getCaseType = (id: number) => {
    const type = id;
    if (type === 0) {
        return 'Temporary';
    } else if (type === 1) {
        return 'Preliminary';
    }

    return 'Final';
};

export const UrgencyValues = [
    { value: 0, key: 'Normal' },
    { value: 1, key: 'Urgent' },
];

export const getUrgencyType = (id: number) => {
    const type = id;
    if (type === 0) {
        return 'Normal';
    }

    return 'Urgent';
};

export const StatusValues = [
    { value: 0, key: 'Filled' },
    { value: 1, key: 'Ongoing' },
    { value: 2, key: 'Completed' },
    { value: 3, key: 'Closed' },
];

export const getStatusType = (id: number) => {
    const type = id;
    if (type === 0) {
        return 'Filled';
    } else if (type === 1) {
        return 'Ongoing';
    } else if (type === 2) {
        return 'Completed';
    }

    return 'Closed';
};

export const AnimalValues = [
    { value: 0, key: 'Dog' },
    { value: 1, key: 'Cat' },
];

export const getAnimalType = (id: number) => {
    const type = id;
    if (type === 0) {
        return 'Dog';
    }

    return 'Cat';
};

export const ClassificationValues = [
    { value: 0, key: 'Veterinarian' },
    { value: 1, key: 'On-Duty Veterinarian' },
    { value: 2, key: 'Customer' },
    { value: 3, key: 'Administrator' },
];

export const getClassificationType = (id: number) => {
    const type = id;
    if (type === 0) {
        return 'Veterinarian';
    } else if (type === 1) {
        return 'On-Duty Veterinarian';
    } else if (type === 2) {
        return 'Customer';
    }

    return 'Administrator';
};

export const RoleValues = [
    { value: 0, key: 'User' },
    { value: 1, key: 'Admin' },
];

export const getRoleType = (id: number) => {
    const type = id;
    if (type === 0) {
        return 'User';
    }

    return 'Admin';
};
