import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppWrapper } from './AppWrapper';
import { BoxWithShadowMax } from './BoxWithShadow';

export const BreadCrumbs = () => {
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location);

    return location.pathname.split('/').length > 2 ? (
        <AppWrapper>
            <BoxWithShadowMax>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Docs</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </BoxWithShadowMax>
        </AppWrapper>
    ): null;
};
