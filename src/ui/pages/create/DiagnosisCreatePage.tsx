import {
    Box,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    SimpleGrid,
    Textarea,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { Formik } from 'formik';

import { useTranslation } from 'react-i18next';
import { useUserContext } from '../../../context/UserContext';
import { UserRegisterDto } from '../../../utils/dto';
import { GenericInput, SubmitButton } from '../../components/form';
import { validateUsername } from '../../components/form/validation/validation';
import { AppWrapper } from '../../components/wrappers/AppWrapper';
import { BoxWithShadow } from '../../components/wrappers/BoxWithShadow';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const DiagnosisCreatePage = () => {
    const toast = useToast();
    const { t } = useTranslation();
    const healthRecords = ['healthRecord'];

    return (
        <AppWrapper>
            <DataDisplay
                isLoaded={true}
                element={
                    <SimpleGrid columns={[1, null, null, 2]} gap={4}>
                        <BoxWithShadow>
                            <VStack>
                                <Heading size={'lg'} sx={{ p: 2 }}>
                                    {t('Form.Diagnosis.Case')}
                                </Heading>
                                <Box p={2}>
                                    <FormControl py={2}>
                                        <FormLabel>
                                            {t('Form.Diangosis.Pulse')}
                                        </FormLabel>
                                        <Input type="text" disabled></Input>
                                    </FormControl>
                                    <FormControl pb={2}>
                                        <FormLabel>
                                            {t('Form.Diangosis.Description')}
                                        </FormLabel>
                                        <Textarea
                                            resize={'none'}
                                            disabled
                                        ></Textarea>
                                    </FormControl>
                                    <FormControl pb={2}>
                                        <FormLabel>
                                            {t('Form.Diangosis.AnimalType')}
                                        </FormLabel>
                                        <Input type="text" disabled></Input>
                                    </FormControl>
                                    <FormControl pb={2}>
                                        <FormLabel>
                                            {t('Form.Diangosis.CaseDate')}
                                        </FormLabel>
                                        <Input type="text" disabled></Input>
                                    </FormControl>
                                    <FormControl pb={2}>
                                        <FormLabel>
                                            {t('Form.Diangosis.Status')}
                                        </FormLabel>
                                        <Input type="text" disabled></Input>
                                    </FormControl>
                                    <FormControl pb={2}>
                                        <FormLabel>
                                            {t('Form.Diangosis.Priority')}
                                        </FormLabel>
                                        <Input type="text" disabled></Input>
                                    </FormControl>
                                </Box>
                            </VStack>
                        </BoxWithShadow>
                        <BoxWithShadow>
                            <VStack>
                                <Heading size={'lg'} sx={{ p: 2 }}>
                                    {t('Form.Diagnosis.Diangosis')}
                                </Heading>
                                <DiangosisCreationForm />
                            </VStack>
                        </BoxWithShadow>
                    </SimpleGrid>
                }
            />
        </AppWrapper>
    );
};

const DiangosisCreationForm = () => {
    const { state } = useUserContext();
    const diagnosisType = ['Case', 'Diagnosis', 'Result'];
    const { t } = useTranslation();

    return (
        <Formik
            initialValues={{} as UserRegisterDto}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
            }}
        >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <FormControl p={2}>
                        <FormLabel>{t('Form.Diagnosis.Type')}</FormLabel>
                        <Select>
                            {diagnosisType.map((key) => {
                                return (
                                    <option value={key}>{t(`${key}`)}</option>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <GenericInput
                        fieldTitle={t('Form.Diagnosis.Name')}
                        fieldName={'Name'}
                        fieldType={'string'}
                        isRequired={true}
                        errorField={errors.username}
                        touchedField={touched.username}
                        validation={validateUsername}
                    />
                    <GenericInput
                        fieldTitle={t('Form.Diagnosis.Description')}
                        fieldName={'Description'}
                        fieldType={'string'}
                        isRequired={true}
                        errorField={errors.username}
                        touchedField={touched.username}
                        validation={validateUsername}
                    />
                    <SubmitButton isSubmitting={isSubmitting} />
                </form>
            )}
        </Formik>
    );
};
