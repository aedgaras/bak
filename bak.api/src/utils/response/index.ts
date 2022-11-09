interface ReturnMessage {
    message: string;
}

export const returnMessage = (info: string): ReturnMessage =>
    ({ message: info } as ReturnMessage);

/**
 * Response texts.
 */

export const ENTITY_DOESNT_EXIST = (entityName: string) =>
    returnMessage(`Entity: ${entityName}, doesn\'t exist.`);
export const ENTITY_ALREADY_EXIST = (entityName: string) =>
    returnMessage(`Entity: ${entityName}, already exists.`);
export const ENTITY_NOT_FOUND = (entityName: string) =>
    returnMessage(`Entity: ${entityName} not found.`);
export const ENTITY_UPDATED = (entityName: string, entityId: number) =>
    returnMessage(`Entity ${entityName} with id: ${entityId} was updated.`);
export const ENTITY_DELETED = (entityName: string, entityId: number) =>
    `returnMessage(Entity ${entityName} with id: ${entityId} was deleted.`);
