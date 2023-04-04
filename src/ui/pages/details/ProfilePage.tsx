import {
    Avatar,
    Grid,
    GridItem,
    HStack,
    Skeleton,
    VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../../../context/UserContext';
import { getUserByUsername, putRequest } from '../../../services';
import { UserDto } from '../../../utils/dto';
import { GenericInput, SubmitButton } from '../../components/form';
import { validateUsername } from '../../components/form/validation/validation';
import { AppWrapper } from '../../components/wrappers/AppWrapper';
import { BoxWithShadowMax } from '../../components/wrappers/BoxWithShadow';

export const ProfilePage = () => {
    const { state } = useUserContext();
    const { isLoading, data } = useQuery({
        queryKey: ['user', state.name],
        queryFn: async () => {
            return await getUserByUsername(state.name);
        },
    });

    useEffect(() => {
        document.title = 'Profile page';
    }, [state.name]);

    return (
        <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}
        >
            <GridItem rowSpan={2} colSpan={1}>
                <ProfileSection user={data} isLoaded={!isLoading} />
            </GridItem>
            <GridItem colSpan={2}>
                <Skeleton isLoaded={false}>
                    <BoxWithShadowMax>Profile</BoxWithShadowMax>
                </Skeleton>
            </GridItem>
            <GridItem colSpan={2}>
                <Skeleton isLoaded={false}>
                    <BoxWithShadowMax>Profile</BoxWithShadowMax>
                </Skeleton>
            </GridItem>
            <GridItem colSpan={4}>
                <Skeleton isLoaded={false}>
                    <BoxWithShadowMax>Profile</BoxWithShadowMax>
                </Skeleton>
            </GridItem>
        </Grid>
    );
};

const ProfileSection = ({
    isLoaded,
    user,
}: {
    isLoaded: boolean;
    user: UserDto | undefined;
}) => {
    const { state } = useUserContext();
    const [edit, setEdit] = useState<boolean>(false);
    const { t } = useTranslation();

    return (
        <AppWrapper>
            <Skeleton isLoaded={isLoaded}>
                <BoxWithShadowMax>
                    <VStack>
                        <Avatar name={state.name} src={''} size={'2xl'} />
                        <Formik
                            initialValues={user ?? ({} as UserDto)}
                            onSubmit={async (values, actions) => {
                                actions.setSubmitting(true);
                                await putRequest('/users/' + user?.id, {
                                    username: values.username,
                                }).then((r) => {
                                    actions.setSubmitting(false);
                                });
                            }}
                        >
                            {({
                                handleSubmit,
                                errors,
                                touched,
                                isSubmitting,
                            }) => (
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
                                    />
                                    <HStack w={'100%'}>
                                        {edit ? (
                                            <SubmitButton
                                                isSubmitting={isSubmitting}
                                            />
                                        ) : null}
                                    </HStack>
                                </form>
                            )}
                        </Formik>
                    </VStack>
                </BoxWithShadowMax>
            </Skeleton>
        </AppWrapper>
    );
};
