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

import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import { HealthRecordService } from '../../../services';
import { UserRegisterDto } from '../../../utils/dto';
import { CaseValues, UrgencyValues } from '../../../utils/utils';
import { SubmitButton } from '../../components/form';
import { AppWrapper } from '../../components/wrappers/AppWrapper';
import { BoxWithShadow } from '../../components/wrappers/BoxWithShadow';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const CaseCreatePage = () => {
    const toast = useToast();
    const { t } = useTranslation();
    const service = new HealthRecordService();
    const params = useParams<{ healthRecordId: string }>();

    const { isLoading, isFetching, error, data } = useQuery({
        queryFn: async () => {
            return await service.getHealthRecord(params.healthRecordId!);
        },
    });

    return (
        <AppWrapper>
            <DataDisplay
                isLoaded={true}
                element={
                    <SimpleGrid columns={[1, null, null, 2]} gap={4}>
                        <BoxWithShadow>
                            <VStack>
                                <Heading size={'lg'} sx={{ p: 2 }}>
                                    {t('Form.Case.HealthRecord')}
                                </Heading>
                                <Box p={2}>
                                    <FormControl py={2}>
                                        <FormLabel>
                                            {t('Form.Case.Pulse')}
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            disabled
                                            value={data?.heartRate}
                                        ></Input>
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
                                            {t('Form.Case.AnimalType')}
                                        </FormLabel>
                                        <Input type="text" disabled></Input>
                                    </FormControl>
                                    <FormControl pb={2}>
                                        <FormLabel>
                                            {t('Form.Case.HealthRecordDate')}
                                        </FormLabel>
                                        <Input type="text" disabled></Input>
                                    </FormControl>
                                    <FormControl pb={2}>
                                        <FormLabel>
                                            {t('Form.Diangosis.Phonenumber')}
                                        </FormLabel>
                                        <Input type="text" disabled></Input>
                                    </FormControl>
                                    <FormControl pb={2}>
                                        <FormLabel>
                                            {t('Form.Case.Email')}
                                        </FormLabel>
                                        <Input type="text" disabled></Input>
                                    </FormControl>
                                </Box>
                            </VStack>
                        </BoxWithShadow>
                        <BoxWithShadow>
                            <VStack>
                                <Heading size={'lg'} sx={{ p: 2 }}>
                                    {t('Form.Case.Case')}
                                </Heading>
                                <CaseCreationForm />
                            </VStack>
                        </BoxWithShadow>
                    </SimpleGrid>
                }
            />
        </AppWrapper>
    );
};

const CaseCreationForm = () => {
    const { state } = useUserContext();
    const priority = ['Case', 'Diagnosis', 'Result'];
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
                        <FormLabel>{t('Form.Case.Status')}</FormLabel>
                        <Select>
                            {CaseValues.map((x) => {
                                return (
                                    <option value={x.value}>
                                        {t(`Enums.Case.Type.${x.key}`)}
                                    </option>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl p={2}>
                        <FormLabel>{t('Form.Case.Priority')}</FormLabel>
                        <Select>
                            {UrgencyValues.map((x) => {
                                return (
                                    <option value={x.value}>
                                        {t(`Enums.Case.Urgency.${x.key}`)}
                                    </option>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <SubmitButton isSubmitting={isSubmitting} />
                </form>
            )}
        </Formik>
    );
};
