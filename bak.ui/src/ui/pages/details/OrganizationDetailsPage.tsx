import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import { getOrganizationByName } from '../../../services/Requests';
import { OrganizationDto } from '../../../utils/dto';
import { DataDisplay } from '../../components/datadisplay/generic/DataDisplay';
import { AppWrapper } from '../../components/wrappers/AppWrapper';

export const OrganizationDetailsPage = () => {
    const userContext = useUserContext();
    const [org, setOrg] = useState<OrganizationDto>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const params = useParams();
    const isNotCreating = !!params.orgName;

    useMemo(async () => {
        document.title = 'Organization Creation';
        if (isNotCreating) {
            document.title = 'Organization Details';
            if (params.orgName) {
                await getOrganizationByName(params.orgName).then((r) => {
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
                        <FormControl>
                            <FormLabel>Organization Name</FormLabel>
                            <Input value={org?.name} />
                        </FormControl>
                    }
                />
            }
        />
    );
};
