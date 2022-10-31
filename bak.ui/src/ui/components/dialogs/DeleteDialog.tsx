import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react';
import axios from 'axios';
import * as React from 'react';
import { API_URL, axiosAuthHeaders } from '../../../utils/constants';

export interface DeleteDialogProps {
    isOpen: boolean;
    cancelRef: React.MutableRefObject<null>;
    onClose: () => void;
    entityToDeleteId: string;
    entityName: 'user' | 'org';
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
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
                            onClick={async (e) => {
                                if (props.entityName === 'user') {
                                    await axios.delete(
                                        API_URL +
                                            '/users/' +
                                            props.entityToDeleteId,
                                        axiosAuthHeaders
                                    );
                                }
                                if (props.entityName === 'org') {
                                    await axios.delete(
                                        API_URL +
                                            '/organizations/' +
                                            props.entityToDeleteId,
                                        axiosAuthHeaders
                                    );
                                }
                                props.refreshData(true);
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
