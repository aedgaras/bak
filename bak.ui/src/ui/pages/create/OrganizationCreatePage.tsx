import { Heading, useToast } from '@chakra-ui/react';
import { Formik } from 'formik';
import { useUserContext } from '../../../context/UserContext';
import { OrganizationDto } from '../../../utils/dto';
import { FormBox } from '../../components/form';
import { AppWrapper } from '../../components/wrappers/AppWrapper';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const OrganizationCreatePage = () => {
    const toast = useToast();

    return (
        <AppWrapper>
            <DataDisplay
                isLoaded={true}
                element={
                    <FormBox
                        upperSection={<Heading>Orgaization Creation</Heading>}
                        innerForm={<OrganizationCreationForm />}
                    />
                }
            />
        </AppWrapper>
    );
};

const OrganizationCreationForm = () => {
    const { state } = useUserContext();

    return (
        <Formik
            initialValues={{} as OrganizationDto}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
            }}
        >
            {({ handleSubmit }) => <form onSubmit={handleSubmit}></form>}
        </Formik>
    );
};
