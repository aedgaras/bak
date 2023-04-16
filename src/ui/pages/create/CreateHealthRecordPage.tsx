import { Heading, useToast, VStack } from '@chakra-ui/react';
import { Formik } from 'formik';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import { HealthRecordService } from '../../../services';
import { CreateHealthRecordDto } from '../../../utils/dto';
import { GenericInput, SubmitButton } from '../../components/form';
import { AppWrapper } from '../../components/wrappers/AppWrapper';
import { BoxWithBorder } from '../../components/wrappers/BoxWithShadow';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const CreateHealthRecordPage = () => {
    const toast = useToast();
    const { t } = useTranslation();

    return (
        <AppWrapper>
            <DataDisplay
                isLoaded={true}
                element={
                    <BoxWithBorder>
                        <VStack>
                            <Heading size={'lg'} sx={{ p: 2 }}>
                                {t('Form.HealthRecordCreate')}
                            </Heading>
                            <HealthRecordCreationForm />
                        </VStack>
                    </BoxWithBorder>
                }
            />
        </AppWrapper>
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

                service.addHealthRecord(values).then(() => {
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

                    <GenericInput
                        fieldTitle={t('Form.HealthRecord.Description')}
                        fieldName={'Description'}
                        fieldType={'string'}
                        isRequired={true}
                        errorField={errors.description}
                        touchedField={touched.description}
                        validation={() => ''}
                    />
                    <SubmitButton isSubmitting={isSubmitting} />
                </form>
            )}
        </Formik>
    );
};
