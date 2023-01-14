import { Heading, useToast } from '@chakra-ui/react';
import { Formik } from 'formik';
import { useUserContext } from '../../../context/UserContext';
import { UserRegisterDto } from '../../../utils/dto';
import { FormBox } from '../../components/form';
import { AppWrapper } from '../../components/wrappers/AppWrapper';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const UserCreatePage = () => {
    const toast = useToast();

    return (
        <AppWrapper>
            <DataDisplay
                isLoaded={true}
                element={
                    <FormBox
                        upperSection={<Heading>User Creation</Heading>}
                        innerForm={<UserCreationForm />}
                    />
                }
            />
        </AppWrapper>
    );
};

const UserCreationForm = () => {
    const { state } = useUserContext();

    return (
        <Formik
            initialValues={{} as UserRegisterDto}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
            }}
        >
            {({ handleSubmit }) => <form onSubmit={handleSubmit}></form>}
        </Formik>
    );
};
