import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Skeleton,
    VStack,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import { getOrganizationByName } from '../../../services/Requests';
import { OrganizationDto } from '../../../utils/dto/Organization';
import { BackButton } from '../../components/navigation/BackButton';
import { BoxWithShadow } from '../../components/wrappers/BoxWithShadow';

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
        <Skeleton isLoaded={isLoaded}>
            <BoxWithShadow>
                <VStack p={1}>
                    <HStack w={'100%'}>
                        <BackButton />
                    </HStack>
                    <FormControl>
                        <FormLabel>Organization Name</FormLabel>
                        <Input value={org?.name} />
                    </FormControl>
                    <HStack w={'100%'}>
                        <Button type="submit">Submit</Button>
                    </HStack>
                </VStack>
            </BoxWithShadow>
        </Skeleton>
    );
};
