import {
    Box,
    Center,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    SimpleGrid,
    Skeleton,
    Textarea,
    Tooltip,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { Formik } from 'formik';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import { CasesService, HealthRecordService } from '../../../services';
import { CreateCaseDto } from '../../../utils/dto';
import {
    formatedDate,
    getAnimalType,
    StatusValues,
    UrgencyValues,
} from '../../../utils/utils';
import { SubmitButton } from '../../components/form';
import { BoxWithShadow } from '../../components/wrappers/BoxWithShadow';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const CaseCreatePage = () => {
    const toast = useToast();
    const { t } = useTranslation();
    const params = useParams<{ healthRecordId: string }>();

    useEffect(() => {
        document.title = t('Pages.CaseCreate');
    }, []);

    const healthRecord = useQuery({
        queryKey: ['healthRecord' + params.healthRecordId],
        queryFn: async () => {
            const service = new HealthRecordService();

            return await service.get(params.healthRecordId!);
        },
    });

    const user = useQuery({
        queryKey: ['userHealthRecord' + params.healthRecordId],
        queryFn: async () => {
            const service = new HealthRecordService();

            return await service.getHealthRecordsContactInfo(
                params.healthRecordId!
            );
        },
    });

    const animal = useQuery({
        queryKey: ['userAnimalHealthRecord' + params.healthRecordId],
        queryFn: async () => {
            const service = new HealthRecordService();

            return await service.getHealthRecordAnimal(params.healthRecordId!);
        },
    });

    return (
        <DataDisplay
            isLoaded={true}
            element={
                <SimpleGrid columns={[1, 2, 2, 2]} gap={4}>
                    {!healthRecord.isLoading &&
                    !user.isLoading &&
                    !animal.isLoading ? (
                        <BoxWithShadow>
                            <VStack px={12}>
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
                                            value={healthRecord.data?.heartRate}
                                        ></Input>
                                    </FormControl>
                                    <FormControl pb={2}>
                                        <FormLabel>
                                            {t('Form.Diangosis.Description')}
                                        </FormLabel>
                                        <Textarea
                                            resize={'none'}
                                            disabled
                                            value={
                                                healthRecord.data?.description
                                            }
                                        ></Textarea>
                                    </FormControl>
                                    <FormControl pb={2}>
                                        <FormLabel>
                                            {t('Form.Case.AnimalType')}
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            disabled
                                            value={getAnimalType(
                                                animal.data?.type!
                                            )}
                                        ></Input>
                                    </FormControl>
                                    <FormControl pb={2}>
                                        <FormLabel>
                                            {t('Form.Case.HealthRecordDate')}
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            disabled
                                            value={formatedDate(
                                                healthRecord.data?.entryDate!
                                            )}
                                        ></Input>
                                    </FormControl>
                                    <FormControl pb={2}>
                                        <FormLabel>
                                            {t('Form.Diangosis.Phonenumber')}
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            disabled
                                            value={user.data?.phoneNumber}
                                        ></Input>
                                    </FormControl>
                                    <FormControl pb={2}>
                                        <FormLabel>
                                            {t('Form.Case.Email')}
                                        </FormLabel>
                                        <Tooltip
                                            hasArrow
                                            label={user.data?.email}
                                        >
                                            <Input
                                                type="text"
                                                disabled
                                                value={user.data?.email}
                                            ></Input>
                                        </Tooltip>
                                    </FormControl>
                                </Box>
                            </VStack>
                        </BoxWithShadow>
                    ) : (
                        <Skeleton />
                    )}
                    <BoxWithShadow>
                        <Center>
                            <VStack px={12}>
                                <Heading size={'lg'} sx={{ p: 2 }}>
                                    {t('Form.Case.Case')}
                                </Heading>
                                <CaseCreationForm
                                    isLoading={
                                        healthRecord.isLoading &&
                                        user.isLoading &&
                                        animal.isLoading
                                    }
                                />
                            </VStack>
                        </Center>
                    </BoxWithShadow>
                </SimpleGrid>
            }
        />
    );
};

const CaseCreationForm = ({ isLoading }: { isLoading: boolean }) => {
    const { state } = useUserContext();
    const { t } = useTranslation();
    const params = useParams<{ healthRecordId: string }>();
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{} as CreateCaseDto}
            onSubmit={async (values, actions) => {
                const service = new CasesService();
                actions.setSubmitting(true);

                values = {
                    ...values,
                    healthRecordId: parseInt(params.healthRecordId!),
                };

                service.add(values).then(() => {
                    navigate(-1);
                });
            }}
        >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <FormControl p={2}>
                        <FormLabel>{t('Form.Case.Status')}</FormLabel>
                        <Select>
                            {StatusValues.map((x) => {
                                return (
                                    <option value={x.value}>
                                        {t(`Enums.Case.Status.${x.key}`)}
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
                    <SubmitButton isSubmitting={isSubmitting || isLoading} />
                </form>
            )}
        </Formik>
    );
};
