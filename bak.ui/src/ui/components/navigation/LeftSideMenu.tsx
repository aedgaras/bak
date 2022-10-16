import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IsLoggedInElement } from '../wrappers/HelperWrappers';

export const LeftSideMenu = () => {
    return (
        <IsLoggedInElement
            element={
                <>
                    <Link to={'/'}>
                        <Button>Home</Button>
                    </Link>
                    <Link to={'/users'}>
                        <Button>Users</Button>
                    </Link>
                    <Link to={'/organizations'}>
                        <Button>Organizations</Button>
                    </Link>
                </>
            }
        />
    );
};
