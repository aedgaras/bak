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
import { DialogBase } from '../../../utils/Models/InterfaceModels';

export const LogoutDialog = ({
    isOpen,
    cancelRef,
    onClose,
    optionalText,
}: DialogBase) => {
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
