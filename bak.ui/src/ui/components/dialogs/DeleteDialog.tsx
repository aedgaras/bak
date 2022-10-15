import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react';
import * as React from 'react';

export interface DeleteDialogProps {
    isOpen: boolean;
    cancelRef: React.MutableRefObject<null>;
    onClose: () => void;
    entityToDeleteId: string;
}

export const DeleteDialog = (props: DeleteDialogProps) => {
    return (
        <AlertDialog
            isOpen={props.isOpen}
            leastDestructiveRef={props.cancelRef}
            onClose={props.onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete User
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={props.cancelRef} onClick={props.onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={(e) => {
                                console.log(props.entityToDeleteId);
                                props.onClose();
                            }}
                            ml={3}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};
