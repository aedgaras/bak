import {
    Avatar,
    FormControl,
    FormLabel,
    HStack,
    Select,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import {
    getUserById,
    postRequest,
    putRequest,
} from '../../../services/Requests';
import { UserModel } from '../../../utils/dto';
import { validateUsername } from '../../../utils/validation/validation';
import { DataDisplay } from '../../components/datadisplay/generic/DataDisplay';
import {
    GenericInput,
    SubmitButton,
} from '../../components/datadisplay/generic/form';

export const UserDetailsPage = () => {
    const userContext = useUserContext();
    const [user, setUser] = useState<UserModel>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const params = useParams();
    const isNotCreating = !!params.userId;
    const navigate = useNavigate();

    useMemo(async () => {
        document.title = 'Profile Creation';
        if (isNotCreating) {
            document.title = 'Profile Details';
            if (params.userId) {
                await getUserById(params.userId).then((r) => {
                    setUser(r);
                    setIsLoaded(true);
                });
            }
        }
        setIsLoaded(true);
    }, [userContext.name]);

    return (
        <DataDisplay
            isLoaded={isLoaded}
            element={
                <>
                    {isNotCreating ? (
                        <Avatar name={user?.username} src={''} size={'2xl'} />
                    ) : null}
                    <Formik
                        initialValues={user ?? ({} as UserModel)}
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
                        {({ handleSubmit, errors, touched, isSubmitting }) => (
                            <form onSubmit={handleSubmit}>
                                <GenericInput
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
                                            user?.role == 'admin'
                                                ? 'Admin'
                                                : 'User'
                                        }
                                    >
                                        <option value={'admin'}>Admin</option>
                                        <option value={'user'}>User</option>
                                    </Select>
                                </FormControl>
                                <HStack w={'100%'}>
                                    <SubmitButton isSubmitting={isSubmitting} />
                                </HStack>
                            </form>
                        )}
                    </Formik>
                </>
            }
        />
    );
};
