export const ENTITY_DOESNT_EXIST = (enityName: string) =>
    `Entity: ${enityName} doesn\'t exist.`;
export const ENTITY_ALREADY_EXIST = (enityName: string) =>
    `Entity: ${enityName} already exists.`;
export const ENTITY_NOT_FOUND = (enityName: string) =>
    `Entity: ${enityName} not found.`;

export interface ReturnMessage {
    message: string;
}

export const returnMessage = (info: string): ReturnMessage =>
    ({ message: info } as ReturnMessage);
