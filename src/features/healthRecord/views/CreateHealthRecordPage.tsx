import {
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    Heading,
    Textarea,
    useToast,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { t } from 'i18next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { GenericInput, SubmitButton } from '../../../components';
import { DataDisplay, FormWrapper } from '../../../components/wrappers';
import { useUserContext } from '../../../providers/UserProvider';
import { HealthRecordService } from '../../../services';
import { CreateHealthRecordDto } from '../../../utils/dto';

export const CreateHealthRecordPage = () => {
    const toast = useToast();
    const { t } = useTranslation();

    useEffect(() => {
        document.title = t('Pages.HealthRecordCreate');
    }, []);

    return (
        <DataDisplay
            isLoaded={true}
            element={
                <FormWrapper>
                    <Heading size={'lg'} sx={{ p: 2 }}>
                        {t('Form.HealthRecordCreate')}
                    </Heading>
                    <HealthRecordCreationForm />
                </FormWrapper>
            }
        />
    );
};

const HealthRecordCreationForm = () => {
    const { state } = useUserContext();
    const params = useParams<{ animalId: string }>();
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{} as CreateHealthRecordDto}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                values = { ...values, animalId: parseInt(params.animalId!) };
                const service = new HealthRecordService();

                service.add(values).then(() => {
                    navigate(-1);
                });
            }}
        >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <GenericInput
                        fieldTitle={t('Form.HealthRecord.HeartRate')}
                        fieldName={'HeartRate'}
                        fieldType={'string'}
                        isRequired={true}
                        errorField={errors.heartRate}
                        touchedField={touched.heartRate}
                        validation={() => ''}
                    />

                    <FormControl
                        isInvalid={!!errors.description && touched.description}
                        p={2}
                        isRequired
                    >
                        <FormLabel>
                            {t('Form.HealthRecord.Description')}
                        </FormLabel>
                        <Field as={Textarea} type="text" name="description" />

                        <FormErrorMessage>
                            <FormErrorIcon />
                            {errors.description}
                        </FormErrorMessage>
                    </FormControl>
                    <SubmitButton isSubmitting={isSubmitting} />
                </form>
            )}
        </Formik>
    );
};
