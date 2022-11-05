import {
    Avatar,
    Button,
    Divider,
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Select,
    Skeleton,
    VStack,
} from '@chakra-ui/react';
import axios, { AxiosResponse } from 'axios';
import { Field, Formik } from 'formik';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import { API_URL, axiosAuthHeaders } from '../../../utils/constants';
import { UserRegisterDto } from '../../../utils/dto/User';
import { UserModel } from '../../../utils/Models/Models';
import { validateUsername } from '../../../utils/validation/validation';
import { BackButton } from '../../components/navigation/BackButton';
import { BoxWithShadow } from '../../components/wrappers/BoxWithShadow';

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
            await axios
                .get<UserModel>(
                    `${API_URL}/users/${params.userId}`,
                    axiosAuthHeaders
                )
                .then((r: AxiosResponse<UserModel>) => {
                    setUser(r.data);
                    setIsLoaded(true);
                });
        }
        setIsLoaded(true);
    }, [userContext.name]);

    return (
        <Skeleton isLoaded={isLoaded}>
            <BoxWithShadow>
                <VStack p={1}>
                    <HStack w={'100%'}>
                        <BackButton />
                    </HStack>
                    <Divider />
                    {isNotCreating ? (
                        <Avatar name={user?.username} src={''} size={'2xl'} />
                    ) : null}
                    <Formik
                        initialValues={user ?? ({} as UserModel)}
                        onSubmit={async (values, actions) => {
                            actions.setSubmitting(true);
                            if (!isNotCreating) {
                                await axios
                                    .post(
                                        API_URL + '/users/',
                                        {
                                            username: values.username,
                                            password: values.password,
                                        } as UserRegisterDto,
                                        axiosAuthHeaders
                                    )
                                    .then((r) => {
                                        actions.setSubmitting(false);
                                        navigate(-1);
                                    });
                            } else {
                                await axios
                                    .put(
                                        API_URL + '/users/' + values.id,
                                        {
                                            username: values.username,
                                        } as UserRegisterDto,
                                        axiosAuthHeaders
                                    )
                                    .then((r) => {
                                        actions.setSubmitting(false);
                                        navigate(-1);
                                    });
                            }
                        }}
                    >
                        {({ handleSubmit, errors, touched, isSubmitting }) => (
                            <form onSubmit={handleSubmit}>
                                <FormControl
                                    isInvalid={
                                        !!errors.username && touched.username
                                    }
                                    p={2}
                                >
                                    <FormLabel>Username</FormLabel>
                                    <Field
                                        as={Input}
                                        type="text"
                                        name="username"
                                        validate={(value: string) =>
                                            validateUsername(value)
                                        }
                                    />

                                    <FormErrorMessage>
                                        <FormErrorIcon />
                                        {errors.username}
                                    </FormErrorMessage>
                                </FormControl>
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
                                    <Button
                                        type="submit"
                                        isLoading={isSubmitting}
                                        color="teal"
                                    >
                                        Submit
                                    </Button>
                                </HStack>
                            </form>
                        )}
                    </Formik>
                </VStack>
            </BoxWithShadow>
        </Skeleton>
    );
};
