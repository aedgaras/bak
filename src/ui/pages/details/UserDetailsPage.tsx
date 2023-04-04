import {
    Avatar,
    FormControl,
    FormLabel,
    HStack,
    Select,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import {
    getUserById,
    postRequest,
    putRequest,
} from '../../../services/Requests';
import { UserDto } from '../../../utils/dto';
import { GenericInput, SubmitButton } from '../../components/form';
import { validateUsername } from '../../components/form/validation/validation';
import { AppWrapper } from '../../components/wrappers/AppWrapper';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const UserDetailsPage = () => {
    const { state } = useUserContext();
    const params = useParams();
    const isNotCreating = !!params.userId;
    const navigate = useNavigate();

    const { isLoading, data, error, isFetching } = useQuery({
        queryKey: [`user${params.userId}`],
        queryFn: async () => {
            return await getUserById(params.userId);
        },
    });

    useMemo(async () => {
        document.title = 'Profile Creation';
        if (isNotCreating) {
            document.title = 'Profile Details';
        }
    }, [state.name]);

    return (
        <AppWrapper>
            <DataDisplay
                isLoaded={!isLoading && !error && !isFetching}
                element={
                    <>
                        {isNotCreating ? (
                            <Avatar
                                name={data?.username}
                                src={''}
                                size={'2xl'}
                            />
                        ) : null}
                        <Formik
                            initialValues={data ?? ({} as UserDto)}
                            onSubmit={async (values, actions) => {
                                actions.setSubmitting(true);
                                if (!isNotCreating) {
                                    await postRequest('/users/', {
                                        username: values.username,
                                        password: values.password,
                                    }).then((r) => {
                                        actions.setSubmitting(false);
                                        navigate(-1);
                                    });
                                } else {
                                    await putRequest('/users/' + values.id, {
                                        username: values.username,
                                    }).then((r) => {
                                        actions.setSubmitting(false);
                                        navigate(-1);
                                    });
                                }
                            }}
                        >
                            {({
                                handleSubmit,
                                errors,
                                touched,
                                isSubmitting,
                            }) => (
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
                                        <Select
                                            placeholder={
                                                data?.role == 'Admin'
                                                    ? 'Admin'
                                                    : 'User'
                                            }
                                        >
                                            <option value={'Admin'}>
                                                Admin
                                            </option>
                                            <option value={'User'}>User</option>
                                        </Select>
                                    </FormControl>
                                    <HStack w={'100%'}>
                                        <SubmitButton
                                            isSubmitting={isSubmitting}
                                        />
                                    </HStack>
                                </form>
                            )}
                        </Formik>
                    </>
                }
            />
        </AppWrapper>
    );
};
