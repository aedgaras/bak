import * as React from 'react';
import { EntityTypes } from '../../utils/constants';

export interface ClosableObject {
    isOpen: boolean;
    cancelRef: React.MutableRefObject<null>;
    onClose: () => void;
    optionalText?: string;
}

export interface DeleteDialogProps extends ClosableObject {
    entity: EntityTypes;
    id: string;
}

export interface MenuDropdownProps extends ClosableObject {
    onOpen: () => void;
}

export interface ElementChildren {
    element: JSX.Element;
}
