import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Select,
    SimpleGrid,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../../../context/UserContext';
import { UserRegisterDto } from '../../../utils/dto';
import { Classification } from '../../../utils/Models';
import { GenericInput, SubmitButton } from '../../components/form';
import {
    validatePassword,
    validateUsername,
} from '../../components/form/validation/validation';
import { AppWrapper } from '../../components/wrappers/AppWrapper';
import { BoxWithShadow } from '../../components/wrappers/BoxWithShadow';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const DiagnosisResultsCreatePage = () => {
    const toast = useToast();
    const { t } = useTranslation();

    return (
        <AppWrapper>
            <DataDisplay
                isLoaded={true}
                element={
                    <BoxWithShadow>
                        <VStack>
                            <Heading size={'lg'} sx={{ p: 2 }}>
                                {t('Form.DiagnosisResult.Create')}
                            </Heading>
                            <DiagnosisResultsCreationForm />
                        </VStack>
                    </BoxWithShadow>
                }
            />
        </AppWrapper>
    );
};

const DiagnosisResultsCreationForm = () => {
    const { state } = useUserContext();
    const specification: Classification[] = ['Veterinarian', 'Specialist'];
    const users = ['user'];
    const userAnimals = ['animal'];
    const diagnosis = ['diagnosis'];
    const resultType = ['resultType'];

    return (
        <Formik
            initialValues={{} as UserRegisterDto}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
            }}
        >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <SimpleGrid columns={[1, null, null, 2]}>
                        <Box>
                            <FormControl p={2} isRequired>
                                <FormLabel>
                                    {t('Form.Diagnosis.Result.User')}
                                </FormLabel>
                                <Select>
                                    {users.map((key) => {
                                        return (
                                            <option value={key}>{key}</option>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl p={2}>
                                <FormLabel>
                                    {t('Form.Diagnosis.Result.Animal')}
                                </FormLabel>
                                <Select>
                                    {userAnimals.map((key) => {
                                        return (
                                            <option value={key}>{key}</option>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl p={2}>
                                <FormLabel>
                                    {t('Form.Diagnosis.Result.Diangosis')}
                                </FormLabel>
                                <Select>
                                    {diagnosis.map((key) => {
                                        return (
                                            <option value={key}>{key}</option>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl p={2}>
                                <FormLabel>
                                    {t('Form.Diagnosis.Result.ResultType')}
                                </FormLabel>
                                <Select>
                                    {resultType.map((key) => {
                                        return (
                                            <option value={key}>{key}</option>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box>
                            <GenericInput
                                fieldTitle={t('Form.Diagnosis.Result.Name')}
                                fieldName={'Result'}
                                fieldType={'textarea'}
                                isRequired={true}
                                errorField={errors.username}
                                touchedField={touched.username}
                                validation={validateUsername}
                            />
                            <GenericInput
                                fieldTitle={t(
                                    'Form.Diagnosis.Result.Description'
                                )}
                                fieldName={'Description'}
                                fieldType={'string'}
                                isRequired={true}
                                errorField={errors.password}
                                touchedField={touched.password}
                                validation={validatePassword}
                            />
                        </Box>
                    </SimpleGrid>
                    <Flex justifyContent={'center'}>
                        <SubmitButton isSubmitting={isSubmitting} />
                    </Flex>
                </form>
            )}
        </Formik>
    );
};
