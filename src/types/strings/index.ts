export type Role = 'Admin' | 'User';

export type Classification = 'Veterinarian' | 'Specialist' | 'Customer';

export type AnimalType = 'Dog' | 'Cat';

export type CaseStatus = 'Filled' | 'Ongoing' | 'Completed' | 'Closed';

export type EntityTypes =
    | 'user'
    | 'animal'
    | 'case'
    | 'diagnosis'
    | 'result'
    | 'healthrecord'
    | 'recipe';
