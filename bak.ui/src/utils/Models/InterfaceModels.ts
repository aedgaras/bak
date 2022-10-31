import * as React from 'react';

export interface DialogBase {
    isOpen: boolean;
    cancelRef: React.MutableRefObject<null>;
    onClose: () => void;
    optionalText?: string;
}

export interface DeleteDialogProps extends DialogBase {
    entityToDeleteId: string;
}

export interface MenuDropdownProps extends DialogBase {
    onOpen: () => void;
}

export interface ElementChildren {
    element: JSX.Element;
}
