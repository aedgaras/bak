import { Heading, useToast } from '@chakra-ui/react';
import { Formik } from 'formik';
import { useUserContext } from '../../../context/UserContext';
import { UserRegisterDto } from '../../../utils/dto';
import { FormBox, GenericInput, SubmitButton } from '../../components/form';
import { validateUsername } from '../../components/form/validation/validation';
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
            {({ handleSubmit, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <GenericInput
                        fieldName={'User Name'}
                        fieldType={'string'}
                        isRequired={true}
                        errorField={errors.name}
                        touchedField={touched.name}
                        validation={validateUsername}
                    />
                    <SubmitButton isSubmitting={isSubmitting} />
                </form>
            )}
        </Formik>
    );
};
