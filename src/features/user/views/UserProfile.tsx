import {
    Avatar,
    Box,
    Button,
    Center,
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    SimpleGrid,
    Skeleton,
    Switch,
    Text,
    useToast,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Field, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GenericInput } from '../../../components';
import {
    validateEmail,
    validatePassword,
    validateUsername,
} from '../../../components/form/validation/validation';
import { BoxWithShadowMax } from '../../../components/wrappers';
import { queryClient } from '../../../lib/query';
import { useUserContext } from '../../../providers/UserProvider';
import { AuthService, UserService } from '../../../services';
import {
    ChangePasswordDto,
    UpdateProfileDto,
    UserDto,
} from '../../../types/dto';

export const UserProfile = () => {
    const { state } = useUserContext();
    const { t } = useTranslation();
    const { isLoading, data } = useQuery({
        queryKey: ['userProfile', state.name],
        queryFn: async () => {
            const userService = new UserService();

            return await userService.getUserById(state.userId?.toString()!);
        },
    });

    useEffect(() => {
        document.title = t('Pages.Profile');
    }, [state.name]);

    return (
        <SimpleGrid columns={[1, null, null, 2]} gap={4}>
            <ProfileSection user={data} isLoaded={!isLoading} />
            <ChangePasswordSection user={data} isLoaded={!isLoading} />
        </SimpleGrid>
    );
};

const ProfileSection = ({
    isLoaded,
    user,
}: {
    isLoaded: boolean;
    user: UserDto | undefined;
}) => {
    const { state, update } = useUserContext();
    const [edit, setEdit] = useState<boolean>(false);
    const { t } = useTranslation();
    const toast = useToast();

    return (
        <Skeleton isLoaded={isLoaded}>
            <BoxWithShadowMax>
                <Box p={2}>
                    <HStack sx={{ justifyContent: 'space-between' }}>
                        <Text>{t('Profile.Edit')}</Text>
                        <Switch
                            id="isChecked"
                            isChecked={edit}
                            onChange={() => setEdit(!edit)}
                        />
                    </HStack>
                    <Center>
                        <Avatar name={state.name} src={''} size={'2xl'} />
                    </Center>
                    <Formik
                        initialValues={user as UpdateProfileDto}
                        onSubmit={async (values, actions) => {
                            console.log(values);
                            actions.setSubmitting(true);
                            const dto: UpdateProfileDto = {
                                username: values.username ?? user?.username,
                                phoneNumber:
                                    values.phoneNumber ?? user?.phoneNumber,
                                email: values.email ?? user?.email,
                            };

                            const service = new AuthService();

                            await service.profile(user?.id!, dto).then((r) => {
                                actions.setSubmitting(false);
                                queryClient.invalidateQueries();

                                toast({
                                    status: 'success',
                                    title: t('Toast.Sucess'),
                                    description: t('Toast.Updated'),
                                });
                            });
                        }}
                    >
                        {({ handleSubmit, errors, touched, isSubmitting }) => (
                            <form onSubmit={handleSubmit}>
                                <GenericInput
                                    fieldName={'Username'}
                                    fieldType={'text'}
                                    isRequired={true}
                                    errorField={errors.username}
                                    touchedField={touched.username}
                                    validation={validateUsername}
                                    placeholder={state.name}
                                    fieldTitle={t('Form.Username')}
                                    disabled={!edit}
                                />
                                <GenericInput
                                    fieldTitle={t('Form.Email')}
                                    fieldName={'email'}
                                    fieldType={'email'}
                                    isRequired={true}
                                    errorField={errors.email}
                                    touchedField={touched.email}
                                    validation={validateEmail}
                                    disabled={!edit}
                                />
                                <GenericInput
                                    fieldTitle={t('Form.PhoneNumber')}
                                    fieldName={'phoneNumber'}
                                    fieldType={'phone'}
                                    isRequired={true}
                                    errorField={errors.phoneNumber}
                                    touchedField={touched.phoneNumber}
                                    validation={() => ''}
                                    disabled={!edit}
                                />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Center p={2}>
                                        <Button
                                            type="submit"
                                            isLoading={isSubmitting}
                                            color="teal"
                                            isDisabled={!edit}
                                        >
                                            {t('Form.Submit')}
                                        </Button>
                                    </Center>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </BoxWithShadowMax>
        </Skeleton>
    );
};

const ChangePasswordSection = ({
    isLoaded,
    user,
}: {
    isLoaded: boolean;
    user: UserDto | undefined;
}) => {
    const { state, update } = useUserContext();
    const [edit, setEdit] = useState<boolean>(false);
    const { t } = useTranslation();
    const toast = useToast();

    return (
        <Skeleton isLoaded={isLoaded}>
            <BoxWithShadowMax>
                <Box p={2}>
                    <HStack sx={{ justifyContent: 'space-between' }}>
                        <Text>{t('Profile.ChangePassword')}</Text>
                        <Switch
                            id="isChecked"
                            isChecked={edit}
                            onChange={() => setEdit(!edit)}
                        />
                    </HStack>
                    <Formik
                        initialValues={{} as ChangePasswordDto}
                        onSubmit={async (values, actions) => {
                            actions.setSubmitting(true);
                            const dto: ChangePasswordDto = {
                                oldPassword: values.oldPassword,
                                newPassword: values.newPassword,
                                newPasswordRepeated: values.newPasswordRepeated,
                            };

                            const service = new AuthService();

                            await service
                                .changePassword(user?.id!, dto)
                                .then((r) => {
                                    actions.setSubmitting(false);
                                    queryClient.invalidateQueries();
                                    toast({
                                        status: 'success',
                                        title: t('Toast.Sucess'),
                                        description: t('Toast.Updated'),
                                    });
                                });
                        }}
                    >
                        {({ handleSubmit, errors, touched, isSubmitting }) => (
                            <form onSubmit={handleSubmit}>
                                <FormControl
                                    isInvalid={
                                        !!errors.oldPassword &&
                                        touched.oldPassword
                                    }
                                    p={2}
                                    isRequired={true}
                                    isDisabled={!edit}
                                >
                                    <FormLabel>
                                        {t('Form.ChangePassword.OldPassword')}
                                    </FormLabel>
                                    <Field
                                        as={Input}
                                        type={'password'}
                                        name={'oldPassword'}
                                        validate={validatePassword}
                                    />

                                    <FormErrorMessage>
                                        <FormErrorIcon />
                                        {errors.oldPassword}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        !!errors.oldPassword &&
                                        touched.oldPassword
                                    }
                                    p={2}
                                    isRequired={true}
                                    isDisabled={!edit}
                                >
                                    <FormLabel>
                                        {t('Form.ChangePassword.NewPassword')}
                                    </FormLabel>
                                    <Field
                                        as={Input}
                                        type={'password'}
                                        name={'newPassword'}
                                        validate={validatePassword}
                                    />

                                    <FormErrorMessage>
                                        <FormErrorIcon />
                                        {errors.oldPassword}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        !!errors.oldPassword &&
                                        touched.oldPassword
                                    }
                                    p={2}
                                    isRequired={true}
                                    isDisabled={!edit}
                                >
                                    <FormLabel>
                                        {t(
                                            'Form.ChangePassword.NewPasswordRepeated'
                                        )}
                                    </FormLabel>
                                    <Field
                                        as={Input}
                                        type={'password'}
                                        name={'newPasswordRepeated'}
                                        validate={validatePassword}
                                    />

                                    <FormErrorMessage>
                                        <FormErrorIcon />
                                        {errors.oldPassword}
                                    </FormErrorMessage>
                                </FormControl>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Center p={2}>
                                        <Button
                                            type="submit"
                                            isLoading={isSubmitting}
                                            color="teal"
                                            isDisabled={!edit}
                                        >
                                            {t('Form.Submit')}
                                        </Button>
                                    </Center>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </BoxWithShadowMax>
        </Skeleton>
    );
};
