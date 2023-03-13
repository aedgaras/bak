import {Heading, useToast} from '@chakra-ui/react';
import {Formik} from 'formik';
import {useUserContext} from '../../../context/UserContext';
import {OrganizationDto} from '../../../utils/dto';
import {FormBox, GenericInput, SubmitButton} from '../../components/form';
import {validateUsername} from '../../components/form/validation/validation';
import {AppWrapper} from '../../components/wrappers/AppWrapper';
import {DataDisplay} from '../../components/wrappers/DataDisplay';

export const OrganizationCreatePage = () => {
    const toast = useToast();

    return (
        <AppWrapper>
            <DataDisplay
                isLoaded={true}
                element={
                    <FormBox
                        upperSection={<Heading>Orgaization Creation</Heading>}
                        innerForm={<OrganizationCreationForm/>}
                    />
                }
            />
        </AppWrapper>
    );
};

const OrganizationCreationForm = () => {
    const {state} = useUserContext();

    return (
        <Formik
            initialValues={{} as OrganizationDto}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
            }}
        >
            {({handleSubmit, errors, touched, isSubmitting}) => (
                <form onSubmit={handleSubmit}>
                    <GenericInput
                        fieldName={'Orgnization Name'}
                        fieldType={'string'}
                        isRequired={true}
                        errorField={errors.name}
                        touchedField={touched.name}
                        validation={validateUsername}
                    />
                    <SubmitButton isSubmitting={isSubmitting}/>
                </form>
            )}
        </Formik>
    );
};
