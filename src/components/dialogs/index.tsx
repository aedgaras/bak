import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { queryClient } from '../../lib/query';
import {
    AnimalService,
    AuthService,
    CasesService,
    DiagnosisService,
    HealthRecordService,
    RecipeService,
    ResultsService,
    UserService,
} from '../../services';
import { ClosableObject, DeleteDialogProps } from '../interfaces';

const BaseDialog = ({
    isOpen,
    cancelRef,
    onClose,
    header,
    body,
    footer,
}: ClosableObject & {
    header: JSX.Element;
    body: JSX.Element;
    footer: JSX.Element;
}) => (
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
    >
        <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    {header}
                </AlertDialogHeader>

                <AlertDialogBody>{body}</AlertDialogBody>

                <AlertDialogFooter>{footer}</AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>
);

export const AboutToLogoutDialog = ({
    isOpen,
    cancelRef,
    onClose,
}: ClosableObject) => {
    const { t } = useTranslation();
    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Session expiry
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Your session is about to expire, do you want to continue
                        working?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={() => {
                                onClose();
                            }}
                            ml={3}
                        >
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export const DeleteDialog = ({
    isOpen,
    onClose,
    cancelRef,
    entity,
    id,
}: DeleteDialogProps) => {
    const { t } = useTranslation();

    return BaseDialog({
        isOpen: isOpen,
        onClose: onClose,
        cancelRef: cancelRef,
        header: <Text>{t('Table.Buttons.Delete')}</Text>,
        body: <Text>{t('Dialog.CantUndo')}</Text>,
        footer: (
            <>
                <Button ref={cancelRef} onClick={onClose}>
                    {t('Table.Buttons.Cancel')}
                </Button>
                <Button
                    colorScheme="red"
                    onClick={async (e) => {
                        if (entity === 'user') {
                            const service = new UserService();
                            await service.delete(parseInt(id));
                        } else if (entity === 'animal') {
                            const service = new AnimalService();
                            await service.delete(parseInt(id));
                        } else if (entity === 'case') {
                            const service = new CasesService();
                            await service.delete(parseInt(id));
                        } else if (entity === 'diagnosis') {
                            const service = new DiagnosisService();
                            await service.delete(parseInt(id));
                        } else if (entity === 'healthrecord') {
                            const service = new HealthRecordService();
                            await service.delete(parseInt(id));
                        } else if (entity === 'recipe') {
                            const service = new RecipeService();
                            await service.delete(parseInt(id));
                        } else if (entity === 'result') {
                            const service = new ResultsService();
                            await service.delete(parseInt(id));
                        }

                        await queryClient.invalidateQueries();

                        onClose();
                    }}
                    ml={3}
                >
                    {t('Table.Buttons.Delete')}
                </Button>
            </>
        ),
    });
};

export const LogoutDialog = ({
    isOpen,
    cancelRef,
    onClose,
    optionalText,
}: ClosableObject) => {
    const { t } = useTranslation();

    return BaseDialog({
        isOpen: isOpen,
        cancelRef: cancelRef,
        onClose: onClose,
        header: <Text>{t('Logout.Logout')}</Text>,
        body: <>{optionalText ? optionalText : t('Logout.AreYouSure')}</>,
        footer: (
            <>
                <Button ref={cancelRef} onClick={onClose}>
                    {t('Logout.Cancel')}
                </Button>
                <Button
                    colorScheme="red"
                    onClick={() => {
                        const authService = new AuthService();
                        authService.logout();
                        onClose();
                    }}
                    ml={3}
                >
                    {t('Logout.Button')}
                </Button>
            </>
        ),
    });
};
