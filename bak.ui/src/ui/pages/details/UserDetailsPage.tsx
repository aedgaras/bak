import {
    Avatar,
    FormControl,
    FormLabel,
    HStack,
    Select,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { ChangeEvent, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import {
    getUserById,
    postRequest,
    putRequest,
} from '../../../services/Requests';
import { UserModel } from '../../../utils/dto';
import { fileToBase64 } from '../../../utils/utils';
import { GenericInput, SubmitButton } from '../../components/form';
import { validateUsername } from '../../components/form/validation/validation';
import { AppWrapper } from '../../components/wrappers/AppWrapper';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const UserDetailsPage = () => {
    const userContext = useUserContext();
    const [user, setUser] = useState<UserModel>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const params = useParams();
    const isNotCreating = !!params.userId;
    const navigate = useNavigate();
    const [file, setFile] = useState<string>();
    const [image, setImage] = useState<string>();

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
        console.log(user);
        setIsLoaded(true);
    }, [userContext.name]);

    async function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const file = (await fileToBase64(e.target.files[0])) as string;
            setFile(file);
        }
    }

    function arrayBufferToBase64(buffer: any) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => (binary += String.fromCharCode(b)));
        return window.btoa(binary);
    }

    return (
        <AppWrapper>
            <DataDisplay
                isLoaded={isLoaded}
                element={
                    <>
                        {isNotCreating ? (
                            <Avatar
                                name={user?.username}
                                src={''}
                                size={'2xl'}
                            />
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
                                    let updateValues: Partial<UserModel> = {
                                        username: values.username,
                                    };
                                    if (file) {
                                        updateValues.avatar = file;
                                    }

                                    await putRequest(
                                        '/users/' + values.id,
                                        updateValues
                                    ).then((r) => {
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
                                            <option value={'admin'}>
                                                Admin
                                            </option>
                                            <option value={'user'}>User</option>
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
