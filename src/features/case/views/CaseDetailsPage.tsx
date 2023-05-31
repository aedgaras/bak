import {
    Box,
    CircularProgress,
    FormControl,
    FormLabel,
    Heading,
    Select,
    useToast,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Field, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitButton } from '../../../components';
import { DataDisplay, FormWrapper } from '../../../components/wrappers';
import { useUserContext } from '../../../providers/UserProvider';
import { CasesService } from '../../../services';

import { queryClient } from '../../../lib/query';
import { UpdateCaseDto } from '../../../types';
import { StatusValues, UrgencyValues } from '../../../utils/utils';

export const CaseDetailsPage = () => {
    const toast = useToast();
    const { t } = useTranslation();

    return (
        <DataDisplay>
            <FormWrapper>
                <Heading size={'lg'} sx={{ p: 2 }}>
                    {t('Form.CaseDetails')}
                </Heading>
                <CaseUpdateForm />
            </FormWrapper>
        </DataDisplay>
    );
};

const CaseUpdateForm = () => {
    const { state } = useUserContext();
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const toast = useToast();
    const { t } = useTranslation();

    const caseObj = useQuery({
        queryKey: ['caseDetails' + params.id!],
        queryFn: async () => {
            const service = new CasesService();
            return await service.get(params.id!);
        },
    });

    if (caseObj.isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress isIndeterminate />
            </Box>
        );
    }

    return (
        <Formik
            initialValues={caseObj.data as UpdateCaseDto}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                const service = new CasesService();

                const dto: UpdateCaseDto = {
                    status: parseInt(values.status.toString()),
                    urgency: parseInt(values.urgency.toString()),
                };

                service.update(caseObj.data?.id!, dto).then(() => {
                    queryClient.invalidateQueries();

                    navigate(-1);
                    toast({
                        status: 'success',
                        title: t('Toast.Sucess'),
                        description: t('Toast.Updated'),
                    });
                });
            }}
        >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <FormControl p={2}>
                        <FormLabel>{t('Form.Case.Status')}</FormLabel>
                        <Field as={Select} name="status">
                            {StatusValues.map((x) => {
                                return (
                                    <option value={x.value}>
                                        {t(`Enums.Case.Status.${x.key}`)}
                                    </option>
                                );
                            })}
                        </Field>
                    </FormControl>
                    <FormControl p={2}>
                        <FormLabel>{t('Form.Case.Priority')}</FormLabel>
                        <Field as={Select} name="urgency">
                            {UrgencyValues.map((x) => {
                                return (
                                    <option value={x.value}>
                                        {t(`Enums.Case.Urgency.${x.key}`)}
                                    </option>
                                );
                            })}
                        </Field>
                    </FormControl>
                    <SubmitButton isSubmitting={isSubmitting} />
                </form>
            )}
        </Formik>
    );
};
