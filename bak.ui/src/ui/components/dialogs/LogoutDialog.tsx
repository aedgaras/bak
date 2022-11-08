import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react';
import { logout } from '../../../services/Authentication';
import { ClosableObject } from '../interfaces';

export const LogoutDialog = ({
    isOpen,
    cancelRef,
    onClose,
    optionalText,
}: ClosableObject) => {
    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Logout
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {optionalText
                            ? optionalText
                            : 'Are you sure you want to logout?'}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={() => {
                                logout();
                                onClose();
                            }}
                            ml={3}
                        >
                            Logout
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};
