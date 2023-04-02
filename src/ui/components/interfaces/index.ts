import * as React from "react";
import { Dispatch } from "react";

export interface ClosableObject {
  isOpen: boolean;
  cancelRef: React.MutableRefObject<null>;
  onClose: () => void;
  optionalText?: string;
}

export interface DeleteDialogProps extends ClosableObject {
  entityToDeleteId: string;
  entityName: "user" | "org";
  refreshData: Dispatch<unknown>;
}

export interface MenuDropdownProps extends ClosableObject {
  onOpen: () => void;
}

export interface ElementChildren {
  element: JSX.Element;
}
