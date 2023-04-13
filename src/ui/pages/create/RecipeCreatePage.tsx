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
import { GenericInput, SubmitButton } from '../../components/form';
import {
    validatePassword,
    validateUsername,
} from '../../components/form/validation/validation';
import { AppWrapper } from '../../components/wrappers/AppWrapper';
import { BoxWithShadow } from '../../components/wrappers/BoxWithShadow';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const RecipeCreatePage = () => {
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
                                {t('Form.MedicineRecipe.Create')}
                            </Heading>
                            <RecipeCreationForm />
                        </VStack>
                    </BoxWithShadow>
                }
            />
        </AppWrapper>
    );
};

const RecipeCreationForm = () => {
    const { state } = useUserContext();
    const users = ['user'];
    const userAnimals = ['animal'];
    const diagnosis = ['diagnosis'];
    const result = ['result'];
    const count = [1, 2, 3, 4];

    return (
        <Formik
            initialValues={{} as UserRegisterDto}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
            }}
        >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <SimpleGrid columns={[1, null, null, 3]}>
                        <Box>
                            <FormControl p={2} isRequired>
                                <FormLabel>
                                    {t('Form.MedicineRecipe.User')}
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
                                    {t('Form.MedicineRecipe.Animal')}
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
                                    {t('Form.MedicineRecipe.Diagnosis')}
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
                                    {t('Form.MedicineRecipe.DiagnosisResults')}
                                </FormLabel>
                                <Select>
                                    {result.map((key) => {
                                        return (
                                            <option value={key}>{key}</option>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box>
                            <GenericInput
                                fieldTitle={t('Form.MedicineRecipe.Name')}
                                fieldName={'RecipeName'}
                                fieldType={'string'}
                                isRequired={true}
                                errorField={errors.username}
                                touchedField={touched.username}
                                validation={validateUsername}
                            />
                            <GenericInput
                                fieldTitle={t(
                                    'Form.MedicineRecipe.Description'
                                )}
                                fieldName={'Password'}
                                fieldType={'string'}
                                isRequired={true}
                                errorField={errors.password}
                                touchedField={touched.password}
                                validation={validatePassword}
                            />
                        </Box>

                        <Box>
                            <GenericInput
                                fieldTitle={t('Form.MedicineRecipe.DateDue')}
                                fieldName={'DateDue'}
                                fieldType={'date'}
                                isRequired={true}
                                errorField={errors.password}
                                touchedField={touched.password}
                                validation={validatePassword}
                            />

                            <FormControl p={2} isRequired>
                                <FormLabel>
                                    {t('Form.MedicineRecipe.Count')}
                                </FormLabel>
                                <Select>
                                    {count.map((key) => {
                                        return (
                                            <option value={key}>{key}</option>
                                        );
                                    })}
                                </Select>
                            </FormControl>
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
