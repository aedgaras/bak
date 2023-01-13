import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Formik } from 'formik';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import { getOrganizationByID } from '../../../services/Requests';
import { OrganizationDto } from '../../../utils/dto';
import { AppWrapper } from '../../components/wrappers/AppWrapper';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const OrganizationDetailsPage = () => {
    const userContext = useUserContext();
    const [org, setOrg] = useState<OrganizationDto>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const params = useParams();
    const isNotCreating = !!params.orgId;

    useMemo(async () => {
        document.title = 'Organization Creation';
        if (isNotCreating) {
            document.title = 'Organization Details';
            if (params.orgId) {
                await getOrganizationByID(params.orgId).then((r) => {
                    setOrg(r);
                    setIsLoaded(true);
                });
            }
        }
        setIsLoaded(true);
    }, [userContext.name]);

    return (
        <AppWrapper
            children={
                <DataDisplay
                    isLoaded={isLoaded}
                    element={
                        <Formik
                            initialValues={org ?? ({} as OrganizationDto)}
                            onSubmit={async (values, formikHelpers) => {}}
                        >
                            {({
                                handleSubmit,
                                errors,
                                touched,
                                isSubmitting,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <FormControl>
                                        <FormLabel>Organization Name</FormLabel>
                                        <Input value={org?.name} />
                                    </FormControl>
                                </form>
                            )}
                        </Formik>
                    }
                />
            }
        />
    );
};
