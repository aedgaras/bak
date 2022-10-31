import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Skeleton,
    VStack,
} from '@chakra-ui/react';
import axios, { AxiosResponse } from 'axios';
import { useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import { API_URL, axiosAuthHeaders } from '../../../utils/constants';
import { OrganizationDto } from '../../../utils/dto/Organization';
import { BackButton } from '../../components/navigation/BackButton';
import { AppWrapper } from '../../components/wrappers/AppWrapper';
import { BoxWithShadow } from '../../components/wrappers/BoxWithShadow';

export const OrganizationDetailsPage = () => {
    const userContext = useContext(UserContext);
    const [org, setOrg] = useState<OrganizationDto>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const params = useParams();
    const isNotCreating = !!params.orgName;

    useMemo(async () => {
        document.title = 'Organization Creation';
        if (isNotCreating) {
            document.title = 'Organization Details';
            await axios
                .get(
                    `${API_URL}/organizations/getByName/${params.orgName}`,
                    axiosAuthHeaders
                )
                .then((r: AxiosResponse<OrganizationDto>) => {
                    setOrg(r.data);
                    setIsLoaded(true);
                });
        }
        setIsLoaded(true);
    }, [userContext.name]);

    return (
        <AppWrapper>
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
        </AppWrapper>
    );
};
