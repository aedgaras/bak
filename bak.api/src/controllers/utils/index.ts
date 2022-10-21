import { Response } from 'express';
import { ENTITY_NOT_FOUND } from '../../utils/response/ResponseTexts';
import { returnMessage } from '../../utils/response/ResponseUtils';

export const entityNotFoundResponseLogic = <T>(
    entity: T | null,
    entityName: string,
    res: Response
) => {
    if (!entity) {
        return res
            .sendStatus(404)
            .json(returnMessage(ENTITY_NOT_FOUND(entityName)));
    } else {
        return res.json(entity);
    }
};
