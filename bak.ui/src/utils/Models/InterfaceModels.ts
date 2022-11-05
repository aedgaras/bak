import * as React from 'react';

export interface ClosableObject {
    isOpen: boolean;
    cancelRef: React.MutableRefObject<null>;
    onClose: () => void;
    optionalText?: string;
}

export interface DeleteDialogProps extends ClosableObject {
    entityToDeleteId: string;
    entityName: 'user' | 'org';
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MenuDropdownProps extends ClosableObject {
    onOpen: () => void;
}

export interface ElementChildren {
    element: JSX.Element;
}
