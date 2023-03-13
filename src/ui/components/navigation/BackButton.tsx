import {ArrowLeftIcon} from '@chakra-ui/icons';
import {Box, Button} from '@chakra-ui/react';
import {useLocation, useNavigate} from 'react-router-dom';

export const BackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return location.pathname.split('/').length > 2 ? (
        <Box>
            <Button onClick={(e) => navigate(-1)}>
                <ArrowLeftIcon/>
            </Button>
        </Box>
    ) : null;
};
