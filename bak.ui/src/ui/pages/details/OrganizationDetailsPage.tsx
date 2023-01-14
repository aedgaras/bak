import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import { getOrganizationByID } from '../../../services/Requests';
import { OrganizationDto } from '../../../utils/dto';
import { AppWrapper } from '../../components/wrappers/AppWrapper';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const OrganizationDetailsPage = () => {
    const { state } = useUserContext();
    const params = useParams();
    const isNotCreating = !!params.orgId;

    const { isLoading, data, error, isFetching } = useQuery({
        queryKey: ['organization'],
        queryFn: async () => {
            return await getOrganizationByID(params.orgId);
        },
    });

    useMemo(async () => {
        document.title = 'Organization Creation';
        if (isNotCreating) {
            document.title = 'Organization Details';
        }
    }, [state.name]);

    return (
        <AppWrapper>
            <DataDisplay
                isLoaded={!isLoading && !error && !isFetching}
                element={
                    <Formik
                        initialValues={data ?? ({} as OrganizationDto)}
                        onSubmit={async (values, formikHelpers) => {}}
                    >
                        {({ handleSubmit, errors, touched, isSubmitting }) => (
                            <form onSubmit={handleSubmit}>
                                <FormControl>
                                    <FormLabel>Organization Name</FormLabel>
                                    <Input value={data?.name} />
                                </FormControl>
                            </form>
                        )}
                    </Formik>
                }
            />
        </AppWrapper>
    );
};
