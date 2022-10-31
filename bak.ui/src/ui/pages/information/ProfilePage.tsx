import {
    Avatar,
    Button,
    Divider,
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    HStack,
    Input,
    Skeleton,
    Spacer,
    Switch,
    Text,
    Tooltip,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import axios, { AxiosResponse } from 'axios';
import { Field, Formik } from 'formik';
import { useContext, useMemo, useRef, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import { API_URL, axiosAuthHeaders } from '../../../utils/constants';
import { UserModel } from '../../../utils/Models/Models';
import { validateUsername } from '../../../utils/validation/validation';
import { AppWrapper } from '../../components/wrappers/AppWrapper';
import { BoxWithShadowMax } from '../../components/wrappers/BoxWithShadow';

export const ProfilePage = () => {
    const userContext = useContext(UserContext);
    const [user, setUser] = useState<UserModel>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    document.title = 'Profile page';

    useMemo(async () => {
        await axios
            .get<UserModel>(
                `${API_URL}/users/getByUsername/${userContext.name}`,
                axiosAuthHeaders
            )
            .then((r: AxiosResponse<UserModel>) => {
                setUser(r.data);
                setIsLoaded(true);
            });
    }, [userContext.name]);

    return (
        <AppWrapper>
            <Grid
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={4}
            >
                <GridItem rowSpan={2} colSpan={1}>
                    <ProfileSection user={user} isLoaded={isLoaded} />
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
        </AppWrapper>
    );
};

interface ProfileSectionProps {
    isLoaded: boolean;
    user: UserModel | undefined;
}

const ProfileSection = ({ isLoaded, user }: ProfileSectionProps) => {
    const userContext = useContext(UserContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const [edit, setEdit] = useState<boolean>(false);

    return (
        <Skeleton isLoaded={isLoaded}>
            <BoxWithShadowMax>
                <VStack>
                    <HStack w={'100%'}>
                        <Text>Edit Profile</Text>
                        <Spacer />
                        <Tooltip label="Changing current values requires logout.">
                            <Switch onChange={() => setEdit(!edit)} />
                        </Tooltip>
                    </HStack>
                    <Divider />
                    <Avatar name={userContext.name} src={''} size={'2xl'} />
                    <Formik
                        initialValues={user ?? ({} as UserModel)}
                        onSubmit={async (values, actions) => {
                            actions.setSubmitting(true);
                            console.log(user);
                            await axios
                                .put(
                                    API_URL + '/users/' + user?.id,
                                    {
                                        username: values.username,
                                    },
                                    axiosAuthHeaders
                                )
                                .then((r) => {
                                    actions.setSubmitting(false);
                                });
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
                                        placeholder={userContext.name}
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
                                <HStack w={'100%'}>
                                    {edit ? (
                                        <Button
                                            type="submit"
                                            color="teal"
                                            isLoading={isSubmitting}
                                        >
                                            Submit
                                        </Button>
                                    ) : null}
                                </HStack>
                            </form>
                        )}
                    </Formik>
                </VStack>
            </BoxWithShadowMax>
        </Skeleton>
    );
};
