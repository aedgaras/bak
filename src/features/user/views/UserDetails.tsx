import {
    Avatar,
    Box,
    CircularProgress,
    FormControl,
    FormLabel,
    HStack,
    Select,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Field, Formik } from 'formik';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GenericInput, SubmitButton } from '../../../components';
import { validateUsername } from '../../../components/form/validation/validation';
import { DataDisplay } from '../../../components/wrappers';
import { queryClient } from '../../../lib/query';
import { useUserContext } from '../../../providers/UserProvider';
import { UserService } from '../../../services';
import { UserDto } from '../../../types/dto';

export const UserDetails = () => {
    const { state } = useUserContext();
    const params = useParams();
    const isNotCreating = !!params.userId;
    const navigate = useNavigate();
    const userService = new UserService();

    const { isLoading, data, error, isFetching } = useQuery({
        queryKey: [`userDetails` + params.userId!],
        queryFn: async () => {
            return await userService.getUserById(params.userId);
        },
    });

    useMemo(async () => {
        document.title = 'Profile Creation';
        if (isNotCreating) {
            document.title = 'Profile Details';
        }
    }, [state.name]);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress isIndeterminate />
            </Box>
        );
    }

    return (
        <DataDisplay>
            {isNotCreating ? (
                <Avatar name={data?.username} src={''} size={'2xl'} />
            ) : null}
            <Formik
                initialValues={data ?? ({} as UserDto)}
                onSubmit={async (values, actions) => {
                    actions.setSubmitting(true);
                    if (!isNotCreating) {
                        await userService.api
                            .postRequest('/users/', {
                                username: values.username,
                                password: values.password,
                            })
                            .then((r) => {
                                actions.setSubmitting(false);
                                queryClient.invalidateQueries();
                                navigate(-1);
                            });
                    } else {
                        await userService.api
                            .putRequest('/users/' + values.id, {
                                username: values.username,
                            })
                            .then((r) => {
                                actions.setSubmitting(false);
                                queryClient.invalidateQueries();
                                navigate(-1);
                            });
                    }
                }}
            >
                {({ handleSubmit, errors, touched, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        {/* <Field
                                        as={Input}
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) => handleChange(e)}
                                    /> */}
                        <GenericInput
                            fieldTitle="Username"
                            fieldName={'Username'}
                            fieldType={'text'}
                            isRequired={true}
                            errorField={errors.username}
                            touchedField={touched.username}
                            validation={validateUsername}
                        />
                        <FormControl p={2}>
                            <FormLabel>Role</FormLabel>
                            <Field
                                as={Select}
                                placeholder={
                                    data?.role === 1 ? 'Admin' : 'User'
                                }
                            >
                                <option value={'Admin'}>Admin</option>
                                <option value={'User'}>User</option>
                            </Field>
                        </FormControl>
                        <HStack w={'100%'}>
                            <SubmitButton isSubmitting={isSubmitting} />
                        </HStack>
                    </form>
                )}
            </Formik>
        </DataDisplay>
    );
};
