import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import { SetStateAction, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import {
    getOrganizationByID,
    getOrganizationMembers,
} from '../../../services/Requests';
import { OrganizationDto } from '../../../utils/dto';
import { GenericTable } from '../../components/table/GenericTable';
import { userTableColumns } from '../../components/table/Helpers';
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
            <OrganizationMembersList orgId={data?.id} />
        </AppWrapper>
    );
};

const OrganizationMembersList = ({ orgId }: { orgId: string | undefined }) => {
    const { isLoading, data, error, isFetching } = useQuery({
        queryKey: ['organizationMembers', orgId],
        queryFn: async () => {
            return await getOrganizationMembers(orgId);
        },
    });

    return (
        <Box pt={2}>
            <Box borderWidth="1px" borderRadius="lg" padding={2}>
                <GenericTable
                    data={data?.data!}
                    columns={userTableColumns}
                    entity={'user'}
                    refreshData={function (
                        value: SetStateAction<boolean>
                    ): void {
                        throw new Error('Function not implemented.');
                    }}
                />
            </Box>
        </Box>
    );
};
